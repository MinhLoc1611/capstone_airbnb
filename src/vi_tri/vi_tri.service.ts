import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';
import { viTriDto } from './dto/vi_tri.dto';
import { userTokenDecode } from 'src/config/tokenType';

@Injectable()
export class ViTriService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();
  async getViTri(res: Response) {
    try {
      const data = await this.prisma.viTri.findMany();
      return successCode(res, data, 'Lấy dữ liệu đặt phòng thành công', 200);
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  async postViTri(viTri: viTriDto, token: string, res: Response) {
    try {
      const checkUser = this.jwtService.decode(token) as userTokenDecode;
      if (checkUser.role === 'ADMIN') {
        const data = {
          ten_vi_tri: viTri.ten_vi_tri,
          tinh_thanh: viTri.tinh_thanh,
          quoc_gia: viTri.quoc_gia,
          hinh_anh: viTri.hinh_anh,
        };
        await this.prisma.viTri.create({
          data: viTri,
        });

        return successCode(res, data, 'Thêm vị trí thành công', 201);
      } else {
        throw new HttpException('Không được phép thêm vị trí', 403);
      }
    } catch (err) {
      console.log(err);

      throw new InternalServerErrorException('Internal Server Error');
    }
  }
  async putViTri(vitri: viTriDto, id: number, token: string, res: Response) {
    try {
      const checkViTri = await this.prisma.viTri.findFirst({
        where: { id: id },
      });
      if (checkViTri) {
        const user = this.jwtService.decode(token) as userTokenDecode;
        if (user.role === 'ADMIN') {
          const data = await this.prisma.viTri.update({
            where: { id: id },
            data: vitri,
          });
          return successCode(res, data, 'Update vị trí thành công', 200);
        } else {
          throw new HttpException('Không được phép thêm vị trí', 403);
        }
      } else {
        throw new HttpException('Không tìm thấy mã vị trí', 404);
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  async deleteViTri(id: number, token: string, res: Response) {
    try {
      const checkBookedRoom = await this.prisma.viTri.findFirst({
        where: { id: id },
      });
      if (checkBookedRoom) {
        const user = this.jwtService.decode(token) as userTokenDecode;
        console.log(user);

        if (user.role === 'ADMIN') {
          await this.prisma.viTri.delete({ where: { id: id } });
          return successCode(res, '', 'Xoá vị trí thành công', 200);
        } else {
          throw new HttpException('Không được phép xóa vị trí', 403);
        }
      } else {
        throw new HttpException('Không tìm thấy mã vị trí', 404);
      }
    } catch (err) {
      console.log(err);

      throw new InternalServerErrorException('Internal Server Error');
    }
  }
  async getViTriId(id: number, res: Response) {
    try {
      const data = await this.prisma.viTri.findFirst({
        where: { id: id },
      });
      if (data) {
        return successCode(res, data, 'Lấy dữ liệu thành công', 200);
      } else {
        throw new HttpException('Không tìm thấy thông tin vị trí', 400);
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  async getViTriPhanTrang(
    pageIndex: number,
    pageSize: number,
    keyword: string,
    res: Response,
  ) {
    try {
      const index = (pageIndex - 1) * pageSize;
      if (!keyword) {
        const data = await this.prisma.viTri.findMany({
          take: pageSize,
          skip: index,
        });
        const total = await this.prisma.viTri.count();
        const list = { data: data, pageIndex, pageSize, total };
        return successCode(
          res,
          list,
          'Lấy danh sách vị trí phân trang thành công',
          200,
        );
      } else {
        const data = await this.prisma.viTri.findMany({
          take: pageSize,
          skip: index,
          where: { ten_vi_tri: { contains: `%${keyword}%` } },
        });
        const total = await this.prisma.viTri.count({
          where: { ten_vi_tri: { contains: `%${keyword}%` } },
        });
        const list = { data: data, pageIndex, pageSize, total };
        return successCode(
          res,
          list,
          'Lấy danh sách vị trí phân trang thành công',
          200,
        );
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
  async uploadImgViTri(
    file: Express.Multer.File,
    maViTri: number,
    token: string,
    res: Response,
  ) {
    try {
      const user = this.jwtService.decode(token) as userTokenDecode;

      if (user.role === 'ADMIN') {
        const viTri = await this.prisma.viTri.findFirst({
          where: { id: maViTri },
        });
        viTri.hinh_anh = file.filename;
        await this.prisma.viTri.update({
          where: { id: maViTri },
          data: viTri,
        });
      } else {
      }

      return successCode(res, '', 'Upload hình vị trí thành công', 200);
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }
}
