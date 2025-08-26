import Joi from 'joi';

export const createAdminSchema = Joi.object({
  id_user: Joi.number().required(),
  added_by: Joi.number().required(),
  id: Joi.number()
});
