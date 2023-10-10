import { Description } from '@/common/model/description';
import { Role } from './role';

export type RoleGroup = Description & {
  active: boolean;
  roles?: Role[];
};
