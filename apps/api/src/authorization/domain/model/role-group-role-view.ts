import { Auditing } from '@/common/model/auditing';
import { RoleGroup } from '@/authorization/domain/model/role-group';
import { Role } from '@/authorization/domain/model/role';

export type RoleGroupRoleView = Auditing & {
  role: Role;
  roleGroup: RoleGroup;
};
