import { Auditing } from '@/common/model/auditing';

export type RoleGroupRole = Auditing & {
  roleId: string;
  roleGroupId: string;
};
