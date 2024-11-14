import { Injectable, Logger } from '@nestjs/common';
import { Person } from '@/person/domain/model/person';
import { EntityNotFoundError } from '@/common/error/entity-not-found-error';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { PersonRepository } from '@/person/persistence/repository/person-repository';

@Injectable()
export class PersonService {
  constructor(private readonly repository: PersonRepository) {}

  async create(person: Person) {
    Logger.log(`Person => firstName:${person.firstName} lastName:${person.lastName}`);
    const createdPerson = await this.repository.create(person);

    Logger.log(`Person created { "id": "${createdPerson.id}" }`);

    return createdPerson;
  }

  async findOne(id: string) {
    const result = await this.repository.findOne(id);

    if (!result) {
      throw new EntityNotFoundError('Person not found');
    }

    return result;
  }

  async findAll(pagination: PaginationDto): Promise<[Person[], number]> {
    return this.repository.findAll(pagination);
  }

  async update(person: Person) {
    return this.repository.update(person).then((it) => {
      Logger.log(`Person updated { "id": "${it.id}" }`);

      return it;
    });
  }

  async softDelete(id: string) {
    const hasDeleted = await this.repository.softDelete(id);

    if (hasDeleted) {
      Logger.log(`Person deleted { "id": "${id}" }`);
    } else {
      throw new EntityNotFoundError('Person not found');
    }
  }
}
