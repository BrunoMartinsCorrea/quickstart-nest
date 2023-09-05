import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { EntityConflictError } from '@/common/error/entity-conflict-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UserGroupEntity } from '../entity/user-group.entity';
import { UserGroup } from '@/authorization/domain/model/user-group';

export class UserGroupRepository {
  constructor(@InjectRepository(UserGroupEntity) private repository: Repository<UserGroupEntity>) {}

  async create(userGroup: UserGroup) {
    try {
      const savedUserGroup = await this.repository.save(userGroup as UserGroupEntity);
      return savedUserGroup as UserGroup;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('User group could not be created');
    }
  }

  async findOne(id: string): Promise<UserGroup> {
    return this.repository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<UserGroup | null> {
    return this.repository.findOneBy({ name });
  }

  async listAll(pagination: PaginationDto): Promise<[UserGroup[], number]> {
    const { limit, page } = pagination;
    const PAGE_INDEX_FIXER = 1;
    return this.repository.findAndCount({ withDeleted: false, take: limit, skip: limit * (page - PAGE_INDEX_FIXER) });
  }

  async update(userGroup: UserGroup) {
    try {
      const savedUserGroup = await this.repository.save(userGroup as UserGroupEntity);
      return savedUserGroup as UserGroup;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('User group could not be updated');
    }
  }

  async softDelete(id: string) {
    const updateResult = await this.repository.softDelete({ id, deletedAt: IsNull() });
    return !!updateResult.affected;
  }
}
