import { Entity, OneToMany } from 'typeorm';
import { DescriptionEntity } from '@/common/entity/descrition.entity';
import { RoleGroupToRoleEntity } from './role-group-to-role.entity';

@Entity('role')
export class RoleEntity extends DescriptionEntity {
  @OneToMany(() => RoleGroupToRoleEntity, (roleGroupToRole) => roleGroupToRole.role)
  public roleGroupToRoles: RoleGroupToRoleEntity[];
}
