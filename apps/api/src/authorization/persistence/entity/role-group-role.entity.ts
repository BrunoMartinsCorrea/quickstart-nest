import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RoleGroupEntity } from '@/authorization/persistence/entity/role-group.entity';
import { AuditingEntity } from '@/common/entity/auditing.entity';
import { RoleEntity } from '@/authorization/persistence/entity/role.entity';

@Entity('role_group_role')
export class RoleGroupRoleEntity extends AuditingEntity {
  @PrimaryColumn({ name: 'role_id' })
  @ManyToOne((_) => RoleEntity, (role) => role.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  role: RoleEntity;

  @PrimaryColumn({ name: 'role_group_id' })
  @ManyToOne((_) => RoleGroupEntity, (roleGroup) => roleGroup.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  roleGroup: RoleGroupEntity;
}
