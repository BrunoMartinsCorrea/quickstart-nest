import { Identity } from '@/common/model/identity';

export type Description = Identity & {
  name: string;
  description: string;
};
