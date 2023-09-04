import { Module } from '@nestjs/common';
import { RoleController } from './http-server/controller/role.controller';
import { RoleService } from '@/authorization/domain/service/role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@/authorization/persistence/entity/role.entity';
import { RoleRepository } from '@/authorization/persistence/repository/role-repository';
import { ClientService } from '@/authorization/domain/service/client.service';
import { ClientRepository } from '@/authorization/persistence/repository/client-repository';
import { ClientController } from '@/authorization/http-server/controller/client.controller';
import { ClientEntity } from '@/authorization/persistence/entity/client.entity';

@Module({
  controllers: [ClientController, RoleController],
  providers: [ClientRepository, ClientService, RoleRepository, RoleService],
  imports: [TypeOrmModule.forFeature([RoleEntity, ClientEntity])],
  exports: [ClientService, RoleService],
})
export class AuthorizationModule {}
