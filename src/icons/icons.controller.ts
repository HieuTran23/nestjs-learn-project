import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { IconsService } from "./icons.service";
import { CreateIconDto } from "./dto/create-icon.dto";
import { UpdateIconDto } from "./dto/update-icon.dto";
import Icon from "./entities/icon.entity";

@Controller("icon")
export class IconsController {
  constructor(private readonly iconsService: IconsService) {}

  @Post()
  create(@Body() createIconDto: CreateIconDto): Promise<Icon> {
    return this.iconsService.create(createIconDto);
  }

  @Get()
  findAll(): Promise<Icon[]> {
    return this.iconsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Icon> {
    return this.iconsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateIconDto: UpdateIconDto): Promise<Icon> {
    return this.iconsService.update(+id, updateIconDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.iconsService.remove(+id);
  }
}
