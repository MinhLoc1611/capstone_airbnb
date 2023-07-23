import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';
import { roomType } from './dto/phong.dto';

@Injectable()
export class PhongService {
  prisma = new PrismaClient();

  async getRoom(res: Response) {
    try {
      const data = this.prisma.phong.findMany();
      return successCode(res, data, 'Lấy danh sách phòng thuê thành công', 200);
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async createRoom(item: roomType, res: Response) {
    try {
      await this.prisma.phong.create({ data: item });
      return successCode(res, '', 'Tạo phòng thuê thành công', 200);
    } catch (err) {
      throw new HttpException(err.response, err.status);
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
      throw new HttpException(err.response, err.status);
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
      throw new HttpException(err.response, err.status);
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
      throw new HttpException(err.response, err.status);
    }
  }

  async updateRoom(id: number, item: roomType, res: Response) {
    try {
      const checkRoom = await this.prisma.phong.findFirst({
        where: { id: id },
      });
      if (checkRoom) {
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
        throw new HttpException('Không tìm thấy phòng thuê', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async deleteRoom(id: number, res: Response) {
    try {
      const checkRoom = await this.prisma.phong.findFirst({
        where: { id: id },
      });
      if (checkRoom) {
        await this.prisma.phong.delete({
          where: { id: id },
        });
        return successCode(res, '', 'Xoá Phòng thuê thành công', 200);
      } else {
        throw new HttpException('Không tìm thấy phòng thuê', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async uploadImgRoom(
    file: Express.Multer.File,
    maPhong: number,
    res: Response,
  ) {
    try {
      const checkRoom = await this.prisma.phong.findFirst({
        where: { id: maPhong },
      });
      if (checkRoom) {
        checkRoom.hinh_anh = file.filename;
        await this.prisma.phong.update({
          data: checkRoom,
          where: { id: maPhong },
        });
        return successCode(res, '', 'Upload hình phòng thuê thành công', 200);
      } else {
        throw new HttpException('Không tìm thấy phòng thuê', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
