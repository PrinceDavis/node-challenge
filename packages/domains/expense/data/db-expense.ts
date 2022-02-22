import { query } from '@nc/utils/db';
import { Expense, readExpensesInputs } from '../types';

const TABLE_NAME = 'expenses';

export function readExpenses(queryInput: readExpensesInputs): Promise<Expense[]> {
  const { userId, sortBy } = queryInput;
  const queryArgs = [userId];
  const queryString = [`SELECT * FROM ${TABLE_NAME}  where user_id = $1 `];
  if (sortBy) {
    queryString.push(`ORDER BY ${sortBy} DESC`);
  }
  return query(queryString.join(''), queryArgs).then((response) => response.rows);
}
