import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OAuthUser } from '../auth/interfaces/oauth-user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(email: string, username: string): Promise<User> {
    const newUser = this.userRepository.create({ email, username });
    return await this.userRepository.save(newUser);
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')  // Make sure 'user' matches the entity table name
      .where("user.search_vector @@ plainto_tsquery(:query)", { query })  // Pass query correctly
      .getMany();
  }

  async findOrCreateOAuthUser(oauthUser: OAuthUser): Promise<User> {
    let user = await this.userRepository.findOne({
      where: {providerId: oauthUser.providerId,
        provider: oauthUser.provider }
    });

    if (!user) {
      user = this.userRepository.create({
        email: oauthUser.email ?? null,
        username: oauthUser.username ?? `user_${oauthUser.providerId}`,
        provider: oauthUser.provider,
        providerId: oauthUser.providerId,
      });
      await this.userRepository.save(user);
    }
    return user;
  }

}
