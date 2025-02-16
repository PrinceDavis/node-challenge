import { query } from '@nc/utils/db';
import { v4 as uuidv4 } from 'uuid';
import { Expense, readExpensesInputs } from '../types';

const TABLE_NAME = 'expenses';

/**
 * Get expense rows from the db
 * @param queryInput a plain object representing query parameter
 * @returns Promise<Expense>  a promise representing database expense row
 */
export function readExpenses(queryInput: readExpensesInputs): Promise<Expense[]> {
  const { queryString, queryArgs } = buildSqlQuery(queryInput);

  return query(queryString, queryArgs).then((response) => response.rows);
}

/**
 * Insert expense data in the db
 * @param input A map object representing data to be inserted
 * @returns Promise<Expense>  a promise representing database expense row
 */
export async function storeExpense(input: Map<String, String | number>): Promise<Expense> {
  input.set('id', uuidv4());
  const keys = Array.from(input.keys());
  const values = Array.from(input.values());

  const valuePlaceHolder = getValuePlaceHolders(keys.length);
  const sql = `INSERT INTO ${TABLE_NAME}(${keys.join(', ')}) VALUES(${valuePlaceHolder.join(', ')})`;

  await query(sql, values);
  return query(`SELECT * FROM ${TABLE_NAME} WHERE id = $1`, [input.get('id')])
    .then((response) => response.rows[0]);
}

/**
 * Build a return a list to be used as sql prepared statment parameter
 * @param length the length of parameters to return
 * @returns an array of sql prepared statment parameter eg [$1, $2]
 */
function getValuePlaceHolders(length: number): String[] {
  const placeHolders = [];

  for (let i = 1; i <= length; i++) {
    placeHolders.push(`$${i}`);
  }

  return placeHolders;
}

/**
 * Construct and return sql query string and values
 * @param queryInput a plain object representing query parameter
 * @returns sql query string and prepared statement values
 */
function buildSqlQuery(queryInput: readExpensesInputs) {
  const { userId, sortBy, merchantName, currency, status, pageSize, page } = queryInput;
  const queryString = [`SELECT * FROM ${TABLE_NAME}  where user_id = $1`];
  let currentParameter = 1;
  const queryArgs = [userId];

  if (merchantName) {
    currentParameter += 1;
    queryString.push(`AND merchant_name = $${currentParameter}`);
    queryArgs.push(merchantName);
  }

  if (currency) {
    currentParameter += 1;
    queryString.push(`AND currency = $${currentParameter}`);
    queryArgs.push(currency);
  }

  if (status) {
    currentParameter += 1;
    queryString.push(`AND status = $${currentParameter}`);
    queryArgs.push(status);
  }

  if (sortBy) {
    queryString.push(`ORDER BY ${sortBy} DESC`);
  }

  if (pageSize) {
    const { limit, skip } = getPagination(Number(page), Number(pageSize));
    queryString.push(`LIMIT ${limit} OFFSET ${skip};`);
  }

  return {
    queryString: queryString.join(' '),
    queryArgs,
  };
}

/**
 * return pagination value
 * @param page page number
 * @param pageSize page size
 * @returns
 */
function getPagination(page, pageSize) {
  const pageNumber = page || 1;
  return {
    limit: pageSize,
    skip: (pageNumber - 1) * pageSize,
  };
}
