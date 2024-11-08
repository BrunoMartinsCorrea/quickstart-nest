import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Event } from '@/event/domain/model/event';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../entity/event.entity';
import { UserSeeder } from '@/user/persistence/seed/user.seed';

@Injectable()
export class EventSeeder implements Seeder {
  public static readonly EVENT = {
    id: '00000000-0000-0000-0000-000000000000',
    userId: UserSeeder.ADMIN_USER.id,
    begin: new Date().toISOString(),
    end: new Date().toISOString(),
    isAllDay: false,
    recurrenceType: 'DAILY',
    recurrenceAmount: '1',
  } as Event;

  constructor(@InjectRepository(EventEntity) private repository: Repository<EventEntity>) {}

  async seed(): Promise<void> {
    await this.repository.insert({ user: { id: EventSeeder.EVENT.userId }, ...EventSeeder.EVENT });
  }

  async drop(): Promise<void> {
    await this.repository.delete({ id: EventSeeder.EVENT.id });
  }

  static addMinutes(date: Date, minutes: number): Date {
    let result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
  }
}
