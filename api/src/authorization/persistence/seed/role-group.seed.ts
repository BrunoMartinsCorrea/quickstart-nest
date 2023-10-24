import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleGroupEntity } from '@/authorization/persistence/entity/role-group.entity';
import { RoleGroupToRoleEntity } from '../entity/role-group-to-role.entity';
import { RoleGroup } from '@/authorization/domain/model/role-group';

@Injectable()
export class RoleGroupSeeder implements Seeder {
  public readonly ROLE_GROUPS = [
    {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'User administrators',
      description: 'System user administrator',
      active: true,
      roles: [{ id: '00000000-0000-0000-0000-000000000000' }],
    },
  ] as RoleGroup[];

  constructor(
    @InjectRepository(RoleGroupEntity) private repository: Repository<RoleGroupEntity>,
    @InjectRepository(RoleGroupToRoleEntity) private roleGroupToRoleRepository: Repository<RoleGroupToRoleEntity>
  ) {}

  async seed(): Promise<void> {
    Logger.log(`Seeding ${this.constructor.name}`);

    for (const value of this.ROLE_GROUPS) {
      await this.repository.save(value);
    }
  }

  async drop(): Promise<void> {
    Logger.log(`Dropping ${this.constructor.name}`);

    await this.roleGroupToRoleRepository.clear();
    await this.repository.clear();
  }
}
