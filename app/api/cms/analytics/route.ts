import {NextResponse} from 'next/server';
import {requireAuth} from '@/lib/auth/auth';
export async function GET(){
  try { await requireAuth(); } catch { return NextResponse.json({error:'Unauthorized'},{status:401}); }await requireAuth();return NextResponse.json({configured:false,pageViews:{total:0,today:0,thisWeek:0,thisMonth:0},popularPages:[],popularMenuItems:[],deviceStats:{mobile:0,desktop:0,tablet:0}});}
