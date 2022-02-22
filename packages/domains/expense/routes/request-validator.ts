import Joi from 'joi';

export function validateQueryInputs(req, res, next) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    sortBy: Joi.string().valid('amount_in_cents', 'date_created'),
  }).required();
  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(403).json({
      error: error.message,
    });
  }
  next();
}
