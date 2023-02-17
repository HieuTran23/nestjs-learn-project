import { NotFoundException } from "@nestjs/common";

class ProductsNotFoundException extends NotFoundException {
  constructor() {
    super(`Products not found`);
  }
}

export default ProductsNotFoundException;
