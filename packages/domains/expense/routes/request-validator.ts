import Joi from 'joi';

/**
 * Validate get request query parametrs
 * @param req
 * @param res
 * @param next
 * @returns
 */
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

/**
 * Validate post request body parametrs
 * @param req
 * @param res
 * @param next
 * @returns
 */
export function validateBodyInputs(req, res, next) {
  const schema = Joi.object({
    status: Joi.string().valid('pending', 'processed').required(),
    merchantName: Joi.string().max(40).required(),
    currency: Joi.string().min(3).max(4).required(),
    dateCreated: Joi.string().max(25).required(),
    userId: Joi.string().required(),
    amount: Joi.number().required(),
  }).required();

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(403).json({
      error: error.message,
    });
  }

  next();
}
