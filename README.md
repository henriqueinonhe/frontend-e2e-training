# Day 3 - Challenge

You should create your tests files under the `client/src/e2e/tests/` directory.

The reference for both tasks' features can be found here: https://gist.github.com/talyssonoc/a304a7b92880a8c3b03c1fc7666be861

## Task 1

Create e2e tests for the new note creation feature.

## Task 2

Create e2e tests for the note editing feature.

## How to run the tests

First, you will need to setup some things:

```sh
cd api
npm i # Install the api dependencies
npm run db:seed # Install seed the API data
cd ../client
npm i --force # Install the client dependencies
npx playwright install # Install the client dependencies
cp .env.example .env # Create the client's env file
```

After the setup is done, run `npm run test:e2e`. This will start both the API and the app, and open Playwright in GUI mode.
