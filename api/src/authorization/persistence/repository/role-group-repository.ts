import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { EntityConflictError } from '@/common/error/entity-conflict-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { RoleGroupEntity } from '../entity/role-group.entity';
import { RoleGroup } from '@/authorization/domain/model/role-group';

export class RoleGroupRepository {
  constructor(@InjectRepository(RoleGroupEntity) private repository: Repository<RoleGroupEntity>) {}

  async create(roleGroup: RoleGroup) {
    try {
      const savedRoleGroup = await this.repository.save(roleGroup as RoleGroupEntity);
      return savedRoleGroup as RoleGroup;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Role group could not be created');
    }
  }

  async findOne(id: string): Promise<RoleGroup> {
    return this.repository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<RoleGroup | null> {
    return this.repository.findOneBy({ name });
  }

  async listAll(pagination: PaginationDto): Promise<[RoleGroup[], number]> {
    const { limit, page } = pagination;
    const PAGE_INDEX_FIXER = 1;
    return this.repository.findAndCount({ withDeleted: false, take: limit, skip: limit * (page - PAGE_INDEX_FIXER) });
  }

  async update(roleGroup: RoleGroup) {
    try {
      const savedRoleGroup = await this.repository.save(roleGroup as RoleGroupEntity);
      return savedRoleGroup as RoleGroup;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Role group could not be updated');
    }
  }

  async softDelete(id: string) {
    const updateResult = await this.repository.softDelete({ id, deletedAt: IsNull() });
    return !!updateResult.affected;
  }
}
