# VW Test by Brisa Lazaro

## Table of contents

- [VW Test by Brisa Lazaro](#vw-test-by-brisa-lazaro)
  - [Table of contents](#table-of-contents)
- [General](#general)
- [Project deployment](#project-deployment)
- [How to run locally](#how-to-run-locally)
- [How to run tests](#how-to-run-tests)
  - [Unit tests](#unit-tests)
  - [E2E tests](#e2e-tests)
- [Important project documentation](#important-project-documentation)

# General

This is a project bootstraped using vite and built with React + TypeScript.

Node version used: 20.15.1.

Here are the most important libraries and technologies used in the project:

- **Redux**: To handle the App global state.
- **Antd** (ant design): As a css component library.
- **Vitest & React Testing Library**: To write unit tests for the App.
- **Playwright**: To write E2E tests for the most complex use cases of the App.
- **css modules**: For having scoped styles.

# Project deployment

The App is deployed in vercel and you can access it in the following url:

https://vw-prueba.vercel.app/

# How to run locally

First make sure to use at least **node v20** to ensure the project works.

1. Install the project dependencies

```bash
// using npm
npm install

// using yarn
yarn install
```

2. Run the `dev` script to start the project

```bash
// using npm
npm run dev

// using yarn
yarn dev
```

# How to run tests

## Unit tests

- Run the `test` script

```bash
npm run test
// or
yarn test
```

## E2E tests

1. Run the project locally using the steps above (make sure the project is running at port `5173`)
2. Run the `test:e2e` command to run them in headless mode.

```bash
npm run test:e2e
// or
yarn test:e2e
```

- Run the `test:e2e:headed` script to run them in **headed** mode. This is a bit slow, as it will run the test in open different browsers to run the tests.

- Run the `test:e2e:ui` script to run them in **--ui** mode, to be able to debug the test steps. You will have to manually run them clicking in the _play button_ in the top left corner.

# Important project documentation

Here you have some explainations about the decisions I took while developing the App:

- [Adapter pattern](./docs/adapter-pattern.md)
