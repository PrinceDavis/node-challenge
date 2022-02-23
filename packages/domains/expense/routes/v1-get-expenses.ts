import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import Logger from '@nc/utils/logging';
import { Router } from 'express';
import { to } from '@nc/utils/async';
import { validateQueryInputs } from './request-validator';
import { getData, saveData } from '../data';

export const router = Router();

const logger = Logger('get-expenses');

router.get('/get-user-expenses', validateQueryInputs, async function getUserExpensesHandler(req, res, next) {
  const query = {
    merchantName: <string>req.query.merchantName || '',
    currency: <string>req.query.currency || '',
    pageSize: <string>req.query.pageSize || '',
    sortBy: <string>req.query.sortBy || '',
    status: <string>req.query.status || '',
    page: <string>req.query.page || '',
    userId: <string>req.query.userId,
  };
  const data = await getData(req.url);
  if (data) {
    return res.json(JSON.parse(data));
  }
  const [expenseError, userExpenses] = await to(getUserExpenses(query));

  if (expenseError) {
    return next(new ApiError(expenseError, expenseError.status, `Could not get user details: ${expenseError}`, expenseError.title, req));
  }

  if (!userExpenses.length) {
    return res.json({});
  }
  const [redisError] = await to(saveData(req.url, userExpenses));
  logger.error(redisError);
  return res.json(userExpenses);
});
