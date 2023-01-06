import AppDataSource from "../data-source";
import { Categories } from "../entities/categories.entity";
import { Properties } from "../entities/properties.entity";
import { AppError } from "../errors";
import { ICategoryRequest } from "../interfaces/categories";

export const createCategoryService = async (body: ICategoryRequest) => {
  const categoryRepo = AppDataSource.getRepository(Categories);
  const category = categoryRepo.create(body);
  const findCategory = await categoryRepo.findOneBy({ name: body.name });

  if (findCategory) {
    throw new AppError("category already exist", 409);
  }

  return await categoryRepo.save(category);
};

export const getCategoriesService = async () => {
  const categoryRepo = AppDataSource.getRepository(Categories);

  return await categoryRepo.find();
};

export const getPropertiesCategoryService = async (id: string) => {
  const categoryRepo = AppDataSource.getRepository(Categories);

  const findCategory = await categoryRepo.findOneBy({ id });
  if (!findCategory) {
    throw new AppError("category not exist", 404);
  }

  const findPropertiesCategory = await categoryRepo.findOne({
    where: { id },
    relations: { properties: true },
  });

  return findPropertiesCategory;
};
