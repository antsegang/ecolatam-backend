import Joi from 'joi';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createClientSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailPattern).required()
});

export const updateClientSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string(),
  email: Joi.string().pattern(emailPattern)
});
