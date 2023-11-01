import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleGroupEntity } from '@/authorization/persistence/entity/role-group.entity';
import { RoleGroup } from '@/authorization/domain/model/role-group';
import { RoleGroupRoleEntity } from '@/authorization/persistence/entity/role-group-role.entity';

@Injectable()
export class RoleGroupSeeder implements Seeder {
  public static readonly ROLE_GROUPS = [
    {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'User administrators',
      description: 'System user administrator',
      active: true,
    },
  ] as RoleGroup[];

  constructor(
    @InjectRepository(RoleGroupEntity) private repository: Repository<RoleGroupEntity>,
    @InjectRepository(RoleGroupRoleEntity) private roleGroupToRoleRepository: Repository<RoleGroupRoleEntity>
  ) {}

  async seed(): Promise<void> {
    Logger.log(`Seeding ${this.constructor.name}`);

    for (const value of RoleGroupSeeder.ROLE_GROUPS) {
      await this.repository.save(value);
    }
  }

  async drop(): Promise<void> {
    Logger.log(`Dropping ${this.constructor.name}`);

    await this.roleGroupToRoleRepository.clear();
    await this.repository.clear();
  }
}
