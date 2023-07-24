import { ApiProperty } from '@nestjs/swagger';
export class datPhongDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  maPhong: number;
  @ApiProperty()
  ngayDen: Date;
  @ApiProperty()
  ngayDi: Date;
  @ApiProperty()
  soLuongKhach: number;
  @ApiProperty()
  maNguoiDung: number;
}
