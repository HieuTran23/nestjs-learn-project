import { NotFoundException } from "@nestjs/common";

class CategoryNotFoundException extends NotFoundException {
  constructor(id: number) {
    super(`Category with id ${id} not found`);
  }
}

export default CategoryNotFoundException;
