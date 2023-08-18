import { httpClient } from '@/adapters/httpClient';
import { CreateUserDto } from './dto/CreateUserDto';

export abstract class UserService {
  static async create(payload: CreateUserDto): Promise<void> {
    await httpClient.post('/user', payload);
  }
}
