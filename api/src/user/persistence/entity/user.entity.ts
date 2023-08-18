import { Column, Entity, Index } from 'typeorm';
import { AuditingEntity } from '@/common/entity/auditing.entity';

@Entity('user')
export class UserEntity extends AuditingEntity {
  @Index('ix_user_username')
  @Index('uq_user_username', { unique: true })
  @Column('varchar', { length: 255, nullable: false })
  username: string;

  @Column('varchar', { length: 255, nullable: false })
  password: string;

  @Column('varchar', { length: 255, nullable: false })
  salt: string;

  @Column('varchar', { length: 255, nullable: false })
  fullName: string;

  @Index('uq_user_email', { unique: true })
  @Column('varchar', { length: 255, nullable: false })
  email: string;
}
