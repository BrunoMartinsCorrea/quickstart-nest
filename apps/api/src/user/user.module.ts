import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './http-server/controller/user.controller';
import { UserService } from './domain/service/user.service';
import { UserEntity } from '@/user/persistence/entity/user.entity';
import { UserRepository } from '@/user/persistence/repository/user-repository';
import { PaginationMiddleware } from '@/common/middleware/pagination.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes({ path: '/user', method: RequestMethod.GET });
  }
}
