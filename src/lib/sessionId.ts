let sessionId: string | null = null;

export function getSessionId(): string {
  if (!sessionId) {
    sessionId = localStorage.getItem('vicaia_session_id') || crypto.randomUUID();
    localStorage.setItem('vicaia_session_id', sessionId);
  }
  return sessionId;
}
