import { Expense } from '../types';
import { readExpenses } from '../data';
import { connect, query } from '@nc/utils/db';

beforeAll(async () => {
  await connect();
});

describe('[Packages | Expense-domain | Db-access-methods] readExpenses', () => {
  test('returns expense record for the right user', async () => {
    const jeppeId = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474';
    const jandaId = 'e17825a6-ad80-41bb-a76b-c5ee17b2f29d';
    const jeppeData = <Expense[]> await readExpenses(jeppeId);
    const jandaIData = <Expense[]> await readExpenses(jandaId);
    const jeppRawData = await query('SELECT * FROM expenses  where user_id = $1', [jeppeId]);

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
    const data = await readExpenses('7b8ee568-93c1-11ec-b909-0242ac120002');
    expect(data.length).toBe(0);
  });
});
