import { Api } from '../utils/api';

describe('Given that we have a healthy service', () => {
  describe('Query users expenses', () => {
    test('Given a valid userId expense records of the user should be returned', async () => {
      const res = await Api.get('/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474')
        .expect(200);

      expect(res.body).toEqual(
        expect.arrayContaining([
          {
            id: '314d54f4-8a5f-4c1d-b735-426b54794a44',
            merchant_name: 'Sliders',
            amount_in_cents: 12000,
            currency: 'DKK',
            user_id: 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474',
            date_created: '2021-09-20T19:57:40.021Z',
            status: 'processed',
          },
        ])
      );
    });
  });
});
