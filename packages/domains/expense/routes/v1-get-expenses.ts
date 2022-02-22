import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import { Router } from 'express';
import { to } from '@nc/utils/async';

export const router = Router();

router.get('/get-user-expenses', async function getUserExpensesHandler(req, res, next) {
  const [expenseError, userExpenses] = await to(getUserExpenses(<string>req.query?.userId));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user details: ${expenseError}`, expenseError.title, req));
  }

  if (!userExpenses.length) {
    return res.json({});
  }

  return res.json(userExpenses);
});
