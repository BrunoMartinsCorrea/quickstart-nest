import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { EntityConflictError } from '@/common/error/entity-conflict-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { ClientEntity } from '../entity/client.entity';
import { Client } from '@/authorization/domain/model/client';

export class ClientRepository {
  constructor(@InjectRepository(ClientEntity) private repository: Repository<ClientEntity>) {}

  async create(client: Client) {
    try {
      const savedClient = await this.repository.save(client as ClientEntity);
      return savedClient as Client;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Client could not be created');
    }
  }

  async findOne(id: string): Promise<Client> {
    return this.repository.findOneBy({ id });
  }

  async findOneByName(name: string): Promise<Client | null> {
    return this.repository.findOneBy({ name });
  }

  async listAll(pagination: PaginationDto): Promise<[Client[], number]> {
    const { limit, page } = pagination;
    const PAGE_INDEX_FIXER = 1;
    return this.repository.findAndCount({ withDeleted: false, take: limit, skip: limit * (page - PAGE_INDEX_FIXER) });
  }

  async update(client: Client) {
    try {
      const savedClient = await this.repository.save(client as ClientEntity);
      return savedClient as Client;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Client could not be updated');
    }
  }

  async softDelete(id: string) {
    const updateResult = await this.repository.softDelete({ id, deletedAt: IsNull() });
    return !!updateResult.affected;
  }
}
