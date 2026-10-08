import { NextResponse } from 'next/server';
export function POST(){return NextResponse.json({success:false,message:'Send your order request to the business on WhatsApp from checkout.'},{status:409});}
