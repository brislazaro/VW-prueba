# VW Test by Brisa Lazaro

## Table of contents


- [VW Test by Brisa Lazaro](#vw-test-by-brisa-lazaro)
  - [Table of contents](#table-of-contents)
- [Project overview](#project-overview)
- [General](#general)
    - [Key Libraries and Technologies:](#key-libraries-and-technologies)
- [Project deployment](#project-deployment)
- [How to run locally](#how-to-run-locally)
- [How to run tests](#how-to-run-tests)
  - [Unit tests](#unit-tests)
  - [E2E tests](#e2e-tests)
- [Important project documentation](#important-project-documentation)
- [](#)
- [Future improvements](#future-improvements)

# Project overview
This is a project bootstraped using vite and built with React + TypeScript. It utilizes Redux for state management, Ant Design for UI components, and employs various testing tools like Vitest, React Testing Library, and Playwright for E2E testing.

The App uses the JSONPlaceholder API to display a list of Posts, and allows the user to create, delete and edit existing ones.

# General
- **Node version** used: 20.15.1

### Key Libraries and Technologies:

- **Redux**: Manages global application state.
- **Ant Design (Antd)**: CSS component library for UI design.
- **Vitest & React Testing Library**: For unit testing.
- **Playwright**: For end-to-end (E2E) testing
- **css modules**: Scoped styles for components

# Project deployment

The App is deployed in vercel. Access it here [VW Test App](https://vw-prueba.vercel.app/)

# How to run locally

First make sure to use at least **node v20** to ensure the project works.

1. Install the project dependencies

```bash
// using npm
npm install

// using yarn
yarn install
```

2. Start the Development server

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

1. Ensure the project is running locally on port 5173.
2. Run tests in headless mode:
```bash
npm run test:e2e
// or
yarn test:e2e
```
Optionally, you can also:
- Run tests in **headed** mode (slower, opens different browsers) wit the `test:e2e:headed` script.

- Runtest in **--ui** mode, with the `test:e2e:ui` command. You will have to manually run them clicking in the _play button_ in the top left corner.

# Important project documentation

Here you have some explainations about the decisions I took while developing the App:

- [Adapter pattern](./docs/adapter-pattern.md)
- [Navigation for Create and Edit drawers](./docs/navigation-for-drawers.md)

# 

# Future improvements

If I had more time to develop this project I would focus on the following:
 - **Ant design console error on form change**: Investigate and fix console errors related to Ant Design when changing form inputs.
  
 - **Async thunks TS error**: Resolve TypeScript errors in [thunks.ts](./src/redux/thunks.ts) that currently use any types for time limitations.
