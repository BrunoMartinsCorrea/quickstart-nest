import { Injectable, Logger } from '@nestjs/common';
import { RoleRepository } from '@/authorization/persistence/repository/role-repository';
import { EntityNotFoundError } from '@/common/error/entity-not-found-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { Role } from '../model/role';

@Injectable()
export class RoleService {
  constructor(private readonly repository: RoleRepository) {}

  async create(role: Role): Promise<Role> {
    const createdRole = await this.repository.create(role);

    Logger.log(`Role created { "id": "${createdRole.id}" }`);

    return createdRole;
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.repository.findOne(id);

    if (!role) {
      throw new EntityNotFoundError('Role not found');
    }

    return role;
  }

  async findOneByName(name: string): Promise<Role> {
    const role = await this.repository.findOneByName(name);

    if (!role) {
      throw new EntityNotFoundError('Role not found');
    }

    return role;
  }

  async findAll(pagination: PaginationDto): Promise<[Role[], number]> {
    return this.repository.listAll(pagination);
  }

  async update(role: Role) {
    return this.repository.update(role).then((it) => {
      Logger.log(`Role updated { "id": "${it.id}" }`);

      return it;
    });
  }

  async softDelete(id: string) {
    const hasDeleted = await this.repository.softDelete(id);

    if (hasDeleted) {
      Logger.log(`Role deleted { "id": "${id}" }`);
    } else {
      throw new EntityNotFoundError('Role not found');
    }
  }
}
