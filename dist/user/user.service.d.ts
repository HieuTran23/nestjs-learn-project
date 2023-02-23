import User from "./entities/user.entity";
import { Repository } from "typeorm";
import CreateUserDto from "./dto/createUser.dto";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getAllUsers(): Promise<User[]>;
    getByEmail(email: string): Promise<User>;
    getById(id: number): Promise<User>;
    getUserByRefreshToken(refreshToken: string, userId: number): Promise<User>;
    create(userData: CreateUserDto): Promise<User>;
    setCurrentRefreshToken(refresh_token: string, userId: number): Promise<void>;
    verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
    verifyRefreshToken(hashRefreshToken: string, refreshToken: string): Promise<boolean>;
}
