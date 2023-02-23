import Product from "src/product/entities/product.entity";
export default class Icon {
    id: number;
    name: string;
    description: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}
