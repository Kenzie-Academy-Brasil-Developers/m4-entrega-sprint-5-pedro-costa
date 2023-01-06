import * as yup from "yup";


export const createScheduleShape = yup.object().shape({
    date: yup.string().required() ,
	hour: yup.string().required() ,
	propertyId: yup.string().required(),
    userId: yup.string().default(() => null)
  }).noUnknown(true).strict();
