import {
  Controller,
  UseGuards,
  Get,
  Res,
  Post,
  Body,
  Put,
  Param,
  Headers,
  Delete,
} from '@nestjs/common';
import { BinhLuanService } from './binh_luan.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { binhLuanDto } from './dto/binh_luan.dto';

@ApiTags('Dat Phong')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}
  @Get()
  getBinhLuan(@Res() res: Response) {
    return this.binhLuanService.getBinhLuan(res);
  }
  @Post()
  postBinhLuan(@Body() comment: binhLuanDto, @Res() res: Response) {
    return this.binhLuanService.postBinhLuan(comment, res);
  }
  @Put()
  putBinhLuan(
    @Body() comment: binhLuanDto,
    @Headers() token: string,
    @Param() id: string,
    @Res() res: Response,
  ) {
    return this.binhLuanService.putBinhLuan(comment, +id, token, res);
  }
  @Delete(':id')
  deletBinhLuan(
    @Headers() token: string,
    @Param() id: string,
    @Res() res: Response,
  ) {
    return this.binhLuanService.deleteBinhLuan(+id, token, res);
  }
  @Get('lay-binh-luan-theo-ma-phong/:maPhong')
  getBinhLuanByRoomId(@Param() maPhong: string, @Res() res: Response) {
    return this.binhLuanService.getBinhLuanById(+maPhong, res);
  }
}
