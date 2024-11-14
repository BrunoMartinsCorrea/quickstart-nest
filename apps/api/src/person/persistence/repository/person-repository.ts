import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { Person } from '@/person/domain/model/person';
import { EntityConflictError } from '@/common/error/entity-conflict-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PersonEntity } from '../entity/person.entity';

export class PersonRepository {
  constructor(@InjectRepository(PersonEntity) private repository: Repository<PersonEntity>) {}

  async create(person: Person): Promise<Person> {
    try {
      return this.repository.save({ ...person });
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Person could not be created');
    }
  }

  async findOne(id: string): Promise<Person> {
    return this.repository.findOneBy({ id });
  }

  async findAll(pagination: PaginationDto): Promise<[Person[], number]> {
    const { limit, page } = pagination;
    const PAGE_INDEX_FIXER = 1;
    return this.repository.findAndCount({ withDeleted: false, take: limit, skip: limit * (page - PAGE_INDEX_FIXER) });
  }

  async update(person: Person): Promise<Person> {
    try {
      return this.repository.save(person);
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('Person could not be updated');
    }
  }

  async softDelete(id: string) {
    const updateResult = await this.repository.softDelete({ id, deletedAt: IsNull() });
    return !!updateResult.affected;
  }
}
