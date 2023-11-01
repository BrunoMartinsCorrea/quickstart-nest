import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { EntityConflictError } from '@/common/error/entity-conflict-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UserGroupUserEntity } from '../entity/user-group-user.entity';
import { UserGroupUser } from '@/authorization/domain/model/user-group-user';
import { UserGroupUserView } from '@/authorization/domain/model/user-group-user-view';

export class UserGroupUserRepository {
  constructor(@InjectRepository(UserGroupUserEntity) private repository: Repository<UserGroupUserEntity>) {}

  async create(userGroupUser: UserGroupUser): Promise<UserGroupUserView> {
    try {
      return this.repository.save({ user: { id: userGroupUser.userId }, userGroup: { id: userGroupUser.userGroupId } });
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('User group user could not be created');
    }
  }

  async findOne(userGroupUser: UserGroupUser): Promise<UserGroupUserView> {
    return this.repository
      .createQueryBuilder('ugu')
      .innerJoinAndSelect('ugu.user', 'u')
      .innerJoinAndSelect('ugu.userGroup', 'ug')
      .where('u.id = :userId AND ug.id = :userGroupId', userGroupUser)
      .getOne();
  }

  async listAll(pagination: PaginationDto): Promise<[UserGroupUserView[], number]> {
    const { limit, page } = pagination;
    const PAGE_INDEX_FIXER = 1;

    return this.repository.findAndCount({
      withDeleted: false,
      take: limit,
      skip: limit * (page - PAGE_INDEX_FIXER),
    });
  }

  async update(userGroupUser: UserGroupUser) {
    try {
      const savedUserGroupUser = await this.repository.save(userGroupUser);
      return savedUserGroupUser as UserGroupUserView;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('User group user could not be updated');
    }
  }

  async softDelete(userGroupUser: UserGroupUser) {
    const updateResult = await this.repository.softDelete({
      user: { id: userGroupUser.userId },
      userGroup: { id: userGroupUser.userGroupId },
      deletedAt: IsNull(),
    });
    return !!updateResult.affected;
  }
}
