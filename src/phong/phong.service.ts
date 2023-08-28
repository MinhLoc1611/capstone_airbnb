import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { NguoiDung, PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';
import { roomType } from './dto/phong.dto';
import { JwtService } from '@nestjs/jwt';
import { userTokenDecode } from 'src/config/tokenType';

@Injectable()
export class PhongService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  async getRoom(res: Response) {
    try {
      const data = await this.prisma.phong.findMany();
      return successCode(res, data, 'Lấy danh sách phòng thuê thành công', 200);
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async createRoom(token: string, item: roomType, res: Response) {
    try {
      const user: NguoiDung | any = this.jwtService.decode(
        token,
      ) as userTokenDecode;
      if (user.role === 'ADMIN') {
        const newRoom = { ...item, ma_nguoi_dung: user.id };
        await this.prisma.phong.create({ data: newRoom });
        return successCode(res, '', 'Tạo phòng thuê thành công', 200);
      } else {
        throw new HttpException('User không phải quyền ADMIN', 400);
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async getRoomByViTri(maViTri: number, res: Response) {
    try {
      const data = await this.prisma.phong.findMany({
        where: { ma_vi_tri: maViTri },
      });
      if (data.length > 0) {
        return successCode(
          res,
          data,
          'Lấy danh sách phòng thuê theo vị trí thành công',
          200,
        );
      } else {
        throw new HttpException('Không có phòng thuê ở vị trí tìm kiếm', 400);
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async getRoomPage(
    pageNumber: number,
    pageSize: number,
    keyword: string,
    res: Response,
  ) {
    try {
      const index = (pageNumber - 1) * pageSize;
      const data = await this.prisma.phong.findMany({
        take: pageSize,
        skip: index,
        where: { ten_phong: { contains: `%${keyword}%` } },
      });
      return successCode(
        res,
        data,
        'Lấy danh sách phòng phân trang thành công',
        200,
      );
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async getRoomById(id: number, res: Response) {
    try {
      const data = await this.prisma.phong.findFirst({ where: { id: id } });
      if (data) {
        return successCode(
          res,
          data,
          'Lấy thông tin phòng thuê thành công',
          200,
        );
      } else {
        throw new HttpException('Không tìm thấy thông tin phòng', 400);
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async updateRoom(token: string, id: number, item: roomType, res: Response) {
    try {
      const checkRoom = await this.prisma.phong.findFirst({
        where: { id: id },
      });
      if (checkRoom) {
        const user: NguoiDung | any = this.jwtService.decode(
          token,
        ) as userTokenDecode;
        if (checkRoom.ma_nguoi_dung === user.id) {
          const updateRoom = {
            ...item,
            id: id,
            hinh_anh: checkRoom.hinh_anh,
          };
          await this.prisma.phong.update({
            where: { id: id },
            data: updateRoom,
          });
          return successCode(res, '', 'Cập nhật phòng thuê thành công', 200);
        } else {
          throw new HttpException(
            'Người dùng không có quyền hạn cập nhật phòng thuê này',
            400,
          );
        }
      } else {
        throw new HttpException('Không tìm thấy phòng thuê', 400);
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async deleteRoom(token: string, id: number, res: Response) {
    try {
      const checkRoom = await this.prisma.phong.findFirst({
        where: { id: id },
      });
      if (checkRoom) {
        const user: NguoiDung | any = this.jwtService.decode(
          token,
        ) as userTokenDecode;
        if (checkRoom.ma_nguoi_dung === user.id) {
          await this.prisma.phong.delete({
            where: { id: id },
          });
          return successCode(res, '', 'Xoá Phòng thuê thành công', 200);
        } else {
          throw new HttpException(
            'Người dùng không có quyền hạn xoá phòng thuê này',
            400,
          );
        }
      } else {
        throw new HttpException('Không tìm thấy phòng thuê', 400);
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async uploadImgRoom(
    token: string,
    maPhong: number,
    file: Express.Multer.File,
    res: Response,
  ) {
    try {
      const checkRoom = await this.prisma.phong.findFirst({
        where: { id: maPhong },
      });
      if (checkRoom) {
        const user: NguoiDung | any = this.jwtService.decode(
          token,
        ) as userTokenDecode;
        if (checkRoom.ma_nguoi_dung === user.id) {
          checkRoom.hinh_anh = file.filename;
          await this.prisma.phong.update({
            data: checkRoom,
            where: { id: maPhong },
          });
          return successCode(res, '', 'Upload hình phòng thuê thành công', 200);
        } else {
          throw new HttpException(
            'Người dùng không có quyền hạn upload hình phòng thuê này',
            400,
          );
        }
      } else {
        throw new HttpException('Không tìm thấy phòng thuê', 400);
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
}
