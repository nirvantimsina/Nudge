export interface AnalyticsPayload {
  eventName: string;
  url?: string;
  performanceMs?: number;
  metadata?: Record<string, any>;
}

export function sendTelemetry(payload: AnalyticsPayload, useBeacon = false) {
  if (typeof window === 'undefined') return;

  const userAgent = navigator.userAgent;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  
  const body = {
    eventName: payload.eventName,
    url: payload.url || window.location.pathname,
    performanceMs: payload.performanceMs || 0,
    browser: userAgent,
    screenSize: screenResolution,
    language: navigator.language,
    metadata: payload.metadata || {}
  };

  const targetUrl = 'http://localhost:5043/api/Analytics/Track';

  // Use Beacon API for tab closures/navigation departures so requests aren't canceled
  if (useBeacon && navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
    navigator.sendBeacon(targetUrl, blob);
  } else {
    // Standard fetch for live events
    fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    }).catch((err) => console.debug('Telemetry skipped:', err));
  }
}
