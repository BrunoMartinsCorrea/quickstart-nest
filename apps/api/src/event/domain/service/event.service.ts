import { Injectable, Logger } from '@nestjs/common';
import { EventRepository } from '@/event/persistence/repository/event-repository';
import { Event } from '@/event/domain/model/event';
import { EntityNotFoundError } from '@/common/error/entity-not-found-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { EventView } from '../model/event-view';

@Injectable()
export class EventService {
  constructor(private readonly repository: EventRepository) {}

  async create(event: Event) {
    Logger.log(`Event => begin:${event.begin} end:${event.end}`);
    const createdEvent = await this.repository.create(event);

    Logger.log(`Event created { "id": "${createdEvent.id}" }`);

    return createdEvent;
  }

  async findOne(event: Event) {
    const result = await this.repository.findOne(event);

    if (!result) {
      throw new EntityNotFoundError('Event not found');
    }

    return result;
  }

  async findAll(pagination: PaginationDto): Promise<[EventView[], number]> {
    return this.repository.findAll(pagination);
  }

  async update(event: Event) {
    return this.repository.update(event).then((it) => {
      Logger.log(`Event updated { "id": "${it.id}" }`);

      return it;
    });
  }

  async softDelete(id: string) {
    const hasDeleted = await this.repository.softDelete(id);

    if (hasDeleted) {
      Logger.log(`Event deleted { "id": "${id}" }`);
    } else {
      throw new EntityNotFoundError('Event not found');
    }
  }
}
