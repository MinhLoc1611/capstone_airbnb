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
import { NguoiDungService } from './nguoi_dung.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto, userAddType } from './dto/nguoi_dung.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('NguoiDung')
@Controller('users')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @Get()
  getUsers(@Res() res: Response) {
    return this.nguoiDungService.getUsers(res);
  }

  @Post()
  addUser(
    @Body() userAdd: userAddType,
    @Headers('token') token: string,
    @Res() res: Response,
  ) {
    return this.nguoiDungService.addUser(userAdd, token, res);
  }

  @Delete('/:userId')
  deleteUser(
    @Param('userId') userId: string,
    @Headers('token') token: string,
    @Res() res: Response,
  ) {
    return this.nguoiDungService.deleteUser(+userId, token, res);
  }

  @Get('/phan-trang-tim-kiem')
  getUserPage(
    @Query('pageNumber') pageNumber: string,
    @Query('pageSize') pageSize: string,
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ) {
    return this.nguoiDungService.getUserPage(
      +pageNumber,
      +pageSize,
      keyword,
      res,
    );
  }

  @Get('/:id')
  getUserById(@Param('id') id: string, @Res() res: Response) {
    return this.nguoiDungService.getUserById(+id, res);
  }

  @Put('/:userId')
  updateUser(
    @Body() userUpdate: userAddType,
    @Headers('token') token: string,
    @Res() res: Response,
    @Param('userId') id: string,
  ) {
    return this.nguoiDungService.updateUser(userUpdate, token, res, +id);
  }

  @Get('/search/:TenNguoiDung')
  getUserByName(@Param('TenNguoiDung') name: string, @Res() res: Response) {
    return this.nguoiDungService.getUserByName(name, res);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, new Date().getTime() + file.originalname),
      }),
    }),
  )
  @Post('/upload-avatar')
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Headers('token') token: string,
    @Res() res: Response,
  ) {
    return this.nguoiDungService.uploadAvatar(file, token, res);
  }
}
