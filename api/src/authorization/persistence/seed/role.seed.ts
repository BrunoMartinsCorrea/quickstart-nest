import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from '@/authorization/domain/service/role.service';
import { RoleEntity } from '@/authorization/persistence/entity/role.entity';
import { Role } from '@/authorization/domain/model/role';

@Injectable()
export class RoleSeeder implements Seeder {
  private readonly ROLES: { name: string; description: string }[] = [
    { name: 'BACKOFFICE_USER_OWNER', description: 'User owner' },
    { name: 'BACKOFFICE_USER_ADMIN', description: 'User admin' },
    { name: 'BACKOFFICE_USER_EDITOR', description: 'User editor' },
    { name: 'BACKOFFICE_USER_CREATOR', description: 'User creator' },
    { name: 'BACKOFFICE_USER_VIEWER', description: 'User viewer' },
  ];

  constructor(
    private readonly service: RoleService,
    @InjectRepository(RoleEntity) private repository: Repository<RoleEntity>,
  ) {}

  async seed(): Promise<void> {
    Logger.log(`Seeding ${this.constructor.name}`);

    for (const value of this.ROLES) {
      await this.service.create(value as Role);
    }
  }

  async drop(): Promise<void> {
    Logger.log(`Dropping ${this.constructor.name}`);

    for (const value of this.ROLES) {
      await this.repository.delete({ name: value.name });
    }
  }
}
