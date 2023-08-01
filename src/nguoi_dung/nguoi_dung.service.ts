import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NguoiDung, PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';
import * as bcrypt from 'bcrypt';
import { userAddType } from './dto/nguoi_dung.dto';

@Injectable()
export class NguoiDungService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  async getUsers(res: Response) {
    try {
      const data = await this.prisma.nguoiDung.findMany();
      return successCode(res, data, '', 200);
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async addUser(userAdd: userAddType, res: Response) {
    try {
      const { email, password } = userAdd;
      const checkEmail = await this.prisma.nguoiDung.findFirst({
        where: { email: email },
      });
      if (checkEmail) {
        throw new HttpException('email đã tồn tại!', 400);
      } else {
        userAdd.password = bcrypt.hashSync(password, 10);
        const newUser = {
          ...userAdd,
          avatar: '',
        };
        await this.prisma.nguoiDung.create({ data: newUser });
        return successCode(res, '', 'Đăng ký thành công', 200);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async deleteUser(userId: number, res: Response) {
    try {
      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: { id: userId },
      });
      if (checkUser) {
        await this.prisma.nguoiDung.delete({ where: { id: userId } });
        return successCode(res, '', 'Xoá người dùng thành công', 200);
      } else {
        throw new HttpException('Không tìm thấy người dùng', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async getUserPage(
    pageNumber: number,
    pageSize: number,
    keyword: string,
    res: Response,
  ) {
    try {
      const index = (pageNumber - 1) * pageSize;
      const data = await this.prisma.nguoiDung.findMany({
        take: pageSize,
        skip: index,
        where: { name: { contains: `%${keyword}%` } },
      });
      return successCode(
        res,
        data,
        'Lấy danh sách người dùng phân trang thành công',
        200,
      );
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async getUserById(id: number, res: Response) {
    try {
      const data = await this.prisma.nguoiDung.findFirst({ where: { id: id } });
      if (data) {
        return successCode(
          res,
          data,
          'Lấy thông tin người dùng thành công',
          200,
        );
      } else {
        throw new HttpException('Không tìm thấy người dùng', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async updateUser(userUpdate: userAddType, res: Response, id: number) {
    try {
      const { name, email, phone, birthday, gender, role } = userUpdate;
      const getUser = await this.prisma.nguoiDung.findFirst({
        where: { id: id },
      });
      if (getUser) {
        const userUpdate = {
          ...getUser,
          name,
          email,
          phone,
          birthday,
          gender,
          role,
        };
        await this.prisma.nguoiDung.update({
          where: { id: id },
          data: userUpdate,
        });
        return successCode(res, '', 'update thành công', 200);
      } else {
        throw new HttpException('Không tìm thấy thông tin người dùng', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async getUserByName(name: string, res: Response) {
    try {
      const data = await this.prisma.nguoiDung.findMany({
        where: { name: { contains: `%${name}%` } },
      });
      if (data.length > 0) {
        return successCode(res, data, 'Lấy thông tin thành công', 200);
      } else {
        throw new HttpException('Không tìm thấy tên người dùng', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }

  async uploadAvatar(file: Express.Multer.File, token: string, res: Response) {
    try {
      const user: NguoiDung | any = this.jwtService.decode(
        token.slice(7, token.length),
      );

      const getUserById = await this.prisma.nguoiDung.findFirst({
        where: { id: user.id },
      });

      getUserById.avatar = file.filename;

      await this.prisma.nguoiDung.update({
        data: getUserById,
        where: { id: user.id },
      });
      return successCode(res, '', 'Upload avatar thành công', 200);
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
