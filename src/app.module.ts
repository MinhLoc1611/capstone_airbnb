import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { BinhLuanModule } from './binh_luan/binh_luan.module';
import { DatPhongModule } from './dat_phong/dat_phong.module';
import { NguoiDungModule } from './nguoi_dung/nguoi_dung.module';
import { PhongModule } from './phong/phong.module';
import { ViTriModule } from './vi_tri/vi_tri.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true }),
    AuthModule,
    BinhLuanModule,
    DatPhongModule,
    NguoiDungModule,
    PhongModule,
    ViTriModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
