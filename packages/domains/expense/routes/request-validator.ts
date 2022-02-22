import Joi from 'joi';

export function validateQueryInputs(req, res, next) {
  const schema = Joi.object({
    sortBy: Joi.string().valid('amount_in_cents', 'date_created'),
    status: Joi.string().valid('pending', 'processed'),
    merchantName: Joi.string().max(40),
    currency: Joi.string().max(4),
    userId: Joi.string().required(),
  }).required();
  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(403).json({
      error: error.message,
    });
  }
  next();
}
