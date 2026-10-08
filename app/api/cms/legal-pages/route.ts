import {NextRequest,NextResponse} from 'next/server';
import {requireAuth} from '@/lib/auth/auth';
import fs from '@/lib/storage';
import path from 'path';
const file=path.join(process.cwd(),'data/cms/legal.json');
export async function GET(){
  try { await requireAuth(); } catch { return NextResponse.json({error:'Unauthorized'},{status:401}); }await requireAuth();try{return NextResponse.json(JSON.parse(await fs.readFile(file)));}catch{return NextResponse.json({pages:{}});}}
export async function POST(r:NextRequest){
  try { await requireAuth(); } catch { return NextResponse.json({error:'Unauthorized'},{status:401}); }await requireAuth();const data=await r.json();const allowed=['privacy-policy','terms-conditions','refund-cancellation','shipping-delivery','online-ordering-policy'];if(!allowed.includes(data.slug)||typeof data.content!=='string'||data.content.length>30000)return NextResponse.json({error:'Invalid policy notes'},{status:400});let pages:any={};try{pages=JSON.parse(await fs.readFile(file)).pages||{};}catch{}pages[data.slug]=data.content;await fs.writeFile(file,JSON.stringify({pages}));return NextResponse.json({success:true});}
