import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PostEntity from "./entities/post.entity";
import { Repository } from "typeorm";
import CreatePostDto from "./dto/createPost.dto";
import UpdatePostDto from "./dto/updatePost.dto";

@Injectable()
export default class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>
  ) {}

  getAllPosts(): Promise<PostEntity[]> {
    return this.postRepository.find();
  }

  async createPost(post: CreatePostDto): Promise<PostEntity> {
    const newPost = this.postRepository.create(post);
    await this.postRepository.save(newPost);
    return newPost;
  }

  async getPostById(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ where: { id: id } });
    if (post) {
      return post;
    }
    throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
  }

  async updatePost(id: number, post: UpdatePostDto): Promise<PostEntity> {
    await this.postRepository.update(id, post);
    const updatedPost = await this.postRepository.findOne({
      where: { id: id },
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException("Post not found", HttpStatus.NOT_FOUND);
    }
  }
}
