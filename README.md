# vue-project

The front-end builder using the vue.js framework.
Added e2e tests.
Added the github actions to run tests on "deploy", check "Actions tab".

# TODO list

- Check performance
- List tests
- Unit tests
- Disable the "add element" feature, when not-nested element is selected (e.g. TextElement)
- Add the history of actions and undo/redo buttons
- Add the auto-save in localStorage/indexDb/back-end? 
- Refactor BoxElement and TextElement tests, combine and move them to SidePanel test

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
