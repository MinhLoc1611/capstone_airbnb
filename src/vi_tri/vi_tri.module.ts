import { Module } from '@nestjs/common';
import { ViTriService } from './vi_tri.service';
import { ViTriController } from './vi_tri.controller';

@Module({
  controllers: [ViTriController],
  providers: [ViTriService],
})
export class ViTriModule {}
