import Category from "./entities/category.entities";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/createCategory.dto";
import UpdateCategoryDto from "./dto/updateCategory.dto";
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    getAllCategories(): Promise<Category[]>;
    getCategoryById(id: number): Promise<Category>;
    getCategoryByName(name: string): Promise<Category>;
    createCategory(category: CreateCategoryDto): Promise<Category>;
    updateCategory(id: number, category: UpdateCategoryDto): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
}
