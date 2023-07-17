import { Module } from '@nestjs/common';
import { DatPhongService } from './dat_phong.service';
import { DatPhongController } from './dat_phong.controller';

@Module({
  controllers: [DatPhongController],
  providers: [DatPhongService],
})
export class DatPhongModule {}
