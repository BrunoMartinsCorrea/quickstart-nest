import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '@/user/persistence/entity/user.entity';
import { UserGroupEntity } from '@/authorization/persistence/entity/user-group.entity';
import { AuditingEntity } from '@/common/entity/auditing.entity';

@Entity('user_group_user')
export class UserGroupUserEntity extends AuditingEntity {
  @PrimaryColumn({ name: 'user_id' })
  @ManyToOne((_) => UserEntity, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  user: UserEntity;

  @PrimaryColumn({ name: 'user_group_id' })
  @ManyToOne((_) => UserGroupEntity, (userGroup) => userGroup.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  userGroup: UserGroupEntity;
}
