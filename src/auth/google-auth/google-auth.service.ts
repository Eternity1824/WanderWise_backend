import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { OAuthUser } from '../interfaces/oauth-user.interface';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly usersService: UsersService) {
  }

  async validateOAuthUSer(oauthUser: OAuthUser) {
    return this.usersService.findOrCreateOAuthUser(oauthUser);
  }
}