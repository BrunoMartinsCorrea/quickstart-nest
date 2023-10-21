import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleGroupService } from '@/authorization/domain/service/role-group.service';
import { RoleGroupEntity } from '@/authorization/persistence/entity/role-group.entity';
import { RoleService } from '@/authorization/domain/service/role.service';
import { RoleGroupDto } from '@/authorization/http-server/dto/role-group.dto';
import { RoleGroupToRoleEntity } from '../entity/role-group-to-role.entity';

@Injectable()
export class RoleGroupSeeder implements Seeder {
  constructor(
    private readonly service: RoleGroupService,
    private readonly roleService: RoleService,
    @InjectRepository(RoleGroupEntity) private repository: Repository<RoleGroupEntity>,
    @InjectRepository(RoleGroupToRoleEntity) private roleGroupToRoleRepository: Repository<RoleGroupToRoleEntity>,
  ) {}

  async seed(): Promise<void> {
    Logger.log(`Seeding ${this.constructor.name}`);

    const role = await this.roleService.findOneByName('BACKOFFICE_USER_ADMIN');
    const ROLE_GROUPS: RoleGroupDto[] = [
      { name: 'User administrators', description: 'System user administrator', roles: [role.id] },
    ];
    for (const value of ROLE_GROUPS) {
      await this.service.create(value);
    }
  }

  async drop(): Promise<void> {
    Logger.log(`Dropping ${this.constructor.name}`);

    await this.roleGroupToRoleRepository.clear();
    await this.repository.clear();
  }
}
