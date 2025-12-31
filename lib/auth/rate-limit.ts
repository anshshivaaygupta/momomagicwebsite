interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
  blockedUntil?: number;
}

const loginAttempts: Map<string, RateLimitEntry> = new Map();

const MAX_ATTEMPTS = 5;
const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW = 5 * 60 * 1000; // 5 minutes

export function checkRateLimit(identifier: string): { allowed: boolean; remainingAttempts?: number; blockedUntil?: number } {
  const now = Date.now();
  const entry = loginAttempts.get(identifier);

  if (!entry) {
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  if (entry.blockedUntil && entry.blockedUntil > now) {
    return {
      allowed: false,
      blockedUntil: entry.blockedUntil,
    };
  }

  if (now - entry.lastAttempt > ATTEMPT_WINDOW) {
    loginAttempts.delete(identifier);
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    const blockedUntil = now + BLOCK_DURATION;
    entry.blockedUntil = blockedUntil;
    loginAttempts.set(identifier, entry);
    return {
      allowed: false,
      blockedUntil,
    };
  }

  return {
    allowed: true,
    remainingAttempts: MAX_ATTEMPTS - entry.attempts,
  };
}

export function recordLoginAttempt(identifier: string, success: boolean): void {
  const now = Date.now();
  const entry = loginAttempts.get(identifier);

  if (success) {
    loginAttempts.delete(identifier);
    return;
  }

  if (!entry) {
    loginAttempts.set(identifier, {
      attempts: 1,
      lastAttempt: now,
    });
    return;
  }

  if (now - entry.lastAttempt > ATTEMPT_WINDOW) {
    loginAttempts.set(identifier, {
      attempts: 1,
      lastAttempt: now,
    });
    return;
  }

  entry.attempts += 1;
  entry.lastAttempt = now;
  loginAttempts.set(identifier, entry);
}

export function getRemainingBlockTime(identifier: string): number {
  const entry = loginAttempts.get(identifier);
  if (!entry || !entry.blockedUntil) {
    return 0;
  }

  const remaining = entry.blockedUntil - Date.now();
  return remaining > 0 ? remaining : 0;
}
