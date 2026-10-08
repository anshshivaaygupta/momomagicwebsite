import {chromium as pw} from '@playwright/test';
import chromium from '@sparticuz/chromium';
import {spawn} from 'node:child_process';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const origin=process.env.VERIFY_URL||'http://127.0.0.1:35108';
const f=fs.openSync('/tmp/momo-navigation-server.log','w');
const server=process.env.VERIFY_URL?null:spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p','35108','-H','127.0.0.1'],{stdio:['ignore',f,f]});
let browser;
try {
  for(let n=0;n<50;n++){try{if((await fetch(origin)).ok)break;}catch{}await new Promise(r=>setTimeout(r,300));}
  browser=await pw.launch({args:chromium.args.filter(x=>x!=='--single-process'),executablePath:await chromium.executablePath(),headless:true});
  const p=await browser.newPage({viewport:{width:1024,height:800},reducedMotion:'reduce'});
  await p.goto(origin+'/menu',{waitUntil:'networkidle'});
  await p.getByRole('button',{name:'Toggle menu'}).click();
  await p.locator('#mobile-navigation').getByRole('button',{name:'Menu',exact:true}).click();
  await p.getByRole('link',{name:'Fried Momos',exact:true}).click();
  await p.waitForTimeout(700);
  assert.ok(p.url().endsWith('/menu?category=fried'));
  assert.ok((await p.getByRole('button',{name:/Crispy Fried/}).getAttribute('class')).includes('bg-premium-orange'));
  assert.equal(await p.locator('#mobile-navigation').count(),0);
  console.log('PASS tablet navigation and in-page category selection');
  await p.setViewportSize({width:390,height:844});
  await p.goto(origin+'/',{waitUntil:'networkidle'});
  assert.equal(await p.locator('h1').count(),1);
  assert.equal(await p.getByText('Image Coming Soon').count(),0);
  await p.screenshot({path:'artifacts/final-home-viewport.png'});
  await p.goto(origin+'/about',{waitUntil:'networkidle'});
  await p.getByRole('button',{name:'Enlarge Steamed momo inspiration'}).click();
  assert.ok(await p.locator('img[alt="Steamed momo inspiration"]').count()>1);
  console.log('PASS photo placeholders replaced and About lightbox opens');
  await p.goto(origin+'/catering',{waitUntil:'networkidle'});
  assert.equal(await p.locator('[name=fullName]').count(),1);
  await p.locator('[name=fullName]').scrollIntoViewIfNeeded();
  await p.screenshot({path:'artifacts/final-booking-viewport.png'});
  assert.equal((await fetch(origin+'/api/publish-test/hero')).status,404);
  console.log('PASS catering form and disabled diagnostic route');
} finally {if(browser)await browser.close();server?.kill();fs.closeSync(f);}
