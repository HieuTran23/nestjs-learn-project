import { IconsService } from "./icons.service";
import { CreateIconDto } from "./dto/create-icon.dto";
import { UpdateIconDto } from "./dto/update-icon.dto";
import Icon from "./entities/icon.entity";
export declare class IconsController {
    private readonly iconsService;
    constructor(iconsService: IconsService);
    create(createIconDto: CreateIconDto): Promise<Icon>;
    findAll(): Promise<Icon[]>;
    findOne(id: string): Promise<Icon>;
    update(id: string, updateIconDto: UpdateIconDto): Promise<Icon>;
    remove(id: string): Promise<void>;
}
