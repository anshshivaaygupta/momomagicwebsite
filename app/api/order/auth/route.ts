import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { queryOne, query, insert } from '@/lib/db';
import { signSession, verifySession } from '@/lib/auth/auth';
async function user(){const token=(await cookies()).get('order_session')?.value;const session=token?verifySession(token):null;return session?.kind==='customer'?queryOne('SELECT id,name,email,phone,created_at FROM customer_accounts WHERE id=?',[session.id]):null;}
export async function POST(request:NextRequest){
 try{
  const {action,email,password,name,phone}=await request.json();
  if(!['signup','login'].includes(action)||typeof email!=='string'||typeof password!=='string'||!/^\S+@\S+\.\S+$/.test(email)||password.length<8||password.length>128)return NextResponse.json({success:false,message:'Enter a valid email and password (8–128 characters).'},{status:400});
  const identifier=(request.headers.get('x-forwarded-for')||'local')+':'+email.toLowerCase();
  const attempts=await queryOne('SELECT * FROM login_attempts WHERE identifier=?',[identifier]);
  if(attempts&&attempts.reset_at>Date.now()&&attempts.attempts>=10)return NextResponse.json({success:false,message:'Too many attempts. Try again in 15 minutes.'},{status:429});
  await query('INSERT INTO login_attempts(identifier,attempts,reset_at) VALUES(?,1,?) ON CONFLICT(identifier) DO UPDATE SET attempts=CASE WHEN reset_at<? THEN 1 ELSE attempts+1 END,reset_at=CASE WHEN reset_at<? THEN excluded.reset_at ELSE reset_at END',[identifier,Date.now()+900000,Date.now(),Date.now()]);
  let account=await queryOne('SELECT * FROM customer_accounts WHERE email=?',[email.trim().toLowerCase()]);
  if(action==='signup'){
   if(account)return NextResponse.json({success:false,message:'This email is already registered. Sign in instead.'},{status:409});
   if(typeof name!=='string'||name.trim().length<2||typeof phone!=='string'||!/^[6-9]\d{9}$/.test(phone))return NextResponse.json({success:false,message:'Enter your name and a valid Indian mobile number.'},{status:400});
   const id=await insert('INSERT INTO customer_accounts(email,phone,name,password_hash) VALUES(?,?,?,?)',[email.trim().toLowerCase(),phone,name.trim(),await bcrypt.hash(password,12)]);
   account=await queryOne('SELECT * FROM customer_accounts WHERE id=?',[id]);
  }else if(!account||!await bcrypt.compare(password,account.password_hash))return NextResponse.json({success:false,message:'Email or password is incorrect.'},{status:401});
  await query('DELETE FROM login_attempts WHERE identifier=?',[identifier]);
  (await cookies()).set('order_session',signSession({id:account.id,kind:'customer'},30),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',maxAge:30*86400,path:'/'});
  return NextResponse.json({success:true,user:{id:account.id,name:account.name,phone:account.phone,email:account.email}});
 }catch{return NextResponse.json({success:false,message:'Unable to sign in. Please try again.'},{status:500});}
}
export async function GET(){const account=await user();if(!account)return NextResponse.json({success:false,message:'Not authenticated'},{status:401});return NextResponse.json({success:true,user:{...account,loyaltyPoints:0,orderHistory:[],createdAt:account.created_at}});}
export async function DELETE(){(await cookies()).delete('order_session');return NextResponse.json({success:true});}
