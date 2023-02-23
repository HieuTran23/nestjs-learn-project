import { CreateIconDto } from "./dto/create-icon.dto";
import { UpdateIconDto } from "./dto/update-icon.dto";
import { Repository } from "typeorm";
import Icon from "./entities/icon.entity";
export declare class IconsService {
    private readonly iconRepository;
    constructor(iconRepository: Repository<Icon>);
    create(createIconDto: CreateIconDto): Promise<Icon>;
    findAll(): Promise<Icon[]>;
    findOne(id: number): Promise<Icon>;
    update(id: number, updateIconDto: UpdateIconDto): Promise<Icon>;
    remove(id: number): Promise<void>;
}
