# Changes needed before launch

Every placeholder, assumption and unconfirmed value in the build. Each item says where it lives in the code.
Add to this list whenever a new placeholder goes in.

## Brand

| Item | Where | What's needed |
|---|---|---|
| Colour tokens sampled by eye from the designs | `src/design/tokens.css` | Confirm orange `#F7731E`, black `#0E0F12`, charcoal `#17191E` etc. against LIU's logo files |
| Header and footer use the supplied 3D crest (`leadimpact-icon.png`, from Cloudinary), enlarged so it overhangs the header bar. In the desktop header the name sits in the black utility bar beside the crest (“LeadImpact” white, “University” orange); there is no country picker (desktop visitors change country in the footer's bottom row; the site first guesses it from the device's time zone, else Nigeria) and the phone number, labelled with a three-letter code (NGA, USA, UGA, GHA), rolls upwards through each country's line every 4 seconds, starting with the visitor's country (it stops on hover/focus and stays still for reduced-motion and Lite visitors). The email shows from 1900px, social icons from 1600px, and “Become an Affiliate” is hidden from the top bar at 1280–1359px (it is in the Affiliates menu). Mobile header and footer keep the name beside the crest; the mobile top bar shows the same rolling phone numbers, and phone visitors change country in the menu or the footer. A flat redraw (`Crest.tsx`: shield, torch, “LIU”) is used where the 3D detail would blur — the favicon and the home Welcome block | `src/components/site/Logo.tsx`, `src/components/site/Crest.tsx`, `src/app/icon.svg` | Approve the flat redraw, or supply an official flat/vector version |
| WhatsApp button green darkened to `#137A3A` for AA contrast with white text | `src/design/tokens.css` | Confirm the client is happy with it (design used `#1FAF54`, which fails AA) |
| Orange text darkened from the brief's `#C24E0B` to `#B8480A` — `#C24E0B` fails AA on the warm greys (`#F4F2EF`, `#F6F5F3`) and pale orange | `src/design/tokens.css` → `--color-orange-text` | Brand sign-off |
| Large orange numerals on light backgrounds use `#DF630D` (bright `#F7731E` is only 2.6–2.8:1 there) | `src/design/tokens.css` → `--color-orange-numeral` | Brand sign-off |

## Domain and email (new: leadimpactuniversity.education)

| Item | Where | What's needed |
|---|---|---|
| Mailboxes `info@`, `support@`, `admissions@`, `bursary@`, `registrar@` on the new domain must exist | `src/config/domains.ts` → `EMAILS` | Create the mailboxes (or tell us which to use). President and Board messages go to `info@` with a subject line |
| DNS for `admissions.`, `portal.`, `staff.` and `learn.` subdomains, all pointing at the one deployment | hosting | Set up DNS + TLS; set the `NEXT_PUBLIC_*_URL` variables from `.env.example` |
| **Decision for LIU:** keep the old domain `leadimpactuniversity.com` registered for a few years with 301 redirects, so QR codes and links on certificates already issued keep working (old verification and portal URLs → `/verify`) | hosting | LIU decision before the old domain is dropped |
| Credit transfer: the old site gives the Registrar’s address as 906 Avenue A, Katy TX 77943 — different from the Denver HQ | `src/content/academics.ts` | Confirm the Registrar’s office address |

## Contact details

| Item | Where | What's needed |
|---|---|---|
| Campus phone numbers for Nigeria, Uganda, Ghana and Kenya — all fall back to the Denver HQ number | `src/content/countries.ts` (`phoneIsPlaceholder: true`) | Real local numbers (and WhatsApp numbers if different) per country |
| Kenya is hidden behind `NEXT_PUBLIC_FEATURE_KENYA` (old site lists only Uganda, Nigeria and Ghana) | `src/config/domains.ts` → `FEATURES.kenya` | Confirm the Kenya campus before switching it on |
| Phone numbers: +1 720-598-9177 (used), 720-588-9896 and 281-202-4565 also appear on old systems | `src/content/site.ts` | Confirm which numbers to publish |
| Social media URLs (Facebook, YouTube, LinkedIn) are guesses | `src/content/site.ts` → `SITE.social` | Real profile URLs |
| WhatsApp number assumed to be the HQ phone `+1 720 598 9177` | `src/content/site.ts` → `SITE.whatsapp` | Confirm the WhatsApp Business number |
| Payment methods per country | `src/content/countries.ts` → `paymentMethods` | Confirm which gateways LIU has contracts for in each country |

## Features not yet connected

| Item | Where | What's needed |
|---|---|---|
| Newsletter sign-up only shows a thank-you message; nothing is stored | `src/components/site/NewsletterForm.tsx` | Mailing-list provider (Mailchimp, Brevo, etc.) and API key |
| Site search covers navigation links only | `src/lib/search.ts` | Extend to page content as pages are built, or use a hosted search service |
| "Careers" and "Partner with us" link to anchors on Contact / Become an Affiliate that don't exist yet | `src/content/navigation.ts` | Built in phase 4; confirm whether LIU wants a careers page at all |

## Content in undesigned areas

| Item | Where | What's needed |
|---|---|---|
| Academics and Media dropdowns have no design — built from the S02–S05 pattern | `src/content/navigation.ts` | Client review of links, descriptions and feature cards |
| Mobile menu adds Academics, Media & events and Get in touch groups beyond the four in SM2, so every section is reachable | `src/content/navigation.ts` → `MOBILE_MENU_GROUPS` | Client review |
| Dropdown descriptions for Academics/Media ("Standards, credit hours and policies", "Updates from every campus", …) | `src/content/navigation.ts` | Confirm copy |

## Images

Every photo is on **Cloudinary** (folder `CLOUDINARY_FOLDER`, default `website`) and listed in
`src/content/media.ts`; nothing is kept in `public/`. To add or replace a photo: add it to
`media.ts`, then run `pnpm images:upload` (use `--force` after replacing a source file).
Sources: LIU's supplied photos in `../leadimpact/` and the slider photos, course thumbnails and sample
certificate saved from the live site. Without `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, photos show as
labelled placeholders.

Placement choices to review: banner photos on each inner page, the event and news photos, and the
gallery albums (“Leadership masterclass”, “WOBICON”, “Exclusive Leadership Masterclass”, “LIU in
Tanzania”) were picked by us from the supplied photos. Board portraits were matched to names using
the live site’s Board of Regents page.

| Item | Where | What's needed |
|---|---|---|
| Hero slider photos have the LIU shield watermarked into the top-left corner and a heavy dark overlay baked in (the hero brightens them with a CSS filter) | `src/content/media.ts` → `heroLead/Transform/Impact` | Clean, un-darkened originals without the watermark |
| Course thumbnails also carry the shield watermark | `src/content/media.ts` → `program*` | Clean originals, ideally at 2× (700×840) |
| Home campus cards (05) show event photos as stand-ins — they are not photos of each country’s campus | `src/content/affiliates.ts` → `COUNTRY_PHOTOS` | One photo per country |
| Home news cards use event photos chosen by us; the two blog stories’ photos are stand-ins (the Kampala story shows a Tanzania graduation photo) | `src/content/news.ts` | Photos per story |
| LIU Learn device mock-ups (home 04 and /learn-online) show the L02 dashboard and L03 phone designs from `design 3` | `src/components/ui/LearnDevices.tsx` | Replace with real screenshots once LIU Learn is built |
| Testimonial cards (home 08) show masterclass certificate-presentation photos as stand-ins; the people pictured are not the (placeholder) graduates quoted | `src/content/testimonials.ts` | Each graduate’s photo, with consent |
| Banner photos still missing: blog stories and the country affiliate pages | `media/blog/[slug]`, `affiliates/[country]` | Photos if wanted |

## Home page and About content

| Item | Where | What's needed |
|---|---|---|
| Statistics: 459+ students, 35+ instructors, 60+ programs, from the current leadimpactuniversity.com site (the client’s choice until the back end supplies live counts). Note “60+ programs” counts differently from the 12 programs listed on the site | `src/content/home.ts` → `STATS`, `MOBILE_STATS` | Live figures from the FastAPI back end |
| “12 programs” and “7 colleges” counts | `src/content/home.ts`, `src/content/about.ts` | Confirm the program count |
| Testimonials — all 6 are bracketed placeholders. The old site has one from Samuel Henteng Jnr. (Accra, Ghana) | `src/content/testimonials.ts` | Real graduate quotes, names, programs and **consent** |
| News and event dates (14 Nov, TBC 2027, 05 Dec, 20 Nov) and the stories themselves | `src/content/news.ts` | Real dates and articles (dates carry the dotted marking) |
| President’s full message — page ends with “[Replace with the President’s full approved message.]” | `src/content/people.ts` → `PRESIDENT_MESSAGE` | Approved text |
| “Watch the President’s welcome” links to the YouTube channel | `src/app/(site)/about/president/page.tsx` | URL of the welcome video |
| President card social icons point to the university’s profiles | `src/app/(site)/about/president/page.tsx` | The President’s own profiles, or remove |
| Board member biographies (profile pages, no design — built from S07/S08 patterns) | `src/app/(site)/about/board-of-regents/[slug]/page.tsx` | One biography per member |
| “Write to the Secretary” opens an email to info@ | `src/app/(site)/about/board-of-regents/page.tsx` | Confirm the Secretary’s address |
| “See accreditation” links to `/academics/academic-affairs#accreditation` | `src/components/home/WhyChoose.tsx` | Accreditation details for that section (phase 3) |
| Kenya: “Nairobi · details to confirm” on campus cards | `src/content/countries.ts` → `campusDetail` | Kenya campus details |

## Mobile home (SM1)

SM1 omits several desktop sections; at the client’s request (most students use phones) every home section
now has a phone layout instead: stacked course finder, swipeable programs and campuses, photo-led testimonial,
icon list for “Why choose LIU” and the certificate band. Only the black stats bar stays desktop-only (phones
show the same figures as stat cards). Phones have no menu button: the desktop menu appears as 8 orange section tabs (two rows) on the dark band
under the header, on every page; Home and Contact are links, the others open a panel of that section’s pages.
The mobile header keeps Apply and Login, the crest spans the top bar and header row, the whole header sticks,
and search moved to the mobile footer links. The phone hero has a fixed height that fills the first screen under the
header and tabs (min 440px), every slide keeps the same layout, and the slide navigator is desktop-only (phones swipe; autoplay continues).


## Admissions, tuition and scholarships (phase 3)

| Item | Where | What's needed |
|---|---|---|
| Printable admission form is a one-page placeholder PDF | `public/forms/liu-admission-form.pdf` | The official form as a PDF |
| FAQ “How long does a decision take?” — typical decision time | `src/content/admissions.ts` → `ADMISSIONS_FAQS` | Real turnaround |
| Credit transfer evaluation and graduation/certificate fees show “[Fee TBC]” | `src/content/admissions.ts` → `TUITION_PAGE.extras` | Fees |
| Local-currency estimates use **sample** rates (₦1,500, USh 3,700, GH₵ 15, KSh 130 per US$) | `src/lib/currency.ts` | A live exchange-rate source before launch |
| Payment methods per country (incl. Paystack in Nigeria, Telecel Cash in Ghana) | `src/content/countries.ts` | Confirm the gateways LIU will contract |
| “Book a meeting with an admissions officer” opens an email | `src/app/(site)/admissions/page.tsx` | Booking link (Calendly etc.) if wanted |
| “Request a scholarship review” from the applicant dashboard | S10 copy | Built in the portal phases |

## Programs and academics (phase 3)

| Item | Where | What's needed |
|---|---|---|
| Program descriptions migrated from the current site (lightly edited) | `src/content/programs.ts` | LIU review of the copy |
| **Christian Education** has no page on the current site — description is a placeholder | `src/content/programs.ts` | Description |
| **Chaplaincy** is on the old site’s menu but not on its application form | `src/content/programs.ts` | Confirm it is a degree major |
| **Communication** and **Multimedia Technology** colleges have no programs on the real form — their filters show “coming soon” | `src/content/colleges.ts` | Confirm whether these colleges offer programs |
| Levels per program: only Theology is confirmed for all six (Certificate → PhD); others show Certificate–Master’s as in S12 | `src/content/programs.ts` → `levels` | Confirm levels per program |
| Course list published for Theology only (from S13); others say “to be published” | `src/content/programs.ts` → `courses` | Curriculum per program and level |
| Course counts per level (4, 10, 40 · 120 cr, 12 · 36 cr) come from S13 and are applied to every program | `src/content/programs.ts` → `LEVELS` | Confirm |
| Example career paths on every program page | `src/content/programs.ts` → `careers` | Confirm or replace |
| Program photos | `src/content/programs.ts` → `imageLabel` | One photo per program |
| Grading scale shows standard US bands | `src/content/academics.ts` → `grading` | Registrar to confirm |
| Academic calendar dates are the design’s sample dates; “Download calendar” is disabled | `src/content/academics.ts` → `calendar` | Approved calendar (and PDF) |
| Accreditation & recognition section is a placeholder (home “See accreditation” links here) | `src/app/(site)/academics/academic-affairs/page.tsx` | Accreditation details |
| Faculty biographies, and portraits for 7 of 11 people (the 4 who are also regents use their board portrait); profile pages have no design | `src/content/faculty.ts` | Bios and photos |
| “Kathy Archibong” appears twice in S15 (once as “Dr.”, in two colleges) — treated as one person | `src/content/faculty.ts` | Confirm |
| The home page showed Youth Ministry under Randolph Gurley College; S12 and the menus put it under Christian Education — Christian Education used everywhere | `src/content/home.ts` | Confirm |

## Affiliates, media, contact (phase 4)

| Item | Where | What's needed |
|---|---|---|
| Campus details (names, addresses, phones) migrated from the current site; Nigeria now shows 4 campuses — **Orwell School of Communications & Media Studies, Enugu** is on the live site but not in the S17 design | `src/content/affiliates.ts` | Confirm all campuses and numbers |
| Country phone numbers now use each country’s campus line (NG +234 803 250 7326, UG +256 772 483 248, GH +233 54 252 8830) | `src/content/countries.ts` | Confirm which number each country should show |
| The old site’s Ghana page says students study “at Glorious School of Ministry” (the Uganda campus) — looks like a copy error | `src/content/affiliates.ts` | Confirm the Ghana campus name |
| Campus photos and campus maps | `/affiliates/[country]` | Photos; map embeds if wanted (Directions opens Google Maps) |
| “Apply to this campus” passes the country to the application | affiliate pages | Campus choice is added in the application form (portal phase) |
| Contact, become-an-affiliate and newsletter forms validate but **send nothing** (shown as “Demo”) | `src/demo/api/enquiries.ts` | FastAPI endpoints + a mailbox/CRM to receive them |
| LIU Learn page: “Android app · coming soon” (no app exists); login goes to `NEXT_PUBLIC_LEARN_URL` | `src/app/(site)/learn-online/page.tsx` | Decide on the app; LIU Learn is on hold (custom vs Moodle) |
| LIU Learn figures (48 MB a week, ~2 MB/min video, 90-min exams) are design estimates | same | Confirm once the platform is chosen |
| Events: all dates/venues are placeholders; “Register” opens an email except WOBICON (wobicon.org) | `src/content/events.ts` | Real events and registration links |
| “Watch 2025 highlights” and all gallery videos link to the YouTube channel | `src/content/gallery.ts` | Individual video URLs |
| Blog: all 7 stories and their bodies are placeholders (S21 samples); the Nairobi story was replaced while Kenya is unconfirmed | `src/content/posts.ts` | Real articles |
| Four gallery albums have LIU’s photos; Commencement, the two campus albums and Teen Impact Camp are still samples. Albums don’t open yet | `src/content/gallery.ts` | Photos for the sample albums; album pages |
| Prospective students: information-session booking opens an email; prospectus “coming soon” | `src/app/(site)/prospective-students/page.tsx` | Booking link; prospectus PDF |
| Careers section on Contact is a short placeholder | `src/app/(site)/contact/page.tsx` | Whether LIU wants a careers page |
