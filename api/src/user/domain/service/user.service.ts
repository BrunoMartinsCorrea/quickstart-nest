import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../persistence/entities/user.entity';
import { EntityNotFoundError } from '../../../common/error/entity-not-found-error';
import { InvalidCredentialsError } from '../error/invalid-credentials-error';
import { EntityConflictError } from '../../../common/error/entity-conflict-error';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(user: User) {
    try {
      user.salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, user.salt);
      let createdUser = await this.repository.save(user);

      Logger.log(`User created { "id": "${createdUser.id}" }`);

      return createdUser;
    } catch (e) {
      throw new EntityConflictError('User could not be created');
    }
  }

  async validate(user: User, password: string) {
    let hashedPassword = await bcrypt.hash(password, user.salt);

    if (hashedPassword !== user.password) {
      throw new InvalidCredentialsError('Username or password is invalid!');
    }

    return user;
  }

  async validateById(id: string, password: string) {
    let user: User;

    try {
      user = await this.findOne(id);
    } catch {
      throw new InvalidCredentialsError('Username or password is invalid!');
    }

    return this.validate(user, password);
  }

  async validateByUsername(username: string, password: string) {
    let user: User;

    try {
      user = await this.findOneByUsername(username);
    } catch {
      throw new InvalidCredentialsError('Username or password is invalid!');
    }

    return this.validate(user, password);
  }

  async findOne(id: string) {
    let user = await this.repository.findOne({ where: { id: id } });

    Logger.debug(`id => ${id}, User => ${user}`);

    if (!user) {
      throw new EntityNotFoundError('User not found');
    }

    return user;
  }

  async findOneByUsername(username: string) {
    let user = await this.repository.findOneBy({ username });

    if (!user) {
      throw new EntityNotFoundError('User not found');
    }

    return user;
  }

  async update(user: User) {
    let currentUser = await this.validateById(user.id, user.password);

    user.password = await bcrypt.hash(user.password, currentUser.salt);
    await this.repository.update({ id: user.id }, user);

    return currentUser;
  }

  async softDelete(id: string) {
    let updateResult = await this.repository.softDelete({ id, deletedAt: null });
    let hasDeleted = updateResult.affected > 0;

    if (!hasDeleted) {
      throw new EntityNotFoundError('User not found');
    }
  }
}
