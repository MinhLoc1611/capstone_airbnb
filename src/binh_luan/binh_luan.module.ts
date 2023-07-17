import { Module } from '@nestjs/common';
import { BinhLuanService } from './binh_luan.service';
import { BinhLuanController } from './binh_luan.controller';

@Module({
  controllers: [BinhLuanController],
  providers: [BinhLuanService],
})
export class BinhLuanModule {}
