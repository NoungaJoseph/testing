import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// ─── Brand colors (ENAKO Outreach) ───────────────────────────────────────────
const BRAND = '#1c4980';
const BRAND_DARK = '#113057';

// ─── Validation helpers ───────────────────────────────────────────────────────
const isValidMtnNumber = (phone: string) => {
    const p = phone.replace(/[^0-9]/g, '');
    const num = p.length === 12 && p.startsWith('237') ? p.substring(3) : p;
    if (num.length !== 9) return false;
    if (num.startsWith('67') || num.startsWith('68')) return true;
    if (num.startsWith('65')) {
        const thirdDigit = parseInt(num[2]);
        if (thirdDigit >= 0 && thirdDigit <= 4) return true;
    }
    return false;
};

const isValidOrangeNumber = (phone: string) => {
    const p = phone.replace(/[^0-9]/g, '');
    const num = p.length === 12 && p.startsWith('237') ? p.substring(3) : p;
    if (num.length !== 9) return false;
    if (num.startsWith('69') || num.startsWith('64')) return true;
    if (num.startsWith('65')) {
        const thirdDigit = parseInt(num[2]);
        if (thirdDigit >= 5 && thirdDigit <= 9) return true;
    }
    return false;
};

// ─── Donate Page ──────────────────────────────────────────────────────────────
const Donate = () => {
    const { t } = useTranslation();

    // Form state (kept from original for functional backend)
    const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
    const [selectedPreset, setSelectedPreset] = useState<number>(10000);
    const [customAmount, setCustomAmount] = useState('');
    const [dedicateGift, setDedicateGift] = useState(false);
    const [coverFees, setCoverFees] = useState(true);
    const [tooltip, setTooltip] = useState(false);

    // Payment flow state
    const [method, setMethod] = useState<'mtn' | 'orange' | 'bank'>('mtn');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [step, setStep] = useState(1);
    const [mtnStatus, setMtnStatus] = useState<'idle' | 'submitting' | 'polling' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const baseAmount = customAmount
        ? parseInt(customAmount.replace(/\D/g, ''), 10) || 0
        : selectedPreset;
    const totalAmount = coverFees ? baseAmount + 500 : baseAmount;

    const handlePreset = (amount: number) => {
        setSelectedPreset(amount);
        setCustomAmount('');
    };

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAmount(e.target.value.replace(/[^0-9]/g, ''));
        setSelectedPreset(0);
    };

    const submitDonation = async () => {
        try {
            setErrorMessage('');
            if (method === 'mtn' && !isValidMtnNumber(phone)) {
                setErrorMessage('Please enter a valid MTN Cameroon number (e.g. 67X..., 68X..., 650-654...).');
                setMtnStatus('error');
                return;
            }
            if (method === 'orange' && !isValidOrangeNumber(phone)) {
                setErrorMessage('Please enter a valid Orange Cameroon number (e.g. 69X..., 64X..., 655-659...).');
                setMtnStatus('error');
                return;
            }
            setMtnStatus('submitting');
            const payload = {
                sector: 'general',
                frequency: frequency === 'monthly' ? 'MONTHLY' : 'ONE_TIME',
                amount: totalAmount,
                currency: 'XAF',
                method: method.toUpperCase(),
                fullName,
                email,
                phone,
            };
            const backendUrl = import.meta.env.VITE_API_URL || 'https://api.enakoos.com/api/v1';
            const response = await fetch(`${backendUrl}/outreach/donations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                const data = await response.json();
                if ((method === 'mtn' || method === 'orange') && data.status === 'PENDING' && data.paymentUuid) {
                    setMtnStatus('polling');
                    pollMtnStatus(data.paymentUuid, data.paymentToken, data.donation.id);
                } else {
                    setIsComplete(true);
                    setShowPaymentModal(false);
                }
            } else {
                const errorData = await response.json().catch(() => ({}));
                const msg = errorData.message || 'Failed to submit donation. Please try again.';
                setErrorMessage(Array.isArray(msg) ? msg.join(', ') : msg);
                setMtnStatus('error');
            }
        } catch (err: any) {
            setErrorMessage(err.message || 'Network error occurred. Please try again.');
            setMtnStatus('error');
        }
    };

    const pollMtnStatus = async (uuid: string, token: string, donationId: string) => {
        const backendUrl = import.meta.env.VITE_API_URL || 'https://api.enakoos.com/api/v1';
        let attempts = 0;
        const interval = setInterval(async () => {
            attempts++;
            try {
                const res = await fetch(`${backendUrl}/outreach/donations/status/${uuid}?token=${token}&donationId=${donationId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.status === 'COMPLETED' || data.status === 'SETTLED') {
                        clearInterval(interval);
                        setMtnStatus('idle');
                        setIsComplete(true);
                        setShowPaymentModal(false);
                    } else if (data.status === 'FAILED') {
                        clearInterval(interval);
                        setErrorMessage(data.reason ? `Payment failed: ${data.reason}` : 'Payment was rejected. Please try again.');
                        setMtnStatus('error');
                    }
                } else if (attempts > 20) {
                    clearInterval(interval);
                    setErrorMessage('Payment polling timed out.');
                    setMtnStatus('error');
                }
            } catch {
                if (attempts > 20) {
                    clearInterval(interval);
                    setErrorMessage('Network error while checking payment status.');
                    setMtnStatus('error');
                }
            }
        }, 5000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <Navbar />

            {/* ── SECTION 1: HERO BANNER ─────────────────────────────────────── */}
            <section
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 'clamp(460px, 68vh, 640px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    overflow: 'hidden',
                    marginTop: 0,
                }}
            >
                {/* Background image with dark overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.58)), url(https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 30%',
                    }}
                />

                {/* Breadcrumb */}
                <div
                    style={{
                        position: 'absolute',
                        top: '9.5rem',
                        left: '2.5rem',
                        color: 'rgba(255,255,255,0.82)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        zIndex: 2,
                    }}
                >
                    <Link to="/" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}>{t('nav.home', 'Home')}</Link>
                    <span style={{ margin: '0 0.4rem', fontSize: '0.6rem' }}>♦</span>
                    {t('nav.donate', 'Donate')}
                </div>

                {/* Heading */}
                <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 4rem', maxWidth: 960 }}>
                    <h1
                        style={{
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em',
                            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                            color: '#fff',
                            margin: 0,
                            lineHeight: 1.08,
                        }}
                    >
                        {t('donate_page.hero_title', 'EVERY CHILD DESERVES TO FEEL SAFE. YOU CAN MAKE THAT HAPPEN.')}
                    </h1>
                </div>
            </section>

            {/* ── SECTION 2: TWO-COLUMN - COPY + DONATION CARD ──────────────── */}
            <section style={{ padding: '5rem 0', background: '#fff' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
                    <div className="donate-two-col" style={{ display: 'flex', gap: '3.5rem', alignItems: 'flex-start' }}>

                        {/* ── LEFT COLUMN ── */}
                        <div className="donate-left" style={{ flex: '0 0 55%', minWidth: 0 }}>
                            <FadeIn direction="up">
                                <h2
                                    style={{
                                        fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.02em',
                                        color: '#111',
                                        lineHeight: 1.15,
                                        marginBottom: '1.5rem',
                                        marginTop: 0,
                                    }}
                                >
                                    {t('donate_page.sec2_title', 'YOUR GIFT REACHES A CHILD TODAY')}
                                </h2>

                                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#333', marginBottom: '1.25rem' }}>
                                    {t('donate_page.sec2_p1', 'Right now, a child in an underserved community is growing up without access to education, nutrition, or safety. That reality does not have to stay that way. It stays with them unless someone steps in.')}
                                </p>
                                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#333', marginBottom: '1.75rem' }}>
                                    {t('donate_page.sec2_p2', 'You can be that person. You can help them get through today. You can help them believe tomorrow is possible.')}
                                </p>

                                {/* Callout box */}
                                <div
                                    style={{
                                        background: BRAND,
                                        color: '#fff',
                                        padding: '1.5rem',
                                        borderRadius: 4,
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        lineHeight: 1.65,
                                        marginBottom: '2rem',
                                    }}
                                >
                                    {t('donate_page.sec2_callout', 'Right now, you are helping reach 10,000+ children across Cameroon and giving them access to education, nutrition, and a safe space to grow.')}
                                </div>

                                {/* Divider */}
                                <div style={{ borderTop: '1px solid #ddd', margin: '2rem 0' }} />

                                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#333', marginBottom: '2rem' }}>
                                    {t('donate_page.sec2_p3', 'Independent evaluators review our work and impact. Your support directly reaches children in underserved communities across Central Africa.')}
                                </p>

                                {/* Trust badges */}
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                    <div
                                        style={{
                                            border: '2px solid #111',
                                            borderRadius: 4,
                                            padding: '1rem 0.85rem',
                                            minWidth: 110,
                                            textAlign: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            lineHeight: 1.4,
                                            color: '#111',
                                        }}
                                    >
                                        <div style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>✦</div>
                                        {t('donate_page.badge_certified', 'Certified NGO Cameroon')}
                                    </div>
                                    <div
                                        style={{
                                            border: '1.5px solid #ccc',
                                            borderRadius: 4,
                                            padding: '1rem 0.85rem',
                                            minWidth: 110,
                                            textAlign: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            lineHeight: 1.4,
                                            color: '#333',
                                        }}
                                    >
                                        {t('donate_page.badge_report', 'Transparency Report 2025 ENAKO')}
                                    </div>
                                    <div
                                        style={{
                                            background: BRAND,
                                            borderRadius: 4,
                                            padding: '1rem 0.85rem',
                                            minWidth: 110,
                                            textAlign: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            lineHeight: 1.4,
                                            color: '#fff',
                                        }}
                                    >
                                        <div style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>♥</div>
                                        {t('donate_page.badge_impact', '10,000+ Children Impacted')}
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* ── RIGHT COLUMN — DONATION CARD ── */}
                        <div className="donate-right" style={{ flex: '0 0 45%', minWidth: 0, width: '100%' }}>
                            <FadeIn direction="up" delay={0.1}>
                                <div
                                    style={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 8,
                                        padding: '2.25rem 2rem',
                                        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                                        background: '#fff',
                                    }}
                                >
                                    {/* Sign In link */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
                                        <Link to="/signin" style={{ color: BRAND, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                            <span>👤</span> {t('nav.signin', 'Sign In')}
                                        </Link>
                                    </div>

                                    {/* Card Header */}
                                    <h3
                                        style={{
                                            fontSize: '1.2rem',
                                            fontWeight: 800,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.03em',
                                            color: '#111',
                                            marginBottom: '1.5rem',
                                            marginTop: 0,
                                        }}
                                    >
                                        {t('donate_page.card_heading', 'GIVE NOW TO SUPPORT A CHILD')}
                                    </h3>

                                    {/* Frequency toggle tabs */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            background: '#f4f4f4',
                                            borderRadius: 6,
                                            padding: 3,
                                            marginBottom: '1.75rem',
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setFrequency('one-time')}
                                            style={{
                                                flex: 1,
                                                padding: '0.65rem',
                                                border: 'none',
                                                borderRadius: 4,
                                                fontWeight: 700,
                                                fontSize: '0.85rem',
                                                cursor: 'pointer',
                                                background: frequency === 'one-time' ? BRAND : 'transparent',
                                                color: frequency === 'one-time' ? '#fff' : '#555',
                                                transition: 'all 0.15s ease',
                                            }}
                                        >
                                            {t('donate_page.freq_one_time', 'One-time')}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFrequency('monthly')}
                                            style={{
                                                flex: 1,
                                                padding: '0.65rem',
                                                border: 'none',
                                                borderRadius: 4,
                                                fontWeight: 700,
                                                fontSize: '0.85rem',
                                                cursor: 'pointer',
                                                background: frequency === 'monthly' ? BRAND : 'transparent',
                                                color: frequency === 'monthly' ? '#fff' : '#555',
                                                transition: 'all 0.15s ease',
                                            }}
                                        >
                                            {t('donate_page.freq_monthly', 'Monthly')}
                                        </button>
                                    </div>

                                    {/* Amount presets — 2×2 grid */}
                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '0.85rem',
                                            marginBottom: '1.25rem',
                                        }}
                                    >
                                        {[
                                            { val: 5000, label: t('donate_page.preset_25', '$25 - Basic supplies') },
                                            { val: 10000, label: t('donate_page.preset_50', '$50 - School fees & books') },
                                            { val: 25000, label: t('donate_page.preset_100', '$100 - Full quarterly scholarship') },
                                            { val: 50000, label: t('donate_page.preset_250', '$250 - Classroom infrastructure') },
                                        ].map((p) => {
                                            const isSelected = selectedPreset === p.val && !customAmount;
                                            return (
                                                <button
                                                    key={p.val}
                                                    type="button"
                                                    onClick={() => handlePreset(p.val)}
                                                    style={{
                                                        border: isSelected ? `2px solid ${BRAND}` : '1.5px solid #ccc',
                                                        background: isSelected ? '#f0f4f9' : '#fff',
                                                        color: isSelected ? BRAND : '#333',
                                                        borderRadius: 6,
                                                        padding: '0.9rem 0.75rem',
                                                        textAlign: 'center',
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                        fontSize: '0.8rem',
                                                        lineHeight: 1.35,
                                                        transition: 'all 0.15s ease',
                                                    }}
                                                >
                                                    {p.label}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Custom amount input */}
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <input
                                            type="text"
                                            placeholder={t('donate_page.custom_amount_placeholder', 'Enter custom amount in USD ($)')}
                                            value={customAmount}
                                            onChange={handleCustomChange}
                                            style={{
                                                width: '100%',
                                                padding: '0.85rem 1rem',
                                                border: customAmount ? `2px solid ${BRAND}` : '1.5px solid #ccc',
                                                borderRadius: 6,
                                                fontSize: '0.9rem',
                                                color: '#111',
                                                boxSizing: 'border-[#1c4980]',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>

                                    {/* Step 1 Form Fields */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#444', marginBottom: '0.35rem' }}>
                                                {t('donate_page.fullname_label', 'FULL NAME *')}
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="e.g. Marie Ngu"
                                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: 4, fontSize: '0.9rem', outline: 'none' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#444', marginBottom: '0.35rem' }}>
                                                {t('donate_page.email_label', 'EMAIL ADDRESS *')}
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="marie@example.com"
                                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: 4, fontSize: '0.9rem', outline: 'none' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#444', marginBottom: '0.35rem' }}>
                                                {t('donate_page.phone_label', 'PHONE NUMBER (FOR MOMO / ORANGE) *')}
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="+237 670 000 000"
                                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: 4, fontSize: '0.9rem', outline: 'none' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="button"
                                        onClick={submitDonation}
                                        disabled={mtnStatus === 'submitting' || mtnStatus === 'polling'}
                                        style={{
                                            width: '100%',
                                            background: BRAND,
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: 6,
                                            padding: '1.1rem',
                                            fontWeight: 800,
                                            fontSize: '1rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = BRAND_DARK)}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = BRAND)}
                                    >
                                        {mtnStatus === 'submitting' || mtnStatus === 'polling'
                                            ? t('donate_page.submit_btn', 'COMPLETING YOUR DONATION...')
                                            : t('donate_page.btn_donate_now', 'DONATE NOW')}
                                    </button>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 3: OTHER WAYS TO GIVE ─────────────────────────────── */}
            <section style={{ background: '#f8fafc', padding: '5rem 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
                    <h2
                        style={{
                            fontSize: '1.8rem',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em',
                            color: '#111',
                            textAlign: 'center',
                            marginBottom: '3rem',
                        }}
                    >
                        {t('donate_page.other_ways_title', 'OTHER WAYS TO GIVE')}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="ds-card p-6">
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: BRAND, marginBottom: '0.75rem' }}>
                                {t('donate_page.way_bank_title', 'Bank Transfer / Wire')}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.6 }}>
                                {t('donate_page.way_bank_desc', 'Make a direct deposit or wire transfer to our registered NGO bank account in Cameroon or international partner accounts.')}
                            </p>
                        </div>
                        <div className="ds-card p-6">
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: BRAND, marginBottom: '0.75rem' }}>
                                {t('donate_page.way_inkind_title', 'In-Kind Donations')}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.6 }}>
                                {t('donate_page.way_inkind_desc', 'We accept educational supplies, solar equipment, medical kits, and computers for rural community learning hubs.')}
                            </p>
                        </div>
                        <div className="ds-card p-6">
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: BRAND, marginBottom: '0.75rem' }}>
                                {t('donate_page.way_corp_title', 'Corporate Sponsorship')}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.6 }}>
                                {t('donate_page.way_corp_desc', 'Partner your business with Enako Outreach to fund whole classrooms, boreholes, or regional scholarship cohorts.')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: AMARA'S STORY ───────────────────────────────────── */}
            <section style={{ background: '#fff', padding: '5rem 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
                    <div className="donate-story-flex" style={{ display: 'flex', gap: '3.5rem', alignItems: 'center' }}>
                        {/* Image */}
                        <div className="donate-story-img" style={{ flex: '0 0 50%', minWidth: 0, minHeight: 480, overflow: 'hidden' }}>
                            <img
                                src="/assets/charity/amara-story.jpg"
                                alt="Amara studying in a classroom setting"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        </div>

                        {/* Copy */}
                        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: BRAND, display: 'block', marginBottom: '0.5rem' }}>
                                {t('donate_page.amara_badge', 'ONE CHILD')}
                            </span>
                            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, textTransform: 'uppercase', color: '#111', marginBottom: '1.5rem', marginTop: 0 }}>
                                {t('donate_page.amara_title', "Amara's Story")}
                            </h2>
                            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#333', marginBottom: '1.25rem' }}>
                                {t('donate_page.amara_p1', 'This is what poverty looks like for her. Not just the lack of food, but the silence. The invisibility. The sense that no one sees her.')}
                            </p>
                            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#333', marginBottom: '1.25rem' }}>
                                {t('donate_page.amara_p2', 'Then she was welcomed into an ENAKO-supported community center. There was warmth. There was food. Someone noticed her. She began to sit with other children, to learn, to draw, and at last, to laugh.')}
                            </p>
                            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#333', marginBottom: '1.5rem' }}>
                                {t('donate_page.amara_p3', 'For the first time in a long time, she felt seen.')}
                            </p>
                            <p style={{ fontSize: '1rem', fontWeight: 700, color: '#111', marginBottom: '2rem' }}>
                                {t('donate_page.amara_footer', 'Your support made that possible.')}
                            </p>
                            <Link to="/donate" className="ds-btn ds-btn-primary">
                                {t('donate_page.amara_btn', 'HELP CHILDREN LIKE AMARA')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 5: FAQ ─────────────────────────────────────────────── */}
            <section style={{ background: '#f8fafc', padding: '5rem 0' }}>
                <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 2rem' }}>
                    <h2
                        style={{
                            fontSize: '1.8rem',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em',
                            color: '#111',
                            textAlign: 'center',
                            marginBottom: '3rem',
                        }}
                    >
                        {t('donate_page.faq_title', 'FREQUENTLY ASKED QUESTIONS ABOUT DONATING')}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {[
                            { q: t('donate_page.faq_q1', 'Where does my donation go?'), a: t('donate_page.faq_a1', '100% of your donation directly funds field programs in Cameroon — including school tuition, textbooks, Mobile Money teacher grants, clean water boreholes, and mobile health clinics.') },
                            { q: t('donate_page.faq_q2', 'Can I donate using Mobile Money?'), a: t('donate_page.faq_a2', 'Yes! We support both MTN Mobile Money and Orange Money directly on this page. Simply select your provider, enter your registered 9-digit number, and approve the prompt on your phone.') },
                            { q: t('donate_page.faq_q3', 'Is my donation tax-deductible?'), a: t('donate_page.faq_a3', 'Enako Outreach is a registered non-governmental organization in Cameroon with international fiscal sponsorship. Tax receipts are issued automatically upon confirmation.') },
                            { q: t('donate_page.faq_q4', 'Can I set up a recurring monthly gift?'), a: t('donate_page.faq_a4', "Absolutely. Select the 'Monthly' tab above. Monthly recurring gifts provide predictable support that allows us to plan long-term community programs.") },
                        ].map((item, idx) => (
                            <div key={idx} className="ds-card p-6">
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111', marginBottom: '0.5rem' }}>{item.q}</h3>
                                <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.65 }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SECTION 6: BOTTOM BLACK BANNER ───────────────────────────── */}
            <section className="bg-black py-16 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <p className="font-extrabold uppercase tracking-wide text-lg md:text-2xl text-white mb-8 leading-snug">
                        {t('donate_page.banner_text_1', 'YOU CANNOT CHANGE WHERE THEY WERE BORN.')}<br />
                        {t('donate_page.banner_text_2', 'BUT YOU CAN CHANGE WHAT HAPPENS NEXT.')}
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/donate" className="ds-btn ds-btn-primary px-8 py-4 text-base">
                            ♥ {t('nav.donate_now', 'DONATE NOW')}
                        </Link>
                        <Link to="/partnership" className="ds-btn ds-btn-outline-white px-8 py-4 text-base">
                            {t('home.donation_cta.btn_partner', 'BECOME A PARTNER')}
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Donate;
