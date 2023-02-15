import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import User from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from './dto/createUser.dto';
import * as argon from 'argon2'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    getAllUsers() {
        return this.userRepository.find()
    }

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({ where : {email}})
        if(user) {
            return user
        }
        throw new HttpException('This account not exist', HttpStatus.NOT_FOUND)
    }

    async getById(id: number){
        const user = await this.userRepository.findOne({where: {id}})
        if(user) {
            return user 
        }
        throw new HttpException('This account not exist', HttpStatus.NOT_FOUND)
    }

    async getUserByRefreshToken(refreshToken: string, userId: number) {
        const user = await this.getById(userId)

        const isCurrentRefreshToken = await argon.verify(user.currentHashedRefreshToken, refreshToken)

        if(isCurrentRefreshToken) return user
    }

    async create(userData: CreateUserDto){
        const newUser = await this.userRepository.create(userData)
        await this.userRepository.save(newUser);
        return newUser
    }

    async setCurrentRefreshToken(refresh_token: string, userId: number){
        const currentHashedRefreshToken = await argon.hash(refresh_token);
        await this.userRepository.update(userId, {
            currentHashedRefreshToken
        })
    }
}
