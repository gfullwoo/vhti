export interface SignUpValues {
  email: string;
  password: string;
  confirm: string;
  consent: boolean;
}

export interface LoginValues {
  email: string;
  password: string;
}

export type FieldErrors = Partial<Record<'email' | 'password' | 'confirm' | 'consent', string>>;

export const PASSWORD_MIN_LENGTH = 12;

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function passwordChecks(password: string) {
  return {
    length: password.length >= PASSWORD_MIN_LENGTH,
    letter: /[A-Za-z]/.test(password),
    number: /\d/.test(password),
  };
}

export function validateSignUp(values: SignUpValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  const checks = passwordChecks(values.password);
  if (!checks.length || !checks.letter || !checks.number) {
    errors.password = `Use at least ${PASSWORD_MIN_LENGTH} characters, with a letter and a number.`;
  }
  if (values.confirm !== values.password) {
    errors.confirm = 'The passwords do not match.';
  }
  if (!values.consent) {
    errors.consent = 'Please accept the terms to create an account.';
  }
  return errors;
}

export function validateLogin(values: LoginValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.password) {
    errors.password = 'Enter your password.';
  }
  return errors;
}
