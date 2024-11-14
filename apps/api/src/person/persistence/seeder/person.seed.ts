import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Person } from '@/person/domain/model/person';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonEntity } from '../entity/person.entity';
import { PersonService } from '@/person/domain/service/person.service';

@Injectable()
export class PersonSeeder implements Seeder {
  public static readonly PERSON = {
    id: '00000000-0000-0000-0000-000000000000',
    nationalRegistration: '00000000000',
    firstName: 'John',
    lastName: 'Doe',
    birthdate: '2000-01-01',
  } as Person;

  constructor(
    private readonly service: PersonService,
    @InjectRepository(PersonEntity) private repository: Repository<PersonEntity>
  ) {}

  async seed(): Promise<void> {
    await this.service.create(PersonSeeder.PERSON);
  }

  async drop(): Promise<void> {
    await this.repository.delete({ id: PersonSeeder.PERSON.id });
  }
}
