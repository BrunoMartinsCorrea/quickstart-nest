import { Column, Entity } from 'typeorm';
import { DescriptionEntity } from '@/common/entity/descrition.entity';

@Entity('user_group')
export class UserGroupEntity extends DescriptionEntity {
  @Column({ default: true, nullable: false })
  active: boolean;
}
