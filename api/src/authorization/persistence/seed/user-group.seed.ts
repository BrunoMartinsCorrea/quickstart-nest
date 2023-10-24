import { Injectable, Logger } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGroupService } from '@/authorization/domain/service/user-group.service';
import { UserGroupEntity } from '@/authorization/persistence/entity/user-group.entity';
import { UserGroup } from '@/authorization/domain/model/user-group';

@Injectable()
export class UserGroupSeeder implements Seeder {
  public static readonly USER_GROUPS = [
    { id: '00000000-0000-0000-0000-000000000000', name: 'Administrators', description: 'System administrators' },
  ] as UserGroup[];

  constructor(
    private readonly service: UserGroupService,
    @InjectRepository(UserGroupEntity) private repository: Repository<UserGroupEntity>
  ) {}

  async seed(): Promise<void> {
    Logger.log(`Seeding ${this.constructor.name}`);

    for (const value of UserGroupSeeder.USER_GROUPS) {
      await this.service.create(value as UserGroup);
    }
  }

  async drop(): Promise<void> {
    Logger.log(`Dropping ${this.constructor.name}`);

    for (const value of UserGroupSeeder.USER_GROUPS) {
      await this.repository.delete({ name: value.name });
    }
  }
}
