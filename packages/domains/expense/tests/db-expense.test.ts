import { connect } from '@nc/utils/db';
import { readExpenses } from '../data';

beforeAll(async () => {
  await connect();
});

describe('[Packages | Expense-domain | Db-access-methods] readExpenses', () => {
  test('returns expense record for the right user', async () => {
    const jeppeId = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474';
    const jandaId = 'e17825a6-ad80-41bb-a76b-c5ee17b2f29d';
    const jeppeData = await readExpenses(jeppeId);
    const jandaIData = await readExpenses(jandaId);
    expect(jeppeData.length).toBe(3);
    expect(
      jeppeData.map((item: any) => item.amount_in_cents).reduce((pre, current) => pre + current, 0)
    ).toBe(26000);
    expect(jandaIData.length).not.toBe(jeppeData.length);
  });
});
