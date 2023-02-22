import Product from "src/product/entities/product.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @OneToMany(() => Product, (product: Product) => product.category)
  public products: Product[];

  @CreateDateColumn()
  public createdAt: Date;
}

export default Category;
