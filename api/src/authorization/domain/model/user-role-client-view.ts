import { UserGroup } from '@/authorization/domain/model/user-group';
import { Auditing } from '@/common/model/auditing';
import { RoleGroup } from '@/authorization/domain/model/role-group';
import { Client } from '@/authorization/domain/model/client';

export type UserRoleClientView = Auditing & {
  userGroup: UserGroup;
  roleGroup: RoleGroup;
  client: Client;
};
