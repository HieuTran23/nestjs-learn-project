import PostService from "./post.service";
import CreatePostDto from "./dto/createPost.dto";
import UpdatePostDto from "./dto/updatePost.dto";
import PostEntity from "./entities/post.entity";
export default class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getAllPosts(): Promise<PostEntity[]>;
    getPostById(id: string): Promise<PostEntity>;
    createPost(post: CreatePostDto): Promise<PostEntity>;
    updatePost(id: string, post: UpdatePostDto): Promise<PostEntity>;
    deletePost(id: string): Promise<void>;
}
