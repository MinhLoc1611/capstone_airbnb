import { ApiProperty } from '@nestjs/swagger';
export class datPhongDto {
  @ApiProperty()
  ngay_di: Date;

  @ApiProperty()
  ngay_den: Date;

  @ApiProperty()
  so_luong_khach: number;

  @ApiProperty()
  ma_phong: number;
  
  @ApiProperty()
  ma_nguoi_dat: number;
}
