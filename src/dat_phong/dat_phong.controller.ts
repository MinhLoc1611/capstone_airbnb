import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  Put,
  Delete,
  Query,
  Headers,
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
  postBookRoom(
    @Res() res: Response,
    @Body() bookedRoom: datPhongDto,
  ) {
    return this.datPhongService.postBookRoom(bookedRoom, res);
  }
  // get list room by book ID
  @Get('/:id')
  getBookedRoomId(@Param('id') id: string, @Res() res: Response) {
    return this.datPhongService.getBookedRoomId(+id, res);
  }

  //put update thong tin dat phong
  @Put('/:id')
  putBookRoomId(
    @Param('id') id: string,
    @Body() bookedRoom: datPhongDto,
    @Res() res: Response,
  ) {
    return this.datPhongService.putBookRoom(+id, bookedRoom, res);
  }

  //Delete cancel thong tin dat phong
  @Delete('/:id')
  deleteBookRoom(@Param('id') id: string, @Res() res: Response) {
    return this.datPhongService.deleteBookRoom(+id, res);
  }

  //Get book room infor by userId
  @Get('/get-booked-room-by-user-id')
  getBookRoomByUserId(
    @Query('maNguoiDung') maNguoiDung: string,
    @Res() res: Response,
  ) {
    return this.datPhongService.getBookRoomByUserId(+maNguoiDung, res);
  }
}
