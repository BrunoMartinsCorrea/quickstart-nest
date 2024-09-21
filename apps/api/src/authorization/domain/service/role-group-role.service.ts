import { Injectable, Logger } from '@nestjs/common';
import { RoleGroupRoleRepository } from '@/authorization/persistence/repository/role-group-role-repository';
import { EntityNotFoundError } from '@/common/error/entity-not-found-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { RoleGroupRole } from '../model/role-group-role';
import { RoleGroupRoleView } from '@/authorization/domain/model/role-group-role-view';

@Injectable()
export class RoleGroupRoleService {
  constructor(private readonly repository: RoleGroupRoleRepository) {}

  async create(roleGroupRole: RoleGroupRole): Promise<RoleGroupRoleView> {
    const createdRoleGroup = await this.repository.create(roleGroupRole);

    Logger.log(
      `Role group role created { "roleId": "${createdRoleGroup.role.id}", "roleGroupId": "${createdRoleGroup.roleGroup.id}" }`
    );

    return createdRoleGroup;
  }

  async findOne(roleGroupRole: RoleGroupRole): Promise<RoleGroupRoleView> {
    const roleGroupRoleView = await this.repository.findOne(roleGroupRole);

    if (!roleGroupRoleView) {
      throw new EntityNotFoundError('Role group role not found');
    }

    return roleGroupRoleView;
  }

  async findAll(pagination: PaginationDto): Promise<[RoleGroupRoleView[], number]> {
    return this.repository.listAll(pagination);
  }

  async update(roleGroupRole: RoleGroupRole) {
    return this.repository.update(roleGroupRole).then((it) => {
      Logger.log(`Role group role updated { "roleId": "${it.role.id}", "roleGroupId": "${it.roleGroup.id}" }`);

      return it;
    });
  }

  async softDelete(roleGroupRole: RoleGroupRole) {
    const hasDeleted = await this.repository.softDelete(roleGroupRole);

    if (hasDeleted) {
      Logger.log(
        `Role group role deleted { "roleId": "${roleGroupRole.roleId}", "roleGroupId": "${roleGroupRole.roleGroupId}" }`
      );
    } else {
      throw new EntityNotFoundError('Role group role not found');
    }
  }
}
