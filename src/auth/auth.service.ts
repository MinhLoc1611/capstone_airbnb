import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NguoiDung, PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';
import * as bcrypt from 'bcrypt';
import { userLoginType, userRegisterType } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  prisma = new PrismaClient();

  async login(userLogin: userLoginType, res: Response) {
    try {
      const { email, password } = userLogin;
      const checkUser = await this.prisma.nguoiDung.findFirst({
        where: { email: email },
      });
      if (checkUser) {
        if (
          bcrypt.compareSync(password, checkUser.password) ||
          password === checkUser.password
        ) {
          const loginUser = { ...checkUser, password: '' };
          const token = await this.jwtService.signAsync(loginUser, {
            secret: this.configService.get('KEY'),
            expiresIn: '1d',
          });
          const data = { user: loginUser, token: token };
          return successCode(res, data, 'Đăng nhập thành công', 200);
        } else {
          throw new HttpException('mật khẩu không đúng!', 400);
        }
      } else {
        throw new HttpException('email không đúng!', 400);
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err
      }else{
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async register(userRegister: userRegisterType, res: Response) {
    try {
      const { email, password } = userRegister;
      const checkEmail = await this.prisma.nguoiDung.findFirst({
        where: { email: email },
      });
      if (checkEmail) {
        throw new HttpException('email đã tồn tại!', 400);
      } else {
        userRegister.password = bcrypt.hashSync(password, 10);
        const newUser = {
          ...userRegister,
          role: 'USER',
          avatar: '',
        };
        await this.prisma.nguoiDung.create({ data: newUser });
        return successCode(res, '', 'Đăng ký thành công', 200);
      }
    } catch (err) {
      if (err.status === 400 || err.status === 403) {
        throw err
      }else{
        throw new InternalServerErrorException('Internal Server Error');
      }
    }
  }

  async update(token: string, body: userRegisterType, res: Response) {
    try {
      const user: NguoiDung | any = this.jwtService.decode(
        token.slice(7, token.length),
      );
      const { name, email, phone, birthday, gender } = body;
      const getUser = await this.prisma.nguoiDung.findFirst({
        where: { id: user.id },
      });
      if (getUser) {
        const userUpdate = {
          ...getUser,
          name,
          email,
          phone,
          birthday,
          gender,
        };
        await this.prisma.nguoiDung.update({
          where: { id: user.id },
          data: userUpdate,
        });
        return successCode(res, '', 'update thành công', 200);
      } else {
        throw new HttpException('Không tìm thấy thông tin người dùng', 400);
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
