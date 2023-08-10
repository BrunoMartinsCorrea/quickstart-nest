import { Auditing } from '@/common/model/auditing';

export class User implements Auditing {
  constructor(
    public id: string,
    public createdAt: string,
    public updatedAt: string,
    public deletedAt: string,
    public username: string,
    public password: string,
    public salt: string,
    public fullName: string,
    public email: string,
  ) {}
}
