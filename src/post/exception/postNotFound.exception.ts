import { NotFoundException } from "@nestjs/common";

class PostNotFoundException extends NotFoundException {
  constructor(productId: number) {
    super(`Post with id ${productId} not found`);
  }
}

export default PostNotFoundException;
