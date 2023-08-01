import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';
import { datPhongDto } from './dto/dat_phong.dto';

@Injectable()
export class DatPhongService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async getBookedRoom(res: Response) {
    try {
      const data = this.prisma.datPhong.findMany();
      return successCode(
        res,
        data,
        'Lấy thông tin phòng đã đặt thành công',
        200,
      );
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
  async getBookedRoomId(id: number, res: Response) {
    try {
      const data = await this.prisma.phong.findFirst({ where: { id: id } });
      if (data) {
        return successCode(
          res,
          data,
          'Lấy thông tin phòng đã đặt thành công',
          200,
        );
      } else {
        throw new HttpException('Không tìm thấy thông tin phòng', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
  async postBookRoom(bookedRoom: datPhongDto, res: Response) {
    try {
      await this.prisma.datPhong.create({
        data: bookedRoom,
      });
      return successCode(res, bookedRoom, 'Đặt phòng thành công', 200);
    } catch (err) {
      console.log(err);
      throw new HttpException(err.response, err.status);
    }
  }
  async putBookRoom(id: number, bookedRoom: datPhongDto, res: Response) {
    try {
      const { ma_nguoi_dat, ma_phong, ngay_den, ngay_di, so_luong_khach } =
        bookedRoom;
      const getBookedRoom = await this.prisma.nguoiDung.findFirst({
        where: { id: id },
      });
      if (getBookedRoom) {
        const bookedRoomUpdate = {
          ma_nguoi_dat,
          ma_phong,
          ngay_den,
          ngay_di,
          so_luong_khach,
        };
        await this.prisma.datPhong.update({
          where: { id: id },
          data: bookedRoomUpdate,
        });
        return successCode(res, '', 'update thành công', 200);
      } else {
        throw new HttpException('Không tìm thấy thông tin phong da dat', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async deleteBookRoom(id: number, res: Response) {
    try {
      const checkBookedRoom = await this.prisma.datPhong.findFirst({
        where: { id: id },
      });
      if (checkBookedRoom) {
        await this.prisma.datPhong.delete({ where: { id: id } });
        return successCode(res, '', 'Xoá đặt phòng thành công', 200);
      } else {
        throw new HttpException('Không tìm thấy mã đặt phòng', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
  async getBookRoomByUserId(maNguoiDung: number, res: Response) {
    try {
      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: { id: maNguoiDung },
      });
      if (checkUser) {
        await this.prisma.datPhong.findMany({
          where: { ma_nguoi_dat: maNguoiDung },
        });
        return successCode(res, '', 'Lấy danh sách thành công', 200);
      } else {
        throw new HttpException('Không tìm thấy người dùng', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
