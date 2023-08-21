import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@/user/persistence/repository/user-repository';
import { User } from '@/user/domain/model/user';
import { InvalidCredentialsError } from '@/user/domain/error/invalid-credentials-error';
import { EntityNotFoundError } from '@/common/error/entity-not-found-error';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async create(user: User) {
    const encryptedUser = await this.encrypt(user);
    Logger.log(`encryptedUser => username:${encryptedUser.username} email:${encryptedUser.email}`);
    const createdUser = await this.repository.create(encryptedUser);

    Logger.log(`User created { "id": "${createdUser.id}" }`);

    return createdUser;
  }

  async validate(user: User, password: string) {
    const hashedPassword = await bcrypt.hash(password, user.salt);

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
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new EntityNotFoundError('User not found');
    }

    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.repository.findOneByUsername(username);

    if (!user) {
      throw new EntityNotFoundError('User not found');
    }

    return user;
  }

  async update(user: User) {
    const currentUser = await this.validateById(user.id, user.password);
    const encryptedUser = await this.encryptWithSalt(user, currentUser.salt);
    user.password = await bcrypt.hash(user.password, currentUser.salt);

    await this.repository.update(encryptedUser);
    Logger.log(`User updated { "id": "${user.id}" }`);

    return encryptedUser;
  }

  async softDelete(id: string) {
    const hasDeleted = await this.repository.softDelete(id);

    if (hasDeleted) {
      Logger.log(`User deleted { "id": "${id}" }`);
    } else {
      throw new EntityNotFoundError('User not found');
    }
  }

  private async encrypt(user: User) {
    const salt = await bcrypt.genSalt();
    return this.encryptWithSalt(user, salt);
  }

  private async encryptWithSalt(user: User, salt: string) {
    return {
      ...user,
      salt,
      password: await bcrypt.hash(user.password, salt),
    } as User;
  }
}
