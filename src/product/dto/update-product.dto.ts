import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto {
    name: string;
    description: string;
    categoryId: number;
}
