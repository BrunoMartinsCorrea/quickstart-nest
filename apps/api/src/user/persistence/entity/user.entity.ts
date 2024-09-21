import { Column, Entity } from 'typeorm';
import { IdentityEntity } from '@/common/entity/identity.entity';

@Entity('user')
export class UserEntity extends IdentityEntity {
  @Column('varchar', { length: 255, nullable: false, unique: true })
  username: string;

  @Column('varchar', { length: 255, nullable: false })
  password: string;

  @Column('varchar', { length: 255, nullable: false })
  salt: string;

  @Column('varchar', { length: 255, nullable: false })
  fullName: string;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  email: string;
}
