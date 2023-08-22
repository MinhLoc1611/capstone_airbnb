import { JwtService } from '@nestjs/jwt';
import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';
import { binhLuanDto } from './dto/binh_luan.dto';
import { userTokenDecode } from 'src/config/tokenType';

@Injectable()
export class BinhLuanService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async getBinhLuan(res: Response) {
    try {
      const data = await this.prisma.datPhong.findMany();
      return successCode(res, data, '', 200);
    } catch (err) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
  async postBinhLuan(comment: binhLuanDto, res: Response) {
    try {
      await this.prisma.binhLuan.create({
        data: comment,
      });
      return successCode(res, comment, 'Binh luan thanh cong', 200);
    } catch (err) {
      console.log(err);
      
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
  async putBinhLuan(
    comment: binhLuanDto,
    id: number,
    token: string,
    res: Response,
  ) {
    try {
      const checkBinhLuan = await this.prisma.binhLuan.findFirst({
        where: { id: id },
      });
      if (checkBinhLuan) {
        const userId = this.jwtService.decode(token) as userTokenDecode;
        const checkOwner = await this.prisma.binhLuan.findFirst({
          where: { ma_nguoi_dung: userId.id },
        });
        if (checkOwner) {
          const data = await this.prisma.binhLuan.update({
            where: { id: id },
            data: comment,
          });
          return successCode(res, data, 'Update bình luận thành công', 200);
        } else {
          throw new HttpException('Không được phép bình luận', 403);
        }
      } else {
        throw new HttpException('Không tìm thấy mã bình luận', 404);
      }
    } catch (err) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
  async deleteBinhLuan(id: number, token: string, res: Response) {
    try {
      const checkBookedRoom = await this.prisma.binhLuan.findFirst({
        where: { id: id },
      });
      if (checkBookedRoom) {
        const userId = this.jwtService.decode(token) as userTokenDecode;
        const checkOwner = await this.prisma.binhLuan.findFirst({
          where: { ma_nguoi_dung: userId.id },
        });
        if (checkOwner) {
          await this.prisma.binhLuan.delete({ where: { id: id } });
          return successCode(res, '', 'Xoá bình luận thành công', 200);
        } else {
          throw new HttpException('Không được phép xóa bình luận', 403);
        }
      } else {
        throw new HttpException('Không tìm thấy mã comment', 404);
      }
    } catch (err) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
  async getBinhLuanById(id: number, res: Response) {
    try {
      const data = await this.prisma.binhLuan.findMany({
        where: { ma_phong: id },
      });
      return successCode(res, data, 'Lấy dữ liệu thành công', 200);
    } catch (err) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
