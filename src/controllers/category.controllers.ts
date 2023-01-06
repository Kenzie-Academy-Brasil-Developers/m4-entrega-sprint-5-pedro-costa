import { Request, Response } from "express";
import {
  createCategoryService,
  getCategoriesService,
  getPropertiesCategoryService,
} from "../services/category.service";

export const createCategoryController = async (req: Request, res: Response) => {
  req.body.userId = req.user.id;
  const crateCategory = await createCategoryService(req.body);
  return res.status(201).json(crateCategory);
};

export const getCategoriesController = async (req: Request, res: Response) => {
  const getCategories = await getCategoriesService();
  return res.status(200).json(getCategories);
};

export const getPropertiesCategoryController = async (
  req: Request,
  res: Response
) => {
  const getPropertiesCategory = await getPropertiesCategoryService(
    req.params.id
  );
  return res.status(200).json(getPropertiesCategory);
};
