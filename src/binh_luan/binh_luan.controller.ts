import { Controller } from '@nestjs/common';
import { BinhLuanService } from './binh_luan.service';

@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}
}
