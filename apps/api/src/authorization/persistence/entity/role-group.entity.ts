import { Column, Entity } from 'typeorm';
import { DescriptionEntity } from '@/common/entity/description.entity';

@Entity('role_group')
export class RoleGroupEntity extends DescriptionEntity {
  @Column({ default: true, nullable: false })
  active: boolean;
}
