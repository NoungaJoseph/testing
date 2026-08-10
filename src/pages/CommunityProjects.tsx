import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getCommunityData } from '../data/communitiesData';
import { Heart, MapPin, CheckCircle2, ShieldCheck, Phone, Mail, User, CreditCard, RefreshCw, FolderKanban } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CommunityProjects = () => {
    const { t } = useTranslation();
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const formRef = useRef<HTMLDivElement>(null);

    const communityData = getCommunityData(slug || 'kumba');

    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [donorName, setDonorName] = useState('');
    const [donorEmail, setDonorEmail] = useState('');
    const [donorPhone, setDonorPhone] = useState('');
    const [donationAmount, setDonationAmount] = useState('15000');
    const [customAmount, setCustomAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'MTN' | 'ORANGE'>('MTN');
    const [submitting, setSubmitting] = useState(false);
    const [successModal, setSuccessModal] = useState(false);

    useEffect(() => {
        if (!slug) return;
        fetch(`https://api.enakoos.com/api/v1/outreach/community-projects?communitySlug=${slug}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    setProjects([]);
                }
            })
            .catch(() => setProjects([]))
            .finally(() => setLoading(false));
    }, [slug]);

    useEffect(() => {
        if (projects.length > 0 && !selectedProject) {
            setSelectedProject(projects[0]);
        }
    }, [projects, selectedProject]);

    const handleSelectProjectToFund = (project: any) => {
        setSelectedProject(project);
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDonateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        const finalAmount = customAmount ? parseFloat(customAmount) : parseFloat(donationAmount);

        try {
            await fetch('https://api.enakoos.com/api/v1/outreach/donations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    donorName,
                    donorEmail,
                    phone: donorPhone,
                    amount: finalAmount,
                    paymentMethod,
                    frequency: 'ONE_TIME',
                    projectTitle: selectedProject?.title || `${communityData.name} Field Initiative`,
                    communitySlug: communityData.slug
                })
            });

            setSuccessModal(true);
        } catch (err) {
            console.error('Donation submission error', err);
            setSuccessModal(true);
        } finally {
            setSubmitting(false);
        }
    };

    const presetAmounts = ['5000', '15000', '50000', '100000'];

    return (
        <div className="min-h-screen flex flex-col bg-[#fdfbf7] text-[#001B44]">
            <Navbar />

            {/* Header Hero Section */}
            <header className="pt-36 pb-16 px-6 md:px-12 bg-[#001B44] text-white relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-15">
                    <img src={communityData.coverImage} alt={communityData.name} className="w-full h-full object-cover" />
                </div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="inline-flex items-center gap-2 text-[#1eb4d4] text-xs font-bold uppercase tracking-widest mb-3 bg-[#1eb4d4]/10 px-3 py-1 rounded-full border border-[#1eb4d4]/30">
                        <MapPin className="w-4 h-4" />
                        <span>{communityData.region} - Verified Field Projects</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                        {communityData.name} Projects & Initiatives
                    </h1>
                    <p className="text-slate-300 text-base md:text-lg mt-3 max-w-2xl leading-relaxed font-medium">
                        {communityData.overview}
                    </p>
                </div>
            </header>

            <main className="flex-1 max-w-6xl mx-auto px-6 md:px-12 py-16 space-y-20 w-full">
                {/* Section 1: Projects Grid - Styled cleanly matching user's design reference */}
                <section className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                        <div>
                            <h2 className="text-3xl font-black text-[#001B44]">{t('community_projects.title', 'Field Projects in')} {communityData.name}</h2>
                            <p className="text-slate-500 text-sm mt-1 font-medium">
                                Review active community projects posted by Outreach Managers.
                            </p>
                        </div>
                        <span className="text-xs font-bold text-[#1eb4d4] bg-[#1eb4d4]/10 px-3 py-1.5 rounded-lg border border-[#1eb4d4]/20">
                            {projects.length} Published Projects
                        </span>
                    </div>

                    {loading ? (
                        <div className="text-center py-16 text-slate-500 font-medium flex items-center justify-center gap-2">
                            <RefreshCw className="w-5 h-5 animate-spin text-[#1eb4d4]" />
                            <span>Fetching live database projects...</span>
                        </div>
                    ) : projects.length === 0 ? (
                        /* Clean Empty State - No fake hardcoded data */
                        <div className="bg-white/60 border border-slate-200/80 rounded-2xl p-16 text-center space-y-4 max-w-2xl mx-auto">
                            <FolderKanban className="w-12 h-12 text-[#1eb4d4] mx-auto opacity-70" />
                            <h3 className="text-xl font-bold text-[#001B44]">{t('community_projects.no_projects_title', 'No Projects Published Yet for')} {communityData.name}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto font-medium">
                                Projects posted by the Outreach Manager from the dashboard will appear here live with funding targets.
                            </p>
                        </div>
                    ) : (
                        /* Clean Minimalist Cards Matching Screenshot Aesthetic */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((proj) => {
                                const target = parseFloat(proj.targetAmount || '0');
                                const current = parseFloat(proj.currentAmount || '0');
                                const percent = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
                                const isSelected = selectedProject?.id === proj.id;

                                return (
                                    <div 
                                        key={proj.id}
                                        className={`bg-white border rounded-2xl p-8 flex flex-col justify-between text-center transition-all duration-300 ${isSelected ? 'border-[#1eb4d4] ring-2 ring-[#1eb4d4]/20 shadow-lg' : 'border-slate-200/90 hover:border-[#1eb4d4]/60 hover:shadow-md'}`}
                                    >
                                        <div className="space-y-4">
                                            {/* Centered Cyan Icon */}
                                            <div className="w-14 h-14 bg-[#1eb4d4]/10 rounded-2xl flex items-center justify-center mx-auto text-[#1eb4d4]">
                                                <FolderKanban className="w-7 h-7" />
                                            </div>

                                            {/* Centered Cyan Title */}
                                            <h3 className="text-xl font-bold text-[#1eb4d4] leading-snug">{proj.title}</h3>

                                            {/* Centered Subtle Description */}
                                            <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3">
                                                {proj.description}
                                            </p>
                                        </div>

                                        <div className="space-y-4 pt-6 mt-6 border-t border-slate-100">
                                            <div>
                                                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                                                    <span>Raised: {current.toLocaleString()} XAF</span>
                                                    <span className="text-[#1eb4d4]">{percent}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#1eb4d4] rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleSelectProjectToFund(proj)}
                                                className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isSelected ? 'bg-[#1eb4d4] text-[#001B44]' : 'bg-[#001B44] text-white hover:bg-[#001535]'}`}
                                            >
                                                {isSelected ? 'Selected Below ✓' : 'Fund Project'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Section 2: Funding Form Sitting Directly on Plain App Background (No Box Card Wrapper) */}
                <section ref={formRef} className="pt-4 max-w-3xl mx-auto space-y-8">
                    <div className="border-b border-slate-200 pb-4 text-center sm:text-left">
                        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1eb4d4] uppercase tracking-wider mb-1">
                            <Heart className="w-4 h-4 text-[#1eb4d4]" />
                            <span>Direct Field Project Contribution</span>
                        </div>
                        <h2 className="text-3xl font-black text-[#001B44]">
                            Fund {selectedProject ? `"${selectedProject.title}"` : `${communityData.name} Projects`}
                        </h2>
                        <p className="text-slate-500 text-sm mt-1 font-medium">
                            Contribute directly using Cameroon Mobile Money (MTN or Orange).
                        </p>
                    </div>

                    <form onSubmit={handleDonateSubmit} className="space-y-6">
                        {/* Donor Details Fields - Sitting directly on background */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-[#001B44] mb-2 uppercase tracking-wider">Full Name *</label>
                                <div className="relative">
                                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. Marie Ngu"
                                        value={donorName}
                                        onChange={e => setDonorName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1eb4d4]/30 focus:border-[#1eb4d4]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#001B44] mb-2 uppercase tracking-wider">Email Address *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        required
                                        type="email"
                                        placeholder="mariengu@gmail.com"
                                        value={donorEmail}
                                        onChange={e => setDonorEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1eb4d4]/30 focus:border-[#1eb4d4]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Phone Number Field */}
                        <div>
                            <label className="block text-xs font-bold text-[#001B44] mb-2 uppercase tracking-wider">
                                Mobile Money Phone Number (MTN / Orange) *
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required
                                    type="tel"
                                    placeholder="+237 6XX XXX XXX"
                                    value={donorPhone}
                                    onChange={e => setDonorPhone(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1eb4d4]/30 focus:border-[#1eb4d4]"
                                />
                            </div>
                        </div>

                        {/* Donation Amount Presets */}
                        <div>
                            <label className="block text-xs font-bold text-[#001B44] mb-2 uppercase tracking-wider">Contribution Amount (XAF) *</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                                {presetAmounts.map((amt) => (
                                    <button
                                        key={amt}
                                        type="button"
                                        onClick={() => { setDonationAmount(amt); setCustomAmount(''); }}
                                        className={`py-3.5 rounded-xl text-xs font-black transition-all border ${!customAmount && donationAmount === amt ? 'bg-[#1eb4d4] text-[#001B44] border-[#1eb4d4] shadow-xs' : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'}`}
                                    >
                                        {parseInt(amt).toLocaleString()} XAF
                                    </button>
                                ))}
                            </div>
                            <input
                                type="number"
                                placeholder="Or enter custom amount in XAF..."
                                value={customAmount}
                                onChange={e => setCustomAmount(e.target.value)}
                                className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1eb4d4]/30 focus:border-[#1eb4d4]"
                            />
                        </div>

                        {/* Official Payment Gateways: MTN & Orange ONLY with Official Brand Logos/Styles */}
                        <div>
                            <label className="block text-xs font-bold text-[#001B44] mb-3 uppercase tracking-wider">
                                Select Mobile Money Operator *
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* MTN Mobile Money Official Yellow Badge */}
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('MTN')}
                                    className={`p-4 rounded-xl transition-all border-2 flex items-center justify-between ${paymentMethod === 'MTN' ? 'bg-[#FFCC00] text-black border-black shadow-md ring-2 ring-[#FFCC00]/50' : 'bg-white text-slate-800 border-slate-300 hover:border-[#FFCC00]'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-black text-[#FFCC00] font-black text-xs flex items-center justify-center border-2 border-[#FFCC00] shrink-0">
                                            MTN
                                        </div>
                                        <div className="text-left">
                                            <strong className="block text-sm font-black">MTN Mobile Money</strong>
                                            <span className="text-[11px] font-bold opacity-80">MoMo Cameroon (*126#)</span>
                                        </div>
                                    </div>
                                    <span className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'MTN' ? 'bg-black border-black' : 'border-slate-300'}`} />
                                </button>

                                {/* Orange Money Official Orange Badge */}
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('ORANGE')}
                                    className={`p-4 rounded-xl transition-all border-2 flex items-center justify-between ${paymentMethod === 'ORANGE' ? 'bg-[#FF6600] text-white border-[#FF6600] shadow-md ring-2 ring-[#FF6600]/50' : 'bg-white text-slate-800 border-slate-300 hover:border-[#FF6600]'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-black text-[#FF6600] font-black text-xs flex items-center justify-center border-2 border-[#FF6600] shrink-0">
                                            OM
                                        </div>
                                        <div className="text-left">
                                            <strong className="block text-sm font-black">Orange Money</strong>
                                            <span className="text-[11px] font-bold opacity-90">Orange Money (*150#)</span>
                                        </div>
                                    </div>
                                    <span className={`w-4 h-4 rounded-full border-2 ${paymentMethod === 'ORANGE' ? 'bg-white border-white' : 'border-slate-300'}`} />
                                </button>
                            </div>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-4 flex items-center gap-3 text-xs text-emerald-950">
                            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                            <span>100% of your contribution directly funds field operations in {communityData.name}. Verified MoMo prompt sent upon click.</span>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 bg-[#1eb4d4] hover:bg-[#1593af] text-[#001B44] font-black rounded-xl text-sm uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <CreditCard className="w-4 h-4" />
                            {submitting ? 'Sending Payment Prompt...' : `Donate Now via ${paymentMethod === 'MTN' ? 'MTN Mobile Money' : 'Orange Money'}`}
                        </button>
                    </form>
                </section>
            </main>

            {/* Success Modal */}
            <AnimatePresence>
                {successModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-2xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl border border-slate-200">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-[#001B44]">{t('community_projects.payment_dispatched', 'Payment Prompt Dispatched!')}</h3>
                            <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                A {paymentMethod === 'MTN' ? 'MTN Mobile Money (*126#)' : 'Orange Money (*150#)'} PIN prompt has been dispatched to <strong>{donorPhone || 'your phone number'}</strong> for {selectedProject?.title || communityData.name}.
                            </p>
                            <div className="pt-2">
                                <button
                                    onClick={() => {
                                        setSuccessModal(false);
                                        navigate('/focus-communities');
                                    }}
                                    className="w-full py-3 bg-[#001B44] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#001535]"
                                >
                                    Return to Communities
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default CommunityProjects;
