import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public title: string;

  @Column()
  public content: string;

  @CreateDateColumn()
  public createdAt: Date;
}

export default Post;
