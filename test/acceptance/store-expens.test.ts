import { Api } from './utils/api';

describe('Given that we have a healthy service', () => {
  describe('Basic query of users expenses', () => {
    test('Given a valid userId expense records of the user should be returned', async () => {
      const expenseData = {
        userId: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a432',
        dateCreated: '2021-09-20T18:57:40.021Z',
        merchantName: 'tg',
        status: 'pending',
        currency: 'USD',
        amount: 400,
      };
      const res = await Api.post('/expense/v1/store-user-expense')
        .send(expenseData)
        .expect(200);

      expect(res.body.merchant_name).toEqual(expenseData.merchantName);
      expect(res.body.amount_in_cents).toBe(expenseData.amount);
      expect(res.body.status).toEqual(expenseData.status);
    });

    test('Given an invalid expense data request should be rejected', async () => {
      await Api.post('/expense/v1/store-user-expense')
        .expect(403);
    });
  });
});
