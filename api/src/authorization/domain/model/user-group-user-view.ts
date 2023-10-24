import { Identity } from '@/common/model/identity';
import { User } from '@/user/domain/model/user';
import { UserGroup } from '@/authorization/domain/model/user-group';

export type UserGroupUserView = Identity & {
  user: User;
  userGroup: UserGroup;
};
