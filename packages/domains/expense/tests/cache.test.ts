import { closeClient, connectClient, getData, saveData } from '../data';

beforeAll(async () => {
  await connectClient();
});

afterAll(async () => {
  await closeClient();
});

describe('[Packages | Expense-domain | Cache] cache data', () => {
  test('stores data', async () => {
    await saveData('person', {
      role: 'software engineer',
      name: 'tg',
    });

    const data = await getData('person');

    expect(JSON.parse(data)).toEqual({
      role: 'software engineer',
      name: 'tg',
    });
  });
});
