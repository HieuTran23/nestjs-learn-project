import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import PostService from "./post.service";
import CreatePostDto from "./dto/createPost.dto";
import UpdatePostDto from "./dto/updatePost.dto";
import RoleGuard from "../auth/guard/role.guard";
import { LocalAuthenticationGuard } from "../auth/guard/localAuthentication.guard";
import JwtAuthenticationGuard from "../auth/guard/jwt-authentication.guard";
import PostEntity from "./entities/post.entity";

@Controller("post")
export default class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPosts();
  }

  @Get(":id")
  getPostById(@Param("id") id: string): Promise<PostEntity> {
    return this.postService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto): Promise<PostEntity> {
    return await this.postService.createPost(post);
  }

  @Patch(":id")
  async updatePost(@Param("id") id: string, @Body() post: UpdatePostDto): Promise<PostEntity> {
    return await this.postService.updatePost(Number(id), post);
  }

  @Delete(":id")
  async deletePost(@Param("id") id: string) {
    return await this.postService.deletePost(Number(id));
  }
}
