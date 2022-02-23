import { router as getExpensevV1 } from './routes/v1-get-expenses';
import { graphqlHTTP } from 'express-graphql';
import { Router } from 'express';
import { schema } from './routes/graphql';
import { router as storeExpenseV1 } from './routes/v1-store-expense';

export const router = Router();

router.use('/v1', getExpensevV1);
router.use('/v1', storeExpenseV1);
router.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
