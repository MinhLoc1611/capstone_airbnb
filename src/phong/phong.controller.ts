import { Controller } from '@nestjs/common';
import { PhongService } from './phong.service';

@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}
}
