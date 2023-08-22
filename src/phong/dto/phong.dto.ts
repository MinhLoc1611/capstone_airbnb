import { ApiProperty } from '@nestjs/swagger';

export class roomType {
  @ApiProperty()
  ten_phong: string;

  @ApiProperty()
  khach: number;

  @ApiProperty()
  phong_ngu: number;

  @ApiProperty()
  giuong: number;

  @ApiProperty()
  phong_tam: number;

  @ApiProperty()
  mo_ta: string;

  @ApiProperty()
  gia_tien: number;

  @ApiProperty()
  may_giat: boolean;

  @ApiProperty()
  ban_ui: boolean;

  @ApiProperty()
  tivi: boolean;

  @ApiProperty()
  dieu_hoa: boolean;

  @ApiProperty()
  wifi: boolean;

  @ApiProperty()
  bep: boolean;

  @ApiProperty()
  do_xe: boolean;

  @ApiProperty()
  ho_boi: boolean;

  @ApiProperty()
  ma_vi_tri: number;

  @ApiProperty()
  ma_nguoi_dung: number;
}

export class uploadFileType {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
