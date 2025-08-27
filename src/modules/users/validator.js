import Joi from 'joi';

export const createUserSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  birthdate: Joi.string().required(),
  location: Joi.string().required(),
  id_pais: Joi.number().required(),
  id_provincia: Joi.number().required(),
  id_canton: Joi.number().required(),
  id_distrito: Joi.number().required(),
  zip: Joi.string().required(),
  cellphone: Joi.string().required(),
  phone: Joi.string().required(),
  username: Joi.string(),
  password: Joi.string().min(6),
  email: Joi.string().email()
});

export const updateUserSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string(),
  lastname: Joi.string(),
  birthdate: Joi.string(),
  location: Joi.string(),
  id_pais: Joi.number(),
  id_provincia: Joi.number(),
  id_canton: Joi.number(),
  id_distrito: Joi.number(),
  zip: Joi.string(),
  cellphone: Joi.string(),
  phone: Joi.string(),
  username: Joi.string(),
  password: Joi.string().min(6),
  email: Joi.string().email()
});
