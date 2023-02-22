import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "../enum/role.enum";
import { Exclude } from "class-transformer";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  public hashPassword: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({
    type: "enum",
    enum: Role,
    array: true,
    default: [Role.User],
  })
  public roles: Role[];

  @Exclude()
  @Column({ nullable: true })
  public currentHashedRefreshToken?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export default User;
