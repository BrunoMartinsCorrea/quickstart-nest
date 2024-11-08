import { seeder } from 'nestjs-seeder';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '@/user/persistence/entity/user.entity';
import { UserSeeder } from '@/user/persistence/seed/user.seed';
import { UserModule } from '@/user/user.module';
import { UserService } from '@/user/domain/service/user.service';
import { UserRepository } from '@/user/persistence/repository/user-repository';
import ormConnection from '@/config/orm.connection';
import { ConfigModule } from '@nestjs/config';
import { RoleSeeder } from '@/authorization/persistence/seed/role.seed';
import { AuthenticationModule } from '@/authentication/authentication.module';
import { RoleEntity } from '@/authorization/persistence/entity/role.entity';
import { RoleService } from '@/authorization/domain/service/role.service';
import { RoleRepository } from '@/authorization/persistence/repository/role-repository';
import { ClientSeeder } from '@/authorization/persistence/seed/client.seed';
import { ClientRepository } from '@/authorization/persistence/repository/client-repository';
import { ClientService } from '@/authorization/domain/service/client.service';
import { ClientEntity } from '@/authorization/persistence/entity/client.entity';
import { UserGroupEntity } from '@/authorization/persistence/entity/user-group.entity';
import { UserGroupRepository } from './authorization/persistence/repository/user-group-repository';
import { UserGroupService } from '@/authorization/domain/service/user-group.service';
import { UserGroupSeeder } from '@/authorization/persistence/seed/user-group.seed';
import { RoleGroupEntity } from '@/authorization/persistence/entity/role-group.entity';
import { RoleGroupRepository } from '@/authorization/persistence/repository/role-group-repository';
import { RoleGroupService } from '@/authorization/domain/service/role-group.service';
import { RoleGroupSeeder } from '@/authorization/persistence/seed/role-group.seed';
import { UserGroupUserSeeder } from '@/authorization/persistence/seed/user-group-user.seed';
import { UserGroupUserRepository } from '@/authorization/persistence/repository/user-group-user-repository';
import { UserGroupUserService } from '@/authorization/domain/service/user-group-user.service';
import { UserGroupUserEntity } from '@/authorization/persistence/entity/user-group-user.entity';
import { RoleGroupRoleEntity } from '@/authorization/persistence/entity/role-group-role.entity';
import { RoleGroupRoleRepository } from '@/authorization/persistence/repository/role-group-role-repository';
import { RoleGroupRoleSeeder } from '@/authorization/persistence/seed/role-group-role.seed';
import { UserRoleClientEntity } from '@/authorization/persistence/entity/user-role-client.entity';
import { UserRoleClientService } from '@/authorization/domain/service/user-role-client.service';
import { UserRoleClientRepository } from '@/authorization/persistence/repository/user-role-client-repository';
import { UserRoleClientSeeder } from '@/authorization/persistence/seed/user-role-client.seed';
import { EventService } from './event/domain/service/event.service';
import { EventRepository } from './event/persistence/repository/event-repository';
import { EventSeeder } from './event/persistence/seeder/event.seed';
import { EventModule } from './event/event.module';
import { EventEntity } from './event/persistence/entity/event.entity';

seeder({
  imports: [
    ConfigModule.forRoot({
      load: [ormConnection],
    }),
    TypeOrmModule.forRoot(ormConnection() as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([
      ClientEntity,
      RoleEntity,
      RoleGroupEntity,
      RoleGroupRoleEntity,
      UserGroupEntity,
      UserGroupUserEntity,
      UserRoleClientEntity,
      UserEntity,
      EventEntity,
    ]),
    UserModule,
    AuthenticationModule,
    EventModule,
  ],
  providers: [
    ClientService,
    ClientRepository,
    RoleService,
    RoleRepository,
    RoleGroupService,
    RoleGroupRepository,
    RoleGroupRoleRepository,
    UserGroupService,
    UserGroupRepository,
    UserGroupUserService,
    UserGroupUserRepository,
    UserRoleClientService,
    UserRoleClientRepository,
    UserService,
    UserRepository,
    EventService,
    EventRepository,
  ],
}).run([
  ClientSeeder,
  RoleSeeder,
  UserSeeder,
  RoleGroupSeeder,
  RoleGroupRoleSeeder,
  UserGroupSeeder,
  UserGroupUserSeeder,
  UserRoleClientSeeder,
  EventSeeder,
]);
