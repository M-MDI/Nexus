import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
const auth = url && key ? createClient(url, key, {
  auth: { flowType: 'pkce', detectSessionInUrl: false },
}).auth : null;

const recoveryKey = 'event-matcher:password-recovery';

export { auth };

export function callbackUrl(recovery = false) {
  return new URL(recovery ? '/auth/recovery' : '/auth/callback', location.origin).href;
}

export function canRecover(session) {
  return Boolean(session && sessionStorage.getItem(recoveryKey) === session.user.id);
}

export function finishRecovery() {
  sessionStorage.removeItem(recoveryKey);
}

export async function completeCallback(recovery) {
  if (!auth) throw new Error('auth_unconfigured');

  const query = new URLSearchParams(location.search);
  const code = query.get('code');
  const tokenHash = query.get('token_hash');
  const type = query.get('type');
  const acceptsToken = recovery ? type === 'recovery' : type === 'email' || type === 'signup';
  // Clear URL credentials before rendering the outcome or moving to another route.
  history.replaceState(history.state, '', location.pathname);

  if (query.has('error') || query.has('error_code')) throw new Error('invalid_callback');

  let result;
  if (code) {
    result = await auth.exchangeCodeForSession(code);
  } else if (tokenHash && acceptsToken) {
    result = await auth.verifyOtp({ token_hash: tokenHash, type });
  } else {
    throw new Error('invalid_callback');
  }

  if (result.error || !result.data.session) throw new Error('invalid_callback');
  finishRecovery();
  if (recovery) sessionStorage.setItem(recoveryKey, result.data.session.user.id);
  return result.data.session;
}
