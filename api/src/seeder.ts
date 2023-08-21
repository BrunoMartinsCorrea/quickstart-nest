import { seeder } from 'nestjs-seeder';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from '@/user/persistence/entity/user.entity';
import { UsersSeeder } from '@/user/persistence/seed/user.seed';
import { UserModule } from '@/user/user.module';
import { UserService } from '@/user/domain/service/user.service';
import { UserRepository } from '@/user/persistence/repository/user-repository';
import ormConnection from '@/config/orm.connection';
import { ConfigModule } from '@nestjs/config';

seeder({
  imports: [
    ConfigModule.forRoot({
      load: [ormConnection],
    }),
    TypeOrmModule.forRoot(ormConnection() as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
  ],
  providers: [UserService, UserRepository],
}).run([UsersSeeder]);
