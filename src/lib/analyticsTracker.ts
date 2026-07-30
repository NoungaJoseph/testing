// Lightweight analytics tracker client for Enako Outreach website

const getApiEndpoints = (path: string) => {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
    return [
        `${apiBase}/outreach/analytics${path}`
    ];
};

const sendAnalyticsPayload = async (path: string, payload: any) => {
    const endpoints = getApiEndpoints(path);
    for (const url of endpoints) {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) return true;
        } catch (err) {
            // Try next endpoint fallback
        }
    }
    return false;
};

export const trackCookieConsent = async (consent: 'accepted' | 'essential_only') => {
    await sendAnalyticsPayload('/consent', {
        consent,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
        deviceType: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop',
        country: 'Cameroon',
    });
};

export const trackPageView = async (path: string) => {
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
    await sendAnalyticsPayload('/event', {
        eventType: 'pageview',
        path,
        referrer: typeof document !== 'undefined' ? document.referrer || null : null,
        utmSource: urlParams.get('utm_source'),
        utmMedium: urlParams.get('utm_medium'),
        utmCampaign: urlParams.get('utm_campaign'),
        deviceType: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop',
        country: 'Cameroon',
    });
};

export const trackClickHeatmap = async (path: string, event: MouseEvent) => {
    if (typeof window === 'undefined') return;
    const clickX = Number(((event.clientX / window.innerWidth) * 100).toFixed(1));
    const clickY = Number(((event.clientY / window.innerHeight) * 100).toFixed(1));

    await sendAnalyticsPayload('/event', {
        eventType: 'click',
        path,
        clickX,
        clickY,
        deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
    });
};
