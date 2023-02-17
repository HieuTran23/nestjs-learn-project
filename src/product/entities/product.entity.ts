import Category from "../../category/entities/category.entities";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Icon from "src/icons/entities/icon.entity";

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column()
  public description: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  public category: Category;

  @ManyToMany(() => Icon, (icon) => icon.products)
  @JoinColumn()
  public icons: Icon[];

  @CreateDateColumn()
  public createdAt: Date;
}
