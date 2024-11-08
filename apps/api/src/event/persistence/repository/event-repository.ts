import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Event } from '@/event/domain/model/event';
import { EntityConflictError } from '@/common/error/entity-conflict-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { EventView } from '@/event/domain/model/event-view';
import { EventEntity } from '../entity/event.entity';

export class EventRepository {
  constructor(@InjectRepository(EventEntity) private repository: Repository<EventEntity>) {}

  async create(event: Event): Promise<EventView> {
    try {
      return this.repository.save({ user: { id: event.userId }, ...event });
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Event could not be created');
    }
  }

  async findOne(event: Event): Promise<EventView> {
    return this.repository
      .createQueryBuilder('e')
      .innerJoinAndSelect('e.user', 'u')
      .where('u.id = :userId', event)
      .getOne();
  }

  async findAll(pagination: PaginationDto): Promise<[EventView[], number]> {
    const { limit, page } = pagination;
    const PAGE_INDEX_FIXER = 1;
    return this.repository.findAndCount({ withDeleted: false, take: limit, skip: limit * (page - PAGE_INDEX_FIXER) });
  }

  async update(event: Event) {
    try {
      const savedEvent = await this.repository.save(event);
      return savedEvent as EventView;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Event could not be updated');
    }
  }

  async softDelete(id: string) {
    const updateResult = await this.repository.softDelete({ id, deletedAt: IsNull() });
    return !!updateResult.affected;
  }
}
