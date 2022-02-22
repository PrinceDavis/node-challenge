import { Expense } from '../types';
import { query } from '@nc/utils/db';

const TABLE_NAME = 'expenses';

export function readExpenses(userId: string): Promise<Expense[]> {
  return query(`SELECT * FROM ${TABLE_NAME}  where user_id = $1`, [userId])
    .then((response) => response.rows);
}
