import fs from 'fs/promises';
import path from 'path';
import { queryOne, query } from '@/lib/db';
function key(p:string){const relative=path.relative(process.cwd(),p);if(relative.startsWith('..')||path.isAbsolute(relative))throw new Error('Invalid storage path');return relative;}
export async function readFile(p:string,_encoding?:string):Promise<any>{const row=await queryOne('SELECT content FROM cms_files WHERE path=?',[key(p)]);return row?row.content:fs.readFile(p,'utf8');}
export async function writeFile(p:string,content:any,_encoding?:string){await query('INSERT INTO cms_files(path,content) VALUES(?,?) ON CONFLICT(path) DO UPDATE SET content=excluded.content,updated_at=CURRENT_TIMESTAMP',[key(p),content]);}
export async function mkdir(_p:string,_options?:any){}
export async function access(p:string){await readFile(p);}
export async function stat(p:string){const data=await readFile(p);return {size:Buffer.byteLength(data)};}
export async function unlink(p:string){await query('DELETE FROM cms_files WHERE path=?',[key(p)]);}
export async function exists(p:string){try{await readFile(p);return true;}catch{return false;}}
export default {readFile,writeFile,mkdir,access,stat,unlink,exists};
