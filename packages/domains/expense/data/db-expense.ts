import { query } from '@nc/utils/db';

const TABLE_NAME = 'expenses';

export function readExpenses(userId: string) {
  return query(`SELECT * FROM ${TABLE_NAME}  where user_id = $1`, [userId])
    .then((response) => response.rows);
}
