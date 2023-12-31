import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NguoiDung, PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';
import * as bcrypt from 'bcrypt';
import { userAddType } from './dto/nguoi_dung.dto';
import { userTokenDecode } from 'src/config/tokenType';

@Injectable()
export class NguoiDungService {
  constructor(private jwtService: JwtService) {}
  prisma = new PrismaClient();

  async getUsers(res: Response) {
    try {
      const data = await this.prisma.nguoiDung.findMany();
      return successCode(res, data, '', 200);
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async addUser(userAdd: userAddType, token: string, res: Response) {
    try {
      const user: NguoiDung | any = this.jwtService.decode(
        token,
      ) as userTokenDecode;
      const { email, password } = userAdd;
      const checkEmail = await this.prisma.nguoiDung.findFirst({
        where: { email: email },
      });
      if (user.role === 'ADMIN') {
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

  async deleteUser(userId: number, token: string, res: Response) {
    try {
      const user: NguoiDung | any = this.jwtService.decode(
        token,
      ) as userTokenDecode;

      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: { id: userId },
      });
      if (user.role === 'ADMIN') {
        if (checkUser) {
          await this.prisma.nguoiDung.delete({ where: { id: userId } });
          return successCode(res, '', 'Xoá người dùng thành công', 200);
        } else {
          throw new HttpException('Không tìm thấy người dùng', 400);
        }
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

  async getUserPage(
    pageNumber: number,
    pageSize: number,
    keyword: string,
    res: Response,
  ) {
    try {
      const index = (pageNumber - 1) * pageSize;
      if (!keyword) {
        const data = await this.prisma.nguoiDung.findMany({
          take: pageSize,
          skip: index,
        });
        const total = await this.prisma.nguoiDung.count();
        const list = { data: data, pageNumber, pageSize, total };
        return successCode(
          res,
          list,
          'Lấy danh sách người dùng phân trang thành công',
          200,
        );
      } else {
        const data = await this.prisma.nguoiDung.findMany({
          take: pageSize,
          skip: index,
          where: { name: { contains: `%${keyword}%` } },
        });
        const total = await this.prisma.nguoiDung.count({
          where: { name: { contains: `%${keyword}%` } },
        });
        const list = { data: data, pageNumber, pageSize, total };
        return successCode(
          res,
          list,
          'Lấy danh sách người dùng phân trang thành công',
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
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async updateUser(
    userUpdate: userAddType,
    token: string,
    res: Response,
    id: number,
  ) {
    try {
      const user: NguoiDung | any = this.jwtService.decode(
        token,
      ) as userTokenDecode;
      const { name, email, phone, birthday, gender, role } = userUpdate;
      const getUser = await this.prisma.nguoiDung.findFirst({
        where: { id: id },
      });
      if (user.role === 'ADMIN') {
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
      if (err.status === 400 || err.status === 403) {
        throw err;
      } else {
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async uploadAvatar(file: Express.Multer.File, token: string, res: Response) {
    try {
      const user: NguoiDung | any = this.jwtService.decode(
        token,
      ) as userTokenDecode;

      const getUserById = await this.prisma.nguoiDung.findFirst({
        where: { id: user.id },
      });

      if (getUserById) {
        getUserById.avatar = file.filename;

        await this.prisma.nguoiDung.update({
          data: getUserById,
          where: { id: user.id },
        });
        return successCode(res, '', 'Upload avatar thành công', 200);
      } else {
        throw new HttpException('Không tìm thấy thông tin người dùng', 400);
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
