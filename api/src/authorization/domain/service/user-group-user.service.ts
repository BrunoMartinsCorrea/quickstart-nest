import { Injectable, Logger } from '@nestjs/common';
import { UserGroupUserRepository } from '@/authorization/persistence/repository/user-group-user-repository';
import { EntityNotFoundError } from '@/common/error/entity-not-found-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UserGroupUser } from '../model/user-group-user';

@Injectable()
export class UserGroupUserService {
  constructor(private readonly repository: UserGroupUserRepository) {}

  async create(userGroupUser: UserGroupUser): Promise<UserGroupUser> {
    const createdUserGroup = await this.repository.create(userGroupUser);

    Logger.log(`User group user created { "id": "${createdUserGroup.id}" }`);

    return createdUserGroup;
  }

  async findOne(id: string): Promise<UserGroupUser> {
    const userGroupUser = await this.repository.findOne(id);

    if (!userGroupUser) {
      throw new EntityNotFoundError('User group user not found');
    }

    return userGroupUser;
  }

  async findAll(pagination: PaginationDto): Promise<[UserGroupUser[], number]> {
    return this.repository.listAll(pagination);
  }

  async update(userGroupUser: UserGroupUser) {
    return this.repository.update(userGroupUser).then((it) => {
      Logger.log(`User group user updated { "id": "${it.id}" }`);

      return it;
    });
  }

  async softDelete(id: string) {
    const hasDeleted = await this.repository.softDelete(id);

    if (hasDeleted) {
      Logger.log(`User group user deleted { "id": "${id}" }`);
    } else {
      throw new EntityNotFoundError('User group user not found');
    }
  }
}
