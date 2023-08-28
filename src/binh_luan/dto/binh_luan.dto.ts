import { ApiProperty } from '@nestjs/swagger';
export class binhLuanDto {
  id: number;

  @ApiProperty()
  ma_phong: number;

  @ApiProperty()
  ma_nguoi_dung: number;

  @ApiProperty()
  ngay_binh_luan: Date;

  @ApiProperty()
  noi_dung: string;

  @ApiProperty()
  sao_binh_luan: number;
}
