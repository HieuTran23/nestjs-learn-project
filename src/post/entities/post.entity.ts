import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
class PostEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public title: string;

  @Column()
  public content: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export default PostEntity;
