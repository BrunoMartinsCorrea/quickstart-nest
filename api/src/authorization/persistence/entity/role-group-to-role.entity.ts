import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuditingEntity } from '@/common/entity/auditing.entity';
import { RoleGroupEntity } from './role-group.entity';
import { RoleEntity } from './role.entity';

@Entity('role_group_role')
export class RoleGroupToRoleEntity extends AuditingEntity {
  constructor(roleId: string, roleGroupId: string) {
    super();
    this.roleId = roleId;
    this.roleGroupId = roleGroupId;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roleGroupId: string;

  @Column()
  roleId: string;

  @ManyToOne((_) => RoleGroupEntity, (roleGroup) => roleGroup.roleGroupToRoles)
  roleGroup: RoleGroupEntity;

  @ManyToOne((_) => RoleEntity, (role) => role.roleGroupToRoles)
  role: RoleEntity;
}
