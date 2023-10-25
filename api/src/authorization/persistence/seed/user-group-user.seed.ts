import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGroupUserEntity } from '@/authorization/persistence/entity/user-group-user.entity';
import { UserSeeder } from '@/user/persistence/seed/user.seed';
import { UserGroupSeeder } from '@/authorization/persistence/seed/user-group.seed';
import { UserGroupUserView } from '@/authorization/domain/model/user-group-user-view';

@Injectable()
export class UserGroupUserSeeder implements Seeder {
  public static readonly USER_GROUP_USERS = UserGroupSeeder.USER_GROUPS.map(
    (value) => ({ user: UserSeeder.ADMIN_USER, userGroup: value } as UserGroupUserView)
  );

  constructor(@InjectRepository(UserGroupUserEntity) private repository: Repository<UserGroupUserEntity>) {}

  async seed(): Promise<void> {
    Logger.log(`Seeding ${this.constructor.name}`);

    for (const value of UserGroupUserSeeder.USER_GROUP_USERS) {
      await this.repository.insert({ user: { id: value.user.id }, userGroup: { id: value.userGroup.id } });
    }
  }

  async drop(): Promise<void> {
    Logger.log(`Dropping ${this.constructor.name}`);

    for (const value of UserGroupUserSeeder.USER_GROUP_USERS) {
      await this.repository.delete({ user: { id: value.user.id }, userGroup: { id: value.userGroup.id } });
    }
  }
}
