# Node Challenge

Take home test for Node.js developers.

## Let me see API first
- [![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/62826cc1b0de3d2e57ff)
- link to [doc](https://documenter.getpostman.com/view/263074/UVknubhG#2081ec66-2cd2-4fa3-b18a-a3259a7be31c)
---
### Running App

- Create a `.env` in the base directory from the .env-example file included.
- Make sure your node version is >=16
- Note: the app pre-startup check fill fails and app would start if you don't have the right env variables or node version is below the required version.


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


### My Thinking
- I liberally looked to what was in the user domain for inspiration in term of folder structures.
- Thinking of API design, I wanted to make the expense route RESTFUL since I add feature to create new expense record but didn't do that at the end.
- Might have to revisit the data caching going on, since I am parsing and stringifying records the overhead introduced by JSON methods is one to watch out for.
- Adding test to the GraphQL endpoint is something that can be revisited.

- Finally I spend about 8hr all putting these together.
