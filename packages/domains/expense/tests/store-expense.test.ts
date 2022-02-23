import { connect } from '@nc/utils/db';
import { storeExpense } from '../data';

beforeAll(async () => {
  await connect();
});

describe('[Packages | Expense-domain | Db-access-methods] storeExpense', () => {
  test('store data in db', async () => {
    const map = new Map();
    map.set('user_id', 'da140a29-ae80-4f0e-a62d-6c2d2bc8a432');
    map.set('date_created', '2021-09-20T18:57:40.021Z');
    map.set('amount_in_cents', 332);
    map.set('merchant_name', 'tg');
    map.set('status', 'pending');
    map.set('currency', 'USD');

    const result = await storeExpense(map);

    expect(result.amount_in_cents).toBe(map.get('amount_in_cents'));
    expect(result.merchant_name).toBe(map.get('merchant_name'));
    expect(result.currency).toBe(map.get('currency'));
    expect(result.user_id).toBe(map.get('user_id'));
    expect(result.status).toBe(map.get('status'));
  });
});
