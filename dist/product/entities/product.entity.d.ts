import Category from "../../category/entities/category.entities";
import Icon from "src/icons/entities/icon.entity";
export default class Product {
    id: number;
    name: string;
    description: string;
    category: Category;
    icons: Icon[];
    createdAt: Date;
    updatedAt: Date;
}
