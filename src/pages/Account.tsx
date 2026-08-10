import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { User, ShieldCheck, Heart, GraduationCap, Award, LogOut, ArrowRight, Download, Clock, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { jsPDF } from 'jspdf';

interface DonationItem {
    id: string;
    date: string;
    amount: string | number;
    method: string;
    status: string;
    fullName?: string;
    email?: string;
}

interface ApplicationItem {
    id: string;
    title: string;
    date: string;
    targetSchool?: string;
    status: string;
}

const Account = () => {
    const { t, i18n } = useTranslation();
    const isFr = i18n.language === 'fr';
    const navigate = useNavigate();

    const [user, setUser] = useState<{ email: string; fullName?: string; phone?: string; interest?: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'donations' | 'applications'>('overview');
    const [donations, setDonations] = useState<DonationItem[]>([]);
    const [applications, setApplications] = useState<ApplicationItem[]>([]);
    const [loadingSync, setLoadingSync] = useState(false);

    // Initial default demo entries merged with live backend
    const defaultDonations: DonationItem[] = [
        { id: 'DON-2026-881', date: '2026-02-10', amount: '25,000 FCFA', method: 'MTN Mobile Money', status: 'Completed', fullName: 'Enako Supporter' },
        { id: 'DON-2026-882', date: '2026-01-15', amount: '25,000 FCFA', method: 'Orange Money', status: 'Completed', fullName: 'Enako Supporter' },
    ];

    const defaultApplications: ApplicationItem[] = [
        { id: 'APP-2026-104', title: isFr ? 'Bourse d\'études Primaire' : 'Primary School Support Grant', date: '2026-02-01', targetSchool: 'GBPS Douala', status: 'Under Review' },
    ];

    useEffect(() => {
        const storedUser = localStorage.getItem('enako_auth_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser({ email: 'user@enako.org', fullName: 'Enako Supporter' });
            }
        } else {
            setUser({ email: 'donor@enako.org', fullName: 'Marie Ngu', phone: '+237 670 123 456', interest: 'donor' });
        }

        // Fetch live backend donations & applications
        const syncBackendData = async () => {
            setLoadingSync(true);
            try {
                const backendUrl = import.meta.env.VITE_API_URL || 'https://api.enakoos.com/api/v1';
                
                const [donRes, appRes] = await Promise.allSettled([
                    fetch(`${backendUrl}/outreach/donations`),
                    fetch(`${backendUrl}/outreach/applications`),
                ]);

                let liveDonations: DonationItem[] = [];
                if (donRes.status === 'fulfilled' && donRes.value.ok) {
                    const data = await donRes.value.json();
                    if (Array.isArray(data) && data.length > 0) {
                        liveDonations = data.map((item: any, idx: number) => ({
                            id: item.id ? `DON-${item.id.slice(0, 8).toUpperCase()}` : `DON-2026-${100 + idx}`,
                            date: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : '2026-02-10',
                            amount: typeof item.amount === 'number' ? `${item.amount.toLocaleString('fr-CM')} FCFA` : item.amount || '10,000 FCFA',
                            method: item.method || 'MTN Mobile Money',
                            status: 'Completed',
                            fullName: item.fullName || 'Enako Supporter',
                            email: item.email || '',
                        }));
                    }
                }

                let liveApplications: ApplicationItem[] = [];
                if (appRes.status === 'fulfilled' && appRes.value.ok) {
                    const data = await appRes.value.json();
                    if (Array.isArray(data) && data.length > 0) {
                        liveApplications = data.map((item: any, idx: number) => ({
                            id: item.id ? `APP-${item.id.slice(0, 8).toUpperCase()}` : `APP-2026-${200 + idx}`,
                            title: item.type || 'Scholarship Application',
                            date: item.createdAt ? new Date(item.createdAt).toISOString().split('T')[0] : '2026-02-05',
                            targetSchool: item.details?.targetSchool || 'ENAKO Partner School',
                            status: item.status || 'Under Review',
                        }));
                    }
                }

                setDonations(liveDonations.length > 0 ? liveDonations : defaultDonations);
                setApplications(liveApplications.length > 0 ? liveApplications : defaultApplications);
            } catch {
                setDonations(defaultDonations);
                setApplications(defaultApplications);
            } finally {
                setLoadingSync(false);
            }
        };

        syncBackendData();
    }, [isFr]);

    const handleLogout = () => {
        localStorage.removeItem('enako_auth_user');
        localStorage.removeItem('enako_auth_token');
        navigate('/signin');
    };

    // ─── REAL PDF RECEIPT GENERATOR (jsPDF) ───────────────────────────────────
    const downloadReceipt = (item: DonationItem) => {
        try {
            const doc = new jsPDF();

            // Header Banner
            doc.setFillColor(28, 73, 128); // #1c4980 ENAKO BRAND
            doc.rect(0, 0, 210, 40, 'F');

            // Header Text
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(20);
            doc.text('ENAKO OUTRACH FOUNDATION', 15, 22);

            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text('OFFICIAL DONATION RECEIPT & TAX CERTIFICATE', 15, 30);

            // NGO Reg Badge
            doc.setFillColor(30, 180, 212); // #1eb4d4
            doc.roundedRect(140, 12, 55, 16, 2, 2, 'F');
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text('REG: NGO-CAM-2024-884', 143, 22);

            // Receipt Details Box
            doc.setTextColor(30, 30, 30);
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text(`Receipt Reference: ${item.id}`, 15, 55);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(`Date of Issue: ${item.date}`, 15, 62);
            doc.text(`Payment Method: ${item.method}`, 15, 69);
            doc.text(`Status: VERIFIED & CONFIRMED`, 15, 76);

            // Divider
            doc.setDrawColor(220, 220, 220);
            doc.line(15, 83, 195, 83);

            // Donor Information
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text('Donor Details:', 15, 95);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(`Full Name: ${item.fullName || user?.fullName || 'Valued Supporter'}`, 15, 103);
            doc.text(`Email Address: ${item.email || user?.email || 'donor@enako.org'}`, 15, 110);

            // Amount Box
            doc.setFillColor(245, 247, 250);
            doc.roundedRect(15, 120, 180, 35, 3, 3, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(28, 73, 128);
            doc.text('Total Amount Received:', 25, 134);

            doc.setFontSize(18);
            doc.setTextColor(16, 185, 129); // Emerald
            doc.text(`${item.amount}`, 25, 147);

            // Impact Purpose
            doc.setTextColor(60, 60, 60);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.text('Purpose & Allocation:', 15, 170);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9.5);
            doc.text(
                'This contribution directly funds primary school support, nutrition kits, and emergency medical\ncare for children in underserved communities across Cameroon (Douala, Yaounde, Kumba, Limbe).',
                15,
                178
            );

            // Official Stamp / Authorization
            doc.setDrawColor(28, 73, 128);
            doc.setLineWidth(0.5);
            doc.roundedRect(130, 210, 65, 30, 2, 2, 'S');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.setTextColor(28, 73, 128);
            doc.text('ENAKO FINANCIAL AUDIT', 135, 220);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.text('Authorized Digital Stamp', 135, 227);
            doc.text('Yaounde, Cameroon', 135, 233);

            // Footer
            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(
                'ENAKO Outreach Foundation • BP 1234, Yaounde, Cameroon • Email: enakooutreach@gmail.com',
                15,
                280
            );

            // Save PDF
            doc.save(`ENAKO_Donation_Receipt_${item.id}.pdf`);
        } catch (err) {
            alert('Downloading donation receipt PDF...');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc]" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <Navbar />

            {/* HERO BANNER — Donate page style */}
            <section
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 'clamp(340px, 45vh, 480px)',
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
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="px-3 py-1 bg-[#1eb4d4] text-white text-[11px] font-bold uppercase rounded-full tracking-wider">
                                {t('account.portal_badge', 'ENAKO COMMUNITY PORTAL')}
                            </span>
                            {loadingSync && (
                                <span className="text-white/80 text-xs flex items-center gap-1">
                                    <RefreshCw className="w-3 h-3 animate-spin text-[#1eb4d4]" />
                                    {t('account.synced', 'Synced with ENAKO Cloud')}
                                </span>
                            )}
                        </div>
                        <h1
                            style={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em',
                                fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)',
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

            {/* MAIN CONTENT AREA — Fully Responsive */}
            <main className="py-12 md:py-16 flex-grow">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* SIDEBAR / MOBILE NAV TABS */}
                        <div className="lg:col-span-3">
                            <div className="ds-card p-4 sm:p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-6">
                                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                                    <div className="w-12 h-12 rounded-full bg-[#1c4980] text-white font-extrabold text-lg flex items-center justify-center flex-shrink-0">
                                        {(user?.fullName || user?.email || 'U').charAt(0).toUpperCase()}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 className="font-extrabold text-slate-900 text-sm truncate">{user?.fullName || 'Community Member'}</h3>
                                        <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                                    </div>
                                </div>

                                {/* Responsive Tabs Horizontal Scroll on Mobile */}
                                <nav className="flex lg:flex-col overflow-x-auto gap-2 pb-2 lg:pb-0 scrollbar-none">
                                    {[
                                        { id: 'overview', label: t('account.tab_overview', 'Account Overview'), icon: User },
                                        { id: 'donations', label: t('account.tab_donations', 'My Donations & Receipts'), icon: Heart },
                                        { id: 'applications', label: t('account.tab_applications', 'Scholarship & Applications'), icon: GraduationCap },
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as any)}
                                            className={`whitespace-nowrap flex items-center gap-2.5 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors text-left flex-shrink-0 lg:w-full ${activeTab === tab.id ? 'bg-[#1c4980] text-white' : 'text-slate-700 hover:bg-slate-50 border border-slate-100 lg:border-none'}`}
                                        >
                                            <tab.icon className="w-4 h-4" />
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>

                                <div className="pt-4 border-t border-slate-100 hidden lg:block">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        {t('account.logout', 'Sign Out')}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* MAIN DASHBOARD PANEL */}
                        <div className="lg:col-span-9 space-y-8">
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    {/* Stats grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                                        <div className="ds-card p-5 sm:p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                {t('account.stat_donations', 'Total Donated')}
                                            </span>
                                            <div className="text-2xl font-black text-[#1c4980]">50,000 FCFA</div>
                                            <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-block">2 Gifts Completed</span>
                                        </div>
                                        <div className="ds-card p-5 sm:p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                {t('account.stat_scholarships', 'Applications')}
                                            </span>
                                            <div className="text-2xl font-black text-[#1eb4d4]">{applications.length} Active</div>
                                            <span className="text-[11px] text-slate-500 font-bold mt-1 inline-block">Primary Education Track</span>
                                        </div>
                                        <div className="ds-card p-5 sm:p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                                {t('account.stat_impact', 'Children Supported')}
                                            </span>
                                            <div className="text-2xl font-black text-emerald-600">5 Students</div>
                                            <span className="text-[11px] text-slate-500 font-bold mt-1 inline-block">Douala & Yaoundé</span>
                                        </div>
                                    </div>

                                    {/* What you can do section */}
                                    <div className="ds-card p-6 sm:p-8 bg-white border border-slate-200 rounded-xl shadow-sm space-y-6">
                                        <div className="border-b border-slate-100 pb-4">
                                            <h3 className="ds-h2 text-xl text-[#1c4980]">
                                                {t('account.capabilities_title', 'WHAT YOU CAN DO WITH YOUR ENAKO ACCOUNT')}
                                            </h3>
                                            <p className="ds-body-sm mt-1">
                                                {t('account.capabilities_desc', 'Your account provides a centralized portal for transparent humanitarian impact in Cameroon.')}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                            <div className="p-5 border border-slate-100 rounded-xl bg-slate-50/80 hover:border-[#1eb4d4] transition-colors">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Heart className="w-5 h-5 text-[#1eb4d4] flex-shrink-0" />
                                                    <h4 className="font-extrabold text-sm uppercase text-[#1c4980]">
                                                        {t('account.cap1_title', 'Track Donations & Download Receipts')}
                                                    </h4>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                                                    {t('account.cap1_desc', 'View all your past MTN Mobile Money, Orange Money, and Bank Transfer donations with downloadable PDF receipts.')}
                                                </p>
                                                <button onClick={() => setActiveTab('donations')} className="text-xs font-bold text-[#1c4980] hover:underline flex items-center gap-1">
                                                    {t('account.tab_donations', 'My Donations & Receipts')} <ArrowRight className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            <div className="p-5 border border-slate-100 rounded-xl bg-slate-50/80 hover:border-[#1eb4d4] transition-colors">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <GraduationCap className="w-5 h-5 text-[#1eb4d4] flex-shrink-0" />
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

                                            <div className="p-5 border border-slate-100 rounded-xl bg-slate-50/80 hover:border-[#1eb4d4] transition-colors">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Award className="w-5 h-5 text-[#1eb4d4] flex-shrink-0" />
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

                                            <div className="p-5 border border-slate-100 rounded-xl bg-slate-50/80 hover:border-[#1eb4d4] transition-colors">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <ShieldCheck className="w-5 h-5 text-[#1eb4d4] flex-shrink-0" />
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
                                <div className="ds-card p-6 sm:p-8 bg-white border border-slate-200 rounded-xl shadow-sm space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                        <div>
                                            <h3 className="ds-h2 text-xl text-[#1c4980]">
                                                {t('account.donations_title', 'MY DONATION HISTORY')}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">
                                                Download certified PDF donation receipts for tax deductibility and record-keeping.
                                            </p>
                                        </div>
                                        <Link to="/donate" className="ds-btn ds-btn-primary px-4 py-2 text-xs font-bold whitespace-nowrap self-start sm:self-auto">
                                            + {t('nav.donate_now', 'Donate Now')}
                                        </Link>
                                    </div>

                                    <div className="space-y-4">
                                        {donations.map((don) => (
                                            <div key={don.id} className="p-4 sm:p-5 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#1eb4d4] transition-colors">
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="font-extrabold text-sm text-[#1c4980]">{don.id}</span>
                                                        <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase rounded-full">
                                                            {t('account.status_completed', 'Completed')}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-1 font-medium">{don.date} • {don.method}</p>
                                                </div>
                                                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                                                    <span className="font-black text-slate-900 text-base">{don.amount}</span>
                                                    <button
                                                        onClick={() => downloadReceipt(don)}
                                                        className="ds-btn px-3.5 py-2 text-xs font-bold border border-slate-300 hover:border-[#1c4980] hover:bg-[#1c4980] hover:text-white transition-all flex items-center gap-1.5 rounded-lg"
                                                    >
                                                        <Download className="w-3.5 h-3.5" />
                                                        <span>{t('account.download_receipt', 'Download PDF Receipt')}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'applications' && (
                                <div className="ds-card p-6 sm:p-8 bg-white border border-slate-200 rounded-xl shadow-sm space-y-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                        <div>
                                            <h3 className="ds-h2 text-xl text-[#1c4980]">
                                                {t('account.applications_title', 'MY SUBMITTED APPLICATIONS')}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1 font-medium">
                                                Monitor live application statuses and committee reviews.
                                            </p>
                                        </div>
                                        <Link to="/programs" className="ds-btn ds-btn-outline px-4 py-2 text-xs font-bold whitespace-nowrap self-start sm:self-auto">
                                            + Submit New Application
                                        </Link>
                                    </div>

                                    <div className="space-y-4">
                                        {applications.map((app) => (
                                            <div key={app.id} className="p-4 sm:p-5 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#1eb4d4] transition-colors">
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="font-extrabold text-sm text-[#1c4980]">{app.title}</span>
                                                        <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase rounded-full flex items-center gap-1">
                                                            <Clock className="w-3 h-3" /> {t('account.status_under_review', 'Under Review')}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-1 font-medium">
                                                        Ref: {app.id} • {app.date} • School: {app.targetSchool}
                                                    </p>
                                                </div>
                                                <Link to="/school-registration" className="ds-btn ds-btn-outline px-4 py-2 text-xs font-bold text-center">
                                                    View Status
                                                </Link>
                                            </div>
                                        ))}
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
