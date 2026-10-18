# Dependency security maintenance — 18 October 2026

Hostinger reported 30 findings (17 high, 13 moderate). Its full advisory list
was not supplied, so that count cannot be equated to npm's affected-package count.

Local npm audit before updates: 19 affected packages (15 high, 4 moderate).
After updates: 7 high affected packages, all in the development dependency tree.
Production-only audit: 0 known vulnerabilities; this is not a full application security certification.

## Changes
- Regenerated the npm lockfile using compatible security updates, without force-upgrading frameworks.
- Next 15.5.28, sharp 0.35.5, mysql2 3.24.6, nanoid 3.3.20,
  brace-expansion 1.1.21, flatted 3.4.4, @humanfs/node 0.16.8 and source-map-js 1.2.2.
- Override Next's nested PostCSS to 8.5.30, removing the vulnerable 8.4.31 copy.
- Override postcss-selector-parser to 7.1.6 and verify compilation with Tailwind 3.
- No production payment settings were enabled or changed.

## Remaining advisory (not suppressed)
GHSA-vfj7-8cjw-p6xm / CVE-2026-93687 affects braces <=3.0.3.
https://github.com/advisories/GHSA-vfj7-8cjw-p6xm lists no patched version.
It propagates through chokidar, micromatch, fast-glob, Tailwind and Next's ESLint plugin/config
(7 affected package entries for the dependency chain).
These tools process repository-owned glob patterns during development/build.
No direct use of these glob libraries was found in the app, lib or components source.
Do not expose a build service accepting untrusted glob patterns or unreviewed source changes.
A Tailwind 4/toolchain migration is a separate change requiring visual regression checks;
blind audit --force would also suggest unrelated breaking framework changes.
Hostinger may continue to flag this build-time dependency. Do not label all findings fixed.

## Verification
- npm audit --omit=dev --json
- npm run build
- node scripts/verify-storefront.mjs (28 storefront checks)
- node --import tsx scripts/verify-payments.ts
- node --import tsx scripts/verify-youpi.ts
Re-run the Hostinger scan after its deployment uses the new commit.
