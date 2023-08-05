import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './http-server/controller/user.controller';
import { UserService } from './domain/service/user.service';
import { User } from './persistence/entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
