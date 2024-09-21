import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { EntityConflictError } from '@/common/error/entity-conflict-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UserRoleClientEntity } from '@/authorization/persistence/entity/user-role-client.entity';
import { UserRoleClientView } from '@/authorization/domain/model/user-role-client-view';
import { UserRoleClient } from '@/authorization/domain/model/user-role-client';

export class UserRoleClientRepository {
  constructor(@InjectRepository(UserRoleClientEntity) private repository: Repository<UserRoleClientEntity>) {}

  async create(userRoleClient: UserRoleClient): Promise<UserRoleClientView> {
    try {
      return this.repository.save({
        userGroup: { id: userRoleClient.userGroupId },
        roleGroup: { id: userRoleClient.roleGroupId },
        client: { id: userRoleClient.clientId },
      });
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Role group role could not be created');
    }
  }

  async findOne(userRoleClient: UserRoleClient): Promise<UserRoleClientView> {
    return this.repository
      .createQueryBuilder('urc')
      .innerJoinAndSelect('urc.userGroup', 'ug')
      .innerJoinAndSelect('urc.roleGroup', 'rg')
      .innerJoinAndSelect('urc.client', 'c')
      .where('ug.id = :userGroupId AND rg.id = :roleGroupId AND c.id = :clientId', userRoleClient)
      .getOne();
  }

  async listAll(pagination: PaginationDto): Promise<[UserRoleClientView[], number]> {
    const { limit, page } = pagination;
    const PAGE_INDEX_FIXER = 1;

    return this.repository.findAndCount({
      withDeleted: false,
      take: limit,
      skip: limit * (page - PAGE_INDEX_FIXER),
    });
  }

  async update(userRoleClient: UserRoleClient) {
    try {
      const savedUserRoleClient = await this.repository.save(userRoleClient);
      return savedUserRoleClient as UserRoleClientView;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('User role client could not be updated');
    }
  }

  async softDelete(userRoleClient: UserRoleClient) {
    const updateResult = await this.repository.softDelete({
      userGroup: { id: userRoleClient.userGroupId },
      roleGroup: { id: userRoleClient.roleGroupId },
      client: { id: userRoleClient.clientId },
      deletedAt: IsNull(),
    });
    return !!updateResult.affected;
  }
}
