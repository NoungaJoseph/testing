import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';

// ─── Brand colors (ENAKO Outreach) ───────────────────────────────────────────
const BRAND = '#1c4980';

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
                setErrorMessage('Please enter a valid MTN Cameroon number (e.g. 67X..., 68X..., 650–654...).');
                setMtnStatus('error');
                return;
            }
            if (method === 'orange' && !isValidOrangeNumber(phone)) {
                setErrorMessage('Please enter a valid Orange Cameroon number (e.g. 69X..., 64X..., 655–659...).');
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
                    <a href="#" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}>Home</a>
                    <span style={{ margin: '0 0.4rem', fontSize: '0.6rem' }}>♦</span>
                    Donate
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
                        EVERY CHILD DESERVES TO FEEL SAFE.
                        <br />
                        YOU CAN MAKE THAT HAPPEN.
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
                                    YOUR GIFT REACHES A CHILD TODAY
                                </h2>

                                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#333', marginBottom: '1.25rem' }}>
                                    Right now, a child in an underserved community is growing up without
                                    access to education, nutrition, or safety. That reality does not have
                                    to stay that way. It stays with them unless someone steps in.
                                </p>
                                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#333', marginBottom: '1.75rem' }}>
                                    You can be that person. You can help them get through today. You can
                                    help them believe tomorrow is possible.
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
                                    Right now, you are helping reach 10,000+ children across Cameroon
                                    and giving them access to education, nutrition, and a safe space to grow.
                                </div>

                                {/* Divider */}
                                <div style={{ borderTop: '1px solid #ddd', margin: '2rem 0' }} />

                                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#333', marginBottom: '2rem' }}>
                                    Independent evaluators review our work and impact. Your support
                                    directly reaches children in underserved communities across Central Africa.
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
                                        Certified NGO<br />Cameroon
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
                                        Transparency<br />Report 2025<br />ENAKO
                                    </div>
                                    <div
                                        style={{
                                            background: BRAND,
                                            borderRadius: 4,
                                            padding: '1rem 0.85rem',
                                            minWidth: 110,
                                            textAlign: 'center',
                                            fontSize: '1.45rem',
                                            fontWeight: 900,
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            letterSpacing: '-0.02em',
                                        }}
                                    >
                                        ENAKO.
                                    </div>
                                </div>

                                <p style={{ fontSize: '0.9rem', color: '#333', margin: 0 }}>
                                    View ENAKO's financial statements and accountability reports{' '}
                                    <a href="#" style={{ color: BRAND, textDecoration: 'underline', fontWeight: 600 }}>
                                        here
                                    </a>
                                    .
                                </p>
                            </FadeIn>
                        </div>

                        {/* ── RIGHT COLUMN - DONATION CARD ── */}
                        <div
                            className="donate-right"
                            style={{ flex: '1', minWidth: 0, position: 'sticky', top: '2rem' }}
                        >
                            <FadeIn direction="up" delay={0.15}>
                                {isComplete ? (
                                    <div
                                        style={{
                                            background: '#fff',
                                            border: '1px solid #e5e5e5',
                                            borderRadius: 8,
                                            padding: '3rem 2rem',
                                            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(28,73,128,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                            <span style={{ color: BRAND, fontSize: '1.75rem' }}>✓</span>
                                        </div>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111', marginBottom: '0.75rem' }}>Thank You!</h2>
                                        <p style={{ color: '#555', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                                            Your gift of <strong>{totalAmount.toLocaleString('fr-CM')} FCFA</strong> has been received.
                                            A receipt will be sent to <strong>{email}</strong>.
                                        </p>
                                        <button
                                            onClick={() => { setIsComplete(false); setStep(1); setMtnStatus('idle'); setPhone(''); setFullName(''); setEmail(''); }}
                                            style={{ background: BRAND, color: '#fff', border: 'none', borderRadius: 4, padding: '0.85rem 2rem', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'inherit' }}
                                        >
                                            MAKE ANOTHER GIFT
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            background: '#fff',
                                            border: '1px solid #e5e5e5',
                                            borderRadius: 8,
                                            padding: '2rem',
                                            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                                        }}
                                    >
                                        {/* Sign In link */}
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.25rem' }}>
                                            <a href="#/signin" style={{ color: BRAND, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                                <span>👤</span> Sign In
                                            </a>
                                        </div>

                                        {/* Step dots */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: '1rem' }}>
                                            <div style={{ width: 22, height: 22, borderRadius: '50%', background: BRAND, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                                            </div>
                                            <div style={{ width: 60, height: 2, background: '#ddd' }} />
                                            <div style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #ccc', background: '#fff', flexShrink: 0 }} />
                                            <div style={{ width: 60, height: 2, background: '#ddd' }} />
                                            <div style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #ccc', background: '#fff', flexShrink: 0 }} />
                                        </div>
                                        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem', color: '#111' }}>
                                            Choose Your Donation
                                        </div>

                                        {/* Frequency tabs */}
                                        <div style={{ display: 'flex', borderBottom: '1px solid #e5e5e5', marginBottom: '1.25rem' }}>
                                            {(['one-time', 'monthly'] as const).map((tab) => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setFrequency(tab)}
                                                    style={{
                                                        flex: 1,
                                                        background: 'none',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        padding: '0.75rem 0.5rem',
                                                        fontSize: '1rem',
                                                        fontWeight: 500,
                                                        color: frequency === tab ? BRAND : '#888',
                                                        borderBottom: frequency === tab ? `2px solid ${BRAND}` : '2px solid transparent',
                                                        marginBottom: -1,
                                                        transition: 'color 0.2s, border-color 0.2s',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        gap: '0.4rem',
                                                        fontFamily: 'inherit',
                                                    }}
                                                >
                                                    {tab === 'monthly' && <span style={{ fontSize: '0.85rem' }}>📅</span>}
                                                    {tab === 'one-time' ? 'One Time' : 'Monthly'}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Preset amounts - 2×2 grid */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.6rem' }}>
                                            {[5000, 10000, 25000, 50000].map((amt) => {
                                                const active = selectedPreset === amt && !customAmount;
                                                return (
                                                    <button
                                                        key={amt}
                                                        onClick={() => handlePreset(amt)}
                                                        style={{
                                                            border: active ? `2px solid ${BRAND}` : '1.5px solid #ccc',
                                                            borderRadius: 4,
                                                            padding: '0.75rem 0.5rem',
                                                            fontSize: '1rem',
                                                            fontWeight: active ? 700 : 400,
                                                            background: '#fff',
                                                            color: active ? BRAND : '#333',
                                                            cursor: 'pointer',
                                                            transition: 'border-color 0.15s, color 0.15s',
                                                            textAlign: 'center',
                                                            fontFamily: 'inherit',
                                                        }}
                                                        onMouseEnter={e => {
                                                            if (!active) {
                                                                (e.currentTarget as HTMLButtonElement).style.borderColor = BRAND;
                                                                (e.currentTarget as HTMLButtonElement).style.color = BRAND;
                                                            }
                                                        }}
                                                        onMouseLeave={e => {
                                                            if (!active) {
                                                                (e.currentTarget as HTMLButtonElement).style.borderColor = '#ccc';
                                                                (e.currentTarget as HTMLButtonElement).style.color = '#333';
                                                            }
                                                        }}
                                                    >
                                                        {amt.toLocaleString('fr-CM')} FCFA
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Custom amount */}
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={customAmount}
                                            onChange={handleCustomChange}
                                            placeholder="Other amount (FCFA)"
                                            style={{
                                                width: '100%',
                                                border: '1px solid #ccc',
                                                borderRadius: 4,
                                                padding: '0.75rem',
                                                fontSize: '1rem',
                                                outline: 'none',
                                                boxSizing: 'border-box',
                                                marginBottom: '0.75rem',
                                                fontFamily: 'inherit',
                                                transition: 'border-color 0.2s',
                                            }}
                                            onFocus={e => (e.currentTarget.style.borderColor = BRAND)}
                                            onBlur={e => (e.currentTarget.style.borderColor = '#ccc')}
                                        />

                                        {/* Monthly upsell */}
                                        <div style={{ background: 'rgba(28,73,128,0.06)', borderRadius: 4, padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem', color: BRAND, fontWeight: 500 }}>
                                            <span>❤️</span> Make your impact last! Support a child every month.
                                        </div>

                                        {/* Checkboxes */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#333', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={dedicateGift}
                                                    onChange={e => setDedicateGift(e.target.checked)}
                                                    style={{ accentColor: BRAND, width: 16, height: 16, cursor: 'pointer' }}
                                                />
                                                Dedicate this gift to someone
                                            </label>
                                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: '#333', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={coverFees}
                                                    onChange={e => setCoverFees(e.target.checked)}
                                                    style={{ accentColor: BRAND, width: 16, height: 16, cursor: 'pointer', marginTop: 2, flexShrink: 0 }}
                                                />
                                                <span>
                                                    Cover processing fees so 100% of your gift supports children (+500 FCFA){' '}
                                                    <span
                                                        style={{ display: 'inline-block', position: 'relative', cursor: 'help' }}
                                                        onMouseEnter={() => setTooltip(true)}
                                                        onMouseLeave={() => setTooltip(false)}
                                                    >
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: '50%', border: '1.5px solid #888', fontSize: '0.65rem', color: '#888', fontWeight: 700 }}>i</span>
                                                        {tooltip && (
                                                            <span style={{ position: 'absolute', bottom: '130%', left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#fff', fontSize: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: 4, whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                                                                Covers payment processing costs
                                                            </span>
                                                        )}
                                                    </span>
                                                </span>
                                            </label>
                                        </div>

                                        {/* MTN Mobile Money button */}
                                        <button
                                            onClick={() => { setMethod('mtn'); setShowPaymentModal(true); }}
                                            style={{ width: '100%', background: '#FFCC00', color: '#000', fontWeight: 700, fontSize: '1.1rem', padding: '1rem', borderRadius: 4, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontFamily: 'inherit', transition: 'opacity 0.2s' }}
                                            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                                            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                                        >
                                            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: '#000', color: '#FFCC00', fontWeight: 900, fontSize: '0.65rem', flexShrink: 0, letterSpacing: '-0.02em' }}>MTN</span>
                                            MTN Mobile Money
                                        </button>

                                        {/* OR divider */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '0 0 0.75rem' }}>
                                            <div style={{ flex: 1, height: 1, background: '#e5e5e5' }} />
                                            <span style={{ fontSize: '0.85rem', color: '#999', fontWeight: 500 }}>or</span>
                                            <div style={{ flex: 1, height: 1, background: '#e5e5e5' }} />
                                        </div>

                                        {/* Orange Money button */}
                                        <button
                                            onClick={() => { setMethod('orange'); setShowPaymentModal(true); }}
                                            style={{ width: '100%', background: '#FF6600', color: '#fff', fontWeight: 700, fontSize: '1.1rem', padding: '1rem', borderRadius: 4, border: 'none', cursor: 'pointer', marginBottom: '1rem', fontFamily: 'inherit', transition: 'opacity 0.2s' }}
                                            onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                                            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                                        >
                                            Give {totalAmount.toLocaleString('fr-CM')} FCFA via Orange Money
                                        </button>

                                        {/* Payment icon row */}
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
                                            <div style={{ background: '#FFCC00', borderRadius: 4, padding: '0.25rem 0.5rem', fontSize: '0.6rem', fontWeight: 900, color: '#000', border: '1px solid #e5e5e5' }}>MTN</div>
                                            <div style={{ background: '#FF6600', borderRadius: 4, padding: '0.25rem 0.5rem', fontSize: '0.6rem', fontWeight: 900, color: '#fff', border: '1px solid #e5e5e5' }}>OM</div>
                                            <div style={{ background: '#f5f5f5', borderRadius: 4, padding: '0.25rem 0.5rem', fontSize: '0.65rem', fontWeight: 700, color: '#555', border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>🏦 Bank</div>
                                        </div>

                                        <div style={{ textAlign: 'center', fontSize: '0.78rem', color: '#aaa', fontWeight: 500 }}>
                                            Powered by <strong style={{ color: '#888' }}>ENAKO</strong>
                                        </div>
                                    </div>
                                )}
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SECTION 3: AMARA'S STORY ──────────────────────────────────── */}
            <section style={{ background: '#EBF5FB', padding: '5rem 0', width: '100%' }}>
                <div className="donate-story-wrap" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'stretch' }}>
                    {/* Image */}
                    <div className="donate-story-img" style={{ flex: '0 0 50%', minWidth: 0, minHeight: 480, overflow: 'hidden' }}>
                        <img
                            src="/assets/charity/amara-story.jpg"
                            alt="Amara studying in a classroom setting"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </div>

                    {/* Text */}
                    <div className="donate-story-text" style={{ flex: '0 0 50%', minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 3rem 3rem 4rem' }}>
                        <FadeIn direction="up">
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#111', marginBottom: '0.75rem' }}>
                                ONE CHILD
                            </div>
                            <div style={{ color: BRAND, fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.25rem' }}>
                                Amara's Story
                            </div>
                            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#333', marginBottom: '1.25rem' }}>
                                Amara is eight years old. She lives in a village outside Yaoundé, where her mother
                                works long hours and school is far away. Most days, no one is home. She spends her
                                time alone, carrying a weight no child should carry.
                            </p>
                            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#333', marginBottom: '1.25rem' }}>
                                This is what poverty looks like for her. Not just the lack of food, but the silence.
                                The invisibility. The sense that no one sees her.
                            </p>
                            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#333', marginBottom: '1.25rem' }}>
                                Then she was welcomed into an ENAKO-supported community center. There was warmth.
                                There was food. Someone noticed her. She began to sit with other children, to learn,
                                to draw, and at last, to laugh.
                            </p>
                            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#333', marginBottom: '0.5rem' }}>
                                For the first time in a long time, she felt seen.
                            </p>
                            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#333', fontWeight: 600, marginBottom: '2rem' }}>
                                Your support made that possible.
                            </p>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                style={{
                                    background: BRAND,
                                    color: '#fff',
                                    fontWeight: 700,
                                    fontSize: '0.9rem',
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    padding: '1rem 2rem',
                                    borderRadius: 4,
                                    border: 'none',
                                    cursor: 'pointer',
                                    alignSelf: 'flex-start',
                                    fontFamily: 'inherit',
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                            >
                                HELP CHILDREN LIKE AMARA
                            </button>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── SECTION 4: BLACK CTA BANNER ────────────────────────────────── */}
            <section style={{ background: '#000', padding: '4rem 2rem', textAlign: 'center' }}>
                <p
                    style={{
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                        color: '#fff',
                        margin: '0 auto 2rem',
                        maxWidth: 720,
                        lineHeight: 1.5,
                    }}
                >
                    YOU CANNOT CHANGE WHERE THEY WERE BORN.<br />
                    BUT YOU CAN CHANGE WHAT HAPPENS NEXT.
                </p>
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{
                        background: BRAND,
                        color: '#fff',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        padding: '1rem 3rem',
                        fontSize: '1rem',
                        borderRadius: 4,
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                    GIVE NOW
                </button>
            </section>

            {/* ── SECTION 5: OTHER WAYS TO GIVE ──────────────────────────────── */}
            <section style={{ padding: '5rem 0', background: '#fff' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
                    <h2
                        style={{
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.02em',
                            fontSize: '2rem',
                            color: '#111',
                            marginBottom: '3rem',
                            marginTop: 0,
                        }}
                    >
                        OTHER WAYS TO GIVE
                    </h2>

                    {/* Row 1 - 3 columns */}
                    <FadeIn direction="up">
                        <div className="donate-ways-row1" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', marginBottom: '3.5rem' }}>
                            {[
                                {
                                    title: 'DONATE VIA BANK TRANSFER',
                                    body: 'Transfer directly to our account. We will confirm your gift and send a receipt.',
                                    extra: 'For account details, reach out to:',
                                    link: 'info@enako.org',
                                    href: 'mailto:info@enako.org',
                                },
                                {
                                    title: 'PLANNED GIVING',
                                    body: "Some choose to make a lasting investment in a child's future. Through a bequest or trust, your impact can continue for years.",
                                    extra: 'Contact us to discuss options:',
                                    link: 'giving@enako.org',
                                    href: 'mailto:giving@enako.org',
                                },
                                {
                                    title: 'CORPORATE PARTNERSHIP',
                                    body: "Partner with ENAKO to invest in communities and demonstrate your company's commitment to children's welfare.",
                                    extra: 'Email us:',
                                    link: 'partners@enako.org',
                                    href: 'mailto:partners@enako.org',
                                },
                            ].map(col => (
                                <div key={col.title}>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#111', marginBottom: '0.75rem' }}>
                                        {col.title}
                                    </div>
                                    <div style={{ borderTop: '1px solid #ccc', marginBottom: '0.75rem' }} />
                                    <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#333', marginBottom: '0.75rem' }}>{col.body}</p>
                                    <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#333', margin: 0 }}>
                                        {col.extra}{' '}
                                        <a
                                            href={col.href}
                                            style={{ color: BRAND, textDecoration: 'none', fontWeight: 600 }}
                                            onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                                            onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                                        >
                                            {col.link}
                                        </a>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Row 2 - 2 columns */}
                    <FadeIn direction="up" delay={0.1}>
                        <div className="donate-ways-row2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                            <div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#111', marginBottom: '0.75rem' }}>
                                    DONATE BY CHECK
                                </div>
                                <div style={{ borderTop: '1px solid #ccc', marginBottom: '0.75rem' }} />
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#333', marginBottom: '0.5rem' }}>Make checks payable to:</p>
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.9, color: BRAND, fontWeight: 600, margin: 0 }}>
                                    ENAKO Foundation,<br />
                                    BP 1234,<br />
                                    Yaoundé, Cameroon
                                </p>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#111', marginBottom: '0.75rem' }}>
                                    THE ENAKO CHILDREN'S FUND
                                </div>
                                <div style={{ borderTop: '1px solid #ccc', marginBottom: '0.75rem' }} />
                                <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#333', marginBottom: '1.25rem' }}>
                                    Our endowment supports children through hardship and recovery over time. Learn more about the fund.
                                </p>
                                <button
                                    style={{
                                        background: BRAND,
                                        color: '#fff',
                                        fontWeight: 700,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                        padding: '0.75rem 2rem',
                                        fontSize: '0.9rem',
                                        borderRadius: 4,
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'inherit',
                                        transition: 'opacity 0.2s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                                >
                                    LEARN MORE
                                </button>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <Footer />

            {/* ── PAYMENT MODAL ──────────────────────────────────────────────── */}
            {showPaymentModal && (
                <div
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
                    onClick={e => { if (e.target === e.currentTarget) { setShowPaymentModal(false); setMtnStatus('idle'); setErrorMessage(''); } }}
                >
                    <div style={{ background: '#fff', borderRadius: 12, padding: '2rem', width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', position: 'relative' }}>
                        <button
                            onClick={() => { setShowPaymentModal(false); setMtnStatus('idle'); setErrorMessage(''); }}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#666' }}
                        >
                            ✕
                        </button>

                        {mtnStatus === 'polling' ? (
                            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                                <div style={{ width: 56, height: 56, border: `4px solid rgba(28,73,128,0.2)`, borderTopColor: BRAND, borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }} />
                                <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#111', marginBottom: '0.75rem' }}>Check your phone</h3>
                                <p style={{ color: '#555', lineHeight: 1.7, fontSize: '0.9rem' }}>
                                    We sent a Mobile Money prompt to <strong>{phone}</strong>.<br />
                                    Please authorize the payment on your device.
                                </p>
                            </div>
                        ) : step === 1 ? (
                            <>
                                <h2 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#111', marginBottom: '0.4rem' }}>Your Details</h2>
                                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                    Donating <strong>{totalAmount.toLocaleString('fr-CM')} FCFA</strong> via {method === 'mtn' ? 'MTN Mobile Money' : 'Orange Money'}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" required style={{ width: '100%', border: '1px solid #ddd', borderRadius: 6, padding: '0.75rem', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} onFocus={e => (e.currentTarget.style.borderColor = BRAND)} onBlur={e => (e.currentTarget.style.borderColor = '#ddd')} />
                                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email Address" required style={{ width: '100%', border: '1px solid #ddd', borderRadius: 6, padding: '0.75rem', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }} onFocus={e => (e.currentTarget.style.borderColor = BRAND)} onBlur={e => (e.currentTarget.style.borderColor = '#ddd')} />
                                    <input
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        placeholder={method === 'mtn' ? 'MTN Number (e.g. 237670...)' : 'Orange Number (e.g. 237690...)'}
                                        required
                                        style={{ width: '100%', border: '1px solid #ddd', borderRadius: 6, padding: '0.75rem', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                                        onFocus={e => (e.currentTarget.style.borderColor = BRAND)}
                                        onBlur={e => (e.currentTarget.style.borderColor = '#ddd')}
                                    />
                                </div>
                                {errorMessage && <p style={{ color: '#d00', fontSize: '0.85rem', marginTop: '0.75rem', fontWeight: 600 }}>{errorMessage}</p>}
                                <button
                                    onClick={() => { if (fullName && email && phone) submitDonation(); else setErrorMessage('Please fill in all fields.'); }}
                                    disabled={mtnStatus === 'submitting'}
                                    style={{
                                        width: '100%',
                                        marginTop: '1.25rem',
                                        background: method === 'mtn' ? '#FFCC00' : '#FF6600',
                                        color: method === 'mtn' ? '#000' : '#fff',
                                        fontWeight: 700,
                                        fontSize: '1.05rem',
                                        padding: '0.95rem',
                                        borderRadius: 6,
                                        border: 'none',
                                        cursor: mtnStatus === 'submitting' ? 'not-allowed' : 'pointer',
                                        fontFamily: 'inherit',
                                        opacity: mtnStatus === 'submitting' ? 0.6 : 1,
                                        transition: 'opacity 0.2s',
                                    }}
                                >
                                    {mtnStatus === 'submitting' ? 'Processing...' : `Pay ${totalAmount.toLocaleString('fr-CM')} FCFA`}
                                </button>
                            </>
                        ) : null}
                    </div>
                </div>
            )}

            {/* ── RESPONSIVE + SPINNER CSS ────────────────────────────────────── */}
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                .donate-two-col {
                    display: flex;
                    gap: 3.5rem;
                    align-items: flex-start;
                }
                .donate-left { flex: 0 0 55%; min-width: 0; }
                .donate-right { flex: 1; min-width: 0; position: sticky; top: 2rem; }
                .donate-story-wrap { max-width: 1200px; margin: 0 auto; display: flex; align-items: stretch; }
                .donate-story-img { flex: 0 0 50%; min-width: 0; min-height: 480px; overflow: hidden; }
                .donate-story-text { flex: 0 0 50%; min-width: 0; display: flex; flex-direction: column; justify-content: center; padding: 3rem 3rem 3rem 4rem; }
                .donate-ways-row1 { display: grid; grid-template-columns: repeat(3,1fr); gap: 3rem; margin-bottom: 3.5rem; }
                .donate-ways-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
                @media (max-width: 900px) {
                    .donate-two-col { flex-direction: column !important; }
                    .donate-right { position: static !important; width: 100% !important; }
                    .donate-story-wrap { flex-direction: column !important; }
                    .donate-story-img { flex: none !important; width: 100% !important; min-height: 300px !important; }
                    .donate-story-text { flex: none !important; width: 100% !important; padding: 2.5rem 1.5rem !important; }
                }
                @media (max-width: 768px) {
                    .donate-ways-row1 { grid-template-columns: 1fr !important; }
                    .donate-ways-row2 { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
};

export default Donate;
