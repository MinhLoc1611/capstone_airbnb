import { Controller } from '@nestjs/common';
import { NguoiDungService } from './nguoi_dung.service';

@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}
}
