import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PhongService } from './phong.service';
import { roomType, uploadFileType } from './dto/phong.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Phong')
@Controller('room')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Get()
  getRoom(@Res() res: Response) {
    return this.phongService.getRoom(res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createRoom(@Body() item: roomType, @Res() res: Response) {
    return this.phongService.createRoom(item, res);
  }

  @Get('/lay-phong-theo-vi-tri')
  getRoomByViTri(@Query('maViTri') maViTri: string, @Res() res: Response) {
    return this.phongService.getRoomByViTri(+maViTri, res);
  }

  @Get('/phan-trang-tim-kiem')
  getRoomPage(
    @Query('pageNumber') pageNumber: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ) {
    return this.phongService.getRoomPage(+pageNumber, +pageSize, keyword, res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getRoomById(@Param('id') id: string, @Res() res: Response) {
    return this.phongService.getRoomById(+id, res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  updateRoom(
    @Param('id') id: string,
    @Body() item: roomType,
    @Res() res: Response,
  ) {
    return this.phongService.updateRoom(+id, item, res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  deleteRoom(@Param('id') id: string, @Res() res: Response) {
    return this.phongService.deleteRoom(+id, res);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: uploadFileType })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + file.originalname),
      }),
    }),
  )
  @Post('/upload-hinh-phong')
  uploadImgRoom(
    @UploadedFile() file: Express.Multer.File,
    @Query('maPhong') maPhong: string,
    @Res() res: Response,
  ) {
    return this.phongService.uploadImgRoom(file, +maPhong, res);
  }
}
