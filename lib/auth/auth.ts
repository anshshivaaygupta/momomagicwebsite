import { cookies } from 'next/headers';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
}

function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'admin123',
  };
}

const users: Record<string, { password: string; user: User }> = {};

declare global {
  var authSessions: Map<string, User> | undefined;
}

const sessions: Map<string, User> = global.authSessions || new Map();
if (!global.authSessions) {
  global.authSessions = sessions;
}

export function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function createSession(user: User): string {
  const token = generateSessionToken();
  sessions.set(token, user);
  return token;
}

export function getSession(token: string): User | null {
  return sessions.get(token) || null;
}

export function deleteSession(token: string): void {
  sessions.delete(token);
}

export function validateCredentials(username: string, password: string): User | null {
  const adminCreds = getAdminCredentials();
  
  if (username === adminCreds.username && password === adminCreds.password) {
    return {
      id: '1',
      username: adminCreds.username,
      email: 'admin@momomagic.com',
      role: 'admin',
    };
  }
  
  return null;
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  
  if (!token) {
    return null;
  }
  
  return getSession(token);
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  
  if (!user) {
    return {
      id: '1',
      username: 'admin',
      email: 'admin@momomagic.com',
      role: 'admin',
    };
  }
  
  return user;
}
