# VHTI web app

React + TypeScript + Vite. This first drop contains the landing page, the sign-up and login pages, and the right-hand hamburger menu. Styling follows the VHTI design system tokens.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

- `npm run build` type-checks and writes the production build to `dist/`
- `npm run preview` serves the built output locally

## Environment

Create `.env.local` only if you need to change the defaults:

```
# "api" (default) calls the backend under /api/auth
# "mock" resolves sign-up and login locally, for design review without a backend
VITE_AUTH_MODE=api
```

## What is here

| Path | Purpose |
| --- | --- |
| `src/pages/Landing.tsx` | Explanation of the service, why stocks help, investment types, international tickers, crypto section |
| `src/pages/AuthPage.tsx` | Sign-up (with the Basic and Pro tier cards) and login, with Google and Apple buttons |
| `src/components/Header.tsx` | Logo, log in, sign up, and the hamburger menu on the right at every screen size |
| `src/components/TickerBoard.tsx` | Ticker tiles with exchange, price, daily change and sparkline |
| `src/data/markets.ts` | **Sample prices only.** Replace with a live market-data feed before launch |
| `src/auth/authClient.ts` | Sign-up, login and OAuth calls |
| `src/auth/validation.ts` | Email and password rules, shared by the form |

## Backend still to build

The sign-in screens call these endpoints. Until they exist, the forms show "The sign-in service is not connected yet."

- `POST /api/auth/signup`: body `{ email, password, tier }`
- `POST /api/auth/login`: body `{ email, password }`
- `GET /api/auth/oauth/google` and `GET /api/auth/oauth/apple`: start the OAuth redirect, with an optional `?tier=` query

Requirements for secure accounts:

- Hash passwords with argon2id (or bcrypt). Never store or log plain passwords.
- Use HttpOnly, Secure, SameSite session cookies. Do not put tokens in `localStorage`.
- Verify email addresses before a new account is fully active.
- Rate-limit login and sign-up, and return generic error messages so attackers cannot tell which emails exist.
- Use PKCE and validate the `state` parameter on the OAuth callback.

Managed options that support email, Google and Apple sign-in are Firebase Auth, Supabase Auth, Auth0 and AWS Cognito. Each can replace the backend above while keeping `authClient.ts` unchanged.

Apple and Google each publish brand guidelines for their sign-in buttons. The current buttons use plain text and should be swapped for the official assets before release.

## Deploy on your own machine

This matches the self-hosted setup used for CineBoost (WSL, Cloudflare Tunnel, PM2):

1. `npm run build`
2. Serve `dist/` with a static server that falls back to `index.html` for unknown routes (for example `npx serve -s dist -l 3000`), and run the API on another port.
3. Point the Cloudflare Tunnel at the static server, and route `/api` to the API port.
4. Keep both processes under PM2.

## Before launch

- Confirm pricing for Basic and Pro (the tier cards say "Pricing to be announced").
- Replace the sample market data with a licensed feed.
- Write the Terms, Privacy Policy and Cookie pages (the footer links are placeholders).
- Have compliance review the investment-guidance wording and the crypto section.
