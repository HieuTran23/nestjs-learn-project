import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { SearchProductDto } from "./dto/search-product.dto";
import Product from "./entities/product.entity";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(product: CreateProductDto): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    searchProduct(query: SearchProductDto): Promise<{
        products: Product[];
        pages: number;
    }>;
    getProductById(id: string): Promise<Product>;
    rateProduct(id: string, iconId: string): Promise<Product>;
    updateProduct(id: string, product: UpdateProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
}
