import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ViTriService } from './vi_tri.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { uploadFileType } from 'src/phong/dto/phong.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { viTriDto } from './dto/vi_tri.dto';

@ApiTags('Vi tri')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) {}
  @Get()
  getViTri(@Res() res: Response) {
    return this.viTriService.getViTri(res);
  }
  @Get(':id')
  getViTriById(@Param('id') id: string, @Res() res: Response) {
    return this.viTriService.getViTriId(+id, res);
  }
  @Post()
  postViTri(
    @Body() viTri: viTriDto,
    @Headers('token') token: string,
    @Res() res: Response,
  ) {
    return this.viTriService.postViTri(viTri, token, res);
  }
  @Put(':id')
  putViTri(
    @Body() viTri: viTriDto,
    @Headers('token') token: string,
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    return this.viTriService.putViTri(viTri, +id, token, res);
  }
  @Delete(':id')
  postDeleteViTri(
    @Headers('token') token: string,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    return this.viTriService.deleteViTri(+id, token, res);
  }

  @ApiQuery({
    name: 'keyword',
    required: false,
  })
  @Get('phan-trang-tim-kiem')
  getViTriPhanTrang(
    @Query('pageIndex') pageIndex: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ) {
    return this.viTriService.getViTriPhanTrang(
      +pageIndex,
      +pageSize,
      keyword,
      res,
    );
  }

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
  @Post('/upload-hinh-vitri')
  uploadImgRoom(
    @Headers('token') token: string,
    @UploadedFile() file: Express.Multer.File,
    @Query('maViTri') maViTri: string,
    @Res() res: Response,
  ) {
    return this.viTriService.uploadImgViTri(file, +maViTri, token, res);
  }
}
