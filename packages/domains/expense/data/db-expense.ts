import { query } from '@nc/utils/db';
import { Expense, readExpensesInputs } from '../types';

export function readExpenses(queryInput: readExpensesInputs): Promise<Expense[]> {
  const { queryString, queryArgs } = buildSql(queryInput);
  return query(queryString, queryArgs).then((response) => response.rows);
}

function buildSql(queryInput: readExpensesInputs) {
  const TABLE_NAME = 'expenses';
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
