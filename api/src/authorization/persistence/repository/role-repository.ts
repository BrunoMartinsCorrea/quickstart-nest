import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { EntityConflictError } from '@/common/error/entity-conflict-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { RoleEntity } from '../entity/role.entity';
import { Role } from '@/authorization/domain/model/role';

export class RoleRepository {
  constructor(@InjectRepository(RoleEntity) private repository: Repository<RoleEntity>) {}

  async create(role: Role) {
    try {
      const savedRole = await this.repository.save(role as RoleEntity);
      return savedRole as Role;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Role could not be created');
    }
  }

  async findOne(id: string): Promise<Role> {
    return this.repository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Role | null> {
    return this.repository.findOneBy({ name });
  }

  async listAll(pagination: PaginationDto): Promise<[Role[], number]> {
    const { limit, page } = pagination;
    const PAGE_INDEX_FIXER = 1;
    return this.repository.findAndCount({ withDeleted: false, take: limit, skip: limit * (page - PAGE_INDEX_FIXER) });
  }

  async update(role: Role) {
    try {
      const savedRole = await this.repository.save(role as RoleEntity);
      return savedRole as Role;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Role could not be updated');
    }
  }

  async softDelete(id: string) {
    const updateResult = await this.repository.softDelete({ id, deletedAt: IsNull() });
    return !!updateResult.affected;
  }
}
