import { to } from '@nc/utils/async';
import { BadRequest, InternalError, NotFound } from '@nc/utils/errors';
import { Expense, readExpensesInputs } from './types';
import { readExpenses, storeExpense } from './data';

export async function getUserExpenses(queryInput: readExpensesInputs): Promise<Expense[]> {
  if (!queryInput.userId) {
    throw BadRequest('userId property is missing.');
  }

  const [dbError, rowExpenses] = await to(readExpenses(queryInput));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  if (!rowExpenses.length) {
    throw NotFound(`Could not find expenses with id ${queryInput.userId}`);
  }

  return rowExpenses;
}

export async function storeUserExpense(input: Map<string, string | number>): Promise<Expense> {
  const [dbError, userExpense] = await to(storeExpense(input));

  if (dbError) {
    throw InternalError(`Error fetching data from the DB: ${dbError.message}`);
  }

  return userExpense;
}
