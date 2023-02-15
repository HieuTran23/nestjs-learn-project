import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import Product from './entities/product.entity';
import { Repository } from 'typeorm';
import Category from 'src/category/category.entities';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: Repository<Product>,
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(product: CreateProductDto) {
    const category = await this.categoryRepository.findOne({where: {id: product.categoryId}})
    if(!category) throw new HttpException('Not found category', HttpStatus.NOT_FOUND)
   
    const newProduct = await this.productRepository.create({...product})
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
