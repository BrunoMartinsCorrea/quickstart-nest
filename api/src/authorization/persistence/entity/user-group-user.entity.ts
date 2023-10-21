import { Entity, JoinTable, ManyToOne } from 'typeorm';
import { IdentityEntity } from '@/common/entity/identity.entity';
import { UserEntity } from '@/user/persistence/entity/user.entity';
import { UserGroupEntity } from '@/authorization/persistence/entity/user-group.entity';

@Entity('user_group_user')
export class UserGroupUserEntity extends IdentityEntity {
  @ManyToOne((_) => UserEntity, (object) => object.id, { cascade: true, onDelete: 'CASCADE', eager: true })
  @JoinTable({ joinColumn: { name: 'user_id' } })
  user: UserEntity;

  @ManyToOne((_) => UserGroupEntity, (object) => object.id, { cascade: true, onDelete: 'CASCADE', eager: true })
  @JoinTable({ joinColumn: { name: 'user_group_id' } })
  userGroup: UserGroupEntity;
}
