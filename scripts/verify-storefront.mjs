import {spawn} from 'node:child_process';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const file=fs.openSync('/tmp/momo-storefront-server.log','w');
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','35112','-H','127.0.0.1'],{stdio:['ignore',file,file]});
const origin='http://127.0.0.1:35112';
const results=[];
async function test(name,fn){try{await fn();results.push({name,pass:true});console.log('PASS',name)}catch(e){results.push({name,pass:false,error:e.message});console.log('FAIL',name,e.message)}}
try{
for(let i=0;i<80;i++){try{if((await fetch(origin)).ok)break}catch{}await new Promise(r=>setTimeout(r,250))}
const routes=['/','/about','/menu','/order/menu','/order/cart','/order/checkout','/order/payment','/gallery','/contact','/catering','/combo-deals','/franchise','/careers','/order/login','/privacy-policy','/terms-conditions','/refund-cancellation','/shipping-delivery','/online-ordering-policy','/download-app'];
const links=new Set(),images=new Set();
for(const path of routes)await test('Public page '+path,async()=>{const res=await fetch(origin+path);assert.equal(res.status,200);const html=await res.text();assert.ok(!/Application error/i.test(html));const text=html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<[^>]*>/g,' ');assert.ok(!/pizza|representative stock|stock photo/i.test(text),'retired item or photo caption');for(const [,url] of html.matchAll(/<a[^>]+href="([^"#?]+)[^"]*"/g))if(url.startsWith('/')&&!url.startsWith('//'))links.add(url);for(const [,url]of html.matchAll(/<img[^>]+src="([^"]+)"/g))if(url.startsWith('/'))images.add(url)});
await test('Every internal link responds',async()=>{for(const p of links)assert.ok((await fetch(origin+p)).status<400,p)});
await test('Every referenced image responds',async()=>{for(const p of images)assert.equal((await fetch(origin+p)).status,200,p)});
await test('Protected CMS rejects unauthenticated access',async()=>assert.equal((await fetch(origin+'/api/cms/menu')).status,401));
await test('Public API removes retired items',async()=>{const d=await (await fetch(origin+'/api/content?section=menu')).json();assert.ok(d.items.length>0);assert.ok(!JSON.stringify(d).toLowerCase().includes('pizza'))});
await test('Public API hides private sections',async()=>assert.equal((await fetch(origin+'/api/content?section=users')).status,404));
await test('Gateway stays disabled without credentials',async()=>{const d=await (await fetch(origin+'/api/order/payment')).json();assert.equal(d.enabled,false);assert.equal(d.session,null);const r=await fetch(origin+'/api/order/payment',{method:'POST',headers:{origin,'Content-Type':'application/json'},body:'{}'});assert.equal(r.status,503)});
await test('Forged payment cannot unlock receipt',async()=>{const r=await fetch(origin+'/api/order/payment/verify',{method:'POST',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify({razorpay_payment_id:'fake'})});assert.equal(r.status,503)});
await test('Diagnostic endpoint remains disabled',async()=>assert.equal((await fetch(origin+'/api/test-db')).status,404));
}finally{server.kill();fs.closeSync(file);fs.mkdirSync('artifacts',{recursive:true});fs.writeFileSync('artifacts/storefront-audit.json',JSON.stringify(results,null,2))}
if(results.some(x=>!x.pass))process.exitCode=1;
