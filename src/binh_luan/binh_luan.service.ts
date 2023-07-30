import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { successCode } from 'src/config/response';

@Injectable()
export class BinhLuanService {
  prisma = new PrismaClient();
  async getBinhLuan(res: Response) {
    try {
      let data = this.prisma.datPhong.findMany();
      return successCode(res, data, '', 200);
    } catch (err) {
      throw new HttpException(err.response, err.status);
    }
  }
}
