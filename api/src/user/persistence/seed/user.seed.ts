import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { UserService } from '@/user/domain/service/user.service';
import { User } from '@/user/domain/model/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeeder implements Seeder {
  public static readonly ADMIN_USERNAME = 'admin@admin.com';
  public static readonly ADMIN_USER = {
    id: '00000000-0000-0000-0000-000000000000',
    email: UserSeeder.ADMIN_USERNAME,
    username: UserSeeder.ADMIN_USERNAME,
    fullName: 'Admilson',
    password: 'Admin123!',
    salt: '',
  } as User;

  constructor(
    private readonly service: UserService,
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async seed(): Promise<void> {
    await this.service.create(UserSeeder.ADMIN_USER);
  }

  async drop(): Promise<void> {
    await this.repository.delete({ username: UserSeeder.ADMIN_USERNAME });
  }
}
