# Direct UPI integration — prepared, NOT activated

## Owner's supplied payment QR
Decoded locally from the supplied PhonePe image on 18 October 2026:
- UPI address: `Q057947335@ybl`
- Printed name: Dhrub Momo Magic
- Encoded payee label: PhonePeMerchant
- Original payload: `upi://pay?pa=Q057947335@ybl&pn=PhonePeMerchant&mc=0000&mode=02&purpose=00`

This confirms QR content, not account ownership or a successful bank transfer.
Do not substitute an invented account number or IFSC. Configure the receiving
account in the gateway only after the owner confirms the bank/payee identity.

## Implemented independently in this website
- Optional YouPI server-side order creation with catalog prices and UPI-only method.
- HTTPS hosted checkout redirect; no secret keys in browser code.
- Bounded raw-body HMAC webhook verification, exact order/payment/amount/currency binding.
- Reject COD, counter acknowledgement, missing UTR and malformed or forged events.
- Unique bank references and idempotent duplicate deliveries.
- Existing paid receipt and WhatsApp handoff unlock only after verified payment.
- Razorpay remains available; YouPI is OFF until all activation gates are configured.

No upstream gateway source or APK is redistributed. No bank credentials were stored.

## Upstream review / blockers
Reviewed https://github.com/youpi-pg/YouPI-PG at
`d92505a0901eaf17181464bd6ce87018cf692339`.
1. `package.json` declares `license: Commercial`; no LICENSE file was found.
   Obtain explicit free commercial/self-hosted usage permission before deploying it.
2. `apps/payment-api/src/auth-guard.js` leaves merchant payment routes public.
   Require a merchant-bound secret on server-to-server creation and status access;
   the adapter sends a Bearer token but upstream must actually enforce it.
3. `packages/core/src/webhook-engine.js` omits UTR in its actual signed payload,
   contrary to AGENTS.md. Add only the verified observation's UTR, never client input.
   This website intentionally rejects missing UTR; do not weaken that check.
4. SMS/email observation is not a bank settlement API. Validate alert authenticity,
   replay handling, sender/provider matching, amount and late-payment attribution.
5. Isolate bank-alert observer credentials, secure admin access, disable production
   simulators and complete real-device and small-value owner-run payment tests.

## Free work vs infrastructure
The merchant-side code, tests and configuration are implemented without paid APIs.
The gateway advertises no platform transaction fee, but VPS, domain, phone data,
operations and any bank/provider charges are not guaranteed free. Current Vercel
storefront can remain; continuous gateway/observer processes need suitable hosting.
No paid service or cloud instance has been purchased or created.

## Owner inputs still needed
- Confirm the supplied QR is the intended receiving account; bank name and payee name.
- Whether bank credit alerts arrive by SMS, email, or both.
- An available Android observer phone OR a bank-alert mailbox connected through OAuth.
- Existing VPS/AWS hosting availability, domain/DNS access through secure setup.
- Upstream licensing confirmation and resolved code blockers above.
Never share UPI PIN, OTP, bank password, Gmail password or cloud root keys in chat.

## Environment (server secrets only)
PAYMENT_PROVIDER=youpi
PAYMENTS_ENABLED=false
YOUPI_PRODUCTION_APPROVED=false
YOUPI_API_URL=https://your-payment-api.example
YOUPI_CHECKOUT_URL=https://your-checkout.example
YOUPI_MERCHANT_ID=<configured merchant ID>
YOUPI_API_TOKEN=<random 32+ character token, enforced by gateway>
YOUPI_WEBHOOK_SECRET=<random 32+ character shared HMAC secret>

Set gateway webhook URL to:
https://momo-magic-website.vercel.app/api/order/payment/youpi-webhook

Enable BOTH boolean flags only after blockers and end-to-end tests are complete.
The static supplied QR is intentionally not displayed as a payable checkout:
it cannot alone securely correlate a payment with an individual website order.

## Verification
Run `node --import tsx scripts/verify-youpi.ts` using a LOCAL test database.
Never run fixture tests against the production Blob store.
