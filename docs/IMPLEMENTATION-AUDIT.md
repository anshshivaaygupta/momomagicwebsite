# Momo Magic implementation audit

Business: Naya Bazar, Near Post Office, Sherghati, Bihar 824211. WhatsApp +91 9955955191 (owner confirmed).

## Fixed

- Updated Next.js to 15.5.27 and aligned the package lock/install configuration.
- Replaced missing hero/video and menu photography with locally served Unsplash images; attribution is in `public/image-credits.json`. Images are representative stock, not claimed outlet photographs.
- Replaced the placeholder APK with truthful Android/iPhone home-screen instructions.
- Menu search, categories, dietary/spice/price filters, cart, 5/10-piece quantities and checkout use menu data. Category links now select the requested category.
- Checkout, catering booking, contact, franchise and career forms open the business WhatsApp with encoded customer details. The customer must tap Send. Requests are not automatically confirmed and the website does not send messages itself.
- Disabled simulated PhonePe transactions and false payment/order confirmations. Gateway credentials are not configured. Ordering is takeaway; availability, collection time and final price are agreed with the business.
- Replaced unauthenticated admin access, default credentials and unsigned customer sessions with signed, expiring, HttpOnly sessions. Passwords for customer accounts are hashed with bcrypt. Login attempts are rate limited in durable storage.
- Removed publicly accessible diagnostic/migration APIs.
- Replaced filesystem/MySQL-only CMS persistence with SQLite locally and a private Vercel Blob snapshot in production. Blob writes use conditional ETag updates with retries. This suits a small, low-traffic restaurant site; a transactional hosted database is appropriate if concurrent traffic grows.
- Media uploads use private Blob storage and a public image delivery endpoint. Maximum upload is 4 MB.
- Connected public hero text, logo, founder story/timeline, menu availability, combos, gallery, catering packages/calculators and career categories to CMS data. Additional policy notes persist and appear on public policy pages.
- Removed fabricated Google reviews, sales, order activity, customer applications and random performance figures. Analytics returns an explicit unconfigured state with zero values rather than invented measurements.
- Corrected the combo CMS/public data-shape mismatch and mobile franchise overflow.

## Services and owner content requiring real inputs

- No verified Google Maps photo source for this exact Sherghati outlet was found. Maps opens a search for the confirmed address. Replace stock with owner-authorized outlet photos in CMS when available.
- No SMS/email OTP, password-reset delivery, payment gateway, delivery tracking, WhatsApp Business API inbox, marketing analytics or native APK provider is connected. These are not advertised as working integrations.
- Email/password signup and login work without verifying ownership of the phone/email. Guest orders work too.
- Website orders/bookings are WhatsApp requests. WhatsApp does not send conversation/booking/payment status back to this website. Confirm them in the business account.
- Existing owner-authored franchise forecasts, expansion plans, certification claims, opening hours, prices and policy text are retained. The owner should verify these facts and terms before relying on them commercially.
- SEO/integration configuration screens store settings, but a saved API key alone does not establish a live provider connection. Connection tests no longer fake success.
- The old builder/design tooling remains available as authoring tooling; not every historical visual-design setting is consumed by each public component.
- Build performs TypeScript checks; pre-existing repository-wide lint issues are excluded from the build. Browser/API integration verification is in `scripts/verify.mjs` and `scripts/verify-extra.mjs`.

## Running locally

Use Node 22 or newer, `npm ci`, then set `SESSION_SECRET` (at least 32 characters), `ADMIN_USERNAME`, and a strong `ADMIN_PASSWORD` in `.env.local`. `npm run dev` runs the site. `npm run build` creates the production build.

Do not commit `.env.local`, Vercel tokens, `.local-data`, test accounts or uploaded customer data. Production uses the linked private Blob token and production-only encrypted Vercel environment variables.

## Verification

The automated checks cover public pages at 1440 px and 390 px, image delivery, anonymous API denial, invalid and valid admin login, customer signup/login/logout, CMS menu persistence, image upload, all admin page renders, menu search and WhatsApp checkout/catering redirects. Redirects are intercepted; no test message is sent to the business.

## Final recovery checks (9 October 2026, India)

- Recovered saved source and verified the linked Vercel production project and admin login.
- Fixed category links when navigating within the menu, tablet navigation spacing, keyboard dropdown toggling, mobile menu scrolling, and phone autofill for numbers beginning with 91.
- Replaced remaining homepage/About image placeholders and catering sample testimonials with attributed, representative stock photography. About gallery images now open in the lightbox.
- Disabled the leftover publish-test diagnostic endpoint.
- A stale local Next.js build referenced outdated JavaScript chunks; moved the old build aside and rebuilt from source before the final browser run.

Final local validation: production build and `git diff --check` passed; 64 primary browser/API checks, 39 additional CMS/order checks, and 3 navigation/photo regression checks passed. Browser checks cover desktop 1440 px, mobile 390 px and targeted tablet 1024 px navigation. Test WhatsApp navigation is intercepted so no message is sent.

## Street-food redesign — 9 October 2026

Supersedes the earlier representative-photo storefront. Removed unavailable pizza items from visitor menus, category tabs, seeds and public API responses; stored items remain archived in the authenticated CMS. Existing carts filter unavailable legacy items. Prices align to the business menu poster: Paneer Fried half ₹40; Cheese Corn Fried full ₹110; Kurkure Soya added at ₹50/₹100.

Rebuilt Home, Menu, About, Gallery, Contact, Catering, Combos, Careers, Franchise intro and Cart. Homepage uses short page teasers instead of full duplicate sections. Removed unverified reviews, return-on-investment calculators and unused marketing sections from the visitor flow. Header has a compact mobile navigation; menu has search/category filters, explicit portion buttons and a live cart notice. Gallery uses a native keyboard-accessible dialog. Forms continue to WhatsApp; no order is represented as paid or confirmed by the website. Cart total now matches checkout without an unverified automatic tax charge.

Downloaded 27 images exposed in the correct Google Maps profile and visually inspected the contact sheet. Selected eight original listing assets: stall, street view of cart, two food/preparation photos, menu card, and three item posters. The Street View entry was not downloaded as a business photo. Unselected photos remain working downloads; selected optimized WebP files are versioned. Source manifest is in `docs/google-maps-photo-sources.json`. Reused relevant licensed food photos with credits retained in `public/image-credits.json`, without visitor-facing stock labels. No unverified offer poster was used.

Visual direction: original CSS perspective/tilt implementation inspired by the lightweight tilt-card and rotated-card patterns on 21st.dev (https://mcp.21st.dev/@tom_ui/components/tilt-card/evade and https://mcp.21st.dev/@scrollxui/components/hero-with-cards). No copied component dependencies. Motion respects reduced-motion and avoids pointer tilt on touch devices.

Validation for this redesign: TypeScript and production build pass. `scripts/verify-storefront.mjs` checks 19 routes, rendered internal links and image references, public filtering and protected API boundaries (25 checks). Earlier browser test counts above refer to the preceding design, not this redesign. Production visual/form validation is recorded after deployment.

Production checks: commit 291ec39 deployed successfully on Vercel. Live menu-to-cart navigation, portion selection and checkout total verified in the browser; original gallery images load and its modal opens/closes with Escape. Production CMS updates verified: retired items archived, missing Kurkure Soya added, corrected prices persisted. Catalog/WhatsApp unit checks cover stale and malformed carts, public filtering, destination number and encoded booking details. No WhatsApp message was sent. Final text cleanup removes obsolete online-payment and award claims; footer includes customer account access and international call links.
