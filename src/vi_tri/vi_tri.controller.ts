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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { uploadFileType } from 'src/phong/dto/phong.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('Dat Phong')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) {}
  @Get()
  getViTri(@Res() res: Response) {}
  @Get()
  getViTriById(@Param() id: string, @Res() res: Response) {}
  @Post()
  postViTri(
    @Body() viTri: any,
    @Headers() token: string,
    @Res() res: Response,
  ) {
    return this.viTriService.postViTri(viTri, token, res);
  }
  @Put()
  putViTri(
    @Body() viTri: any,
    @Headers() token: string,
    @Res() res: Response,
    @Param() id: string,
  ) {
    return this.viTriService.putViTri(viTri, +id, token, res);
  }
  @Delete()
  postDeleteViTri(
    @Headers() token: string,
    @Param() id: string,
    @Res() res: Response,
  ) {
    return this.viTriService.deleteViTri(+id, token, res);
  }
  @Get('phan-trang-tim-kiem')
  getViTriPhanTrang(
    @Query() pageIndex: string,
    @Query() pageSize: string,
    @Query() keyword: string,
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
    @UploadedFile() file: Express.Multer.File,
    @Query('maPhong') maViTri: string,
    @Res() res: Response,
  ) {
    return this.viTriService.uploadImgViTri(file, +maViTri, res);
  }
}
