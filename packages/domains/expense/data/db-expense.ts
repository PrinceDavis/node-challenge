import { query } from '@nc/utils/db';
import { v4 as uuidv4 } from 'uuid';
import { Expense, readExpensesInputs } from '../types';

const TABLE_NAME = 'expenses';

export function readExpenses(queryInput: readExpensesInputs): Promise<Expense[]> {
  const { queryString, queryArgs } = buildSqlQuery(queryInput);
  return query(queryString, queryArgs).then((response) => response.rows);
}

export function storeExpense(input: Map<String, String | number>) {
  input.set('id', uuidv4());
  const keys = Array.from(input.keys());
  const values = Array.from(input.values());

  const valuePlaceHolder = getValuePlaceHolders(keys.length);
  const sql = `INSERT INTO ${TABLE_NAME}(${keys.join(', ')}) VALUES(${valuePlaceHolder.join(', ')})`;
  return query(sql, values).then((response) => response.rowCount);
}

function getValuePlaceHolders(length: number) {
  const placeHolders = [];
  for (let i = 1; i <= length; i++) {
    placeHolders.push(`$${i}`);
  }
  return placeHolders;
}

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

function getPagination(page, pageSize) {
  const pageNumber = page || 1;
  return {
    limit: pageSize,
    skip: (pageNumber - 1) * pageSize,
  };
}
