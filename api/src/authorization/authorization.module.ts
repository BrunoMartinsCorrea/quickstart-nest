import { Module } from '@nestjs/common';
import { RoleController } from '@/authorization/http-server/controller/role.controller';
import { RoleService } from '@/authorization/domain/service/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@/authorization/persistence/entity/role.entity';
import { RoleRepository } from '@/authorization/persistence/repository/role-repository';
import { ClientService } from '@/authorization/domain/service/client.service';
import { ClientRepository } from '@/authorization/persistence/repository/client-repository';
import { ClientController } from '@/authorization/http-server/controller/client.controller';
import { ClientEntity } from '@/authorization/persistence/entity/client.entity';
import { UserGroupController } from '@/authorization/http-server/controller/user-group.controller';
import { UserGroupService } from '@/authorization/domain/service/user-group.service';
import { UserGroupEntity } from '@/authorization/persistence/entity/user-group.entity';
import { UserGroupRepository } from '@/authorization/persistence/repository/user-group-repository';

@Module({
  controllers: [ClientController, RoleController, UserGroupController],
  providers: [ClientRepository, ClientService, RoleRepository, RoleService, UserGroupRepository, UserGroupService],
  imports: [TypeOrmModule.forFeature([ClientEntity, RoleEntity, UserGroupEntity])],
  exports: [ClientService, RoleService, UserGroupService],
})
export class AuthorizationModule {}
