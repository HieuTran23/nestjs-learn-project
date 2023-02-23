"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("./entities/product.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const category_service_1 = require("../category/category.service");
const icons_service_1 = require("../icons/icons.service");
let ProductService = class ProductService {
    constructor(productRepository, categoryService, iconService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
        this.iconService = iconService;
    }
    async createProduct(product) {
        const category = await this.categoryService.getCategoryById(product.categoryId);
        const newProduct = this.productRepository.create(Object.assign(Object.assign({}, product), { category: category }));
        await this.productRepository.save(newProduct);
        return newProduct;
    }
    getAllProducts() {
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
    async getProductById(id) {
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
        if (!product)
            throw new common_1.HttpException("Product Not Found", common_1.HttpStatus.NOT_FOUND);
        return product;
    }
    async updateProduct(id, product) {
        const category = await this.categoryService.getCategoryById(product.categoryId);
        const updatedProduct = await this.productRepository.save(Object.assign(Object.assign({ id }, product), { category }));
        if (!updatedProduct)
            throw new common_1.HttpException("Product Not Found", common_1.HttpStatus.NOT_FOUND);
        return updatedProduct;
    }
    async deleteProduct(id) {
        const deleteResponse = await this.productRepository.delete(id);
        if (!deleteResponse.affected)
            throw new common_1.HttpException("Product Not Found", common_1.HttpStatus.NOT_FOUND);
    }
    async searchProducts(query) {
        query.category ? query.category : (query.category = "");
        query.limit ? query.limit : (query.limit = 3);
        query.page ? query.page : (query.page = 1);
        query.product ? query.product : (query.product = "");
        const sortOrder = query.order === "newest"
            ? { orderField: "product.createdAt", orderValue: "DESC" }
            : { orderField: "product.id", orderValue: "DESC" };
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
    async rateProduct(productId, iconId) {
        const foundIcon = await this.iconService.findOne(iconId);
        const foundPost = await this.productRepository.findOne({
            where: { id: productId },
            relations: ["icons"],
        });
        foundPost.icons = [...foundPost.icons, foundIcon];
        await this.productRepository.save(foundPost);
        return foundPost;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        category_service_1.CategoryService,
        icons_service_1.IconsService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map