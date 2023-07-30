import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';
import { viTriDto } from './dto/vi_tri.dto';
import { uploadFileType } from 'src/phong/dto/phong.dto';

@Injectable()
export class ViTriService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async getViTri(res: Response) {
    try {
      let data = await this.prisma.datPhong.findMany();
      return successCode(res, data, '', 200);
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
  async postViTri(comment: viTriDto, token: string, res: Response) {
    try {
      await this.prisma.binhLuan.create({
        data: comment,
      });
      return successCode(res, comment, 'Binh luan thanh cong', 200);
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
  async putViTri(vitri: viTriDto, id: number, token: string, res: Response) {
    try {
      let checkBinhLuan = await this.prisma.binhLuan.findFirst({
        where: { id: id },
      });
      if (checkBinhLuan) {
        const userId: any = this.jwtService.decode(token);
        const checkOwner = await this.prisma.binhLuan.findFirst({
          where: { ma_nguoi_dung: userId },
        });
        if (checkOwner) {
          const data = await this.prisma.binhLuan.update({
            where: { id: id },
            data: vitri,
          });
          return successCode(res, data, 'Update binh luan thanh cong', 200);
        } else {
          throw new HttpException('Không duoc phep binh luan', 403);
        }
      } else {
        throw new HttpException('Không tìm thấy mã binh luan', 404);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
  async deleteViTri(id: number, token: string, res: Response) {
    try {
      const checkBookedRoom = await this.prisma.binhLuan.findFirst({
        where: { id: id },
      });
      if (checkBookedRoom) {
        const userId: any = this.jwtService.decode(token);
        const checkOwner = await this.prisma.binhLuan.findFirst({
          where: { ma_nguoi_dung: userId },
        });
        if (checkOwner) {
          await this.prisma.binhLuan.delete({ where: { id: id } });
          return successCode(res, '', 'Xoá binh luan thành công', 200);
        } else {
          throw new HttpException('Không duoc phep xoa binh luan', 403);
        }
      } else {
        throw new HttpException('Không tìm thấy mã comment', 404);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
  async getViTriId(id: number, res: Response) {
    try {
      const data = await this.prisma.binhLuan.findMany({
        where: { ma_phong: id },
      });
      return successCode(res, data, 'Lay du lieu thanh cong', 200);
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
  async getViTriPhanTrang(
    pageIndex: number,
    pageSize: number,
    keyword: string,
    res: Response,
  ) {}
  async uploadImgViTri(
    file: Express.Multer.File,
    maViTri: number,
    res: Response,
  ) {}
}
