# Orbito UI · Abhinav Singh

Three original implementations for decision interfaces: Branchflow, Evidence Lens, and Action Halo. MIT licensed. React 18/19 and Tailwind CSS 4 with shadcn semantic tokens.

## Run and verify

```sh
npm ci
npm test
npm run build
npm run dev
```

The demo imports the distributed React files directly. `npm run build` type-checks all code, generates registry files and produces `dist/` for static hosting. `package-lock.json` pins dependencies. No API keys, database, or account integration is required.

## Installation into another application

Initialize shadcn in your React application, then install from the public site:

```sh
npx shadcn@latest init
npx shadcn@latest add https://YOUR-VERCEL-DOMAIN/r/branchflow.json
npx shadcn@latest add https://YOUR-VERCEL-DOMAIN/r/evidence-lens.json
npx shadcn@latest add https://YOUR-VERCEL-DOMAIN/r/action-halo.json
```

The website's copy buttons use its current host automatically. Vercel supplies the production host to the registry build; `REGISTRY_ORIGIN` can override it for another host. The development fallback is `http://localhost:5173`.

## API

### Branchflow

`steps: BranchflowStep[]`, `className?: string`. Each step has a unique `id`, `label`, and `status`: `complete | current | upcoming | blocked`. Optional `detail` and `branches: {label, tone?: neutral | positive | warning}[]`. Keep step IDs and branch labels unique. An empty list renders an empty progress list. The caller determines progress; branch labels are informational.

### EvidenceLens

`items: EvidenceItem[]`, `conclusion?: string`, `className?: string`. Each item has unique `id`, `label`, `value`, optional `note` and `color` (CSS color string). Negative/nonfinite numbers are treated as zero. Empty data has a visible fallback. Selecting an item reveals its note; removing the selected item falls back to the first remaining item. Values are relative weights, not automatically confidence estimates. Custom colors are decorative; all values remain visible as text.

### ActionHalo

`actions: HaloAction[]`, `label?: string`, `className?: string`. Each action has unique `id`, `label`, `onSelect: () => void`, optional `icon: ReactNode`, and `disabled`. Trigger opens a nonmodal menu above itself. Arrow keys/Home/End navigate enabled items, Enter selects, Escape closes and restores focus, Tab exits, outside pointer closes. Empty actions disable the trigger. Keep the trigger at least 128px from viewport sides to accommodate the 256px panel. Avoid overflow-hidden ancestors.

Callbacks are synchronous notifications: the consumer owns async progress, errors, permissions and real business actions.

## Styling and accessibility

Use shadcn's `background`, `foreground`, `card`, `card-foreground`, `muted`, `muted-foreground` and `border` tokens. Tailwind must scan the installed component paths. Demos support light/dark themes and reduced motion. Native buttons and menu roles provide keyboard semantics. Automated DOM interaction tests are included; this is not an accessibility certification.

## Publishing

This single repository contains the component sources in `registry/default`, the demo site in `src`, the registry generator, docs, and tests. Vercel builds the site and serves generated JSON at `/r/`. npm publication and a listing in shadcn's official directory are separate distribution channels.

## Verification results

- TypeScript strict check: passed.
- Vite production build: passed.
- Vitest: 4 tests passed (keyboard navigation, selection/focus return, outside dismissal, empty/disabled actions, evidence data changes, invalid values, workflow status).
- Fresh-project shadcn CLI: registry parsing passed, then installation was blocked when the environment's proxy rejected `https://ui.shadcn.com/r/colors/neutral.json`. Full CLI installation is therefore unverified.
- Browser visual QA and fresh-project installation should be repeated against the production URL before announcing a verified release.
- Vite emits a benign warning when bundling the React components' `use client` directives; the directives remain in the registry source for Next.js consumers.
