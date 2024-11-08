import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { IdentityEntity } from '@/common/entity/identity.entity';
import { UserEntity } from '@/user/persistence/entity/user.entity';

@Entity('event')
export class EventEntity extends IdentityEntity {
  @PrimaryColumn({ name: 'user_id' })
  @ManyToOne((_) => UserEntity, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  user: UserEntity;

  @Column('varchar', { length: 25, nullable: false })
  begin: string;

  @Column('varchar', { length: 25 })
  end: string;

  @Column('boolean', { nullable: false, default: false })
  isAllDay: boolean;

  @Column('varchar', { length: 255, nullable: false })
  recurrenceType: string;

  @Column('varchar', { length: 255, nullable: false })
  recurrenceAmount: string;
}
