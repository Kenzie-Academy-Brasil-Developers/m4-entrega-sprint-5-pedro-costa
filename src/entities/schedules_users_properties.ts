import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("schedules_users_properties")
export class  Schedules_users_properties {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({type: Date})
  date: string;

  @Column({type: "time"})
  hour: string;

  @PrimaryColumn()
  propertyId: string;

  @PrimaryColumn()
  userId: string;

}