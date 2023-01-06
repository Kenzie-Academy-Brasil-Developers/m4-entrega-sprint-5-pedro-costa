import { Request, Response } from "express";
import {
  createPropertyService,
  getPropertiesService,
} from "../services/property.service";

export const createPropertyController = async (req: Request, res: Response) => {
  const createProperty = await createPropertyService(req.body);
  return res.status(201).json(createProperty);
};

export const getPropertyController = async (req: Request, res: Response) => {
  const getCategories = await getPropertiesService();
  return res.status(200).json(getCategories);
};
