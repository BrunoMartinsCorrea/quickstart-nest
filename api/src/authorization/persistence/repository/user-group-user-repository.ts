import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { EntityConflictError } from '@/common/error/entity-conflict-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UserGroupUserEntity } from '../entity/user-group-user.entity';
import { UserGroupUser } from '@/authorization/domain/model/user-group-user';

export class UserGroupUserRepository {
  constructor(@InjectRepository(UserGroupUserEntity) private repository: Repository<UserGroupUserEntity>) {}

  async create(userGroupUser: UserGroupUser) {
    try {
      return await this.repository.save(userGroupUser as UserGroupUserEntity);
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('User group user could not be created');
    }
  }

  async findOne(id: string): Promise<UserGroupUser> {
    return this.repository.findOneBy({ id });
  }

  async listAll(pagination: PaginationDto): Promise<[UserGroupUser[], number]> {
    const { limit, page } = pagination;
    const PAGE_INDEX_FIXER = 1;

    return this.repository.findAndCount({
      withDeleted: false,
      take: limit,
      skip: limit * (page - PAGE_INDEX_FIXER),
    });
  }

  async update(UserGroupUser: UserGroupUser) {
    try {
      const savedUserGroupUser = await this.repository.save(UserGroupUser as UserGroupUserEntity);
      return savedUserGroupUser as UserGroupUser;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('User group user could not be updated');
    }
  }

  async softDelete(id: string) {
    const updateResult = await this.repository.softDelete({ id, deletedAt: IsNull() });
    return !!updateResult.affected;
  }
}
