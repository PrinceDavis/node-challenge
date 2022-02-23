import { connect } from '@nc/utils/db';
import { storeExpense } from '../data';

const JEPPED_ID = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474';

beforeAll(async () => {
  await connect();
});

describe('[Packages | Expense-domain | Db-access-methods] storeExpense', () => {
  test('store data in db', async () => {
    const map = new Map();
    map.set('date_created', '2021-09-20T19:57:40.021Z');
    map.set('amount_in_cents', 332);
    map.set('merchant_name', 'tg');
    map.set('user_id', JEPPED_ID);
    map.set('status', 'pending');
    map.set('currency', 'USD');
    const result = await storeExpense(map);
    expect(result).toBe(1);
  });
});
