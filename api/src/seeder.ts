import { seeder } from 'nestjs-seeder';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '@/user/persistence/entity/user.entity';
import { UsersSeeder } from '@/user/persistence/seed/user.seed';
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

seeder({
  imports: [
    ConfigModule.forRoot({
      load: [ormConnection],
    }),
    TypeOrmModule.forRoot(ormConnection() as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    UserModule,
    AuthenticationModule,
  ],
  providers: [UserService, UserRepository, RoleService, RoleRepository],
}).run([UsersSeeder, RoleSeeder]);
