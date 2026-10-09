import {sameOrigin} from '@/lib/checkout';
import {NextRequest,NextResponse} from 'next/server';
import {randomBytes,randomUUID} from 'node:crypto';
import {query} from '@/lib/db';
import {paymentEnabled,pricedOrder,gateway,hash,sessionFor,reconcile} from '@/lib/checkout';
export const dynamic='force-dynamic';
export async function GET(req:NextRequest){try{let session=await sessionFor(req.cookies.get('mm_checkout')?.value);if(session&&req.nextUrl.searchParams.get('refresh')==='1')session=await reconcile(session);return NextResponse.json({enabled:paymentEnabled(),keyId:paymentEnabled()?process.env.RAZORPAY_KEY_ID:undefined,session:session?{id:session.id,status:session.status,order:JSON.parse(session.payload),providerOrder:session.provider_order,paymentId:session.payment_id}:null},{headers:{'Cache-Control':'private, no-store'}})}catch{return NextResponse.json({message:'Unable to check payment. Please retry; do not pay again.'},{status:503})}}
export async function POST(req:NextRequest){if(!sameOrigin(req))return NextResponse.json({message:'Invalid request origin.'},{status:403});if(!paymentEnabled())return NextResponse.json({message:'Online payments are not open yet. Your cart is saved. No payment has been taken.'},{status:503});try{
 const current=await sessionFor(req.cookies.get('mm_checkout')?.value);if(current&&current.status==='pending'&&Date.now()-Date.parse(current.created_at+'Z')<24*3600000)return NextResponse.json({message:'An existing payment needs checking first. Open the payment page to resume it.',resume:true},{status:409});
 const order=await pricedOrder(await req.json());const id=randomUUID(),token=randomBytes(32).toString('hex');const amount=Math.round(order.total*100);const provider=await gateway('orders',{amount,currency:'INR',receipt:id,partial_payment:false});
 await query('INSERT INTO checkout_sessions(id,access_hash,payload,amount,provider_order) VALUES(?,?,?,?,?)',[id,hash(token),JSON.stringify(order),amount,provider.id]);const res=NextResponse.json({success:true});res.cookies.set('mm_checkout',id+'.'+token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',maxAge:86400*7,path:'/'});return res;
 }catch(e){return NextResponse.json({message:e instanceof Error?e.message:'Unable to start payment.'},{status:400})}}
