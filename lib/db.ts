import initSqlJs, { type Database } from 'sql.js';
import fs from 'fs/promises';
import path from 'path';
import { get, head, put, BlobNotFoundError, BlobPreconditionFailedError } from '@vercel/blob';
let SQLPromise: ReturnType<typeof initSqlJs> | undefined;
function loadSQL(){return SQLPromise ??= initSqlJs({ locateFile: () => path.join(process.cwd(),'node_modules','sql.js','dist','sql-wasm.wasm') });}
const dbPath=path.join(process.cwd(),'.local-data','content.sqlite');
const blobPath='database/content.sqlite';
let queue: Promise<unknown>=Promise.resolve();
async function initialize(db: Database) {
  db.run(await fs.readFile(path.join(process.cwd(),'database','local-schema.sql'),'utf8'));
  const existing=db.exec('SELECT COUNT(*) FROM cms_content')[0]?.values[0][0];
  if (!existing) {
    for (const name of ['hero','about','contact','catering','combos','gallery']) {
      try { const content=await fs.readFile(path.join(process.cwd(),'data','cms',`${name}.json`),'utf8');
        db.run('INSERT OR IGNORE INTO cms_content(page_name,content_data) VALUES(?,?)',[name,content]);
      } catch { /* Optional seed. */ }
    }
  }
}
async function run<T>(operation:(db:Database)=>T, write:boolean):Promise<T> {
  const execute=async()=>{
    const SQL=await loadSQL();
    for(let attempt=0;attempt<5;attempt++) {
      let bytes:Uint8Array|undefined; let etag:string|undefined;
      if(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) {
        // Metadata ETags are authoritative for writes; download ETags can be weak
        // when the delivery network applies content encoding.
        let before:string|undefined;
        if(write){try{before=(await head(blobPath)).etag;}catch(error){if(!(error instanceof BlobNotFoundError))throw error;}}
        const result=await get(blobPath,{access:'private',useCache:false,headers:{'Accept-Encoding':'identity'}});
        if(result?.statusCode===200){bytes=new Uint8Array(await new Response(result.stream).arrayBuffer());if(write){const after=(await head(blobPath)).etag;if(before!==after)continue;etag=after;}}

      } else { try {bytes=await fs.readFile(dbPath);}catch{/* First run */} }
      const db=bytes?new SQL.Database(bytes):new SQL.Database();
      try {
        await initialize(db); const result=operation(db);
        if(write) {
          const output=db.export();
          if(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) {
            await put(blobPath,Buffer.from(output),{access:'private',addRandomSuffix:false,allowOverwrite:!!etag,ifMatch:etag,contentType:'application/octet-stream'});
          } else { await fs.mkdir(path.dirname(dbPath),{recursive:true}); await fs.writeFile(dbPath+'.tmp',output);await fs.rename(dbPath+'.tmp',dbPath); }
        }
        return result;
      }catch(error){if(error instanceof BlobPreconditionFailedError && attempt<4)continue;throw error;}finally{db.close();}
    }
    throw new Error('Concurrent update; please retry');
  };
  const result=queue.then(execute,execute);queue=result.catch(()=>{});return result;
}
function normalize(sql:string){
 return sql.replace(/NOW\(\)/gi,'CURRENT_TIMESTAMP').replace(/CURRENT_TIMESTAMP\s*-\s*INTERVAL\s+(\d+)\s+DAY/gi,"datetime('now','-$1 days')").replace(/DATE_SUB\(CURRENT_TIMESTAMP,\s*INTERVAL\s+(\d+)\s+DAY\)/gi,"datetime('now','-$1 days')").replace(/ON DUPLICATE KEY UPDATE[\s\S]*$/i,'ON CONFLICT(id) DO UPDATE SET name=excluded.name,slug=excluded.slug,sections=excluded.sections,status=excluded.status,meta_title=excluded.meta_title,meta_description=excluded.meta_description,updated_at=excluded.updated_at');
}
function bind(params:any[]=[]){return params.map(v=>v instanceof Date?v.toISOString():typeof v==='boolean'?Number(v):v??null);}
export async function query<T=any>(sql:string,params:any[]=[]):Promise<T[]> {
 const read=/^\s*(SELECT|PRAGMA)/i.test(sql);
 return run(db=>{const statement=db.prepare(normalize(sql));try{statement.bind(bind(params));const rows:T[]=[];while(statement.step())rows.push(statement.getAsObject() as T);return rows;}finally{statement.free();}},!read);
}
export async function queryOne<T=any>(sql:string,params:any[]=[]):Promise<T|null>{return (await query<T>(sql,params))[0]??null;}
export async function insert(sql:string,params:any[]=[]){return run(db=>{db.run(normalize(sql),bind(params));return Number(db.exec('SELECT last_insert_rowid()')[0].values[0][0]);},true);}
export async function update(sql:string,params:any[]=[]){return run(db=>{db.run(normalize(sql),bind(params));return db.getRowsModified();},true);}
export const deleteQuery=update;
export async function testConnection(){try{await query('SELECT 1');return true;}catch{return false;}}
export async function closePool(){}
