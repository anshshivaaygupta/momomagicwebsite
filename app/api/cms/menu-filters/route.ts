import {requireAuth} from '@/lib/auth/auth';
import { NextRequest, NextResponse } from 'next/server';
import fs from '@/lib/storage';
import path from 'path';
import defaults from '@/data/menu-filters.json';
const file=path.join(process.cwd(),'data','menu-filters.json');
export async function GET(){
  try { await requireAuth(); } catch { return NextResponse.json({error:'Unauthorized'},{status:401}); }try{return NextResponse.json(JSON.parse(await fs.readFile(file)));}catch{return NextResponse.json(defaults);}}
export async function POST(request:NextRequest){
  try { await requireAuth(); } catch { return NextResponse.json({error:'Unauthorized'},{status:401}); }await fs.writeFile(file,JSON.stringify(await request.json()));return NextResponse.json({success:true});}
export async function DELETE(){
  try { await requireAuth(); } catch { return NextResponse.json({error:'Unauthorized'},{status:401}); }await fs.writeFile(file,JSON.stringify(defaults));return NextResponse.json({success:true});}
