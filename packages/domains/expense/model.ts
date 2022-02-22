import { Expense } from './types';
import { readExpenses } from './data';
import { to } from '@nc/utils/async';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';

export async function getUserExpenses(userId: string): Promise<Expense[]> {
  if (!userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rowExpenses] = await to(readExpenses(userId));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rowExpenses.length) {
    throw NotFound(`Could not find expenses with id ${userId}`);
  }

  return rowExpenses;
}
