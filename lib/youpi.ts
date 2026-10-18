import {createHmac, timingSafeEqual} from 'node:crypto';

// Independent merchant-side adapter. No upstream gateway source is bundled.
export function youpiReady() {
  try {
    const api = new URL(process.env.YOUPI_API_URL || '');
    const checkout = new URL(process.env.YOUPI_CHECKOUT_URL || '');
    return process.env.PAYMENT_PROVIDER === 'youpi' && process.env.PAYMENTS_ENABLED === 'true' &&
      process.env.YOUPI_PRODUCTION_APPROVED === 'true' && api.protocol === 'https:' &&
      checkout.protocol === 'https:' && !!process.env.YOUPI_MERCHANT_ID &&
      (process.env.YOUPI_API_TOKEN || '').length >= 32 && (process.env.YOUPI_WEBHOOK_SECRET || '').length >= 32;
  } catch { return false; }
}
export function youpiCheckout(id: string) {
  if (typeof id !== 'string' || !/^[a-zA-Z0-9-]{1,100}$/.test(id)) throw Error('Invalid payment session.');
  return new URL('/checkout/' + id, process.env.YOUPI_CHECKOUT_URL).href;
}
export async function createYoupi(orderId: string, amountPaise: number) {
  if (!youpiReady() || !Number.isSafeInteger(amountPaise) || amountPaise <= 0) throw Error('UPI payments are not configured.');
  const response = await fetch(new URL('/api/v1/payments', process.env.YOUPI_API_URL), {
    method: 'POST', redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(15000),
    headers: {'Content-Type':'application/json', Authorization: `Bearer ${process.env.YOUPI_API_TOKEN}`,
      'X-Merchant-Id':process.env.YOUPI_MERCHANT_ID!, 'Idempotency-Key':orderId},
    body:JSON.stringify({orderId,amount:(amountPaise/100).toFixed(2),currency:'INR',method:'UPI'})
  });
  if (!response.ok) throw Error('Unable to start UPI payment. Please retry.');
  const data = await response.json();
  if (data.orderId !== orderId || Number(data.amountPaise) !== amountPaise || data.currency !== 'INR') throw Error('Payment service returned an invalid order.');
  youpiCheckout(data.paymentId);
  return {id:'youpi:' + data.paymentId};
}
export function verifyYoupiEvent(raw: string, signature: string, secret: string) {
  if (secret.length < 32 || !/^sha256=[a-f0-9]{64}$/.test(signature)) throw Error('Invalid payment signature.');
  const expected=createHmac('sha256',secret).update(raw).digest();
  if (!timingSafeEqual(expected,Buffer.from(signature.slice(7),'hex'))) throw Error('Invalid payment signature.');
  const event=JSON.parse(raw);
  // COD and counter acknowledgements are NOT online payment evidence.
  if (event.event !== 'SUCCESS' || event.method !== 'UPI' || event.currency !== 'INR' ||
      !Number.isSafeInteger(event.amountPaise) || event.amountPaise <= 0 ||
      typeof event.orderId !== 'string' || typeof event.paymentId !== 'string' ||
      typeof event.utr !== 'string' || !/^\d{12}$/.test(event.utr)) throw Error('Invalid prepaid payment event.');
  return event as {orderId:string;paymentId:string;amountPaise:number;utr:string};
}
