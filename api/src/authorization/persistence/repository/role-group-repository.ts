import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Not, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { EntityConflictError } from '@/common/error/entity-conflict-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { RoleGroupEntity } from '../entity/role-group.entity';
import { RoleGroup } from '@/authorization/domain/model/role-group';
import { RoleGroupToRoleEntity } from '../entity/role-group-to-role.entity';
import { RoleEntity } from '../entity/role.entity';

export class RoleGroupRepository {
  constructor(
    @InjectRepository(RoleGroupEntity) private repository: Repository<RoleGroupEntity>,
    private readonly dataSource: DataSource
  ) {}

  async create({ name, description }: RoleGroup, roleIds: string[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const roles = await queryRunner.manager.find(RoleEntity, {
        where: { id: In(roleIds) },
        withDeleted: false,
      });

      const savedRoleGroup = await queryRunner.manager.save<RoleGroupEntity>(new RoleGroupEntity(name, description));
      await queryRunner.manager.save(roles.map((role) => new RoleGroupToRoleEntity(role.id, savedRoleGroup.id)));

      await queryRunner.commitTransaction();

      return {
        ...savedRoleGroup,
        roles: roles ?? [],
      } as RoleGroup;
    } catch (e) {
      await queryRunner.rollbackTransaction();

      Logger.error(e);
      throw new EntityConflictError('Role group could not be created');
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: string): Promise<RoleGroup> {
    const { roleGroupToRoles, ...content } = await this.repository.findOne({
      where: { id },
      relations: {
        roleGroupToRoles: {
          role: true,
        },
      },
    });

    return {
      ...content,
      roles: roleGroupToRoles.map((data) => data.role),
    } as RoleGroup;
  }

  async listAll(pagination: PaginationDto): Promise<[RoleGroup[], number]> {
    const { limit, page } = pagination;
    const PAGE_INDEX_FIXER = 1;
    return this.repository.findAndCount({
      withDeleted: false,
      take: limit,
      skip: limit * (page - PAGE_INDEX_FIXER),
    });
  }

  async update(roleGroup: RoleGroup, roleIds: string[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { id, name, description } = roleGroup;
      const rolesToKeep = roleGroup.roles.filter((r) => roleIds.includes(r.id)) ?? [];
      const roleIdsToKeep = rolesToKeep.map((r) => r.id);
      const newRelationIds = roleIds.filter((id) => !roleIdsToKeep.includes(id));

      console.log('rolesToKeep', rolesToKeep);
      console.log('roleIdsToKeep', roleIdsToKeep);

      await queryRunner.manager.softDelete(RoleGroupToRoleEntity, {
        roleId: Not(In(roleIdsToKeep)),
      });
      console.log('newRelationIds', newRelationIds);

      const newRoles: RoleEntity[] = [];

      if (newRelationIds.length) {
        const data = await queryRunner.manager.find(RoleEntity, {
          where: {
            id: In(newRelationIds),
          },
        });
        await queryRunner.manager.save(newRelationIds.map((roleId) => new RoleGroupToRoleEntity(roleId, id)));

        newRoles.push(...data);
      }

      queryRunner.manager.update(RoleGroupEntity, { id }, { name, description });

      await queryRunner.commitTransaction();

      return {
        ...roleGroup,
        roles: [...rolesToKeep, ...newRoles],
      } as RoleGroup;
    } catch (e) {
      await queryRunner.rollbackTransaction();

      Logger.error(e);
      throw new EntityConflictError('Role group could not be created');
    } finally {
      await queryRunner.release();
    }
  }

  async softDelete(id: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.softDelete(RoleGroupToRoleEntity, {
        roleGroupId: id,
      });

      await queryRunner.manager.softDelete(RoleGroupEntity, {
        id,
      });

      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      Logger.error(e);
      throw new EntityConflictError('Role group could not be deleted');
    } finally {
      await queryRunner.release();
    }
  }
}
