import { Identity } from '@/common/model/identity';

export type User = Identity & {
  username: string;
  password: string;
  salt: string;
  fullName: string;
  email: string;
};
