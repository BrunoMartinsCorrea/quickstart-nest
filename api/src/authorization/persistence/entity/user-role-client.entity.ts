import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserGroupEntity } from '@/authorization/persistence/entity/user-group.entity';
import { AuditingEntity } from '@/common/entity/auditing.entity';
import { RoleGroupEntity } from '@/authorization/persistence/entity/role-group.entity';
import { ClientEntity } from '@/authorization/persistence/entity/client.entity';

@Entity('user_role_client')
export class UserRoleClientEntity extends AuditingEntity {
  @PrimaryColumn({ name: 'user_group_id' })
  @ManyToOne((_) => UserGroupEntity, (userGroup) => userGroup.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  userGroup: UserGroupEntity;

  @PrimaryColumn({ name: 'role_group_id' })
  @ManyToOne((_) => RoleGroupEntity, (roleGroup) => roleGroup.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  roleGroup: RoleGroupEntity;

  @PrimaryColumn({ name: 'client_id' })
  @ManyToOne((_) => ClientEntity, (client) => client.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  client: ClientEntity;
}
