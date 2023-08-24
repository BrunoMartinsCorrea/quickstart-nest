import { httpClient } from '@/adapters/httpClient';
import { PaginatedResponseDto, PaginationDto } from '@/domain/common';
import { CreateUserDto, User, UserDto } from '.';

export class UserService {
  static async create(payload: CreateUserDto): Promise<void> {
    await httpClient.post('/user', payload);
  }

  static async listAll({ page, limit }: PaginationDto): Promise<PaginatedResponseDto<User>> {
    const response = await httpClient.get<PaginatedResponseDto<UserDto>>('/user', {
      params: {
        page,
        limit,
      },
    });

    return {
      ...response.data,
      results: response.data.results.map((user) => ({
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
        deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
      })),
    } as PaginatedResponseDto<User>;
  }
}
