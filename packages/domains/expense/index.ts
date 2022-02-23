import { graphqlHTTP } from 'express-graphql';
import { Router } from 'express';
import { schema } from './routes/graphql';
import { router as v1 } from './routes/v1-get-expenses';

export const router = Router();

router.use('/v1', v1);
router.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
