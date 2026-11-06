import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { authClient, AuthError, type OAuthProvider, type Tier } from '../auth/authClient';
import {
  PASSWORD_MIN_LENGTH,
  passwordChecks,
  validateLogin,
  validateSignUp,
  type FieldErrors,
} from '../auth/validation';

type Mode = 'login' | 'signup';

const TIERS: { id: Tier; name: string; summary: string; features: string[] }[] = [
  {
    id: 'basic',
    name: 'Basic',
    summary: 'Guidance and tracking to get you started.',
    features: [
      'AI assistant for education, portfolio and market trends',
      'Portfolio dashboard that tracks your holdings',
      'Market up-and-down updates by email',
      'Preset questions based on your portfolio',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    summary: 'Faster data and a fuller assistant.',
    features: [
      'Everything in Basic',
      'Near real-time price tracking',
      'Deeper portfolio insight and health indicators',
      'Advanced assistant: ask your own questions (daily limit applies)',
      'Connect your stock apps on your phone',
    ],
  },
];

const OAUTH: { provider: OAuthProvider; label: string }[] = [
  { provider: 'google', label: 'Continue with Google' },
  { provider: 'apple', label: 'Continue with Apple' },
];

export default function AuthPage({ mode }: { mode: Mode }) {
  const [params] = useSearchParams();
  const isSignup = mode === 'signup';

  const [tier, setTier] = useState<Tier>(params.get('tier') === 'pro' ? 'pro' : 'basic');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [consent, setConsent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);

  const checks = passwordChecks(password);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError('');
    setSuccess('');

    const found = isSignup
      ? validateSignUp({ email, password, confirm, consent })
      : validateLogin({ email, password });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setBusy(true);
    try {
      if (isSignup) {
        await authClient.signUp({ email: email.trim(), password, tier });
        setSuccess('Account created. Check your inbox to confirm your email address.');
      } else {
        await authClient.signIn({ email: email.trim(), password });
        setSuccess('Signed in.');
      }
      setPassword('');
      setConfirm('');
    } catch (err) {
      setFormError(err instanceof AuthError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="auth-section">
      <div className={`container auth-grid ${isSignup ? '' : 'is-login'}`}>
        {isSignup && (
          <div className="auth-aside">
            <p className="eyebrow">Create your account</p>
            <h1>Choose the plan that fits you</h1>
            <p className="lead">
              Start with Basic, or choose Pro for faster data and a larger assistant. You can change plans later.
            </p>

            <fieldset className="tiers" id="tiers">
              <legend className="sr-only">Plan</legend>
              {TIERS.map((t) => (
                <label key={t.id} className={`tier-card ${tier === t.id ? 'is-selected' : ''}`}>
                  <span className="tier-head">
                    <input
                      type="radio"
                      name="tier"
                      value={t.id}
                      checked={tier === t.id}
                      onChange={() => setTier(t.id)}
                    />
                    <span className="tier-name">{t.name}</span>
                  </span>
                  <span className="tier-summary">{t.summary}</span>
                  <ul className="tier-features">
                    {t.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <span className="tier-price">Pricing to be announced</span>
                </label>
              ))}
            </fieldset>
          </div>
        )}

        <div className="auth-card">
          <h2>{isSignup ? 'Sign up' : 'Welcome back'}</h2>
          <p className="auth-sub">
            {isSignup
              ? 'Create a secure account with your email, or continue with a provider.'
              : 'Log in to see your portfolio and market updates.'}
          </p>

          <div className="oauth-group">
            {OAUTH.map((o) => (
              <button
                key={o.provider}
                type="button"
                className="btn btn-oauth btn-block"
                onClick={() => authClient.startOAuth(o.provider, isSignup ? tier : undefined)}
              >
                {o.label}
              </button>
            ))}
          </div>

          <div className="divider" role="separator">
            <span>or with email</span>
          </div>

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p className="field-error" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  className="password-toggle"
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <p className="field-error" id="password-error">
                  {errors.password}
                </p>
              )}
              {isSignup && (
                <ul className="checks" aria-label="Password requirements">
                  <li className={checks.length ? 'is-ok' : ''}>At least {PASSWORD_MIN_LENGTH} characters</li>
                  <li className={checks.letter ? 'is-ok' : ''}>Contains a letter</li>
                  <li className={checks.number ? 'is-ok' : ''}>Contains a number</li>
                </ul>
              )}
            </div>

            {isSignup && (
              <>
                <div className="field">
                  <label htmlFor="confirm">Confirm password</label>
                  <input
                    id="confirm"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    aria-invalid={Boolean(errors.confirm)}
                    aria-describedby={errors.confirm ? 'confirm-error' : undefined}
                  />
                  {errors.confirm && (
                    <p className="field-error" id="confirm-error">
                      {errors.confirm}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      aria-invalid={Boolean(errors.consent)}
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                    />
                    <span>
                      I agree to the <a href="#terms">Terms</a> and the <a href="#privacy">Privacy Policy</a>.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="field-error" id="consent-error">
                      {errors.consent}
                    </p>
                  )}
                </div>
              </>
            )}

            {formError && (
              <p className="alert alert-error" role="alert">
                {formError}
              </p>
            )}
            {success && (
              <p className="alert alert-success" role="status">
                {success}
              </p>
            )}

            <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={busy}>
              {busy ? 'Please wait…' : isSignup ? 'Create account' : 'Log in'}
            </button>

            {!isSignup && (
              <p className="auth-aux">
                <a href="#reset-password">Forgot your password?</a>
              </p>
            )}
          </form>

          <p className="auth-switch">
            {isSignup ? (
              <>
                Already have an account? <Link to="/login">Log in</Link>
              </>
            ) : (
              <>
                New to VHTI? <Link to="/signup">Create an account</Link>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
