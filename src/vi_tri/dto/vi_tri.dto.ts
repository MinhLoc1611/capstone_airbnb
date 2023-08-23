import { ApiProperty } from '@nestjs/swagger';
export class viTriDto {
  id: number;

  @ApiProperty()
  ten_vi_tri: string;

  @ApiProperty()
  tinh_thanh: string;

  @ApiProperty()
  quoc_gia: string;

  @ApiProperty()
  hinh_anh: string;
}
