import Joi from 'joi';

export const createUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required()
});

export const updateUserSchema = Joi.object({
  id: Joi.number().required(),
  username: Joi.string(),
  password: Joi.string().min(6),
  role: Joi.string()
});
