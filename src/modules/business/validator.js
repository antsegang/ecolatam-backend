import Joi from 'joi';

export const createBusinessSchema = Joi.object({
  id_user: Joi.number().required(),
  name: Joi.string(),
  location: Joi.string(),
  id_pais: Joi.number(),
  id_provincia: Joi.number(),
  id_canton: Joi.number(),
  id_distrito: Joi.number(),
  zip: Joi.string(),
  id_bcategory: Joi.number(),
  phone: Joi.string()
});

export const updateBusinessSchema = Joi.object({
  id: Joi.number().required(),
  id_user: Joi.number(),
  name: Joi.string(),
  location: Joi.string(),
  id_pais: Joi.number(),
  id_provincia: Joi.number(),
  id_canton: Joi.number(),
  id_distrito: Joi.number(),
  zip: Joi.string(),
  id_bcategory: Joi.number(),
  phone: Joi.string()
});
