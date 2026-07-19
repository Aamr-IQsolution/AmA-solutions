type TurnstileVerifyResult =
  | { ok: true }
  | { ok: false; reason: 'missing_secret' | 'missing_token' | 'rejected' | 'network' };

export function isTurnstileFailure(
  result: TurnstileVerifyResult,
): result is { ok: false; reason: 'missing_secret' | 'missing_token' | 'rejected' | 'network' } {
  return result.ok === false;
}

export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp: string,
): Promise<TurnstileVerifyResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: false, reason: 'missing_secret' };
  }

  const trimmed = token?.trim();
  if (!trimmed) {
    return { ok: false, reason: 'missing_token' };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: trimmed,
    });
    if (remoteIp && remoteIp !== 'unknown') {
      body.set('remoteip', remoteIp);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });

    if (!response.ok) {
      return { ok: false, reason: 'network' };
    }

    const data = (await response.json()) as { success?: boolean };
    return data.success ? { ok: true } : { ok: false, reason: 'rejected' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}

export function isTurnstileRequired(): boolean {
  if (process.env.VERCEL === '1') return true;
  return process.env.NODE_ENV === 'production';
}
