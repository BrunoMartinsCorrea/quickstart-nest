import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationMiddleware } from '@/common/middleware/pagination.middleware';
import { EventController } from './http-server/controller/event.controller';
import { EventRepository } from './persistence/repository/event-repository';
import { EventService } from './domain/service/event.service';
import { EventEntity } from './persistence/entity/event.entity';

@Module({
  controllers: [EventController],
  providers: [EventService, EventRepository],
  imports: [TypeOrmModule.forFeature([EventEntity])],
  exports: [EventService],
})
export class EventModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes({ path: '/event', method: RequestMethod.GET });
  }
}
