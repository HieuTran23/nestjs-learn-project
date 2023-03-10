import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import Product from "./entities/product.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryService } from "src/category/category.service";
import SearchProductDto from "./dto/search-product.dto";
import { IconsService } from "src/icons/icons.service";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly iconService: IconsService
  ) {}

  async createProduct(product: CreateProductDto): Promise<Product> {
    const category = await this.categoryService.getCategoryById(product.categoryId);
    const newProduct = this.productRepository.create({
      ...product,
      category: category,
    });
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  getAllProducts(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ["category"],
      select: {
        category: {
          id: true,
          name: true,
        },
      },
    });
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ["category", "icons"],
      select: {
        category: {
          id: true,
          name: true,
        },
      },
    });
    if (!product) throw new HttpException("Product Not Found", HttpStatus.NOT_FOUND);
    return product;
  }

  async updateProduct(id: number, product: UpdateProductDto): Promise<Product> {
    const category = await this.categoryService.getCategoryById(product.categoryId);
    const updatedProduct = await this.productRepository.save({
      id,
      ...product,
      category,
    });
    if (!updatedProduct) throw new HttpException("Product Not Found", HttpStatus.NOT_FOUND);
    return updatedProduct;
  }

  async deleteProduct(id: number) {
    const deleteResponse = await this.productRepository.delete(id);
    if (!deleteResponse.affected)
      throw new HttpException("Product Not Found", HttpStatus.NOT_FOUND);
  }

  async searchProducts(query: SearchProductDto): Promise<{ products: Product[]; pages: number }> {
    query.category ? query.category : (query.category = "");
    query.limit ? query.limit : (query.limit = 3);
    query.page ? query.page : (query.page = 1);
    query.product ? query.product : (query.product = "");
    const sortOrder =
      query.order === "newest"
        ? { orderField: "product.createdAt", orderValue: "DESC" as const }
        : { orderField: "product.id", orderValue: "DESC" as const };

    const searchProductQuery = await this.productRepository
      .createQueryBuilder("product")
      .innerJoinAndSelect("product.category", "category")
      .where("product.name LIKE :name", {
        name: `%${query.product}%`,
      })
      .andWhere("category.name LIKE :categoryName", {
        categoryName: `%${query.category}%`,
      })
      .orderBy(sortOrder.orderField, sortOrder.orderValue)
      .take(query.limit)
      .skip(query.limit * (query.page - 1))
      .getMany();

    const countProducts = await this.productRepository.count();

    return {
      products: searchProductQuery,
      pages: Math.ceil(countProducts / query.limit),
    };
  }

  async rateProduct(productId: number, iconId: number): Promise<Product> {
    const foundIcon = await this.iconService.findOne(iconId);
    const foundPost = await this.productRepository.findOne({
      where: { id: productId },
      relations: ["icons"],
    });
    foundPost.icons = [...foundPost.icons, foundIcon];
    await this.productRepository.save(foundPost);
    return foundPost;
  }
}
