import { Identity } from '@/common/model/identity';
import { User } from '@/user/domain/model/user';

export type EventView = Identity & {
  user: User;
  begin: string;
  end: string;
  isAllDay: boolean;
  recurrenceType: string;
  recurrenceAmount: string;
};
