import { ApiProperty } from '@nestjs/swagger';
export class binhLuanDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  maPhong: number;

  @ApiProperty()
  maNguoiBinhLuan: number;

  @ApiProperty()
  ngayBinhLuan: string;

  @ApiProperty()
  noiDung: string;

  @ApiProperty()
  saoBinhLuan: number;
}
