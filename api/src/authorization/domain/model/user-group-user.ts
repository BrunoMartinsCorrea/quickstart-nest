import { Auditing } from '@/common/model/auditing';

export type UserGroupUser = Auditing & {
  userId: string;
  userGroupId: string;
};
