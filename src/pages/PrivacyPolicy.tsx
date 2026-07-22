import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Landmark, Award, Eye, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
            <Navbar />
            
            {/* Header Title Section - Plain text on page background */}
            <header className="pt-36 pb-10 px-6 md:px-12 max-w-4xl mx-auto w-full">
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 text-[#1eb4d4] text-xs font-bold uppercase tracking-wider mb-3"
                >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t('privacy.badge', 'Data Protection & Financial Governance')}</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black text-[#001B44] tracking-tight leading-tight"
                >
                    {t('privacy.title', 'Privacy Policy & Data Security')}
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-600 text-base md:text-lg mt-3 font-normal leading-relaxed"
                >
                    {t('privacy.subtitle', 'Comprehensive guidelines detailing how Enako Outreach handles user data, protects financial contributions, manages public community programs, and enforces strict security protocols.')}
                </motion.p>
                
                <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-b border-slate-200 pb-8">
                    <span><strong>{t('privacy.effective_date', 'Effective Date:')}</strong> January 1, 2026</span>
                    <span><strong>{t('privacy.last_updated', 'Last Updated:')}</strong> July 22, 2026</span>
                    <span><strong>{t('privacy.version', 'Governance Version:')}</strong> 4.2.0</span>
                </div>
            </header>

            {/* Main Content - Directly on page background */}
            <main className="flex-1 pb-20 px-6 md:px-12 max-w-4xl mx-auto w-full">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-12 text-slate-700 leading-relaxed"
                >
                    {/* Summary Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-xs">
                            <div className="w-10 h-10 bg-[#1eb4d4]/10 rounded-lg flex items-center justify-center text-[#1eb4d4] mb-3">
                                <Landmark className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-[#001B44] text-sm mb-1">{t('privacy.card_financial_title', 'Financial Integrity')}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {t('privacy.card_financial_desc', 'Every dollar contributed is tracked and audited across our educational and community programs.')}
                            </p>
                        </div>

                        <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-xs">
                            <div className="w-10 h-10 bg-[#1eb4d4]/10 rounded-lg flex items-center justify-center text-[#1eb4d4] mb-3">
                                <Award className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-[#001B44] text-sm mb-1">{t('privacy.card_impact_title', 'Verified Impact')}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {t('privacy.card_impact_desc', 'Field programs undergo continuous monitoring with transparent beneficiary reports.')}
                            </p>
                        </div>

                        <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-xs">
                            <div className="w-10 h-10 bg-[#1eb4d4]/10 rounded-lg flex items-center justify-center text-[#1eb4d4] mb-3">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-[#001B44] text-sm mb-1">{t('privacy.card_security_title', 'Bank-Grade Security')}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                {t('privacy.card_security_desc', '256-bit encryption safeguards donor identities, payment tokens, and personal credentials.')}
                            </p>
                        </div>
                    </div>

                    {/* SECTION 1: Introduction */}
                    <section className="space-y-4 pt-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-8 h-8 rounded-full bg-[#001B44] text-white font-bold text-xs flex items-center justify-center">1</span>
                            <h2 className="text-2xl font-black text-[#001B44]">{t('privacy.sec1_title', 'Scope & Organizational Commitment')}</h2>
                        </div>
                        <p>{t('privacy.sec1_p1')}</p>
                        <p>{t('privacy.sec1_p2')}</p>
                    </section>

                    {/* SECTION 2: How We Use Collected Money */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-8 h-8 rounded-full bg-[#001B44] text-white font-bold text-xs flex items-center justify-center">2</span>
                            <h2 className="text-2xl font-black text-[#001B44]">{t('privacy.sec2_title', 'Allocation & Management of Collected Monies')}</h2>
                        </div>
                        <p>{t('privacy.sec2_p1')}</p>
                        
                        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-6 space-y-3">
                            <h3 className="font-bold text-emerald-950 text-base flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                {t('privacy.sec2_breakdown_title', 'Fund Distribution & Financial Breakdown')}
                            </h3>
                            <ul className="space-y-2.5 text-sm text-emerald-950">
                                <li className="flex items-start gap-2.5">
                                    <span className="font-bold text-emerald-700 shrink-0">•</span>
                                    <span>{t('privacy.sec2_item1')}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="font-bold text-emerald-700 shrink-0">•</span>
                                    <span>{t('privacy.sec2_item2')}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="font-bold text-emerald-700 shrink-0">•</span>
                                    <span>{t('privacy.sec2_item3')}</span>
                                </li>
                            </ul>
                        </div>

                        <p>{t('privacy.sec2_p2')}</p>
                    </section>

                    {/* SECTION 3: Programs We Host */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-8 h-8 rounded-full bg-[#001B44] text-white font-bold text-xs flex items-center justify-center">3</span>
                            <h2 className="text-2xl font-black text-[#001B44]">{t('privacy.sec3_title', 'Hosted Outreach Programs & Operations')}</h2>
                        </div>
                        <p>{t('privacy.sec3_p1')}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                            <div className="p-4 border border-slate-200 rounded-xl bg-white">
                                <h4 className="font-bold text-[#001B44] text-sm mb-1.5">{t('privacy.sec3_prog1_title')}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">{t('privacy.sec3_prog1_desc')}</p>
                            </div>
                            
                            <div className="p-4 border border-slate-200 rounded-xl bg-white">
                                <h4 className="font-bold text-[#001B44] text-sm mb-1.5">{t('privacy.sec3_prog2_title')}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">{t('privacy.sec3_prog2_desc')}</p>
                            </div>

                            <div className="p-4 border border-slate-200 rounded-xl bg-white">
                                <h4 className="font-bold text-[#001B44] text-sm mb-1.5">{t('privacy.sec3_prog3_title')}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">{t('privacy.sec3_prog3_desc')}</p>
                            </div>

                            <div className="p-4 border border-slate-200 rounded-xl bg-white">
                                <h4 className="font-bold text-[#001B44] text-sm mb-1.5">{t('privacy.sec3_prog4_title')}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">{t('privacy.sec3_prog4_desc')}</p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: Data Security & System Management */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-8 h-8 rounded-full bg-[#001B44] text-white font-bold text-xs flex items-center justify-center">4</span>
                            <h2 className="text-2xl font-black text-[#001B44]">{t('privacy.sec4_title', 'Security Protocols & Data Management')}</h2>
                        </div>
                        <p>{t('privacy.sec4_p1')}</p>

                        <ul className="space-y-3 text-slate-700 text-sm">
                            <li className="flex items-start gap-3">
                                <div className="p-1 bg-[#1eb4d4]/10 rounded text-[#1eb4d4] shrink-0 mt-0.5"><Lock className="w-4 h-4" /></div>
                                <span>{t('privacy.sec4_item1')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="p-1 bg-[#1eb4d4]/10 rounded text-[#1eb4d4] shrink-0 mt-0.5"><ShieldCheck className="w-4 h-4" /></div>
                                <span>{t('privacy.sec4_item2')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="p-1 bg-[#1eb4d4]/10 rounded text-[#1eb4d4] shrink-0 mt-0.5"><Eye className="w-4 h-4" /></div>
                                <span>{t('privacy.sec4_item3')}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="p-1 bg-[#1eb4d4]/10 rounded text-[#1eb4d4] shrink-0 mt-0.5"><FileText className="w-4 h-4" /></div>
                                <span>{t('privacy.sec4_item4')}</span>
                            </li>
                        </ul>
                    </section>

                    {/* SECTION 5: Cookies Policy */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-8 h-8 rounded-full bg-[#001B44] text-white font-bold text-xs flex items-center justify-center">5</span>
                            <h2 className="text-2xl font-black text-[#001B44]">{t('privacy.sec5_title', 'Cookies & User Preference Control')}</h2>
                        </div>
                        <p>{t('privacy.sec5_p1')}</p>
                        <p>{t('privacy.sec5_p2')}</p>
                    </section>

                    {/* SECTION 6: User Rights & Contact */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-8 h-8 rounded-full bg-[#001B44] text-white font-bold text-xs flex items-center justify-center">6</span>
                            <h2 className="text-2xl font-black text-[#001B44]">{t('privacy.sec6_title', 'Your Data Rights & Contact Information')}</h2>
                        </div>
                        <p>{t('privacy.sec6_p1')}</p>
                        
                        <div className="bg-[#001B44] text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h4 className="font-bold text-lg text-white">{t('privacy.sec6_desk_title', 'Data Protection & Privacy Desk')}</h4>
                                <p className="text-xs text-slate-300 mt-1">Email: enakooutreach@gmail.com | Phone: +237 (678) 457-926</p>
                                <p className="text-xs text-slate-400">Enako Global Foundation Headquarters, Douala Office</p>
                            </div>
                            <Link 
                                to="/contact" 
                                className="bg-[#1eb4d4] hover:bg-[#1593af] text-[#001B44] font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shrink-0 flex items-center gap-1"
                            >
                                {t('privacy.sec6_contact_btn', 'Contact Governance Desk')}
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </section>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
