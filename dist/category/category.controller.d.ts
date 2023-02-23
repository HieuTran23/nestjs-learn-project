import { CategoryService } from "./category.service";
import CreateCategoryDto from "./dto/createCategory.dto";
import UpdateCategoryDto from "./dto/updateCategory.dto";
import Category from "./entities/category.entities";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAllCategories(): Promise<Category[]>;
    getCategoryById(id: number): Promise<Category>;
    createCategory(category: CreateCategoryDto): Promise<Category>;
    updateCategory(id: number, category: UpdateCategoryDto): Promise<Category>;
    deleteCategory(id: number): Promise<void>;
}
