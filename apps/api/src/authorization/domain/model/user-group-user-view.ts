import { User } from '@/user/domain/model/user';
import { UserGroup } from '@/authorization/domain/model/user-group';
import { Auditing } from '@/common/model/auditing';

export type UserGroupUserView = Auditing & {
  user: User;
  userGroup: UserGroup;
};
