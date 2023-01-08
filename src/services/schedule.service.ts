
import AppDataSource from "../data-source";
import { Properties } from "../entities/properties.entity";
import { Schedules_users_properties } from "../entities/schedules_users_properties";
import { Users } from "../entities/users.entity";
import { AppError } from "../errors";
import { IScheduleRequest } from "../interfaces/schedules";

export const createScheduleService = async (
  body: IScheduleRequest,
  userId: string
) => {
  const scheduleRepo = AppDataSource.getRepository(Schedules_users_properties);
  const propertyRepo = AppDataSource.getRepository(Properties);
  const userRepo = AppDataSource.getRepository(Users);

  const findProperty = await propertyRepo.findOneBy({ id: body.propertyId });
  const findUser = await userRepo.findOneBy({ id: userId });

  if (!findProperty) {
    throw new AppError("property not found", 404);
  }

  const propertyQueryBuilder = propertyRepo.createQueryBuilder("properties");

  const propertySchedulesVerification = await propertyQueryBuilder
    .leftJoinAndSelect(
      "properties.schedules",
      "schedule",
      "schedule.date = :date",
      {
        date: body.date,
      }
    )
    .where("schedule.hour= :hour", { hour: body.hour })
    .andWhere("schedule.date= :date", { date: body.date })
    .andWhere("properties.id = :id", { id: body.propertyId })
    .getOne();

  const userQueryBuilder = userRepo.createQueryBuilder("users");
  const userSchedulesVerification = await userQueryBuilder
    .leftJoinAndSelect("users.schedules", "schedule")
    .where("schedule.hour= :hour", { hour: body.hour })
    .andWhere("users.id = :id", { id: findUser?.id })
    .getOne();

  if (propertySchedulesVerification || userSchedulesVerification) {
    throw new AppError("schedule already exist for this time", 409);
  }

  const schedule = scheduleRepo.create({
    date: body.date,
    hour: body.hour,
    property: findProperty,
    user: findUser!,
  });

  await scheduleRepo.save(schedule);
};

export const getSchedulesService = async (id: string) => {
  const propertyRepo = AppDataSource.getRepository(Properties);
  const findProperty = await propertyRepo.findOneBy({ id });

  if (!findProperty) {
    throw new AppError("property not found", 404);
  }

  const propertyQueryBuilder = propertyRepo.createQueryBuilder("properties");

  const userSchedulesVerification = await propertyQueryBuilder
    .leftJoinAndSelect("properties.schedules", "schedule")
    .leftJoinAndSelect("schedule.user", "user")
    .getOne();

  return userSchedulesVerification;
};
