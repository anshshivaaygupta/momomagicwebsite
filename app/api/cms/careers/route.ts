import {NextRequest,NextResponse} from 'next/server';
import {requireAuth} from '@/lib/auth/auth';
import fs from '@/lib/storage';
import path from 'path';
const file=path.join(process.cwd(),'data/cms/careers.json');
export async function GET(){
  try { await requireAuth(); } catch { return NextResponse.json({error:'Unauthorized'},{status:401}); }await requireAuth();return NextResponse.json(JSON.parse(await fs.readFile(file)));}
export async function POST(r:NextRequest){
  try { await requireAuth(); } catch { return NextResponse.json({error:'Unauthorized'},{status:401}); }await requireAuth();const data=await r.json();if(!Array.isArray(data.jobs)||data.jobs.length>50)return NextResponse.json({error:'Invalid roles'},{status:400});await fs.writeFile(file,JSON.stringify({jobs:data.jobs}));return NextResponse.json({success:true});}
