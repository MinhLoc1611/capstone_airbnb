import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { DatPhongService } from './dat_phong.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { datPhongDto } from './dto/dat_phong.dto';
@ApiTags('Dat Phong')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('dat-phong')
export class DatPhongController {
  constructor(private readonly datPhongService: DatPhongService) {}
  // get list booked room
  @Get()
  getBookedRoom(@Res() res: Response) {
    return this.datPhongService.getBookedRoom(res);
  }
  //Post book room
  @Post()
  postBookRoom(@Res() res: Response, @Body() bookedRoom: datPhongDto) {
    return this.datPhongService.postBookRoom(bookedRoom, res);
  }
  // get list room by user ID
  @Get('/:id')
  getBookedRoomId(@Param('id') id: string, @Res() res: Response) {
    return this.datPhongService.getBookedRoomId(+id, res);
  }
}
