import { Entity } from 'typeorm';
import { DescriptionEntity } from '@/common/entity/description.entity';

@Entity('role')
export class RoleEntity extends DescriptionEntity {}
