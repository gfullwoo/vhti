/**
 * Client for VHTI sign-up, login and social sign-in.
 *
 * Passwords are sent once, over HTTPS, to the backend. They are never stored in the
 * browser. The backend must hash them (argon2id or bcrypt), set a session cookie that
 * is HttpOnly, Secure and SameSite, and rate-limit attempts.
 *
 * VITE_AUTH_MODE:
 *   "api"  (default) calls the backend under /api/auth
 *   "mock" resolves locally, for design review without a backend
 */

export type Tier = 'basic' | 'pro';
export type OAuthProvider = 'google' | 'apple';

export class AuthError extends Error {}

const MODE: string = import.meta.env.VITE_AUTH_MODE ?? 'api';
const API_BASE = '/api/auth';

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function post(path: string, body: unknown): Promise<void> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(body),
    });
  } catch {
    throw new AuthError('We could not reach the sign-in service. Check your connection and try again.');
  }

  if (res.status === 404) {
    throw new AuthError('The sign-in service is not connected yet.');
  }

  const data = (await res.json().catch(() => ({}))) as { message?: string };
  if (!res.ok) {
    throw new AuthError(data.message ?? 'Something went wrong. Please try again.');
  }
}

export interface SignUpInput {
  email: string;
  password: string;
  tier: Tier;
}

export interface SignInInput {
  email: string;
  password: string;
}

export const authClient = {
  async signUp(input: SignUpInput): Promise<void> {
    if (MODE === 'mock') return delay(600);
    return post('signup', input);
  },

  async signIn(input: SignInInput): Promise<void> {
    if (MODE === 'mock') return delay(600);
    return post('login', input);
  },

  /** Starts the OAuth redirect flow. The backend handles PKCE and the callback. */
  startOAuth(provider: OAuthProvider, tier?: Tier): void {
    if (MODE === 'mock') {
      console.info(`[mock] ${provider} sign-in would start here`);
      return;
    }
    const query = tier ? `?tier=${tier}` : '';
    window.location.assign(`${API_BASE}/oauth/${provider}${query}`);
  },
};
