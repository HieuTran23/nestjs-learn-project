import Product from "src/product/entities/product.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export default class Icon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Product, (product) => product.icons)
  @JoinColumn()
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;
}
