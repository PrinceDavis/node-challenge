# Node Challenge

Take home test for Node.js developers.

## Let me see API first
- [![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/62826cc1b0de3d2e57ff)
- link to [doc](https://documenter.getpostman.com/view/263074/UVknubhG#2081ec66-2cd2-4fa3-b18a-a3259a7be31c)
---
### Running App

- Create a `.env` in the base directory from the .env-example file included.
- Make sure your node version is >=16
- Note: the app pre-startup check fill fails and app would not start if you don't have the right env variables or node version is below the required version.


Run:


```bash
yarn
```

```bash
psql challenge < dump.sql
```

## Start

```bash
yarn start
```


## Test


```bash
yarn test
```


```bash
yarn test:acceptance
```

### Functionalities
- Paginated results.
- Sorting by `amount_in_cents` or `date_created`.
- Filtering by `status` and `currency` and `merchant_name`.
- Query using GraphQL.
- Store new expense data.
- GET, POST request validation.
- Caching for resilence and performance.
- dotenv for easy env management.
- pre-start validation to cut out runtime/enviroment issues.



### Summary
- I only allow sorting by `amount_in_cents` and `date_created` because they were the only data points that make sense to sort the records by, `merchant_name` is another candidate but not as strong a candidate as the other two.
- I liberally looked to what was in the user domain for inspiration in term of folder structures.
- I added pre-start validation to ensure all env values are available and node runtime has the required version.
- I added dontenv to easy env management.
- I added request validation for improved security.
- Thinking of API design, I wanted to make the expense route RESTFUL since I add feature to create new expense record but didn't do that at the end.
- Might have to revisit the data caching going on, since I am parsing and stringifying records the overhead introduced by JSON methods is one to watch out for.
- Adding test to the GraphQL endpoint is something that can be revisited.
- My decision making process is camptured in my commit messages.
- Finally, I spend about 5hr over 2 days putting these together.
