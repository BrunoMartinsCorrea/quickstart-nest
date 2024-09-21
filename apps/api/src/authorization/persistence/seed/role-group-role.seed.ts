import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleGroupRoleEntity } from '@/authorization/persistence/entity/role-group-role.entity';
import { RoleGroupSeeder } from '@/authorization/persistence/seed/role-group.seed';
import { RoleGroupRoleView } from '@/authorization/domain/model/role-group-role-view';
import { RoleSeeder } from '@/authorization/persistence/seed/role.seed';

@Injectable()
export class RoleGroupRoleSeeder implements Seeder {
  public static readonly ROLE_GROUP_ROLES = RoleGroupSeeder.ROLE_GROUPS.map(
    (value) => ({ role: RoleSeeder.ROLES[0], roleGroup: value } as RoleGroupRoleView)
  );

  constructor(@InjectRepository(RoleGroupRoleEntity) private repository: Repository<RoleGroupRoleEntity>) {}

  async seed(): Promise<void> {
    Logger.log(`Seeding ${this.constructor.name}`);

    for (const value of RoleGroupRoleSeeder.ROLE_GROUP_ROLES) {
      await this.repository.insert({ role: { id: value.role.id }, roleGroup: { id: value.roleGroup.id } });
    }
  }

  async drop(): Promise<void> {
    Logger.log(`Dropping ${this.constructor.name}`);

    for (const value of RoleGroupRoleSeeder.ROLE_GROUP_ROLES) {
      await this.repository.delete({ role: { id: value.role.id }, roleGroup: { id: value.roleGroup.id } });
    }
  }
}
