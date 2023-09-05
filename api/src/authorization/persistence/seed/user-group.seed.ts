import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserGroupService } from '@/authorization/domain/service/user-group.service';
import { UserGroupEntity } from '@/authorization/persistence/entity/user-group.entity';
import { UserGroup } from '@/authorization/domain/model/user-group';

@Injectable()
export class UserGroupSeeder implements Seeder {
  private readonly USER_GROUPS: { name: string; description: string }[] = [
    { name: 'Administrators', description: 'System administrators' },
  ];

  constructor(
    private readonly service: UserGroupService,
    @InjectRepository(UserGroupEntity) private repository: Repository<UserGroupEntity>
  ) {}

  async seed(): Promise<void> {
    for (const value of this.USER_GROUPS) {
      await this.service.create(value as UserGroup);
    }
  }

  async drop(): Promise<void> {
    for (const value of this.USER_GROUPS) {
      await this.repository.delete({ name: value.name });
    }
  }
}
