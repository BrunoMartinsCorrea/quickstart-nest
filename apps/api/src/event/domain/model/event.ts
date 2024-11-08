import { Identity } from '@/common/model/identity';

export type Event = Identity & {
  userId: string;
  begin: string;
  end: string;
  isAllDay: boolean;
  recurrenceType: string;
  recurrenceAmount: string;
};
