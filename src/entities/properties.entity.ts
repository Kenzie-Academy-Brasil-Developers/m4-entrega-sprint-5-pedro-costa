import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Addresses } from "./addresses.entity";
import { Categories } from "./categories.entity";
import { Users } from "./users.entity";

@Entity("properties")
export class Properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Addresses, "uuid")
  @JoinColumn()
  addresseId: Addresses;

  @ManyToOne(() => Categories)
  categoryId: Categories;

  @ManyToMany(() => Users, (users) => users.schedules)
  @JoinTable({
    name: "schedules_users_properties",
    joinColumn: {
      name: "propertyId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
  })
  schedules: Users[];
}
