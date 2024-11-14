import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationMiddleware } from '@/common/middleware/pagination.middleware';
import { PersonController } from './http-server/controller/person.controller';
import { PersonRepository } from './persistence/repository/person-repository';
import { PersonService } from './domain/service/person.service';
import { PersonEntity } from './persistence/entity/person.entity';

@Module({
  controllers: [PersonController],
  providers: [PersonService, PersonRepository],
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  exports: [PersonService],
})
export class PersonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes({ path: '/person', method: RequestMethod.GET });
  }
}
