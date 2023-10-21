import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientService } from '@/authorization/domain/service/client.service';
import { ClientEntity } from '@/authorization/persistence/entity/client.entity';
import { Client } from '@/authorization/domain/model/client';

@Injectable()
export class ClientSeeder implements Seeder {
  private readonly CLIENTS: { name: string; description: string }[] = [
    { name: 'BACKOFFICE', description: 'Backoffice app client' },
  ];

  constructor(
    private readonly service: ClientService,
    @InjectRepository(ClientEntity) private repository: Repository<ClientEntity>,
  ) {}

  async seed(): Promise<void> {
    Logger.log(`Seeding ${this.constructor.name}`);

    for (const value of this.CLIENTS) {
      await this.service.create(value as Client);
    }
  }

  async drop(): Promise<void> {
    Logger.log(`Dropping ${this.constructor.name}`);

    for (const value of this.CLIENTS) {
      await this.repository.delete({ name: value.name });
    }
  }
}
