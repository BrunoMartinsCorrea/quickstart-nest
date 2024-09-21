import { Injectable, Logger } from '@nestjs/common';
import { ClientRepository } from '@/authorization/persistence/repository/client-repository';
import { EntityNotFoundError } from '@/common/error/entity-not-found-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { Client } from '../model/client';

@Injectable()
export class ClientService {
  constructor(private readonly repository: ClientRepository) {}

  async create(client: Client): Promise<Client> {
    const createdClient = await this.repository.create(client);

    Logger.log(`Client created { "id": "${createdClient.id}" }`);

    return createdClient;
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.repository.findOne(id);

    if (!client) {
      throw new EntityNotFoundError('Client not found');
    }

    return client;
  }

  async findOneByName(name: string): Promise<Client> {
    const client = await this.repository.findOneByName(name);

    if (!client) {
      throw new EntityNotFoundError('Client not found');
    }

    return client;
  }

  async findAll(pagination: PaginationDto): Promise<[Client[], number]> {
    return this.repository.listAll(pagination);
  }

  async update(client: Client) {
    return this.repository.update(client).then((it) => {
      Logger.log(`Client updated { "id": "${it.id}" }`);

      return it;
    });
  }

  async softDelete(id: string) {
    const hasDeleted = await this.repository.softDelete(id);

    if (hasDeleted) {
      Logger.log(`Client deleted { "id": "${id}" }`);
    } else {
      throw new EntityNotFoundError('Client not found');
    }
  }
}
