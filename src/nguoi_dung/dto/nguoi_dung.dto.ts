import { ApiProperty } from '@nestjs/swagger';

export class userAddType {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  gender: boolean;

  @ApiProperty()
  role: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
