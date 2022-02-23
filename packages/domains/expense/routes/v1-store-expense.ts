import { ApiError } from '@nc/utils/errors';
import { Router } from 'express';
import { storeUserExpense } from '../model';
import { to } from '@nc/utils/async';
import { validateBodyInputs } from './request-validator';

export const router = Router();

router.post('/store-user-expense', validateBodyInputs, async function storeUserExpensesHandler(req, res, next) {
  const body = {
    merchant_name: req.body.merchantName,
    date_created: req.body.dateCreated,
    amount_in_cents: req.body.amount,
    currency: req.body.currency,
    user_id: req.body.userId,
    status: req.body.status,
  };
  const input = new Map();

  for (const key of Object.keys(body)) {
    input.set(key, body[key]);
  }

  const [expenseError, userExpense] = await to(storeUserExpense(input));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user details: ${expenseError}`, expenseError.title, req));
  }

  return res.json(userExpense);
});
