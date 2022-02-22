import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { validateQueryInputs } from './request-validator';

export const router = Router();

router.get('/get-user-expenses', validateQueryInputs, async function getUserExpensesHandler(req, res, next) {
  const query = {
    merchantName: <string>req.query.merchantName || '',
    currency: <string>req.query.currency || '',
    sortBy: <string>req.query.sortBy || '',
    status: <string>req.query.status || '',
    userId: <string>req.query.userId,
  };
  const [expenseError, userExpenses] = await to(getUserExpenses(query));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user details: ${expenseError}`, expenseError.title, req));
  }

  if (!userExpenses.length) {
    return res.json({});
  }

  return res.json(userExpenses);
});
