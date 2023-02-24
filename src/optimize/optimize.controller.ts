import { Controller } from '@nestjs/common';
import { OptimizeService } from './optimize.service';

@Controller('optimize')
export class OptimizeController {
  constructor(private readonly optimizeService: OptimizeService) {}
}
