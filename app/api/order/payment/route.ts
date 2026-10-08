import { NextResponse } from 'next/server';
export function POST(){return NextResponse.json({success:false,message:'Online payment is unavailable. Confirm your order and pay directly to the business through WhatsApp.'},{status:503});}
export const GET=POST;
