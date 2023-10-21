import { Injectable, Logger } from '@nestjs/common';
import { RoleGroupRepository } from '@/authorization/persistence/repository/role-group-repository';
import { EntityNotFoundError } from '@/common/error/entity-not-found-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { RoleGroup } from '../model/role-group';
import { RoleGroupDto } from '@/authorization/http-server/dto/role-group.dto';
import { produce } from 'immer';

@Injectable()
export class RoleGroupService {
  constructor(private readonly repository: RoleGroupRepository) {}

  async create(roleGroup: RoleGroupDto): Promise<RoleGroup> {
    const { name, description, roles } = roleGroup;
    const createdRoleGroup = await this.repository.create(
      {
        name,
        description,
      } as RoleGroup,
      roles,
    );

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

  async findAll(pagination: PaginationDto): Promise<[RoleGroup[], number]> {
    return this.repository.listAll(pagination);
  }

  async update(id: string, { name, description, roles }: RoleGroupDto) {
    const roleGroup = await this.findOne(id);

    return this.repository
      .update(
        produce(roleGroup, (draft) => {
          draft.name = name;
          draft.description = description;
        }),
        roles,
      )
      .then((it) => {
        Logger.log(`Role group updated { "id": "${it.id}" }`);
        return it;
      });
  }

  async softDelete(id: string) {
    await this.findOne(id);
    await this.repository.softDelete(id);

    Logger.log(`Role group deleted { "id": "${id}" }`);
  }
}
