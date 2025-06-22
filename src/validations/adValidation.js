const Joi = require("joi");

const adSchema = Joi.object({
  title: Joi.string().min(3).required(),
  category: Joi.string().min(3).required(),
  price: Joi.number().positive().required(),
  description: Joi.string().min(10).required(),
});

module.exports = {
  adSchema,
};