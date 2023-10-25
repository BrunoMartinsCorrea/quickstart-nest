import { Injectable, Logger } from '@nestjs/common';
import { UserGroupUserRepository } from '@/authorization/persistence/repository/user-group-user-repository';
import { EntityNotFoundError } from '@/common/error/entity-not-found-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UserGroupUser } from '../model/user-group-user';
import { UserGroupUserView } from '@/authorization/domain/model/user-group-user-view';

@Injectable()
export class UserGroupUserService {
  constructor(private readonly repository: UserGroupUserRepository) {}

  async create(userGroupUser: UserGroupUser): Promise<UserGroupUserView> {
    const createdUserGroup = await this.repository.create(userGroupUser);

    Logger.log(
      `User group user created { "userId": "${createdUserGroup.user.id}", "userGroupId": "${createdUserGroup.userGroup.id}" }`
    );

    return createdUserGroup;
  }

  async findOne(userGroupUser: UserGroupUser): Promise<UserGroupUserView> {
    const userGroupUserView = await this.repository.findOne(userGroupUser);

    if (!userGroupUserView) {
      throw new EntityNotFoundError('User group user not found');
    }

    return userGroupUserView;
  }

  async findAll(pagination: PaginationDto): Promise<[UserGroupUserView[], number]> {
    return this.repository.listAll(pagination);
  }

  async update(userGroupUser: UserGroupUser) {
    return this.repository.update(userGroupUser).then((it) => {
      Logger.log(`User group user updated { "userId": "${it.user.id}", "userGroupId": "${it.userGroup.id}" }`);

      return it;
    });
  }

  async softDelete(userGroupUser: UserGroupUser) {
    const hasDeleted = await this.repository.softDelete(userGroupUser);

    if (hasDeleted) {
      Logger.log(
        `User group user deleted { "userId": "${userGroupUser.userId}", "userGroupId": "${userGroupUser.userGroupId}" }`
      );
    } else {
      throw new EntityNotFoundError('User group user not found');
    }
  }
}
