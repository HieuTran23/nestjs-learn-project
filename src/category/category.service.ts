import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import Category from "./entities/category.entities";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import UpdateCategoryDto from "./dto/updateCategory.dto";
import { InjectRepository } from "@nestjs/typeorm";
import CategoryNotFoundException from "./exceptions/category-not-found.exception";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  getAllCategories() {
    return this.categoryRepository.find({
      relations: ["products"],
      select: {
        products: {
          id: true,
          name: true,
        },
      },
    });
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (category) return category;
    throw new HttpException("Category Not Found", HttpStatus.NOT_FOUND);
  }

  async getCategoryByName(name: string) {
    const category = await this.categoryRepository.findOne({ where: { name } });
    if (!category) throw new CategoryNotFoundException(category.id);
    return category;
  }

  async createCategory(category: CreateCategoryDto) {
    const newCategory = await this.categoryRepository.create(category);
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async updateCategory(id: number, category: UpdateCategoryDto) {
    await this.categoryRepository.update(id, category);
    const updatedCategory = await this.categoryRepository.findOne({
      where: { id },
    });
    return updatedCategory;
  }

  async deleteCategory(id: number) {
    const deleteResponse = await this.categoryRepository.delete(id);
    if (!deleteResponse.affected)
      throw new HttpException("Category not found", HttpStatus.NOT_FOUND);
  }
}
