import { Body, Controller, Headers, Post, Put, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { userLoginType, userRegisterType } from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: userLoginType, @Res() res: Response) {
    return this.authService.login(body, res);
  }

  @Post('/register')
  register(@Body() body: userRegisterType, @Res() res: Response) {
    return this.authService.register(body, res);
  }

  @Put('/update')
  update(
    @Body() body: userRegisterType,
    @Headers('Authorization') token: string,
    @Res() res: Response,
  ) {
    return this.authService.update(body, token, res);
  }
}
