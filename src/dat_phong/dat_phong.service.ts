import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NguoiDung, PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';
import { datPhongDto } from './dto/dat_phong.dto';

@Injectable()
export class DatPhongService {
  constructor(private jwtService: JwtService) { }
  prisma = new PrismaClient();
  async getBookedRoom(res: Response) {
    try {
      const data = await this.prisma.datPhong.findMany();
      return successCode(
        res,
        data,
        'Lấy thông tin phòng đã đặt thành công',
        200,
      );
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err
      }else{
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  async getBookedRoomId(id: number, res: Response) {
    try {
      const data = await this.prisma.datPhong.findFirst({ where: { ma_phong: id } });
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
      if (err.status === 400 || err.status === 403) {
        throw err
      }else{
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  async postBookRoom(bookedRoom: datPhongDto, res: Response) {
    try {
      await this.prisma.datPhong.create({
        data: bookedRoom,
      });
      return successCode(res, bookedRoom, 'Đặt phòng thành công', 200);
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err
      }else{
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  async putBookRoom(id: number, bookedRoom: datPhongDto, res: Response, token: string) {
    try {
      const { ma_nguoi_dat, ma_phong, ngay_den, ngay_di, so_luong_khach } =
        bookedRoom;
      const user: NguoiDung | any = await this.jwtService.decode(token.slice(7, token.length))
      const getBookedRoom = await this.prisma.datPhong.findFirst({
        where: { id: id },
      });
      if (user.id === getBookedRoom.ma_nguoi_dat) {
        if (getBookedRoom) {
          const bookedRoomUpdate = {
            ma_nguoi_dat,
            ma_phong,
            ngay_den,
            ngay_di,
            so_luong_khach,
          };
          const data = await this.prisma.datPhong.update({
            where: { id: id },
            data: bookedRoomUpdate,
          });
          return successCode(res, data, 'update thành công', 200);
        } else {
          throw new HttpException('Không tìm thấy thông tin phong da dat', 400);
        }
      } else {
        throw new HttpException('Không được quyền chỉnh sửa', 403);
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err
      }else{
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  async deleteBookRoom(id: number, res: Response, token: string) {
    try {
      const checkBookedRoom = await this.prisma.datPhong.findFirst({
        where: { id: id },
      });
      const user: NguoiDung | any = await this.jwtService.decode(token.slice(7, token.length))
      if (user.id === checkBookedRoom.ma_nguoi_dat) {
        if (checkBookedRoom) {
          await this.prisma.datPhong.delete({ where: { id: id } });
          return successCode(res, '', 'Xoá đặt phòng thành công', 200);
        } else {
          throw new HttpException('Không tìm thấy mã đặt phòng', 400);
        }
      } else {
        throw new HttpException('Không được quyền xóa', 403);
      }

    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err
      }else{
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  async getBookRoomByUserId(maNguoiDung: number, res: Response) {
    try {
      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: { id: maNguoiDung },
      });
      if (checkUser) {
        const data = await this.prisma.datPhong.findMany({
          where: { ma_nguoi_dat: maNguoiDung },
        });
        return successCode(res, data, 'Lấy danh sách thành công', 200);
      } else {
        throw new HttpException('Không tìm thấy người dùng', 400);
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err
      }else{
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
}
