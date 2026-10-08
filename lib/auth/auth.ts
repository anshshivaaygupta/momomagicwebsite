import { cookies } from 'next/headers';
import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
export interface User { id: string; username: string; email: string; role: 'admin' | 'editor' }
function secret() { const value = process.env.SESSION_SECRET; if (!value || value.length < 32) throw new Error('SESSION_SECRET must contain at least 32 characters'); return value; }
export function generateSessionToken() { return randomBytes(32).toString('hex'); }
export function signSession(data: Record<string, unknown>, days = 7) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ ...data, iat: Math.floor(Date.now()/1000), exp: Math.floor(Date.now()/1000)+days*86400 })).toString('base64url');
  const input = `${header}.${payload}`;
  return `${input}.${createHmac('sha256', secret()).update(input).digest('base64url')}`;
}
export function verifySession(token: string): any | null {
  try { const [header,payload,sig,...rest] = token.split('.'); if (rest.length || !sig) return null;
    const expected = createHmac('sha256', secret()).update(`${header}.${payload}`).digest(); const actual = Buffer.from(sig,'base64url');
    if (expected.length !== actual.length || !timingSafeEqual(expected,actual)) return null;
    const data = JSON.parse(Buffer.from(payload,'base64url').toString()); return data.exp > Date.now()/1000 ? data : null;
  } catch { return null; }
}
export function createSession(user: User) { return signSession({ ...user, kind: 'admin' }); }
export function getSession(token: string): User | null { const data = verifySession(token); return data?.kind === 'admin' ? data : null; }
export function deleteSession(_token: string) { /* Cookie removed by logout; signed sessions expire after seven days. */ }
export function validateCredentials(username: string, password: string): User | null {
  const u = process.env.ADMIN_USERNAME; const p = process.env.ADMIN_PASSWORD;
  if (!u || !p) return null;
  const a=Buffer.from(password), b=Buffer.from(p);
  if (username!==u || a.length!==b.length || !timingSafeEqual(a,b)) return null;
  return {id:'1',username:u,email:'momosmagic.info@gmail.com',role:'admin'};
}
export async function getCurrentUser() { const token=(await cookies()).get('session')?.value; return token ? getSession(token) : null; }
export async function requireAuth(): Promise<User> { const user=await getCurrentUser(); if (!user) throw new Error('Unauthorized'); return user; }
