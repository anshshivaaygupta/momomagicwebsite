import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose/jwt/verify';
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const protectedApi = /^\/api\/(cms|builder|publish|history|undo)(\/|$)/.test(path);
  const protectedPage = path.startsWith('/admin/dashboard');
  if (protectedApi || protectedPage) {
    let authenticated=false;
    try { const token=request.cookies.get('session')?.value; if (token && process.env.SESSION_SECRET) {
      const {payload}=await jwtVerify(token,new TextEncoder().encode(process.env.SESSION_SECRET),{algorithms:['HS256']});
      authenticated=payload.kind==='admin' && payload.role==='admin';
    }} catch { /* Unauthorized */ }
    if (!authenticated) return protectedApi ? NextResponse.json({error:'Unauthorized'},{status:401}) : NextResponse.redirect(new URL('/admin/login',request.url));
    if (!['GET','HEAD','OPTIONS'].includes(request.method)) {
      const origin=request.headers.get('origin');
      if (origin && origin!==request.nextUrl.origin) return NextResponse.json({error:'Invalid origin'},{status:403});
    }
  }
  const response=NextResponse.next();
  if (path.startsWith('/api/') || path.startsWith('/admin/') || path.startsWith('/order/')) response.headers.set('Cache-Control','private, no-store');
  response.headers.set('X-Content-Type-Options','nosniff'); response.headers.set('X-Frame-Options','DENY'); response.headers.set('Referrer-Policy','strict-origin-when-cross-origin');
  return response;
}
export const config={matcher:['/((?!_next/static|_next/image|favicon.ico).*)']};
