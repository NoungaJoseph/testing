import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Globe, Send, Loader2, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';
import GetInvolvedBanner from '../components/GetInvolvedBanner';
import { useTranslation } from 'react-i18next';

const Partnership = () => {
    const { t } = useTranslation();
    const featuresT = t('partnership.inquiry.features', { returnObjects: true }) as any[];

    const [form, setForm] = useState({ name: '', organization: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email) return;

        setIsSubmitting(true);
        try {
            const payload = {
                type: 'PARTNERSHIP',
                applicantName: form.name,
                email: form.email,
                details: { organization: form.organization, message: form.message },
            };

            await fetch('https://api.enakoos.com/api/v1/outreach/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            setIsSubmitted(true);
        } catch (err) {
            console.error('Partnership submission error:', err);
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="pt-0 pb-24 relative z-10">
                    {/* ── 1. HERO BANNER ── */}
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
                            marginBottom: 0,
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundImage:
                                    "linear-gradient(rgba(0,27,68,0.65), rgba(0,27,68,0.85)), url('/assets/charity/our-mission.png')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center 30%',
                            }}
                        />

                        {/* Breadcrumb */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '11.5rem',
                                left: '2.5rem',
                                color: 'rgba(255,255,255,0.82)',
                                fontSize: '0.8rem',
                                fontWeight: 600,
                                letterSpacing: '0.04em',
                                zIndex: 2,
                            }}
                        >
                            <Link to="/" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}>Home</Link>
                            <span style={{ margin: '0 0.4rem', fontSize: '0.6rem' }}>♦</span>
                            Partnership
                        </div>

                        {/* Heading */}
                        <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 4rem', maxWidth: 960 }}>
                            <FadeIn direction="up">
                                <span className="text-[#1eb4d4] font-bold tracking-[0.15em] uppercase text-xs block mb-3">
                                    {t('partnership.hero.badge', 'STRATEGIC COLLABORATION')}
                                </span>
                                <h1
                                    style={{
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.02em',
                                        fontSize: 'clamp(2rem, 5vw, 4.2rem)',
                                        color: '#fff',
                                        margin: '0 0 1rem 0',
                                        lineHeight: 1.08,
                                    }}
                                >
                                    {t('partnership.hero.title', 'PARTNER WITH US TO BUILD')}{' '}
                                    <span className="text-[#1eb4d4]">{t('partnership.hero.title_highlight', 'LASTING IMPACT')}</span>
                                </h1>
                                <p className="text-slate-200 text-base md:text-lg max-w-2xl leading-relaxed font-normal">
                                    {t('partnership.hero.desc', 'We collaborate with corporate partners, public institutions, and international foundations to scale education, healthcare, and infrastructure across Cameroon.')}
                                </p>
                            </FadeIn>
                        </div>
                    </section>

                    {/* ── 2. SEAMLESS PARTNERSHIP TYPES BLOCK BANNER (Matching Image 1 Design System) ── */}
                    <GetInvolvedBanner
                        headerTitle="PARTNERSHIP"
                        headerSubtitle="Collaborate With Us"
                        blocks={[
                            {
                                title: 'Public Sector',
                                description: 'Collaborating with local governments to align with national education agendas and infrastructure priorities.',
                                buttonText: 'Explore Alliances',
                                buttonLink: '#inquiry',
                                bgColor: '#001B44',
                                btnBgColor: '#FFFFFF',
                                btnTextColor: '#001B44',
                            },
                            {
                                title: 'Corporate Social',
                                description: 'Crafting bespoke CSR initiatives that deliver measurable ESG results and sustainable community growth.',
                                buttonText: 'Partner With Us',
                                buttonLink: '#inquiry',
                                bgColor: '#0B2545',
                                btnBgColor: '#1eb4d4',
                                btnTextColor: '#FFFFFF',
                            },
                            {
                                title: 'NGO Alliances',
                                description: 'Scaling impact through shared resources, joint field operations, and ground-level expertise.',
                                buttonText: 'Join Network',
                                buttonLink: '#inquiry',
                                bgColor: '#133863',
                                btnBgColor: '#001B44',
                                btnTextColor: '#FFFFFF',
                            },
                        ]}
                    />

                    {/* ── 3. INQUIRY FORM SECTION ── */}
                    <section id="inquiry" className="bg-[#f8fafc] py-24 px-6 md:px-12 relative overflow-hidden border-t border-slate-100">
                        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
                            {/* Left Info Column */}
                            <div className="lg:w-1/2 space-y-8">
                                <FadeIn direction="right">
                                    <span className="text-[#1eb4d4] font-bold text-xs uppercase tracking-[0.2em] block mb-2">
                                        GET IN TOUCH
                                    </span>
                                    <h2 className="text-[#001B44] text-3xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight">
                                        {t('partnership.inquiry.title', 'INITIATE A')} <span className="text-[#1eb4d4]">{t('partnership.inquiry.title_highlight', 'STRATEGIC')}</span> {t('partnership.inquiry.title_end', 'DIALOGUE')}
                                    </h2>
                                    <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed mt-4">
                                        {t('partnership.inquiry.desc', 'Fill out the partnership inquiry form to connect directly with our executive team. We tailor every collaboration to match your CSR focus and institutional goals.')}
                                    </p>
                                </FadeIn>

                                <div className="space-y-6 pt-4">
                                    <FadeIn direction="up" delay={0.1}>
                                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                                            <div className="w-12 h-12 rounded-lg bg-[#1eb4d4]/10 flex items-center justify-center text-[#1eb4d4] shrink-0">
                                                <MessageSquare className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[#001B44] font-bold text-sm uppercase tracking-wider mb-1">
                                                    {featuresT[0]?.title || 'Dedicated Partnership Liaison'}
                                                </p>
                                                <p className="text-slate-600 text-sm font-normal">
                                                    {featuresT[0]?.desc || 'Direct communication with dedicated project directors.'}
                                                </p>
                                            </div>
                                        </div>
                                    </FadeIn>

                                    <FadeIn direction="up" delay={0.2}>
                                        <div className="flex items-start gap-4 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                                            <div className="w-12 h-12 rounded-lg bg-[#1eb4d4]/10 flex items-center justify-center text-[#1eb4d4] shrink-0">
                                                <Globe className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[#001B44] font-bold text-sm uppercase tracking-wider mb-1">
                                                    {featuresT[1]?.title || 'Transparent Impact Audits'}
                                                </p>
                                                <p className="text-slate-600 text-sm font-normal">
                                                    {featuresT[1]?.desc || 'Quarterly financial reports and video field verifications.'}
                                                </p>
                                            </div>
                                        </div>
                                    </FadeIn>
                                </div>
                            </div>

                            {/* Right Form Column */}
                            <div className="lg:w-1/2">
                                <FadeIn direction="left">
                                    {isSubmitted ? (
                                        <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-xl text-center">
                                            <CheckCircle2 className="w-16 h-16 text-[#1eb4d4] mx-auto mb-4" />
                                            <h3 className="text-2xl font-bold text-[#001B44] uppercase tracking-wide mb-2">Inquiry Submitted!</h3>
                                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                                Thank you for reaching out to Enako Outreach. Our executive partnership team will review your request and get in touch within 24 hours.
                                            </p>
                                            <button
                                                onClick={() => { setIsSubmitted(false); setForm({ name: '', organization: '', email: '', message: '' }); }}
                                                className="px-8 py-3 bg-[#001B44] text-white font-bold text-xs uppercase tracking-widest rounded-[2px] hover:bg-[#1eb4d4] transition-all"
                                            >
                                                Submit Another Inquiry
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl border border-slate-200 shadow-xl space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-xs font-bold text-[#001B44] uppercase tracking-wider mb-2">
                                                        {t('partnership.inquiry.form.name_label', 'Your Name')} *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={form.name}
                                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#001B44] font-semibold focus:outline-none focus:border-[#1eb4d4] focus:bg-white transition-all"
                                                        placeholder={t('partnership.inquiry.form.name_placeholder', 'e.g. John Doe')}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-[#001B44] uppercase tracking-wider mb-2">
                                                        {t('partnership.inquiry.form.org_label', 'Organization Name')} *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={form.organization}
                                                        onChange={(e) => setForm({ ...form, organization: e.target.value })}
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#001B44] font-semibold focus:outline-none focus:border-[#1eb4d4] focus:bg-white transition-all"
                                                        placeholder={t('partnership.inquiry.form.org_placeholder', 'e.g. Global Corp / NGO')}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-[#001B44] uppercase tracking-wider mb-2">
                                                    {t('partnership.inquiry.form.email_label', 'Work Email Address')} *
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#001B44] font-semibold focus:outline-none focus:border-[#1eb4d4] focus:bg-white transition-all"
                                                    placeholder={t('partnership.inquiry.form.email_placeholder', 'e.g. john@organization.com')}
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold text-[#001B44] uppercase tracking-wider mb-2">
                                                    {t('partnership.inquiry.form.interest_label', 'Partnership Proposal / Scope')} *
                                                </label>
                                                <textarea
                                                    rows={4}
                                                    required
                                                    value={form.message}
                                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#001B44] font-semibold focus:outline-none focus:border-[#1eb4d4] focus:bg-white transition-all resize-none"
                                                    placeholder={t('partnership.inquiry.form.interest_placeholder', 'Briefly describe your partnership goals, timeline, or CSR vision...')}
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-4 bg-[#001B44] hover:bg-[#1eb4d4] text-white font-extrabold text-xs uppercase tracking-widest rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        <span>Submitting Inquiry...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4" />
                                                        <span>{t('partnership.inquiry.form.btn_submit', 'SUBMIT PARTNERSHIP INQUIRY')}</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </FadeIn>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Partnership;
