import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { GoogleAuthService } from './google-auth.service';
import { ConfigService } from '@nestjs/config';
import { OauthUserDto } from '../dto/oauth-user.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, emails, displayName} = profile

    const googleUser: OauthUserDto = {
      provider: 'google',
      providerId: id,
      email: emails?.[0]?.value ?? null,
      username: displayName ?? `user_${id}`,
    }

    const user = await this.googleAuthService.validateOAuthUSer(googleUser);
    done(null, user);
  }
}