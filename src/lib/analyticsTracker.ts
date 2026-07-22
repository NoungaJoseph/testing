// Lightweight analytics tracker client for Enako Outreach website

const API_BASE = 'https://api.enakoos.com/api/v1/outreach/analytics';

export const trackCookieConsent = async (consent: 'accepted' | 'essential_only') => {
    try {
        await fetch(`${API_BASE}/consent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                consent,
                userAgent: navigator.userAgent,
                deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
                country: 'Cameroon',
            }),
        });
    } catch (err) {
        console.warn('Analytics consent logging skipped:', err);
    }
};

export const trackPageView = async (path: string) => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        await fetch(`${API_BASE}/event`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventType: 'pageview',
                path,
                referrer: document.referrer || null,
                utmSource: urlParams.get('utm_source'),
                utmMedium: urlParams.get('utm_medium'),
                utmCampaign: urlParams.get('utm_campaign'),
                deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
                country: 'Cameroon',
            }),
        });
    } catch (err) {
        console.warn('Analytics pageview logging skipped:', err);
    }
};

export const trackClickHeatmap = async (path: string, event: MouseEvent) => {
    try {
        const clickX = Number(((event.clientX / window.innerWidth) * 100).toFixed(1));
        const clickY = Number(((event.clientY / window.innerHeight) * 100).toFixed(1));

        await fetch(`${API_BASE}/event`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventType: 'click',
                path,
                clickX,
                clickY,
                deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
            }),
        });
    } catch (err) {
        console.warn('Analytics click tracking skipped:', err);
    }
};
