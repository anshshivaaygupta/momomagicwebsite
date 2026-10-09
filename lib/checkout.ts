import {createHash,createHmac,timingSafeEqual} from 'node:crypto';
import path from 'node:path';
import {readFile} from '@/lib/storage';
import {isAvailableItem} from '@/lib/catalog';
import {queryOne,query} from '@/lib/db';
export function paymentEnabled(){return process.env.PAYMENT_PROVIDER==='razorpay'&&process.env.PAYMENTS_ENABLED==='true'&&!!process.env.RAZORPAY_KEY_ID&&!!process.env.RAZORPAY_KEY_SECRET;}
export const hash=(value:string)=>createHash('sha256').update(value).digest('hex');
export function validSignature(order:string,payment:string,signature:string,secret:string){if(!/^[a-f0-9]{64}$/i.test(signature))return false;const expected=createHmac('sha256',secret).update(order+'|'+payment).digest();return timingSafeEqual(expected,Buffer.from(signature,'hex'));}
export async function pricedOrder(body:any){
 const name=String(body.name||'').trim(),phone=String(body.phone||'');if(name.length<2||name.length>80||!/^[6-9]\d{9}$/.test(phone))throw Error('Enter a valid name and Indian mobile number.');
 if(!Array.isArray(body.items)||!body.items.length||body.items.length>30)throw Error('Choose between 1 and 30 plates.');
 const catalog=JSON.parse(await readFile(path.join(process.cwd(),'data/cms/menu.json'))).items;
 const items=body.items.map((line:any)=>{const item=catalog.find((x:any)=>x.id===line.id&&isAvailableItem(x)&&x.category!=='combo');if(!item||![5,10].includes(line.quantity))throw Error('A selected item is unavailable. Please update your cart.');const price=Number(line.quantity===5?item.price.half:item.price.full);if(!Number.isFinite(price)||price<=0)throw Error('Item price unavailable.');return {id:item.id,name:item.name,quantity:line.quantity,spice:['mild','medium','hot','extra-magic'].includes(line.spice)?line.spice:'medium',price};});
 return {name,phone,notes:String(body.notes||'').slice(0,1000),items,total:items.reduce((n:number,i:any)=>n+i.price,0)};
}
export async function gateway(endpoint:string,body?:unknown){const res=await fetch('https://api.razorpay.com/v1/'+endpoint,{method:body?'POST':'GET',headers:{Authorization:'Basic '+Buffer.from(process.env.RAZORPAY_KEY_ID+':'+process.env.RAZORPAY_KEY_SECRET).toString('base64'),'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,cache:'no-store',signal:AbortSignal.timeout(15000)});if(!res.ok)throw Error('Payment service temporarily unavailable. Please retry.');return res.json();}
export async function sessionFor(cookie:string|undefined){if(!cookie)return null;const [id,token]=cookie.split('.');if(!id||!token)return null;return queryOne('SELECT * FROM checkout_sessions WHERE id=? AND access_hash=?',[id,hash(token)]);}
export async function reconcile(session:any){if(session.status==='paid')return session;if(!session.provider_order||!paymentEnabled())return session;const payments=await gateway('orders/'+encodeURIComponent(session.provider_order)+'/payments');const paid=payments.items?.find((p:any)=>p.status==='captured'&&p.order_id===session.provider_order&&p.currency==='INR'&&p.amount===session.amount&&p.amount_refunded===0);if(paid){await query("UPDATE checkout_sessions SET status='paid',payment_id=? WHERE id=? AND status='pending'",[paid.id,session.id]);return {...session,status:'paid',payment_id:paid.id}}return session;}

export function sameOrigin(req:Request){try{return new URL(req.headers.get('origin')||'').host===req.headers.get('host')}catch{return false}}
