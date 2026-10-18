import {NextRequest,NextResponse} from 'next/server';
import {verifyYoupiEvent,youpiReady} from '@/lib/youpi';
import {queryOne,update} from '@/lib/db';
export const dynamic='force-dynamic';
export async function POST(req:NextRequest) {
  if(!youpiReady()) return NextResponse.json({message:'UPI verification is not enabled.'},{status:503});
  // Read a bounded raw stream; signature verification must precede JSON parsing.
  const reader=req.body?.getReader();
  if(!reader)return NextResponse.json({message:'Missing event.'},{status:400});
  let size=0;const chunks:Uint8Array[]=[];
  while(true){const part=await reader.read();if(part.done)break;size+=part.value.length;
    if(size>16384){await reader.cancel();return NextResponse.json({message:'Event too large.'},{status:413});}chunks.push(part.value);}
  let event;
  try{event=verifyYoupiEvent(Buffer.concat(chunks).toString('utf8'),req.headers.get('x-gateway-signature')||'',process.env.YOUPI_WEBHOOK_SECRET||'');}
  catch{return NextResponse.json({message:'Invalid payment event.'},{status:400});}
  try{
    const session=await queryOne('SELECT * FROM checkout_sessions WHERE id=?',[event.orderId]);
    if(!session||session.provider_order!=='youpi:'+event.paymentId||session.amount!==event.amountPaise)
      return NextResponse.json({message:'Payment does not match the order.'},{status:409});
    const paymentId='upi:'+event.utr;
    if(session.status==='paid')return NextResponse.json({received:session.payment_id===paymentId},{status:session.payment_id===paymentId?200:409});
    const changed=await update("UPDATE checkout_sessions SET status='paid',payment_id=? WHERE id=? AND status='pending'",[paymentId,session.id]);
    if(!changed)return NextResponse.json({message:'Order cannot accept payment.'},{status:409});
    return NextResponse.json({received:true});
  }catch{return NextResponse.json({message:'Could not record payment. Retry delivery.'},{status:503});}
}
