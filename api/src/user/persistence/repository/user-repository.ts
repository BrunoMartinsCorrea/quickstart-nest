import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { User } from '@/user/domain/model/user';
import { EntityConflictError } from '@/common/error/entity-conflict-error';

export class UserRepository {
  constructor(@InjectRepository(UserEntity) private repository: Repository<UserEntity>) {}

  async create(user: User) {
    try {
      const savedUser = await this.repository.save({ ...user } as UserEntity);
      return { ...savedUser } as User;
    } catch (e) {
      Logger.error(e);
      throw new EntityConflictError('User could not be created');
    }
  }

  async findOne(id: string) {
    const user = await this.repository.findOne({ where: { id } });
    if (user) {
      return { ...user } as User;
    }
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.repository.findOneBy({ username });
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
    const updateResult = await this.repository.softDelete({ id, deletedAt: null });

    return !!updateResult.affected;
  }
}
