import { Injectable, Logger } from '@nestjs/common';
import { RoleGroupRepository } from '@/authorization/persistence/repository/role-group-repository';
import { EntityNotFoundError } from '@/common/error/entity-not-found-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { RoleGroup } from '../model/role-group';

@Injectable()
export class RoleGroupService {
  constructor(private readonly repository: RoleGroupRepository) {}

  async create(roleGroup: RoleGroup): Promise<RoleGroup> {
    const createdRoleGroup = await this.repository.create(roleGroup);

    Logger.log(`Role group created { "id": "${createdRoleGroup.id}" }`);

    return createdRoleGroup;
  }

  async findOne(id: string): Promise<RoleGroup> {
    const roleGroup = await this.repository.findOne(id);

    if (!roleGroup) {
      throw new EntityNotFoundError('Role group not found');
    }

    return roleGroup;
  }

  async findOneByName(name: string): Promise<RoleGroup> {
    const roleGroup = await this.repository.findOneByName(name);

    if (!roleGroup) {
      throw new EntityNotFoundError('Role group not found');
    }

    return roleGroup;
  }

  async findAll(pagination: PaginationDto): Promise<[RoleGroup[], number]> {
    return this.repository.listAll(pagination);
  }

  async update(roleGroup: RoleGroup) {
    return this.repository.update(roleGroup).then((it) => {
      Logger.log(`Role group updated { "id": "${it.id}" }`);

      return it;
    });
  }

  async softDelete(id: string) {
    const hasDeleted = await this.repository.softDelete(id);

    if (hasDeleted) {
      Logger.log(`Role group deleted { "id": "${id}" }`);
    } else {
      throw new EntityNotFoundError('Role group not found');
    }
  }
}
