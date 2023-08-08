import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { EntityConflictError } from '../../../common/error/entity-conflict-error';
import { User } from '../../domain/model/user';
import { Logger } from '@nestjs/common';

export class UserRepository {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

  async create(user: User) {
    try {
      let savedUser = await this.repository.save({ ...user } as UserEntity);
      return { ...savedUser } as User;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('User could not be created');
    }
  }

  async findOne(id: string) {
    let user = await this.repository.findOne({ where: { id } });
    if (user) {
      return { ...user } as User;
    }
  }

  async findOneByUsername(username: string) {
    let user = await this.repository.findOneBy({ username });
    return { ...user } as User;
  }

  async update(user: User) {
    try {
      await this.repository.update({ id: user.id }, { ...user } as UserEntity);
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('User could not be updated');
    }
  }

  async softDelete(id: string) {
    let updateResult = await this.repository.softDelete({ id, deletedAt: null });

    return updateResult?.affected > 0;
  }
}
