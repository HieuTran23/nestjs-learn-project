import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";
import CreateCategoryDto from "./dto/createCategory.dto";
import UpdateCategoryDto from "./dto/updateCategory.dto";
import Category from "./entities/category.entities";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(":id")
  getCategoryById(@Param("id") id: number): Promise<Category> {
    return this.categoryService.getCategoryById(Number(id));
  }

  @Post()
  async createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(category);
  }

  @Patch(":id")
  async updateCategory(
    @Param("id") id: number,
    @Body() category: UpdateCategoryDto
  ): Promise<Category> {
    return this.categoryService.updateCategory(Number(id), category);
  }

  @Delete(":id")
  async deleteCategory(@Param("id") id: number) {
    return this.categoryService.deleteCategory(Number(id));
  }
}
