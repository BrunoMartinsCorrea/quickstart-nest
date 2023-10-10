import { Column, Entity, OneToMany } from 'typeorm';
import { DescriptionEntity } from '@/common/entity/descrition.entity';
import { RoleGroupToRoleEntity } from './role-group-to-role.entity';

@Entity('role_group')
export class RoleGroupEntity extends DescriptionEntity {
  constructor(name: string, description: string, id?: string) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
  }

  @Column({ default: true, nullable: false })
  active: boolean;

  @OneToMany(() => RoleGroupToRoleEntity, (roleGroupToRole) => roleGroupToRole.roleGroup)
  public roleGroupToRoles: RoleGroupToRoleEntity[];
}
