import { Auditing } from '@/common/model/auditing';

export type Identity = Auditing & {
  id: string;
};
