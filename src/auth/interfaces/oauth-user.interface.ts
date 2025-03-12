export interface OAuthUser {
  provider: string;
  providerId: string;
  email?: string | null;
  username?: string | null;
}