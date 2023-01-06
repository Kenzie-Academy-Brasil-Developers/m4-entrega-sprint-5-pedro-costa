import * as yup from "yup";


export const createpropertyShape = yup.object().shape({
  value: yup.number().required("name is required"),
  size: yup.number().required("email is required"),
  categoryId: yup.string().required("is required"),
  address: yup.object().shape({
    district: yup.string().required("password is required"),
    zipCode: yup.string().max(8).required("is required"),
    city: yup.string().required( "is required"),
    state: yup.string().max(2).required("is required"),
    number: yup.string()
  })
}).noUnknown(true).strict();



