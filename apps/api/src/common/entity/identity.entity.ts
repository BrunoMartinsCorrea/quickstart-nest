import { PrimaryGeneratedColumn } from 'typeorm';
import { AuditingEntity } from '@/common/entity/auditing.entity';

export abstract class IdentityEntity extends AuditingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
