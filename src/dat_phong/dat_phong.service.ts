import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';

@Injectable()
export class DatPhongService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async getBookedRoom(res: Response) {
    try {
      let data = this.prisma.datPhong.findMany();
      return successCode(res, data, '', 200);
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
   async postBookRoom (res,bookedRoom){
    
   }
}

