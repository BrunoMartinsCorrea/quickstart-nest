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
import { RoleGroupEntity } from '@/authorization/persistence/entity/role-group.entity';
import { RoleGroupRepository } from '@/authorization/persistence/repository/role-group-repository';
import { RoleGroupService } from '@/authorization/domain/service/role-group.service';
import { RoleGroupToRoleEntity } from './authorization/persistence/entity/role-group-to-role.entity';

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
      RoleGroupToRoleEntity,
      UserGroupEntity,
      UserEntity,
    ]),
    UserModule,
    AuthenticationModule,
  ],
  providers: [
    ClientService,
    ClientRepository,
    RoleService,
    RoleRepository,
    RoleGroupService,
    RoleGroupRepository,
    UserGroupService,
    UserGroupRepository,
    UserService,
    UserRepository,
  ],
}).run([ClientSeeder, RoleSeeder, UserSeeder]);
