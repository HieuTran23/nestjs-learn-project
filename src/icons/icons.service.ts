import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateIconDto } from "./dto/create-icon.dto";
import { UpdateIconDto } from "./dto/update-icon.dto";
import { Repository } from "typeorm";
import Icon from "./entities/icon.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class IconsService {
  constructor(@InjectRepository(Icon) private readonly iconRepository: Repository<Icon>) {}

  async create(createIconDto: CreateIconDto): Promise<Icon> {
    const newIcon = this.iconRepository.create(createIconDto);
    await this.iconRepository.save(newIcon);
    return newIcon;
  }

  findAll(): Promise<Icon[]> {
    return this.iconRepository.find();
  }

  async findOne(id: number): Promise<Icon> {
    const icon = await this.iconRepository.findOne({ where: { id } });
    if (!icon) throw new HttpException("Icon Not Found", HttpStatus.NOT_FOUND);
    return icon;
  }

  async update(id: number, updateIconDto: UpdateIconDto): Promise<Icon> {
    await this.iconRepository.update(id, updateIconDto);
    const updatedIcon = await this.findOne(id);
    return updatedIcon;
  }

  async remove(id: number) {
    const deletedResponse = await this.iconRepository.delete(id);
    if (!deletedResponse) throw new HttpException("Icon Not Found", HttpStatus.NOT_FOUND);
  }
}
