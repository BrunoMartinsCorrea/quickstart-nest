import { Column, Entity } from 'typeorm';
import { DescriptionEntity } from '@/common/entity/descrition.entity';

@Entity('client')
export class ClientEntity extends DescriptionEntity {
  @Column({ default: true, nullable: false })
  active: boolean;
}
