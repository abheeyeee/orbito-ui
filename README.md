# Orbito UI

React components for interfaces that show progress, compare evidence, and present contextual actions.

**[Live demos](https://orbito-ui.vercel.app/)** · **[Component source](registry/default)** · **[MIT license](LICENSE)**

| Component | Purpose |
| --- | --- |
| Branchflow | Show workflow steps, status, and optional branches. |
| Evidence Lens | Compare weighted signals and inspect their supporting notes. |
| Action Halo | Open a compact, keyboard-accessible action menu. |

The live demos render the same React component files distributed through the registry. Components are copied into your application, so you can edit their source.

## Install

Use a React 18 or 19 project with Tailwind CSS 4 and [shadcn initialized](https://ui.shadcn.com/docs/cli). Install any component by its public registry URL:

```sh
npx shadcn@latest add https://orbito-ui.vercel.app/r/branchflow.json
npx shadcn@latest add https://orbito-ui.vercel.app/r/evidence-lens.json
npx shadcn@latest add https://orbito-ui.vercel.app/r/action-halo.json
```

The site has separate copy buttons for these commands. The [registry catalog](https://orbito-ui.vercel.app/r/registry.json) lists all three items. No npm package or official shadcn directory listing is required for URL installation.

## Use

```tsx
import { Branchflow } from "@/components/ui/branchflow"
import { EvidenceLens } from "@/components/ui/evidence-lens"
import { ActionHalo } from "@/components/ui/action-halo"

<Branchflow steps={[
  { id: "review", label: "Review evidence", status: "current" },
  { id: "decide", label: "Make a decision", status: "upcoming" },
]} />

<EvidenceLens
  items={[{ id: "signal", label: "Supporting signal", value: 54, note: "Recent interviews." }]}
  conclusion="Review the remaining uncertainty."
/>

<ActionHalo actions={[{ id: "share", label: "Share", onSelect: () => share() }]} />
```

The callbacks and sample data above belong to your application. Orbito UI does not perform the action itself.

## Component API

- **Branchflow:** `steps: BranchflowStep[]`, `className?: string`. Each step needs a unique `id`, `label`, and `status` (`complete`, `current`, `upcoming`, or `blocked`). Optional `detail` and `branches` with `neutral`, `positive`, or `warning` tone. The caller controls progress.
- **Evidence Lens:** `items: EvidenceItem[]`, `conclusion?: string`, `className?: string`. Each item needs a unique `id`, `label`, and numeric `value`; `note` and CSS `color` are optional. Negative or nonfinite values count as zero. Values are relative weights, not confidence estimates.
- **Action Halo:** `actions: HaloAction[]`, `label?: string`, `className?: string`. Each action needs a unique `id`, `label`, and `onSelect` callback. `icon` and `disabled` are optional. Arrow keys, Home/End, Enter, Escape, Tab, and outside clicks are supported. Leave space around the trigger for its 256px menu and avoid clipping ancestors.

All components use shadcn semantic color tokens. Ensure Tailwind scans the installed component directory. The website supports light and dark themes and reduced motion.

## Develop

```sh
npm ci
npm test
npm run build
npm run dev
```

`registry/default/` contains the installable source. `src/` contains the showcase, `scripts/build-registry.mjs` generates the JSON in `public/r/`, and `tests/` contains interaction tests. Vercel builds the Vite site and serves the generated files from `/r/`. `REGISTRY_ORIGIN` can override the catalog homepage when building for another domain.

## Verification

The TypeScript build and four interaction tests pass. The public registry returned HTTP 200 with embedded source for all three components. A fresh Vite project initialized with the shadcn CLI installed all three public URLs and passed a strict TypeScript production build. Live browser checks covered progress changes, evidence selection and empty state, Action Halo keyboard selection, theme switching, and the dark theme text contrast. These checks are not a screen-reader or cross-browser certification.

Created by Abhinav Singh. Licensed under MIT.
