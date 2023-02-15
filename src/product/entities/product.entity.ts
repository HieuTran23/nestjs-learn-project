import Category from "src/category/category.entities";
import { Column, CreateDateColumn, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm";

export default class Product {
    @PrimaryGeneratedColumn() 
    public id: number;

    @Column({ unique: true})
    public name: string;

    @Column()
    public description: string

    @Column(() => Category)
    @JoinColumn()
    public category: Category

    @CreateDateColumn()
    public createdAt: Date;
}
