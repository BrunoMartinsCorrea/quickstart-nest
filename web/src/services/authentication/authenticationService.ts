import { httpClient } from '@/adapters/httpClient';
import { CredentialsDto } from './dto/CredentialsDto';
import { TokenDto } from './dto/TokenDto';

export class AuthenticationService {
  static async token(payload: CredentialsDto): Promise<TokenDto> {
    const response = await httpClient.post<TokenDto>('/authentication/token', payload);
    return response.data;
  }
}
