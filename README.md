# LeadImpact University — website, portals and LIU Learn

One Next.js app with three route groups:

| Group | Path | Pattern |
|---|---|---|
| `(site)` | `/` | Public university website — header with dropdowns, long-form pages, footer |
| `(portal)` | `/portal` | Admissions, registration and payments web app (phase 5+) |
| `(learn)` | `/learn` | LIU Learn e-learning PWA, offline-first (phase 7) |

The designs live one level up in `../design`, `../design 2` and `../design 3`. The build brief is
`../LIU_CLAUDE_CODE_PROMPT.md`.

## Getting started

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

| Script | What it does |
|---|---|
| `pnpm build` / `pnpm start` | Production build and server |
| `pnpm lint` | ESLint |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm test:e2e` | Browser tests at 1440px and 390px, including axe accessibility checks (Playwright; builds must be current) |
| `pnpm images:upload` | Uploads any new photos in `src/content/media.ts` to Cloudinary (`--dry-run`, `--force`, `--prune`; needs the Cloudinary keys in `.env`) |
| `pnpm screenshot` | Captures each screen into `screenshots/` for comparison with the design PNGs (needs `pnpm start -p 3100` running) |

Playwright uses your installed Google Chrome locally, so no browser download is needed. In CI, run
`npx playwright install chromium` first.

## Where things are

- `src/design/tokens.css` — every colour, font, radius and spacing token (one file).
- `src/content/` — typed content: site details, countries, navigation. Pages read from here.
- `src/components/site/` — website header, dropdowns, mobile menu, footer.
- `src/lib/` — country preference (remembered in `localStorage`), WhatsApp links, search.
- `CHANGES_NEEDED.md` — every placeholder that must be replaced before launch.

## How to demo

_Filled in as the phases land (website → apply → register → pay → LIU Learn offline)._
