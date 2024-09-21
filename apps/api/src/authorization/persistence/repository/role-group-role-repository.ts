import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { EntityConflictError } from '@/common/error/entity-conflict-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { RoleGroupRoleEntity } from '../entity/role-group-role.entity';
import { RoleGroupRole } from '@/authorization/domain/model/role-group-role';
import { RoleGroupRoleView } from '@/authorization/domain/model/role-group-role-view';

export class RoleGroupRoleRepository {
  constructor(@InjectRepository(RoleGroupRoleEntity) private repository: Repository<RoleGroupRoleEntity>) {}

  async create(roleGroupRole: RoleGroupRole): Promise<RoleGroupRoleView> {
    try {
      return this.repository.save({ role: { id: roleGroupRole.roleId }, roleGroup: { id: roleGroupRole.roleGroupId } });
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Role group role could not be created');
    }
  }

  async findOne(roleGroupRole: RoleGroupRole): Promise<RoleGroupRoleView> {
    return this.repository
      .createQueryBuilder('rgr')
      .innerJoinAndSelect('rgr.role', 'r')
      .innerJoinAndSelect('rgr.roleGroup', 'rg')
      .where('r.id = :roleId AND rg.id = :roleGroupId', roleGroupRole)
      .getOne();
  }

  async listAll(pagination: PaginationDto): Promise<[RoleGroupRoleView[], number]> {
    const { limit, page } = pagination;
    const PAGE_INDEX_FIXER = 1;

    return this.repository.findAndCount({
      withDeleted: false,
      take: limit,
      skip: limit * (page - PAGE_INDEX_FIXER),
    });
  }

  async update(roleGroupRole: RoleGroupRole) {
    try {
      const savedRoleGroupRole = await this.repository.save(roleGroupRole);
      return savedRoleGroupRole as RoleGroupRoleView;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Role group role could not be updated');
    }
  }

  async softDelete(roleGroupRole: RoleGroupRole) {
    const updateResult = await this.repository.softDelete({
      role: { id: roleGroupRole.roleId },
      roleGroup: { id: roleGroupRole.roleGroupId },
      deletedAt: IsNull(),
    });
    return !!updateResult.affected;
  }
}
