import { ApiProperty } from '@nestjs/swagger';

export class userLoginType {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class userRegisterType {
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
}
