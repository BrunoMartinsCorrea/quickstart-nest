import { Auditing, Identity } from '@/domain/common';

export type Client = Identity &
  Auditing & {
    name: string;
    description: string;
    active: boolean;
  };
