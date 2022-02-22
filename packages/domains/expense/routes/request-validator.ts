import Joi from 'joi';

export function validateQueryInputs(req, res, next) {
  const schema = Joi.object({
    sortBy: Joi.string().valid('amount_in_cents', 'date_created'),
    status: Joi.string().valid('pending', 'processed'),
    currency: Joi.string().length(3).max(4),
    merchantName: Joi.string().max(40),
    userId: Joi.string().required(),
    pageSize: Joi.number(),
    page: Joi.number(),
  }).required();
  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(403).json({
      error: error.message,
    });
  }
  next();
}
