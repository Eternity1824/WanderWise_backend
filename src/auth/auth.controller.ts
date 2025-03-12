import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { DynamicAuthGuard } from './dynamic-auth.guard';

@Controller('auth')
export class AuthController {
  @Get(':provider')
  @UseGuards(DynamicAuthGuard)
  authRedirect(@Param('provider') provider: string) {
    return { message: `Redirecting to ${provider} Auth ...` };
  }

  @Get(':provider/callback')
  @UseGuards(DynamicAuthGuard)
  authCallBack(@Req() req, @Param('provider') provider: string) {
    return { provider, user: req.user };
  }
}
