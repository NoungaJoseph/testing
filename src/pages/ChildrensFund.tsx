import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { ShieldCheck, Heart, GraduationCap, Stethoscope, Mail, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ChildrensFund = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <Navbar />

            {/* HERO BANNER — Donate page style */}
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
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80')",
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
                    <Link to="/donate" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}>{t('nav.donate', 'Donate')}</Link>
                    <span style={{ margin: '0 0.4rem', fontSize: '0.6rem' }}>♦</span>
                    {t('childrens_fund.breadcrumb', "The ENAKO Children's Fund")}
                </div>

                {/* Heading */}
                <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 4rem', maxWidth: 960 }}>
                    <FadeIn direction="up">
                        <span className="text-[#1eb4d4] font-extrabold tracking-widest uppercase text-xs block mb-3">
                            {t('childrens_fund.hero_badge', 'PERMANENT ENDOWMENT FUND')}
                        </span>
                        <h1
                            style={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em',
                                fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                                color: '#fff',
                                margin: 0,
                                lineHeight: 1.08,
                            }}
                        >
                            THE ENAKO CHILDREN'S FUND
                        </h1>
                        <p className="text-slate-200 text-lg md:text-xl font-medium mt-4 max-w-2xl leading-relaxed">
                            {t('childrens_fund.hero_subtitle', 'Providing long-term financial security, emergency medical aid, and continuous educational protection for children across Cameroon.')}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <main className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-20">

                    {/* SECTION 1: ABOUT THE FUND */}
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-6">
                            <FadeIn direction="up">
                                <span className="ds-badge">{t('childrens_fund.sec1_badge', 'SUSTAINABLE IMPACT')}</span>
                                <h2 className="ds-h2 text-3xl md:text-4xl text-[#1c4980] mt-2 mb-4">
                                    {t('childrens_fund.sec1_title', 'BUILDING A LASTING SAFETY NET FOR CHILDREN')}
                                </h2>
                                <p className="ds-body leading-relaxed text-slate-700 text-base md:text-lg mb-4">
                                    {t('childrens_fund.sec1_p1', 'The ENAKO Children\'s Fund is an endowed reserve created to ensure that no child\'s education or well-being is suddenly halted due to family hardship, sudden loss, or economic crisis.')}
                                </p>
                                <p className="ds-body leading-relaxed text-slate-700 text-base mb-6">
                                    {t('childrens_fund.sec1_p2', 'Unlike one-time relief aid, contributions to the Children\'s Fund are invested carefully to generate ongoing, reliable resources for long-term scholarship guarantees, emergency medical intervention, and community orphan care.')}
                                </p>
                            </FadeIn>

                            <FadeIn direction="up" delay={0.1}>
                                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                                    <div className="ds-card p-5 border border-slate-200 bg-[#f8fafc]">
                                        <ShieldCheck className="w-6 h-6 text-[#1eb4d4] mb-2" />
                                        <h3 className="font-extrabold text-sm uppercase text-[#1c4980] mb-1">
                                            {t('childrens_fund.feat1_title', 'Guaranteed Continuity')}
                                        </h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            {t('childrens_fund.feat1_desc', 'Ensures students enrolled in our partner schools stay in class even during emergency hardship.')}
                                        </p>
                                    </div>
                                    <div className="ds-card p-5 border border-slate-200 bg-[#f8fafc]">
                                        <Heart className="w-6 h-6 text-[#1eb4d4] mb-2" />
                                        <h3 className="font-extrabold text-sm uppercase text-[#1c4980] mb-1">
                                            {t('childrens_fund.feat2_title', 'Rapid Emergency Aid')}
                                        </h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            {t('childrens_fund.feat2_desc', 'Provides immediate medical coverage and nutritional assistance when crises strike.')}
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        <div className="lg:col-span-5">
                            <FadeIn direction="up" delay={0.15}>
                                <div className="ds-card p-8 border-2 border-[#1c4980] bg-[#1c4980] text-white rounded-xl shadow-2xl">
                                    <h3 className="font-extrabold text-xl uppercase tracking-wider mb-3">
                                        {t('childrens_fund.card_title', 'THE FUND AT A GLANCE')}
                                    </h3>
                                    <div className="w-12 h-1 bg-[#1eb4d4] mb-6" />
                                    <ul className="space-y-4 text-sm font-medium">
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#1eb4d4] font-bold">✓</span>
                                            <span><strong>100% Transparency:</strong> Independently audited annual financial releases.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#1eb4d4] font-bold">✓</span>
                                            <span><strong>Direct Benefit:</strong> Funds directly pay for school tuition, books, healthcare, and nutrition.</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-[#1eb4d4] font-bold">✓</span>
                                            <span><strong>Legacy Giving:</strong> Accept bequests, institutional grants, and recurring gifts.</span>
                                        </li>
                                    </ul>

                                    <div className="mt-8 pt-6 border-t border-white/20">
                                        <p className="text-xs text-slate-200 mb-4">
                                            {t('childrens_fund.contact_prompt', 'For legacy gifts, bequests, or endowment inquiries, contact our fund team:')}
                                        </p>
                                        <a
                                            href="mailto:enakooutreach@gmail.com"
                                            className="inline-flex items-center gap-2 font-bold text-sm text-[#1eb4d4] hover:underline"
                                        >
                                            <Mail className="w-4 h-4" /> enakooutreach@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>

                    {/* SECTION 2: FUND PILLARS */}
                    <div className="space-y-10">
                        <div className="text-center max-w-3xl mx-auto">
                            <FadeIn direction="up">
                                <span className="ds-badge">{t('childrens_fund.pillars_badge', 'FUND PILLARS')}</span>
                                <h2 className="ds-h2 text-3xl md:text-4xl text-[#1c4980] mt-2">
                                    {t('childrens_fund.pillars_title', 'HOW THE FUND PROTECTS CHILDREN')}
                                </h2>
                            </FadeIn>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <FadeIn direction="up" delay={0.1}>
                                <div className="ds-card p-8 border border-slate-200 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 bg-blue-50 text-[#1c4980] rounded-lg flex items-center justify-center mb-6">
                                            <GraduationCap className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-extrabold text-lg text-[#1c4980] uppercase mb-3">
                                            {t('childrens_fund.pillar1_title', 'Educational Safety Nets')}
                                        </h3>
                                        <p className="ds-body-sm text-slate-600 leading-relaxed">
                                            {t('childrens_fund.pillar1_desc', 'Covers school fees, examination costs, uniforms, and learning kits for students facing severe family hardship.')}
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn direction="up" delay={0.2}>
                                <div className="ds-card p-8 border border-slate-200 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 bg-teal-50 text-[#1eb4d4] rounded-lg flex items-center justify-center mb-6">
                                            <Stethoscope className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-extrabold text-lg text-[#1c4980] uppercase mb-3">
                                            {t('childrens_fund.pillar2_title', 'Emergency Healthcare')}
                                        </h3>
                                        <p className="ds-body-sm text-slate-600 leading-relaxed">
                                            {t('childrens_fund.pillar2_desc', 'Finances urgent medical treatment, prescriptions, and mobile clinic referrals for vulnerable pupils in rural districts.')}
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn direction="up" delay={0.3}>
                                <div className="ds-card p-8 border border-slate-200 h-full flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 bg-indigo-50 text-[#1c4980] rounded-lg flex items-center justify-center mb-6">
                                            <Award className="w-6 h-6" />
                                        </div>
                                        <h3 className="font-extrabold text-lg text-[#1c4980] uppercase mb-3">
                                            {t('childrens_fund.pillar3_title', 'Community Recovery Grants')}
                                        </h3>
                                        <p className="ds-body-sm text-slate-600 leading-relaxed">
                                            {t('childrens_fund.pillar3_desc', 'Funds community learning centers, clean water boreholes, and teacher support during local crises.')}
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>

                    {/* SECTION 3: BOTTOM CTA */}
                    <div className="ds-card p-10 md:p-14 bg-slate-900 text-white rounded-2xl text-center space-y-6">
                        <FadeIn direction="up">
                            <h2 className="font-black text-2xl md:text-4xl text-white uppercase tracking-tight">
                                {t('childrens_fund.cta_title', 'SUPPORT THE ENAKO CHILDREN\'S FUND TODAY')}
                            </h2>
                            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto font-medium">
                                {t('childrens_fund.cta_desc', 'Your contribution strengthens our permanent endowment and ensures every child in Cameroon receives the protection and opportunity they deserve.')}
                            </p>
                            <div className="pt-4 flex flex-wrap gap-4 justify-center">
                                <Link to="/donate" className="ds-btn ds-btn-primary px-8 py-4 text-base">
                                    ♥ {t('nav.donate_now', 'DONATE NOW')}
                                </Link>
                                <a
                                    href="mailto:enakooutreach@gmail.com"
                                    className="ds-btn ds-btn-outline-white px-8 py-4 text-base flex items-center gap-2"
                                >
                                    <Mail className="w-4 h-4" /> enakooutreach@gmail.com
                                </a>
                            </div>
                        </FadeIn>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ChildrensFund;
