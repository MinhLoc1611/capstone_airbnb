import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
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
          const loginUser = { ...checkUser, matkhau: '' };
          const token = await this.jwtService.signAsync(loginUser, {
            secret: this.configService.get('KEY'),
            expiresIn: '1d',
          });
          return successCode(res, token, 'Đăng nhập thành công');
        } else {
          throw new HttpException('mật khẩu không đúng!', 400);
        }
      } else {
        throw new HttpException('email không đúng!', 400);
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
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
        await this.prisma.nguoiDung.create({ data: userRegister });
        return successCode(res, '', 'Đăng ký thành công');
      }
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
