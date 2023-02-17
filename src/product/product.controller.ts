import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { SearchProductDto } from "./dto/search-product.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return await this.productService.createProduct(product);
  }

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get("search")
  async searchProduct(@Query() query: SearchProductDto) {
    return await this.productService.searchProducts(query);
  }

  @Get(":id")
  getProductById(@Param("id") id: string) {
    return this.productService.getProductById(Number(id));
  }

  @Patch(":id")
  async updateProduct(
    @Param("id") id: string,
    @Body() product: UpdateProductDto
  ) {
    return await this.productService.updateProduct(Number(id), product);
  }

  @Delete(":id")
  async deleteProduct(@Param("id") id: string) {
    return await this.productService.deleteProduct(Number(id));
  }

  @Get("a")
  helloFun() {
    return "hello";
  }
}
