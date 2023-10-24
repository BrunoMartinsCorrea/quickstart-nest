import { Identity } from '@/common/model/identity';

export type UserGroupUser = Identity & {
  userId: string;
  userGroupId: string;
};
