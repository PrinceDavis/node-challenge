import { Api } from './utils/api';

describe('Given that we have a healthy service', () => {
  describe('Basic query of users expenses', () => {
    test('Given a valid userId expense records of the user should be returned', async () => {
      const res = await Api.get('/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474')
        .expect(200);

      expect(res.body.length).toBeGreaterThan(1);
    });

    test('Given an invalid userId expense empty list should be return', async () => {
      const res = await Api.get('/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a473')
        .expect(404);

      expect(res.body).toEqual({});
    });
  });

  describe('Query of users expenses for a sorted list', () => {
    test('Given a valid userId and sortBy value expense records of the user should be returned', async () => {
      const res = await Api
        .get('/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sortBy=amount_in_cents')
        .expect(200);

      expect(res.body.length).toBeGreaterThan(2);
    });

    test('Given a valid userId and an invalid sortBy value request should be rejected', async () => {
      const res = await Api
        .get('/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&sortBy=hello')
        .expect(403);

      expect(res.body).toEqual(
        {
          error: '"sortBy" must be one of [amount_in_cents, date_created]',
        }
      );
    });
  });

  describe('Query of users expenses filtered by status', () => {
    test('Given a valid userId and filter parameter, expense records of the user should be returned', async () => {
      const res = await Api
        .get('/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&status=processed')
        .expect(200);

      expect(res.body.length).toBeGreaterThan(0);
    });

    test('Given a valid userId and an invalid status filter value, request should be rejected', async () => {
      const res = await Api
        .get('/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&status=hello')
        .expect(403);

      expect(res.body).toEqual(
        {
          error: '"status" must be one of [pending, processed]',
        }
      );
    });
  });

  describe('Query of users expenses filtered by merchant name', () => {
    test('Given a valid userId and filter parameter, expense records of the user should be returned', async () => {
      const res = await Api
        .get('/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&merchantName=Donkey Republic')
        .expect(200);

      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('Query of users expenses filtered by currency', () => {
    test('Given a valid userId and filter parameter, expense records of the user should be returned', async () => {
      const res = await Api
        .get('/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&currency=DKK')
        .expect(200);

      expect(res.body.length).toBeGreaterThan(0);
    });

    test('Given a valid userId and an invalid currency filter value, request should return nothing', async () => {
      const res = await Api
        .get('/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&currency=DKs')
        .expect(404);

      expect(res.body).toEqual({});
    });
  });
});

describe('Query of users expenses result can be paginated', () => {
  test('Given a valid userId and filter parameter, expense records of the user should be returned', async () => {
    const res = await Api
      .get('/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&pageSize=2')
      .expect(200);

    expect(res.body.length).toBe(2);
  });
});
