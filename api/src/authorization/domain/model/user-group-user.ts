import { Identity } from '@/common/model/identity';
import { User } from '@/user/domain/model/user';
import { UserGroup } from '@/authorization/domain/model/user-group';

export type UserGroupUser = Identity & {
  user: User;
  userGroup: UserGroup;
};
