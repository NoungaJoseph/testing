import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { User, ShieldCheck, Heart, GraduationCap, Award, LogOut, ArrowRight, Download, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Account = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [user, setUser] = useState<{ email: string; fullName?: string; phone?: string; interest?: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'donations' | 'applications' | 'settings'>('overview');

    useEffect(() => {
        const storedUser = localStorage.getItem('enako_auth_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser({ email: 'user@example.com', fullName: 'Enako Supporter' });
            }
        } else {
            // Demo default for preview
            setUser({ email: 'donor@enako.org', fullName: 'Marie Ngu', phone: '+237 670 123 456', interest: 'donor' });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('enako_auth_user');
        localStorage.removeItem('enako_auth_token');
        navigate('/signin');
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc]" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <Navbar />

            {/* HERO BANNER — Donate page style */}
            <section
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 'clamp(360px, 45vh, 480px)',
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
                            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('/assets/charity/our-mission.png')",
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
                    {t('account.title', 'My Account')}
                </div>

                {/* Heading */}
                <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 3.5rem', maxWidth: 960 }}>
                    <FadeIn direction="up">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-[#1eb4d4] text-white text-[11px] font-bold uppercase rounded-full tracking-wider">
                                {t('account.portal_badge', 'ENAKO COMMUNITY PORTAL')}
                            </span>
                        </div>
                        <h1
                            style={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em',
                                fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                                color: '#fff',
                                margin: 0,
                                lineHeight: 1.08,
                            }}
                        >
                            {t('account.welcome', 'WELCOME')}, <span className="text-[#1eb4d4]">{user?.fullName || 'SUPPORTER'}</span>
                        </h1>
                    </FadeIn>
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <main className="ds-section flex-grow">
                <div className="ds-container">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">

                        {/* SIDEBAR NAVIGATION */}
                        <div className="lg:col-span-3">
                            <div className="ds-card p-6 bg-white border border-slate-200 rounded-lg shadow-sm space-y-6">
                                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                                    <div className="w-12 h-12 rounded-full bg-[#1c4980] text-white font-extrabold text-lg flex items-center justify-center">
                                        {(user?.fullName || user?.email || 'U').charAt(0).toUpperCase()}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="font-extrabold text-slate-900 text-sm truncate">{user?.fullName || 'Community Member'}</h3>
                                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                    </div>
                                </div>

                                <nav className="space-y-1">
                                    {[
                                        { id: 'overview', label: t('account.tab_overview', 'Account Overview'), icon: User },
                                        { id: 'donations', label: t('account.tab_donations', 'My Donations & Receipts'), icon: Heart },
                                        { id: 'applications', label: t('account.tab_applications', 'Scholarship & Applications'), icon: GraduationCap },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-bold uppercase tracking-wider transition-colors text-left ${activeTab === tab.id ? 'bg-[#1c4980] text-white' : 'text-slate-700 hover:bg-slate-50'}`}
                                        >
                                            <tab.icon className="w-4 h-4" />
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>

                                <div className="pt-4 border-t border-slate-100">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        {t('account.logout', 'Sign Out')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* MAIN DASHBOARD CONTENT */}
                        <div className="lg:col-span-9">
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    {/* Stats grid */}
                                    <div className="grid sm:grid-cols-3 gap-6">
                                        <div className="ds-card p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                {t('account.stat_donations', 'Total Donated')}
                                            </span>
                                            <div className="text-2xl font-black text-[#1c4980]">50,000 FCFA</div>
                                            <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">2 Gifts Completed</span>
                                        </div>
                                        <div className="ds-card p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                {t('account.stat_scholarships', 'Applications')}
                                            </span>
                                            <div className="text-2xl font-black text-[#1eb4d4]">1 Active</div>
                                            <span className="text-[11px] text-slate-500 font-bold mt-1 inline-block">Primary Education Track</span>
                                        </div>
                                        <div className="ds-card p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                {t('account.stat_impact', 'Children Supported')}
                                            </span>
                                            <div className="text-2xl font-black text-emerald-600">5 Students</div>
                                            <span className="text-[11px] text-slate-500 font-bold mt-1 inline-block">Douala & Yaoundé</span>
                                        </div>
                                    </div>

                                    {/* What you can do section */}
                                    <div className="ds-card p-8 bg-white border border-slate-200 rounded-lg shadow-sm space-y-6">
                                        <div className="border-b border-slate-100 pb-4">
                                            <h3 className="ds-h2 text-xl text-[#1c4980]">
                                                {t('account.capabilities_title', 'WHAT YOU CAN DO WITH YOUR ENAKO ACCOUNT')}
                                            </h3>
                                            <p className="ds-body-sm mt-1">
                                                {t('account.capabilities_desc', 'Your account provides a centralized portal for transparent humanitarian impact in Cameroon.')}
                                            </p>
                                        </div>

                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="p-5 border border-slate-100 rounded-lg bg-slate-50 hover:border-[#1eb4d4] transition-colors">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Heart className="w-5 h-5 text-[#1eb4d4]" />
                                                    <h4 className="font-extrabold text-sm uppercase text-[#1c4980]">
                                                        {t('account.cap1_title', 'Track Donations & Download Receipts')}
                                                    </h4>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                                    {t('account.cap1_desc', 'View all your past MTN Mobile Money, Orange Money, and Bank Transfer donations with downloadable PDF receipts.')}
                                                </p>
                                                <Link to="/donate" className="text-xs font-bold text-[#1c4980] hover:underline flex items-center gap-1">
                                                    {t('nav.donate_now', 'Make a Donation')} <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>

                                            <div className="p-5 border border-slate-100 rounded-lg bg-slate-50 hover:border-[#1eb4d4] transition-colors">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <GraduationCap className="w-5 h-5 text-[#1eb4d4]" />
                                                    <h4 className="font-extrabold text-sm uppercase text-[#1c4980]">
                                                        {t('account.cap2_title', 'Submit & Track Scholarships')}
                                                    </h4>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                                    {t('account.cap2_desc', 'Submit scholarship applications for primary, secondary, or university students and monitor status live.')}
                                                </p>
                                                <Link to="/programs" className="text-xs font-bold text-[#1c4980] hover:underline flex items-center gap-1">
                                                    {t('nav.programs', 'View Programs')} <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>

                                            <div className="p-5 border border-slate-100 rounded-lg bg-slate-50 hover:border-[#1eb4d4] transition-colors">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Award className="w-5 h-5 text-[#1eb4d4]" />
                                                    <h4 className="font-extrabold text-sm uppercase text-[#1c4980]">
                                                        {t('account.cap3_title', 'Volunteer & Teacher Missions')}
                                                    </h4>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                                    {t('account.cap3_desc', 'Apply for field volunteer roles, community educator missions, or teacher rewards programs across focus communities.')}
                                                </p>
                                                <Link to="/volunteer" className="text-xs font-bold text-[#1c4980] hover:underline flex items-center gap-1">
                                                    {t('nav.get_involved', 'Get Involved')} <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>

                                            <div className="p-5 border border-slate-100 rounded-lg bg-slate-50 hover:border-[#1eb4d4] transition-colors">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <ShieldCheck className="w-5 h-5 text-[#1eb4d4]" />
                                                    <h4 className="font-extrabold text-sm uppercase text-[#1c4980]">
                                                        {t('account.cap4_title', 'Regional Project Updates')}
                                                    </h4>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                                    {t('account.cap4_desc', 'Receive direct field updates and photo reports from regional project managers in Douala, Yaoundé, and Kumba.')}
                                                </p>
                                                <Link to="/impact" className="text-xs font-bold text-[#1c4980] hover:underline flex items-center gap-1">
                                                    {t('nav.projects', 'View Projects')} <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'donations' && (
                                <div className="ds-card p-8 bg-white border border-slate-200 rounded-lg shadow-sm space-y-6">
                                    <h3 className="ds-h2 text-xl text-[#1c4980] mb-4">{t('account.donations_title', 'MY DONATION HISTORY')}</h3>
                                    <div className="space-y-4">
                                        {[
                                            { id: 'DON-2026-001', date: '2026-02-10', amount: '25,000 FCFA', method: 'MTN Mobile Money', status: 'Completed' },
                                            { id: 'DON-2026-002', date: '2026-01-15', amount: '25,000 FCFA', method: 'Orange Money', status: 'Completed' },
                                        ].map((don) => (
                                            <div key={don.id} className="p-4 border border-slate-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-extrabold text-sm text-[#1c4980]">{don.id}</span>
                                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">{don.status}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-1">{don.date} • {don.method}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="font-black text-slate-900 text-sm">{don.amount}</span>
                                                    <button onClick={() => alert(`Downloading official PDF receipt for ${don.id}`)} className="ds-btn px-3 py-1.5 text-[11px] border border-slate-300 hover:border-[#1c4980] flex items-center gap-1">
                                                        <Download className="w-3.5 h-3.5" /> Receipt
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'applications' && (
                                <div className="ds-card p-8 bg-white border border-slate-200 rounded-lg shadow-sm space-y-6">
                                    <h3 className="ds-h2 text-xl text-[#1c4980] mb-4">{t('account.applications_title', 'MY SUBMITTED APPLICATIONS')}</h3>
                                    <div className="p-4 border border-slate-200 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-extrabold text-sm text-[#1c4980]">Primary School Support Grant</span>
                                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded flex items-center gap-1">
                                                    <Clock className="w-3 h-3" /> Under Review
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-500 mt-1">Submitted on: 2026-02-01 • Target School: GBPS Douala</p>
                                        </div>
                                        <Link to="/school-registration" className="ds-btn ds-btn-outline px-4 py-2 text-xs">
                                            View Status
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Account;
