import assert from 'node:assert/strict';
import {createHmac,randomUUID} from 'node:crypto';
import {NextRequest} from 'next/server';
import {youpiReady,verifyYoupiEvent,createYoupi} from '../lib/youpi';
import {POST} from '../app/api/order/payment/youpi-webhook/route';
import {query,queryOne} from '../lib/db';
async function main(){
 if(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID)throw Error('Use a local test database, not production Blob storage.');
 const secret='test-secret-only-'.repeat(4);
 assert.equal(youpiReady(),false);
 Object.assign(process.env,{PAYMENT_PROVIDER:'youpi',PAYMENTS_ENABLED:'true',YOUPI_PRODUCTION_APPROVED:'true',YOUPI_API_URL:'https://gateway.example',YOUPI_CHECKOUT_URL:'https://pay.example',YOUPI_MERCHANT_ID:'merchant-test',YOUPI_API_TOKEN:secret,YOUPI_WEBHOOK_SECRET:secret});
 assert.equal(youpiReady(),true);
 const id=randomUUID(),paymentId=randomUUID();const utr=String(Date.now()).slice(-12);
 const event={event:'SUCCESS',method:'UPI',currency:'INR',amountPaise:2500,orderId:id,paymentId,utr};
 const sign=(raw:string)=>'sha256='+createHmac('sha256',secret).update(raw).digest('hex');
 const raw=JSON.stringify(event);
 assert.equal(verifyYoupiEvent(raw,sign(raw),secret).utr,utr);
 assert.throws(()=>verifyYoupiEvent(raw+' ',sign(raw),secret));
 for(const patch of [{method:'COD'},{method:'CASH_COUNTER'},{amountPaise:-1},{amountPaise:2.5},{currency:'USD'},{utr:undefined}]){const bad=JSON.stringify({...event,...patch});assert.throws(()=>verifyYoupiEvent(bad,sign(bad),secret));}
 const originalFetch=globalThis.fetch;
 globalThis.fetch=async(_url,init)=>{const sent=JSON.parse(String(init?.body));assert.equal(sent.amount,'25.00');assert.equal(sent.method,'UPI');return Response.json({orderId:id,paymentId,amountPaise:'2500',currency:'INR'});};
 assert.equal((await createYoupi(id,2500)).id,'youpi:'+paymentId);globalThis.fetch=originalFetch;
 const request=(body:any)=>{const text=JSON.stringify(body);return new NextRequest('https://store.example/api/order/payment/youpi-webhook',{method:'POST',headers:{'x-gateway-signature':sign(text)},body:text});};
 const id2=randomUUID();
 try{
 await query('INSERT INTO checkout_sessions(id,access_hash,payload,amount,provider_order) VALUES(?,?,?,?,?)',[id,'test','{}',2500,'youpi:'+paymentId]);
 assert.equal((await POST(request({...event,amountPaise:1}))).status,409);
 assert.equal((await POST(request(event))).status,200);
 assert.equal((await POST(request(event))).status,200);
 assert.equal((await queryOne('SELECT status FROM checkout_sessions WHERE id=?',[id]))?.status,'paid');
 await query('INSERT INTO checkout_sessions(id,access_hash,payload,amount,provider_order) VALUES(?,?,?,?,?)',[id2,'test','{}',2500,'youpi:another']);
 assert.equal((await POST(request({...event,orderId:id2,paymentId:'another'}))).status,503);
 assert.equal((await queryOne('SELECT status FROM checkout_sessions WHERE id=?',[id2]))?.status,'pending');
 delete process.env.YOUPI_PRODUCTION_APPROVED;
 assert.equal(youpiReady(),false);assert.equal((await POST(request(event))).status,503);
 console.log('PASS: activation gate, signed raw body, tampering, COD rejection, missing UTR, currency/amount, creation, order binding, replay and duplicate bank reference.');
 }finally{await query('DELETE FROM checkout_sessions WHERE id IN (?,?)',[id,id2]);}
}
main().catch(e=>{console.error(e);process.exitCode=1});
