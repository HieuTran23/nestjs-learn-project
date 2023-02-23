import PostEntity from "./entities/post.entity";
import { Repository } from "typeorm";
import CreatePostDto from "./dto/createPost.dto";
import UpdatePostDto from "./dto/updatePost.dto";
export default class PostService {
    private postRepository;
    constructor(postRepository: Repository<PostEntity>);
    getAllPosts(): Promise<PostEntity[]>;
    createPost(post: CreatePostDto): Promise<PostEntity>;
    getPostById(id: number): Promise<PostEntity>;
    updatePost(id: number, post: UpdatePostDto): Promise<PostEntity>;
    deletePost(id: number): Promise<void>;
}
