import { NotFoundException } from "@nestjs/common";

export default class IconNotFoundException extends NotFoundException {
  constructor() {
    super("Icon not found");
  }
}
