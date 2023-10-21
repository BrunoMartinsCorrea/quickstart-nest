import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGroupUserService } from '@/authorization/domain/service/user-group-user.service';
import { UserGroupUserEntity } from '@/authorization/persistence/entity/user-group-user.entity';
import { UserGroupUser } from '@/authorization/domain/model/user-group-user';
import { UserSeeder } from '@/user/persistence/seed/user.seed';
import { UserGroupSeeder } from '@/authorization/persistence/seed/user-group.seed';

@Injectable()
export class UserGroupUserSeeder implements Seeder {
  public static readonly USER_GROUP_USERS = UserGroupSeeder.USER_GROUPS.map(
    (value) => ({ user: UserSeeder.ADMIN_USER, userGroup: value }) as UserGroupUser,
  );

  constructor(
    private readonly service: UserGroupUserService,
    @InjectRepository(UserGroupUserEntity) private repository: Repository<UserGroupUserEntity>,
  ) {}

  async seed(): Promise<void> {
    Logger.log(`Seeding ${this.constructor.name}`);

    for (const value of UserGroupUserSeeder.USER_GROUP_USERS) {
      await this.service.create(value as UserGroupUser);
    }
  }

  async drop(): Promise<void> {
    Logger.log(`Dropping ${this.constructor.name}`);

    await this.repository.delete(`user_id = '${UserSeeder.ADMIN_USER.id}'`);
  }
}
