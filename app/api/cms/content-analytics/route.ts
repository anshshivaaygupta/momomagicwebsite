import {requireAuth} from '@/lib/auth/auth';
import {NextResponse} from 'next/server';
export async function GET(){
  try { await requireAuth(); } catch { return NextResponse.json({error:'Unauthorized'},{status:401}); }return NextResponse.json({configured:false,views:0,engagement:0,conversions:0,lastUpdated:null,performance:{loadTime:0,seoScore:0}});}
