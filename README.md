# The Subversive Writer

Personal essay site built with React 19, TypeScript, Tailwind, and Vite.

Essays that challenge the default — culture, creativity, work, and tech.

## Quick Start

- Install: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build` (runs content generation + type-checks)
- Preview: `npm run preview`
- Lint/format: `npm run lint` and `npx prettier --write .`

## Writing Posts

- Add Markdown files to `src/blog/`.
  - First line: `# Title`
  - Optional second line: `Date: YYYY-MM-DD`
- Generate metadata: `npm run generate-blog-data` (creates/updates `src/data/blog-posts.json`).

### Images

- Thumbnails (home cards): place a matching image in `src/blog-images/`.
  - Exact filename match with the post slug works best (e.g., `my-post.png`).
  - Token match also works (e.g., `PNPM.svg` for `MyPnpmWorkspaceJourney`).
- Inline images inside posts: reference by filename only (e.g., `![Alt](diagram.png)`).
  - The app rewrites filenames to bundled URLs at render time.
  - Absolute `http(s)` or `/public/...` paths are preserved.

## Tags & Search

- Each post has tags in `src/data/blog-posts.json` (auto-filled by scripts).
- All Posts page supports:
  - Tag pills (multi-select via URL `?tags=...`).
  - Fuzzy search on tags with `?q=` (OR across terms).

## Branding & UI

- Header + hero use the logo at `public/logo.png`.
- Theme menu opens on hover; label fixed as “Theme”.

## CI/CD

- GitHub Actions run lint, Prettier check, and build.
- Deployment via Vercel using repository secrets.

Disclaimer: Some content may be generated or assisted by AI.
