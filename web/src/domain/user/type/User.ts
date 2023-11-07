import { Auditing, Identity } from '@/domain/common';

export type User = Identity &
  Auditing & {
    username: string;
    fullName: string;
    email: string;
  };
