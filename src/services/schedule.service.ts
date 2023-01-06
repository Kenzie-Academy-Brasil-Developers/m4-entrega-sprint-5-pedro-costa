import AppDataSource from "../data-source";
import { Schedules_users_properties } from "../entities/schedules_users_properties";

import { IScheduleRequest } from "../interfaces/schedules";

export const createScheduleService = async (body: IScheduleRequest) => {
  try {
    const scheduleRepo = AppDataSource.getRepository(
      Schedules_users_properties
    );
    const schedule = scheduleRepo.create(body);

    scheduleRepo.save(schedule);
    return scheduleRepo.save(schedule);
  } catch (error: any) {
    throw new Error(error.errors);
  }
};
