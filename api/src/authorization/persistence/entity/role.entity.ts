import { Entity } from 'typeorm';
import { DescriptionEntity } from '@/common/entity/descrition.entity';

@Entity('role')
export class RoleEntity extends DescriptionEntity {}
