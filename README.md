# VW Test by Brisa Lazaro

This is a project bootstraped using vite and built with React + TypeScript.

Node version used: 20.15.1.

Here are the most important libraries and technologies used in the project:

- **Redux**: To handle the App global state.
- **Antd** (ant design): As a css component library.
- **Vitest & React Testing Library**: To write unit tests for the App.
- **Playwright**: To write E2E tests for the most complex use cases of the App.
- **css modules**: For having scoped styles.

## How to run locally

First make sure to use at least **node v20** to ensure the project works.

1- Install the project dependencies

```bash
// using npm
npm install

// using yarn
yarn install
```

2- Run the "dev" script to start the project

```bash
// using npm
npm run dev

// using yarn
yarn dev
```

## How to run tests

### Unit tests

- Run the "test" command

```bash
npm run test

yarn test
```

### E2E tests

- Run the project locally using the steps above (make sure the project is running at port `5173`)
- Run the "test:e2e" command to run them.

```bash
npm run test:e2e

yarn test:e2e
```

## Important project documentation

Here you have some explainations about the decisions I took while developing the App:

- WIP
