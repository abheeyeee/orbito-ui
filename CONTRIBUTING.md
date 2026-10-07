# Contributing to Orbito UI

Thanks for helping improve the components. Bug reports, accessibility fixes, documentation, and new component proposals are welcome.

## Start locally

1. Fork [abheeyeee/orbito-ui](https://github.com/abheeyeee/orbito-ui) and clone your fork.
2. Use Node.js 22 (`nvm use` reads `.nvmrc`) and npm.
3. Run `npm ci`, then `npm run dev` to open the showcase locally.
4. Run `npm test` and `npm run build` before opening a pull request.

No credentials or database are needed. `npm run build` type-checks the project, generates the installable JSON in `public/r/`, and builds the Vite site in `dist/`. Both output directories are generated; edit the source instead.

## Where to work

- `registry/default/*.tsx`: distributed React components. The showcase imports these files directly.
- `src/main.tsx` and `src/style.css`: site examples and styling.
- `tests/components.test.tsx`: behavior tests.
- `registry.json`: registry metadata. `scripts/build-registry.mjs` packages source into JSON.
- `README.md`: installation and public API documentation.

For component changes, check keyboard and focus behavior, disabled and empty states, responsive layout, light and dark themes, and reduced motion where relevant. Keep dependencies small and use semantic Tailwind color tokens so the source works in a consumer's theme. Add a focused test when behavior changes. Update the demo and README when props or installation instructions change.

## Propose a change

Open an issue first for a new component or a breaking API change so its use case and interface can be discussed. Small fixes can go straight to a pull request.

Create a branch on your fork, make a focused change, and open a pull request against `main`. In the PR, explain the behavior, link any issue, list the commands you ran, and include screenshots or a short recording for visual changes. CI runs tests and a production build. Maintainers review and merge; contributors do not need direct repository access.

By contributing, you agree that your contribution is licensed under this repository's [MIT license](LICENSE). Be respectful and constructive in issues and reviews.
