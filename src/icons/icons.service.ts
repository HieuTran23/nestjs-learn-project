import { Injectable } from "@nestjs/common";
import { CreateIconDto } from "./dto/create-icon.dto";
import { UpdateIconDto } from "./dto/update-icon.dto";
import { Repository } from "typeorm";
import Icon from "./entities/icon.entity";
import IconNotFoundException from "./exceptions/icon-not-found.exception";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class IconsService {
  constructor(
    @InjectRepository(Icon) private readonly iconRepository: Repository<Icon>
  ) {}

  create(createIconDto: CreateIconDto) {
    const newIcon = this.iconRepository.create(createIconDto);
    this.iconRepository.save(newIcon);
    return newIcon;
  }

  findAll() {
    return this.iconRepository.find();
  }

  async findOne(id: number) {
    const icon = await this.iconRepository.findOne({ where: { id } });
    if (!icon) throw new IconNotFoundException();
    return icon;
  }

  async update(id: number, updateIconDto: UpdateIconDto) {
    await this.iconRepository.update(id, updateIconDto);
    const updatedIcon = await this.findOne(id);
    return updatedIcon;
  }

  async remove(id: number) {
    const deletedResponse = await this.iconRepository.delete(id);
    if (!deletedResponse) throw new IconNotFoundException();
  }
}
