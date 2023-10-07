import { Entity } from 'typeorm';
import { DescriptionEntity } from '@/common/entity/descrition.entity';

@Entity('user_group')
export class UserGroupEntity extends DescriptionEntity {
  active: boolean;
}
