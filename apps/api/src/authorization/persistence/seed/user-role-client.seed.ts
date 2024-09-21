import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleClientEntity } from '@/authorization/persistence/entity/user-role-client.entity';
import { UserGroupSeeder } from '@/authorization/persistence/seed/user-group.seed';
import { UserRoleClientView } from '@/authorization/domain/model/user-role-client-view';
import { RoleGroupSeeder } from '@/authorization/persistence/seed/role-group.seed';
import { ClientSeeder } from '@/authorization/persistence/seed/client.seed';

@Injectable()
export class UserRoleClientSeeder implements Seeder {
  public static readonly USER_ROLE_CLIENTS = UserGroupSeeder.USER_GROUPS.map(
    (value) =>
      ({
        userGroup: UserGroupSeeder.USER_GROUPS[0],
        roleGroup: RoleGroupSeeder.ROLE_GROUPS[0],
        client: ClientSeeder.CLIENTS[0],
      } as UserRoleClientView)
  );

  constructor(@InjectRepository(UserRoleClientEntity) private repository: Repository<UserRoleClientEntity>) {}

  async seed(): Promise<void> {
    Logger.log(`Seeding ${this.constructor.name}`);

    for (const value of UserRoleClientSeeder.USER_ROLE_CLIENTS) {
      await this.repository.insert({
        userGroup: { id: value.userGroup.id },
        roleGroup: { id: value.roleGroup.id },
        client: { id: value.client.id },
      });
    }
  }

  async drop(): Promise<void> {
    Logger.log(`Dropping ${this.constructor.name}`);

    for (const value of UserRoleClientSeeder.USER_ROLE_CLIENTS) {
      await this.repository.delete({
        userGroup: { id: value.userGroup.id },
        roleGroup: { id: value.roleGroup.id },
        client: { id: value.client.id },
      });
    }
  }
}
