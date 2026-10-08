import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {chromium as playwright, request} from '@playwright/test';
import chromium from '@sparticuz/chromium';
const origin=process.env.VERIFY_URL||'http://localhost:35103';
const log=await fs.open('/tmp/momo-server.log','w');
const server=process.env.VERIFY_URL?null:spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','35103','-H','127.0.0.1'],{stdio:['ignore',log.fd,log.fd]});
const results=[];let browser;
async function test(name,fn){try{await fn();results.push({name,pass:true});console.log('PASS',name);}catch(e){results.push({name,pass:false,error:e.message});console.log('FAIL',name,e.message);}}
try{
 for(let i=0;i<120;i++){try{if((await fetch(origin)).ok)break;}catch{}await new Promise(r=>setTimeout(r,500));}
 const env=Object.fromEntries((await fs.readFile('.env.local','utf8')).split('\n').filter(l=>l&&!l.startsWith('#')&&l.includes('=')).map(l=>{let i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1).replace(/^"|"$/g,'')]}));
 const api=await request.newContext({baseURL:origin});
 await test('admin APIs reject anonymous',async()=>assert.equal((await api.get('/api/cms/menu')).status(),401));
 await test('diagnostic endpoint disabled',async()=>assert.equal((await api.get('/api/test-db')).status(),404));
 await test('admin rejects wrong password',async()=>assert.equal((await api.post('/api/auth/login',{data:{username:'admin',password:'incorrect'}})).status(),401));
 await test('admin login',async()=>{const r=await api.post('/api/auth/login',{data:{username:env.ADMIN_USERNAME,password:env.ADMIN_PASSWORD}});assert.equal(r.status(),200);});
 for(const section of ['hero','about','contact','menu','gallery','combos','catering','logo','social','cta','media','menu-filters','backup','analytics'])await test('CMS GET '+section,async()=>{const r=await api.get('/api/cms/'+section);assert.equal(r.status(),200,(await r.text()).slice(0,250));});
 await test('menu save persists publicly',async()=>{const original=await (await api.get('/api/cms/menu')).json();const item=original.items[0];const changed={...item,name:item.name+' QA'};try{assert.equal((await api.post('/api/cms/menu',{data:{item:changed}})).status(),200);const data=await(await api.get('/api/content?section=menu')).json();assert.equal(data.items.find(i=>i.id===item.id).name,changed.name);}finally{await api.post('/api/cms/menu',{data:{item}});}});
 const publicApi=await request.newContext({baseURL:origin});
 const email='qa-'+Date.now()+'@example.test';const password='Test-only-Strong-1837';
 await test('customer signup',async()=>{const r=await publicApi.post('/api/order/auth',{data:{action:'signup',name:'Website QA',phone:'9876543210',email,password}});assert.equal(r.status(),200,await r.text());});
 await test('customer profile is real and excludes password',async()=>{const r=await publicApi.get('/api/order/auth');assert.equal(r.status(),200);const d=await r.json();assert.equal(d.user.email,email);assert.equal(d.user.password_hash,undefined);});
 await test('customer logout and login',async()=>{await publicApi.delete('/api/order/auth');assert.equal((await publicApi.get('/api/order/auth')).status(),401);assert.equal((await publicApi.post('/api/order/auth',{data:{action:'login',email,password}})).status(),200);});
 browser=await playwright.launch({args:chromium.args.filter(a=>a!=='--single-process'),executablePath:await chromium.executablePath(),headless:true});
 await fs.mkdir('artifacts',{recursive:true});
 const paths=['/','/about','/menu','/combo-deals','/gallery','/catering','/franchise','/contact','/careers','/download-app','/privacy-policy','/terms-conditions','/refund-cancellation','/shipping-delivery','/online-ordering-policy','/order/login','/order/menu','/order/cart','/order/checkout'];
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:900}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.dismiss());
  for(const path of paths)await test(width+' route '+path,async()=>{const r=await page.goto(origin+path,{waitUntil:'networkidle'});assert.ok(r.status()<400);assert.ok(!(await page.locator('body').innerText()).includes('Application error'));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'Horizontal overflow');const broken=await page.locator('img').evaluateAll(images=>images.filter(i=>i.complete&&!i.naturalWidth&&i.getBoundingClientRect().height>0).map(i=>i.src));assert.deepEqual(broken,[],'Broken images');});
  await page.goto(origin+'/');await page.screenshot({path:'artifacts/home-'+width+'.png',fullPage:true});
  await test(width+' client has no runtime errors',async()=>assert.deepEqual(errors,[]));
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:390,height:844}});const page=await context.newPage();page.on('dialog',d=>d.dismiss());
 await test('cart item quantity and checkout',async()=>{await page.goto(origin+'/order/menu',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Add 5pc',exact:true}).first().click();const cart=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('cart')));assert.equal(cart.length,1);assert.equal(cart[0].quantity,5);await page.goto(origin+'/order/cart');assert.ok((await page.locator('body').innerText()).includes(cart[0].menuItem.name));});
 await test('catering form redirects with details to correct WhatsApp',async()=>{await page.goto(origin+'/catering');let url='';await page.route('https://wa.me/**',async r=>{url=r.request().url();await r.abort();});await page.locator('[name=fullName]').fill('Booking QA');await page.locator('[name=phone]').fill('9876543210');await page.locator('[name=eventType]').selectOption('birthday');await page.locator('[name=guestCount]').fill('50');await page.locator('[name=eventDate]').fill('2027-01-20');await page.locator('[name=eventLocation]').fill('Sherghati');await page.locator('#booking-form button[type=submit]').click();await page.waitForTimeout(1500);assert.ok(url.startsWith('https://wa.me/919955955191'));assert.ok(decodeURIComponent(url).includes('Booking QA'));assert.ok(decodeURIComponent(url).includes('2027-01-20'));});
 await context.close();await api.dispose();await publicApi.dispose();
}finally{if(browser)await browser.close();if(server)server.kill();await log.close();await fs.mkdir('artifacts',{recursive:true});await fs.writeFile('artifacts/verification.json',JSON.stringify(results,null,2));}
if(results.some(r=>!r.pass))process.exitCode=1;
