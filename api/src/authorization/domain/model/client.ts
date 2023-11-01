import { Description } from '@/common/model/description';

export type Client = Description & {
  active: boolean;
};
