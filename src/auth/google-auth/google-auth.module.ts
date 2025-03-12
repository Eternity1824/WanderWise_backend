import { Module } from '@nestjs/common';
import { UsersModule } from '../../users/users.module';
import { ConfigModule } from '@nestjs/config';

import { GoogleStrategy } from './google.strategy';
import { GoogleAuthService } from './google-auth.service';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    UsersModule,
    ConfigModule,
  ],
  providers: [GoogleAuthService, GoogleStrategy],
  exports: [GoogleAuthService],
})

export class GoogleAuthModule {}