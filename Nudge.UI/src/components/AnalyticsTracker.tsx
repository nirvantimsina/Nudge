'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useReportWebVitals } from 'next/web-vitals';
import { sendTelemetry } from '@/src/services/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const pageLoadTimeRef = useRef<number>(Date.now());
  const currentPathRef = useRef<string>(pathname);

  // 1. Dwell Time Tracker (How long they stayed on the page)
  useEffect(() => {
    pageLoadTimeRef.current = Date.now();
    currentPathRef.current = pathname;

    // Trigger page view on arrival
    sendTelemetry({ eventName: 'page_view', url: pathname });

    const handleDeparture = () => {
      const timeSpentSec = Math.round((Date.now() - pageLoadTimeRef.current) / 1000);
      if (timeSpentSec > 0) {
        sendTelemetry({
          eventName: 'page_leave',
          url: currentPathRef.current,
          performanceMs: timeSpentSec * 1000, // Pass seconds as milliseconds inside unified field
          metadata: { duration_seconds: timeSpentSec }
        }, true); // true uses Beacon to survive tab close
      };
    };

    // Track when user leaves page or closes tab
    window.addEventListener('beforeunload', handleDeparture);
    return () => {
      handleDeparture(); // Track when navigating routes internally
      window.removeEventListener('beforeunload', handleDeparture);
    };
  }, [pathname]);

  // 2. Global Autocapture Click Tracker (Sees WHAT they clicked)
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Only track interactive elements to filter out white space noise
      const interactiveEl = target.closest('a, button, input[type="submit"], [role="button"], [data-track]');
      if (!interactiveEl) return;

      const elementText = interactiveEl.textContent?.trim().substring(0, 50) || '';
      const elementId = interactiveEl.id || '';
      const elementClass = interactiveEl.className || '';
      const trackingTag = interactiveEl.getAttribute('data-track') || '';

      sendTelemetry({
        eventName: 'ui_click',
        url: window.location.pathname,
        metadata: {
          element_type: interactiveEl.tagName.toLowerCase(),
          element_text: elementText,
          element_id: elementId,
          element_class: elementClass.substring(0, 100),
          custom_tag: trackingTag
        }
      });
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // 3. Page Core Load Speeds
  useReportWebVitals((metric) => {
    if (['FCP', 'LCP', 'TTFB', 'FID'].includes(metric.name)) {
      sendTelemetry({
        eventName: `web_vital_${metric.name.toLowerCase()}`,
        url: window.location.pathname,
        performanceMs: Math.round(metric.value),
        metadata: { rating: metric.rating }
      });
    }
  });

  return null;
}
