import { Injectable, Logger } from '@nestjs/common';
import { UserRoleClientRepository } from '@/authorization/persistence/repository/user-role-client-repository';
import { EntityNotFoundError } from '@/common/error/entity-not-found-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UserRoleClient } from '../model/user-role-client';
import { UserRoleClientView } from '@/authorization/domain/model/user-role-client-view';

@Injectable()
export class UserRoleClientService {
  constructor(private readonly repository: UserRoleClientRepository) {}

  async create(userRoleClient: UserRoleClient): Promise<UserRoleClientView> {
    const createdUserRoleClient = await this.repository.create(userRoleClient);

    Logger.log(
      `User role client created { "userGroupId": "${createdUserRoleClient.userGroup.id}", "roleGroupId": "${createdUserRoleClient.roleGroup.id}", "clientId": "${createdUserRoleClient.client.id}" }`
    );

    return createdUserRoleClient;
  }

  async findOne(userRoleClient: UserRoleClient): Promise<UserRoleClientView> {
    const userRoleClientView = await this.repository.findOne(userRoleClient);

    if (!userRoleClientView) {
      throw new EntityNotFoundError('User role client not found');
    }

    return userRoleClientView;
  }

  async findAll(pagination: PaginationDto): Promise<[UserRoleClientView[], number]> {
    return this.repository.listAll(pagination);
  }

  async update(userRoleClient: UserRoleClient) {
    return this.repository.update(userRoleClient).then((it) => {
      Logger.log(
        `User role client updated { "userGroupId": "${it.userGroup.id}", "roleGroupId": "${it.roleGroup.id}", "clientId": "${it.client.id}" }`
      );

      return it;
    });
  }

  async softDelete(userRoleClient: UserRoleClient) {
    const hasDeleted = await this.repository.softDelete(userRoleClient);

    if (hasDeleted) {
      Logger.log(
        `User role client deleted { "userGroupId": "${userRoleClient.userGroupId}", "roleGroupId": "${userRoleClient.roleGroupId}", "clientId": "${userRoleClient.clientId}" }`
      );
    } else {
      throw new EntityNotFoundError('User role client not found');
    }
  }
}
