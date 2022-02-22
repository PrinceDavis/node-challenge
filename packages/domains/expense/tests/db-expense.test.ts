import { connect } from '@nc/utils/db';
import { Expense } from '../types';
import { readExpenses } from '../data';

beforeAll(async () => {
  await connect();
});

describe('[Packages | Expense-domain | Db-access-methods] readExpenses', () => {
  test('returns expense record for the right user', async () => {
    const jeppeId = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474';
    const jandaId = 'e17825a6-ad80-41bb-a76b-c5ee17b2f29d';
    const jeppeData = <Expense[]> await readExpenses(jeppeId);
    const jandaIData = <Expense[]> await readExpenses(jandaId);

    // add up all Jappe's expenses
    const totalExpense = jeppeData.map(
      (item: Expense) => item.amount_in_cents
    ).reduce((pre, current) => pre + current, 0);

    expect(jandaIData.length).not.toBe(jeppeData.length);
    expect(jeppeData.length).toBe(3);
    expect(totalExpense).toBe(26000);
  });
});
