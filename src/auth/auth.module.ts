import { Module } from '@nestjs/common';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google-auth/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { DynamicAuthGuard } from './dynamic-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthService } from './google-auth/google-auth.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'google' }),
    GoogleAuthModule,
  ],
  controllers: [AuthController],
  providers: [DynamicAuthGuard],
})
export class AuthModule {}