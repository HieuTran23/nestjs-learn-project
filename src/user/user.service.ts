import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import User from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import CreateUserDto from "./dto/createUser.dto";
import * as argon from "argon2";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      return user;
    }
    throw new HttpException("This account not exist", HttpStatus.NOT_FOUND);
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user;
    }
    throw new HttpException("This account not exist", HttpStatus.NOT_FOUND);
  }

  async getUserByRefreshToken(
    refreshToken: string,
    userId: number
  ): Promise<User> {
    const user = await this.getById(userId);

    const isCurrentRefreshToken = await argon.verify(
      user.currentHashedRefreshToken,
      refreshToken
    );

    if (isCurrentRefreshToken) return user;
  }

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async setCurrentRefreshToken(refresh_token: string, userId: number) {
    const currentHashedRefreshToken = await argon.hash(refresh_token);
    await this.userRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isPasswordMatching = await argon.verify(
      hashedPassword,
      plainTextPassword
    );
    if (isPasswordMatching) return true;
    return false;
  }

  async verifyRefreshToken(
    hashRefreshToken: string,
    refreshToken: string
  ): Promise<boolean> {
    console.log(hashRefreshToken);
    const isRefreshTokenMatching = await argon.verify(
      hashRefreshToken,
      refreshToken
    );
    if (isRefreshTokenMatching) return true;
    return false;
  }
}
