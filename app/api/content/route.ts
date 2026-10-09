import { sanitizePublicContent } from '@/lib/catalog';
import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import fs from '@/lib/storage';
import path from 'path';
const publicSections=new Set(['hero','about','contact','menu','gallery','combos','catering','logo','social','cta','legal','careers']);
export async function GET(request:NextRequest){
 const section=request.nextUrl.searchParams.get('section')||'menu';
 if(!publicSections.has(section))return NextResponse.json({error:'Not found'},{status:404});
 try {
  let data:any;
  if(section==='menu'||section==='logo'||section==='social'||section==='cta'||section==='legal'||section==='careers'){
   try{data=JSON.parse(await fs.readFile(path.join(process.cwd(),'data','cms',section+'.json')));}catch{data={};}
  }else{const row=await queryOne('SELECT content_data FROM published_content WHERE page_name=?',[section])||await queryOne('SELECT content_data FROM cms_content WHERE page_name=?',[section]);data=row?JSON.parse(row.content_data):{};}
  if(section==='catering'){const {inquiries,bookings,applications,...safe}=data;data=safe;}
  return NextResponse.json(sanitizePublicContent(data),{headers:{'Cache-Control':'no-store'}});
 }catch{return NextResponse.json({error:'Content temporarily unavailable'},{status:503});}
}
