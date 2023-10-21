import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { RoleGroupController } from '@/authorization/http-server/controller/role-group.controller';
import { RoleGroupRepository } from '@/authorization/persistence/repository/role-group-repository';
import { RoleGroupService } from '@/authorization/domain/service/role-group.service';
import { RoleGroupEntity } from '@/authorization/persistence/entity/role-group.entity';
import { PaginationMiddleware } from '@/common/middleware/pagination.middleware';
import { RoleGroupToRoleEntity } from './persistence/entity/role-group-to-role.entity';
import { UserGroupUserService } from '@/authorization/domain/service/user-group-user.service';
import { UserGroupUserEntity } from '@/authorization/persistence/entity/user-group-user.entity';
import { UserGroupUserRepository } from '@/authorization/persistence/repository/user-group-user-repository';
import { UserGroupUserController } from '@/authorization/http-server/controller/user-group-user.controller';

@Module({
  controllers: [ClientController, RoleController, RoleGroupController, UserGroupController, UserGroupUserController],
  providers: [
    ClientRepository,
    ClientService,
    RoleRepository,
    RoleService,
    RoleGroupRepository,
    RoleGroupService,
    UserGroupRepository,
    UserGroupService,
    UserGroupUserRepository,
    UserGroupUserService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      RoleEntity,
      RoleGroupEntity,
      RoleGroupToRoleEntity,
      UserGroupEntity,
      UserGroupUserEntity,
    ]),
  ],
  exports: [ClientService, RoleService, RoleGroupService, UserGroupService, UserGroupUserService],
})
export class AuthorizationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes(
      { path: '*/role', method: RequestMethod.GET },
      { path: '*/client', method: RequestMethod.GET },
      {
        path: '*/role-group',
        method: RequestMethod.GET,
      },
    );
  }
}
