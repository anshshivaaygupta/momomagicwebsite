# Premium storefront rebuild — 10 October 2026

Black, ivory and gold brand system based on the owner's supplied logo. Original implementation inspired by the 21st.dev gallery and MIT 3D carousel concepts; no custom-licensed code copied.

## Pages and assets
- Home: cinematic food hero, three compact menu teasers, procedural Three.js momo world with sculpted pleats and red chillies, steam animation, real cart story and short service links.
- Menu/order menu: twelve independently generated, filling-specific images; catalogue prices and availability retained. Pizza stays excluded from API, menu and saved carts.
- About: cart story, fillings, textures and local visit information.
- Gallery: original Maps cart/food/poster images, accessible enlarged view, click-to-load owner-supplied Instagram reel. Reel is not on home.
- Contact: cinematic aerial-style creative cart visualisation (labelled), actual map, verified contact information and owner-supplied Instagram/Justdial links.
- Catering and combos: sharing imagery and clear enquiry vs order distinction. Package quotes are not automatically charged. Menu orders use the payment flow.
- Global responsive styling covers account, partner, careers and policy pages. Reduced-motion preference disables animation; 3D has an image fallback and pause control.

Generated assets use built-in image generation, individual prompts per menu item, dark ceramic/gold edge lighting, visible filling and distinct steamed/fried/coarse-crumb surfaces. They illustrate the food; original outlet photos remain separate. Final assets live in public/images/premium, logo in public/images/brand. No stock captions under menu images.

## Payment implementation / activation gate
Payment is OFF until the owner supplies a gateway. No fake success state and no unpaid order WhatsApp handoff.
An optional Razorpay adapter is implemented; another gateway requires a provider adapter when selected. To activate Razorpay after merchant setup and sandbox testing:
- PAYMENT_PROVIDER=razorpay
- PAYMENTS_ENABLED=true
- RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET as server-side deployment secrets
- Configure automatic capture in the merchant dashboard.
Do not put secret keys in NEXT_PUBLIC variables or source control.
Server catalogue pricing ignores client totals. Contact, quantity and availability are validated. A random HttpOnly session token protects receipts. Checkout callback uses HMAC signature validation; the server additionally fetches captured payments and matches order, currency, amount and refund state. Status refresh reconciles interrupted callbacks. Pending sessions resume instead of charging a new order. Receipt access requires the same session cookie. The final WhatsApp message contains order details and verified payment reference; downloadable text receipt is available. Browser cannot detect whether customer actually pressed Send.
Gateway payment/capture/refund tests remain blocked until credentials are supplied. No live money was charged. Merchant operational pickup/availability and gateway acceptance must be verified before enabling payments.

## Source limitations
Instagram public profile confirms @momo_magic01, Naya Bazar Sherghati and 2 PM–10 PM. Individual post access asked for login. Justdial short link redirected but content returned 403. Supplied links are included; reviews were not fabricated. Google Maps review link is provided; live review ingestion is not configured.
