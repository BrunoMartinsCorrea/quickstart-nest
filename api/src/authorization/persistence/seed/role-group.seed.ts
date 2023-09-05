import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleGroupService } from '@/authorization/domain/service/role-group.service';
import { RoleGroupEntity } from '@/authorization/persistence/entity/role-group.entity';
import { RoleGroup } from '@/authorization/domain/model/role-group';

@Injectable()
export class RoleGroupSeeder implements Seeder {
  private readonly ROLE_GROUPS: { name: string; description: string }[] = [
    { name: 'User administrators', description: 'System user administrator' },
  ];

  constructor(
    private readonly service: RoleGroupService,
    @InjectRepository(RoleGroupEntity) private repository: Repository<RoleGroupEntity>
  ) {}

  async seed(): Promise<void> {
    for (const value of this.ROLE_GROUPS) {
      await this.service.create(value as RoleGroup);
    }
  }

  async drop(): Promise<void> {
    for (const value of this.ROLE_GROUPS) {
      await this.repository.delete({ name: value.name });
    }
  }
}
