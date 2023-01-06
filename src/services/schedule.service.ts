import AppDataSource from "../data-source";
import { Properties } from "../entities/properties.entity";
import { Schedules_users_properties } from "../entities/schedules_users_properties";
import { AppError } from "../errors";
import { IScheduleRequest } from "../interfaces/schedules";

export const createScheduleService = async (
  body: IScheduleRequest,
  userId: string
) => {
  const date = body.date + ":" + body.hour;
  const pedro = new Date(date);

  const scheduleRepo = AppDataSource.getRepository(Schedules_users_properties);
  const propertyRepo = AppDataSource.getRepository(Properties);
  const findProperty = await propertyRepo.findOneBy({ id: body.propertyId });

  if (!findProperty) {
    throw new AppError("property not found", 404);
  }

  const hour = body.hour;
  hour.replace(":", ".");
  const treatedHourData = parseInt(hour);

  if (treatedHourData < 8) {
    throw new AppError("property not found", 400);
  }

  if (treatedHourData > 18) {
    throw new AppError("property not found", 400);
  }

  body.userId = userId;
  const schedule = scheduleRepo.create(body);
  await scheduleRepo.save(schedule);
  return pedro;
};

export const getSchedulesService = async () => {
  const propertyRepo = AppDataSource.getRepository(Schedules_users_properties);

  return await propertyRepo.find();
};
