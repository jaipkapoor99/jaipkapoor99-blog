# Repository Guidelines

## Project Structure & Module Organization
- Source: `src/` (React + TypeScript).
  - Pages: `src/pages/` (route views), Components: `src/components/`, Utils: `src/utils/`, Types: `src/types/`.
  - Content: Markdown posts in `src/blog/` and images in `src/blog-images/`.
  - Generated data: `src/data/blog-posts.json` (via script).
- Static assets: `public/`.
- Build output: `dist/` (git-ignored).
- CI/CD: GitHub Actions in `.github/workflows/` (build + Vercel deploy).
- Scripts: `scripts/` (content generation utilities).
 - Brand assets: place the provided logo at `public/logo.png` (used for favicon and social previews).

## Build, Test, and Development Commands
- `npm run dev`: Start Vite dev server.
- `npm run build`: Generate blog data, type-check with `tsc -b`, and build with Vite.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint across the repo.
- `npm run generate-blog-data`: Rebuild `src/data/blog-posts.json` from `src/blog/*.md`.

## Coding Style & Naming Conventions
- Language: TypeScript, React 19, Vite 7, Tailwind CSS 4.
- Formatting: Prettier (2-space indent). CI runs format checks; keep diffs clean.
- Linting: ESLint with TS + React hooks configs; fix issues before PRs.
- Filenames: Components `PascalCase.tsx` (e.g., `Header.tsx`); utilities `camelCase.ts` (e.g., `markdown.ts`).
- Content: Markdown starts with `# Title` then optional `Date: YYYY-MM-DD`. Blog slugs match filenames (e.g., `my-post.md` → `my-post`).
- Inline images in posts: place assets in `src/blog-images/` and reference them by filename in Markdown (e.g., `![Alt](diagram.png)`). During rendering, filenames are rewritten to the bundled URL automatically. Absolute `http(s)` and `/public` paths are left as-is.
 - Example: add `![pnpm logo](PNPM.svg)` to a post and place `PNPM.svg` in `src/blog-images/`.

## Testing Guidelines
- No unit test framework is configured yet. Validate changes by:
  - Running `npm run dev` and exercising pages.
  - Ensuring `npm run lint` and `npm run build` pass.
- If adding tests, prefer Vitest; name files `*.test.ts(x)` and colocate with sources.

## Commit & Pull Request Guidelines
- Commit style: Conventional Commits (`feat:`, `chore:`, etc.). Keep messages imperative and scoped.
- Before PR: include a clear description, linked issues, and screenshots/GIFs for UI changes.
- Required checks: `npm run lint` and `npm run build` must pass locally; generated content should be up-to-date (`generate-blog-data`).

## Security & Configuration Tips
- Vercel deploy uses secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`) in GitHub Actions; never commit tokens.
- Do not commit `dist/` or local environment files. Image references in Markdown should use files from `src/blog-images/`.
 - For branding, ensure `public/logo.png` exists; otherwise, the header image and social cards will show a broken link.
