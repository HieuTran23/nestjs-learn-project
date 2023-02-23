import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import Product from "./entities/product.entity";
import { Repository } from "typeorm";
import { CategoryService } from "src/category/category.service";
import SearchProductDto from "./dto/search-product.dto";
import { IconsService } from "src/icons/icons.service";
export declare class ProductService {
    private readonly productRepository;
    private readonly categoryService;
    private readonly iconService;
    constructor(productRepository: Repository<Product>, categoryService: CategoryService, iconService: IconsService);
    createProduct(product: CreateProductDto): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product>;
    updateProduct(id: number, product: UpdateProductDto): Promise<Product>;
    deleteProduct(id: number): Promise<void>;
    searchProducts(query: SearchProductDto): Promise<{
        products: Product[];
        pages: number;
    }>;
    rateProduct(productId: number, iconId: number): Promise<Product>;
}
