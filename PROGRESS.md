# Progress

Read this first in a new session. The build brief is `../LIU_CLAUDE_CODE_PROMPT.md`; the
**v5 addendum** (`../design 4/LIU_PROMPT_ADDENDUM_v5.md`) overrides it where they conflict.
Designs: `../design`, `../design 2`, `../design 3`, `../design 4`.

## Phases (main brief §7)

| # | Phase | Status |
|---|---|---|
| 1 | Tokens, fonts, header, dropdowns, mobile menu, footer | ✅ Done |
| 2 | Home (S01, SM1), About group (S06–S08) | ✅ Done |
| 3 | Admissions, fees, scholarships (S09–S11, SM4); programs (S12, S13, SM3); academics (S14–S16) | ✅ Done |
| 4 | Affiliates, LIU Learn page, activities, media, contact, prospective students (S17–S24) | ✅ Done |
| 5 | Portal shell, sign-ins, admissions journey | ⬜ — now follows addendum v5 §9 |
| 6 | Registration and payments (P05–P12, PM2, PM3) | ⬜ |
| 7 | LIU Learn (L01–L16) | ⏸ **On hold** (addendum v5 §2: custom build vs Moodle). Only the `/learn-online` marketing page and `openLearn()` links |
| 8 | Accessibility, performance, responsive passes | ⬜ (axe and Apply-visibility checks already run on every website page) |

## Cross-cutting decisions

- **Domain:** `leadimpactuniversity.education`. No domain is hard-coded: `src/config/domains.ts` reads
  `NEXT_PUBLIC_SITE_URL`, `…_ADMISSIONS_URL`, `…_PORTAL_URL`, `…_STAFF_URL`, `…_LEARN_URL`
  (see `.env.example`). Unset locally → internal paths on one host.
- **Subdomains:** `admissions.` and `portal.` → `/portal` (one account system for applicants and
  students); `staff.` → `/staff`; `learn.` → `/learn`. `src/proxy.ts` rewrites by host and
  redirects main-domain app URLs to the configured app URL.
- **Emails:** `info@`, `support@`, `admissions@`, `bursary@`, `registrar@` on the new domain.
- **Countries:** US, Nigeria, Uganda, Ghana, Kenya and Tanzania (`src/content/countries.ts`). Kenya
  and Tanzania show their capital only until LIU supplies campus details. Country counts and lists
  are derived from the data, so adding a country updates every page.
- **Images:** all on Cloudinary (`src/content/media.ts`, `pnpm images:upload`); none in `public/`. The
  next/image loader is `src/lib/cloudinary-loader.ts`; without a cloud name photos show as placeholders.
- **Programs:** the 12 on the current site (11 application-form majors + Chaplaincy).

## Already-finished phases that need changes from addendum v5

| Change | Where | Status |
|---|---|---|
| Public portal links: one **Sign in** for applicants and students; Verify a certificate in the footer. **Client decision (Oct 2026), replacing addendum v5's footer Staff Portal link:** the staff portal, LIU Learn platform and course registration are never linked publicly — staff get their link by email, students get Learn and course registration after enrolment (welcome email, dashboard). Public "LIU Learn" buttons go to `/learn-online` or Apply; staff and Learn hosts send `X-Robots-Tag: noindex` | `src/content/site.ts` (`APP_LINKS`), `src/config/routing.ts` | ✅ Done |
| Domain via environment variables; LIU Learn links via `openLearn()` | `src/config/domains.ts` | ✅ Done in phase 3 |
| Kenya behind a feature flag | `src/content/countries.ts` | ✅ Done in phase 3 |
| Home stats use the current site’s figures (459+ students, 35+ instructors, 60+ programs) until the back end supplies them | `src/content/home.ts` | ✅ Done |
| `/verify` certificate verification (S25) — footer link exists, page not built yet | — | ⬜ Addendum step 6 |
| Security headers (CSP, HSTS, frame-ancestors, Referrer-Policy) in `next.config.ts` | — | ⬜ Addendum §8, with the auth work |
| WOBICON → `https://www.wobicon.org`; Video Gallery → YouTube | phase 4 pages | ✅ Done in phase 4 |
| Testimonial from Samuel Henteng Jnr. (Accra) — needs consent | home 08 | ⬜ Waiting on consent |

## Addendum v5 §9 (portal work, after phase 4)

1. Auth foundation: identities, sessions, role/scope checks in the mock API (`src/demo/api/`), audit log, `api/openapi.yaml`
2. P01, PM5 student sign-in; P01b staff sign-in
3. P13 role-based staff home; route guards for P04, P11, P12
4. P14 roles & permissions; P15 executive dashboard
5. P02b application step 1; align P02 to the real form fields
6. S25 certificate verification + QR target
7. Import scripts with sample CSVs (`scripts/import/`)
8. Tests listed in §9

## How to verify

```bash
pnpm lint && pnpm test && pnpm build && pnpm test:e2e
pnpm start -p 3100 & pnpm screenshot   # captures into screenshots/
```
