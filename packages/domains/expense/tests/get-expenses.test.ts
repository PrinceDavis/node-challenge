import { Expense } from '../types';
import { readExpenses } from '../data';
import { connect, query } from '@nc/utils/db';

const JEPPED_ID = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474';
const JANDAID = 'e17825a6-ad80-41bb-a76b-c5ee17b2f29d';

beforeAll(async () => {
  await connect();
});

describe('[Packages | Expense-domain | Db-access-methods] readExpenses', () => {
  test('returns expense record for the right user', async () => {
    const jeppeData = await readExpenses({
      userId: JEPPED_ID,
    });
    const jandaIData = await readExpenses({
      userId: JANDAID,
    });
    const jeppRawData = await query('SELECT * FROM expenses  where user_id = $1', [JEPPED_ID]);

    // add up all expenses
    const expectedTotalExpense = jeppeData.map(
      (item: Expense) => item.amount_in_cents
    ).reduce((pre, current) => pre + current, 0);

    const totalExpense = jeppRawData.rows.map(
      (item: Expense) => item.amount_in_cents
    ).reduce((pre, current) => pre + current, 0);

    expect(jandaIData.length).not.toBe(jeppeData.length);
    expect(jeppeData.length).toBe(jeppRawData.rowCount);
    expect(totalExpense).toBe(expectedTotalExpense);
  });

  test('return zero record on wrong userId', async () => {
    const data = await readExpenses({
      userId: '7b8ee568-93c1-11ec-b909-0242ac120002',
    });
    expect(data.length).toBe(0);
  });

  test('Data can be sorted by amount_in_cents', async () => {
    const sql = 'SELECT * FROM expenses  where user_id = $1 order by amount_in_cents DESC';
    const jeppRawData = await query(sql, [JEPPED_ID]);
    const expenseData = await readExpenses({
      sortBy: 'amount_in_cents',
      userId: JEPPED_ID,
    });

    expect(jeppRawData.rowCount).toBe(expenseData.length);
    expect(expenseData).toEqual(expect.arrayContaining(jeppRawData.rows));
  });

  test('Data can be filtered by status', async () => {
    const sql = 'SELECT * FROM expenses  where user_id = $1 AND status= $2';
    const jeppRawData = await query(sql, [JEPPED_ID, 'pending']);
    const expenseData = await readExpenses({
      status: 'pending',
      userId: JEPPED_ID,
    });

    expect(jeppRawData.rowCount).toBe(expenseData.length);
    expect(expenseData).toEqual(expect.arrayContaining(jeppRawData.rows));
  });

  test('Data can be filtered by merchant name', async () => {
    const sql = 'SELECT * FROM expenses  where user_id = $1 AND merchant_name = $2';
    const jeppRawData = await query(sql, [JEPPED_ID, 'BRUS']);
    const expenseData = await readExpenses({
      merchantName: 'BRUS',
      userId: JEPPED_ID,
    });

    expect(jeppRawData.rowCount).toBe(expenseData.length);
    expect(expenseData).toEqual(expect.arrayContaining(jeppRawData.rows));
  });

  test('Data can be filtered by currency', async () => {
    const sql = 'SELECT * FROM expenses  where user_id = $1 AND  currency = $2';
    const jeppRawData = await query(sql, [JEPPED_ID, 'DKK']);
    const expenseData = await readExpenses({
      currency: 'DKK',
      userId: JEPPED_ID,
    });

    expect(jeppRawData.rowCount).toBe(expenseData.length);
    expect(expenseData).toEqual(expect.arrayContaining(jeppRawData.rows));
  });

  test('Data can be paginated', async () => {
    const sql = 'SELECT * FROM expenses  where user_id = $1 LIMIT 2';
    const jeppRawData = await query(sql, [JEPPED_ID]);
    const expenseData = await readExpenses({
      currency: 'DKK',
      userId: JEPPED_ID,
      pageSize: '2',
    });

    expect(jeppRawData.rowCount).toBe(expenseData.length);
    expect(expenseData).toEqual(expect.arrayContaining(jeppRawData.rows));
  });
});
