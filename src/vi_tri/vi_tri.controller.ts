import { Controller } from '@nestjs/common';
import { ViTriService } from './vi_tri.service';

@Controller('vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) {}
}
