import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {paymentEnabled,pricedOrder,validSignature} from '../lib/checkout';
async function main(){
 delete process.env.PAYMENT_PROVIDER;delete process.env.PAYMENTS_ENABLED;
 assert.equal(paymentEnabled(),false);
 const good=createHmac('sha256','test-only-secret').update('order_1|pay_1').digest('hex');
 assert.ok(validSignature('order_1','pay_1',good,'test-only-secret'));
 assert.equal(validSignature('order_2','pay_1',good,'test-only-secret'),false);
 assert.equal(validSignature('order_1','pay_1','not-a-signature','test-only-secret'),false);
 const body={name:'Test Customer',phone:'9999999999',items:[{id:'steamed-veg',quantity:5,price:1,subtotal:1}]};
 const order=await pricedOrder(body);assert.equal(order.total,25);
 await assert.rejects(()=>pricedOrder({...body,items:[{id:'pizza',quantity:5}]}));
 await assert.rejects(()=>pricedOrder({...body,items:[{id:'steamed-veg',quantity:-5}]}));
 await assert.rejects(()=>pricedOrder({...body,phone:'123'}));
 console.log('PASS: payment gate, signature tampering, server pricing, unavailable items, quantities and contact validation');
}main().catch(e=>{console.error(e);process.exitCode=1});
