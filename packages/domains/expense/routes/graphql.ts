import { ApiError } from '@nc/utils/errors';
import { getUserExpenses } from '../model';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { to } from '@nc/utils/async';

const TypeString = `
  type Query {
    expenses(userId: ID): [Expense]
  }

  type Expense {
    amount_in_cents: Int
    merchant_name: String
    date_created: String
    currency: String
    user_id: String
    status: String
    id: ID
  }
`;

export const schema = makeExecutableSchema({
  typeDefs: TypeString,
  resolvers: {
    Query: {
      expenses: async (_, args) => {
        const [expenseError, userExpenses] = await to(getUserExpenses(args));
        if (expenseError) {
          return new ApiError(expenseError, expenseError.status, `Could not get user details: ${expenseError}`, expenseError.title);
        }
        return userExpenses;
      },
    },
  },
});
