import { Column } from 'typeorm';
import { IdentityEntity } from '@/common/entity/identity.entity';

export abstract class DescriptionEntity extends IdentityEntity {
  @Column('varchar', { length: 255, nullable: false, unique: true })
  name: string;

  @Column('varchar', { length: 255 })
  description: string;
}
