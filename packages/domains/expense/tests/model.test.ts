import { getUserExpenses } from '../model';
import { connect, query } from '@nc/utils/db';

const JEPPED_ID = 'da140a29-ae80-4f0e-a62d-6c2d2bc8a474';
const QUERY = {
  userId: JEPPED_ID,
};

beforeAll(async () => {
  await connect();
});

describe('[Packages | Expense-domain | Model] getUserExpenses', () => {
  test('returns expense record for the right user', async () => {
    const res = await query('SELECT * FROM expenses  where user_id = $1', [JEPPED_ID]);
    const jeppeExpenses = await getUserExpenses(QUERY);
    expect(jeppeExpenses.length).toBe(res.rowCount);
  });

  test('throw BadRequest Error on bad userId', async () => {
    try {
      await getUserExpenses({
        userId: '',
      });
    } catch (error) {
      expect(error.message).toBe('userId property is missing.');
    }
  });

  test('throw NotFound Error on bad userId', async () => {
    try {
      await getUserExpenses({
        userId: '7b8ee568-93c1-11ec-b909-0242ac120002',
      });
    } catch (error) {
      expect(error.message).toBe('Could not find expenses with id 7b8ee568-93c1-11ec-b909-0242ac120002');
    }
  });
});
