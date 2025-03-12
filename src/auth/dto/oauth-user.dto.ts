export class OauthUserDto {
  provider: string;
  providerId: string;
  email?: string | null;
  username?: string | null;
}