import { Controller, UseGuards,Get, Res } from '@nestjs/common';
import { BinhLuanService } from './binh_luan.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Dat Phong')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}
  @Get()
  getBookedRoom(@Res() res: Response) {
    return this.binhLuanService.getBinhLuan(res);
  }
}
