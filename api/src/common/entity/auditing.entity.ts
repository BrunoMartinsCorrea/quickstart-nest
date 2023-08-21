import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditingEntity {
  // @ts-ignore
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: `pk_${this.constructor.name}_id` })
  id: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
