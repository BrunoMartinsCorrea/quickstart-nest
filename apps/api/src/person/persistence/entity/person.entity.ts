import { Column, Entity } from 'typeorm';
import { IdentityEntity } from '@/common/entity/identity.entity';

@Entity('person')
export class PersonEntity extends IdentityEntity {
  @Column('varchar', { length: 50, nullable: false })
  nationalRegistration: string;

  @Column('varchar', { length: 50, nullable: false })
  firstName: string;

  @Column('varchar', { length: 50, nullable: false })
  lastName: string;

  @Column('varchar', { length: 10 })
  birthdate: string;
}
