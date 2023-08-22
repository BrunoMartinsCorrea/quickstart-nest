import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { User } from '@/user/domain/model/user';
import { EntityConflictError } from '@/common/error/entity-conflict-error';
import { PaginationDto } from '@/common/dto/pagination.dto';

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

  async listAll(pagination: PaginationDto): Promise<[User[], number]> {
    const { limit, page } = pagination;
    const PAGE_INDEX_FIXER = 1;
    return this.repository.findAndCount({ withDeleted: false, take: limit, skip: limit * (page - PAGE_INDEX_FIXER) });
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
