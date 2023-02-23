import Product from "src/product/entities/product.entity";
declare class Category {
    id: number;
    name: string;
    description: string;
    products: Product[];
    createdAt: Date;
}
export default Category;
