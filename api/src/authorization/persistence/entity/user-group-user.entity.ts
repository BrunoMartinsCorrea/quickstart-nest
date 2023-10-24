import { Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IdentityEntity } from '@/common/entity/identity.entity';
import { UserEntity } from '@/user/persistence/entity/user.entity';
import { UserGroupEntity } from '@/authorization/persistence/entity/user-group.entity';

@Entity('user_group_user')
@Unique(['user', 'userGroup'])
export class UserGroupUserEntity extends IdentityEntity {
  @ManyToOne((_) => UserEntity, (object) => object.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  user: UserEntity;

  @ManyToOne((_) => UserGroupEntity, (object) => object.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  userGroup: UserGroupEntity;
}
