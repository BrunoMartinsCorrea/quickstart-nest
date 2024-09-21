import { Injectable, Logger } from '@nestjs/common';
import { UserGroupRepository } from '@/authorization/persistence/repository/user-group-repository';
import { EntityNotFoundError } from '@/common/error/entity-not-found-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UserGroup } from '../model/user-group';

@Injectable()
export class UserGroupService {
  constructor(private readonly repository: UserGroupRepository) {}

  async create(userGroup: UserGroup): Promise<UserGroup> {
    const createdUserGroup = await this.repository.create(userGroup);

    Logger.log(`User group created { "id": "${createdUserGroup.id}" }`);

    return createdUserGroup;
  }

  async findOne(id: string): Promise<UserGroup> {
    const userGroup = await this.repository.findOne(id);

    if (!userGroup) {
      throw new EntityNotFoundError('User group not found');
    }

    return userGroup;
  }

  async findOneByName(name: string): Promise<UserGroup> {
    const userGroup = await this.repository.findOneByName(name);

    if (!userGroup) {
      throw new EntityNotFoundError('User group not found');
    }

    return userGroup;
  }

  async findAll(pagination: PaginationDto): Promise<[UserGroup[], number]> {
    return this.repository.listAll(pagination);
  }

  async update(userGroup: UserGroup) {
    return this.repository.update(userGroup).then((it) => {
      Logger.log(`User group updated { "id": "${it.id}" }`);

      return it;
    });
  }

  async softDelete(id: string) {
    const hasDeleted = await this.repository.softDelete(id);

    if (hasDeleted) {
      Logger.log(`User group deleted { "id": "${id}" }`);
    } else {
      throw new EntityNotFoundError('User group not found');
    }
  }
}
