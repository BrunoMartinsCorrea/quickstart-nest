import { Module } from '@nestjs/common';
import { RoleController } from './http-server/controller/role.controller';
import { RoleService } from '@/authorization/domain/service/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@/authorization/persistence/entity/role.entity';
import { RoleRepository } from '@/authorization/persistence/repository/role-repository';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository],
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  exports: [RoleService],
})
export class AuthorizationModule {}
