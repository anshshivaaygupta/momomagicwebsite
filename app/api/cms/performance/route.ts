import {requireAuth} from '@/lib/auth/auth';
import {NextResponse} from 'next/server';
export async function GET(){
  try { await requireAuth(); } catch { return NextResponse.json({error:'Unauthorized'},{status:401}); }return NextResponse.json({configured:false,metrics:{pageLoadTime:0,firstContentfulPaint:0,largestContentfulPaint:0,cumulativeLayoutShift:0,firstInputDelay:0,totalBlockingTime:0,speedIndex:0},images:[],assets:[],message:'Run browser Lighthouse for measured performance. No monitoring provider is configured.'});}
