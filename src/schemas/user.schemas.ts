import * as yup from "yup";

export const createUserShape = yup.object().shape({
  name: yup.string().max(200).required("name is required"),
  email: yup.string().max(200).required("email is required").email("have to be a email"),
  password: yup.string().max(200).required("password is required"),
  isAdm: yup.boolean().required("isAdm is required")
}).noUnknown(true).strict();


export const patchUserShape = yup.object().shape({
  name: yup.string().max(200),
  email: yup.string().max(200).email("have to be a email"),
  password: yup.string().max(200),
  
}).noUnknown(true).strict() ;
