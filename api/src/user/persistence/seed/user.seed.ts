import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { UserService } from '@/user/domain/service/user.service';
import { User } from '@/user/domain/model/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersSeeder implements Seeder {
  private ADMIN_USERNAME: string = 'admin@admin.com';

  constructor(
    private readonly service: UserService,
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>
  ) {}

  async seed(): Promise<void> {
    await this.service.create({
      email: this.ADMIN_USERNAME,
      username: this.ADMIN_USERNAME,
      fullName: 'Admin',
      password: 'admin123',
    } as User);
  }

  async drop(): Promise<void> {
    await this.repository.delete({ username: this.ADMIN_USERNAME });
  }
}
