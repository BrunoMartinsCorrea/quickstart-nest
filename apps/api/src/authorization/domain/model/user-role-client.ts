import { Auditing } from '@/common/model/auditing';

export type UserRoleClient = Auditing & {
  userGroupId: string;
  roleGroupId: string;
  clientId: string;
};
