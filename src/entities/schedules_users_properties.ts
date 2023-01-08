import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Properties } from "./properties.entity";
import { Users } from "./users.entity";

@Entity("schedules_users_properties")
export class Schedules_users_properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Properties, (property) => property.schedules)
  property: Properties;

  @ManyToOne(() => Users, (user) => user.schedules)
  user: Users;
}
