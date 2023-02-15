import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./enum/role.enum";
import { Exclude } from "class-transformer";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true})
    public email: string;

    @Column()
    @Exclude()
    public hashPassword: string;
    
    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @Column({
        type: 'enum',
        enum: Role,
        array: true,
        default: [Role.User]
    })
    public roles: Role[]

    @Column({nullable: true})
    public currentHashedRefreshToken?: string;

    @CreateDateColumn()
    public createdAt: Date;
}

export default User