import { NextRequest } from 'next/server';
import { get } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';
export async function GET(request:NextRequest){
 const id=request.nextUrl.searchParams.get('id')||'';
 if(!/^[a-zA-Z0-9._-]+$/.test(id))return new Response('Not found',{status:404});
 if(process.env.BLOB_READ_WRITE_TOKEN){const blob=await get('media/'+id,{access:'private'});if(blob?.statusCode===200)return new Response(blob.stream,{headers:{'Content-Type':blob.blob.contentType,'Cache-Control':'public,max-age=3600','X-Content-Type-Options':'nosniff'}});}
 else {try{return new Response(await fs.readFile(path.join(process.cwd(),'.local-data','uploads',id)),{headers:{'Content-Type':id.endsWith('.mp4')?'video/mp4':id.endsWith('.png')?'image/png':'image/jpeg'}});}catch{/* 404 */}}
 return new Response('Not found',{status:404});
}
