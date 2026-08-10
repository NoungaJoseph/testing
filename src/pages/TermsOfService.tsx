import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldAlert, Scale, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
                    <Scale className="w-4 h-4" />
                    <span>{t('terms.badge', 'Legal Agreement & User Terms')}</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black text-[#001B44] tracking-tight leading-tight"
                >
                    {t('terms.title', 'Terms of Service & Operational Rules')}
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-600 text-base md:text-lg mt-3 font-normal leading-relaxed"
                >
                    {t('terms.subtitle', 'Terms governing platform usage, donor contributions, scholarship application rules, financial management standards, and security obligations for all users.')}
                </motion.p>
                
                <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-500 border-b border-slate-200 pb-8">
                    <span><strong>{t('terms.effective_date', 'Effective Date:')}</strong> January 1, 2026</span>
                    <span><strong>{t('terms.revision', 'Revision:')}</strong> 3.1.0</span>
                    <span><strong>{t('terms.jurisdiction', 'Jurisdiction:')}</strong> International Non-Profit Standards</span>
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
                    {/* Notice Callout */}
                    <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-5 flex items-start gap-4 text-amber-900">
                        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600 shrink-0 mt-0.5">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div className="text-xs md:text-sm leading-relaxed">
                            {t('terms.notice')}
                        </div>
                    </div>

                    {/* SECTION 1: Agreement to Terms */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-8 h-8 rounded-full bg-[#001B44] text-white font-bold text-xs flex items-center justify-center">1</span>
                            <h2 className="text-2xl font-black text-[#001B44]">{t('terms.sec1_title', 'Acceptance of Terms & Operational Scope')}</h2>
                        </div>
                        <p>{t('terms.sec1_p1')}</p>
                    </section>

                    {/* SECTION 2: Financial Management & Donation Policy */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-8 h-8 rounded-full bg-[#001B44] text-white font-bold text-xs flex items-center justify-center">2</span>
                            <h2 className="text-2xl font-black text-[#001B44]">{t('terms.sec2_title', 'Donations, Fund Usage & Financial Rules')}</h2>
                        </div>
                        <p>{t('terms.sec2_p1')}</p>

                        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-6 space-y-3">
                            <h3 className="font-bold text-[#001B44] text-base flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-[#1eb4d4]" />
                                {t('terms.sec2_principles_title', 'Key Financial & Donation Principles:')}
                            </h3>
                            <ul className="space-y-2.5 text-sm text-slate-700">
                                <li className="flex items-start gap-2.5">
                                    <span className="font-bold text-[#1eb4d4] shrink-0">•</span>
                                    <span>{t('terms.sec2_item1')}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="font-bold text-[#1eb4d4] shrink-0">•</span>
                                    <span>{t('terms.sec2_item2')}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="font-bold text-[#1eb4d4] shrink-0">•</span>
                                    <span>{t('terms.sec2_item3')}</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="font-bold text-[#1eb4d4] shrink-0">•</span>
                                    <span>{t('terms.sec2_item4')}</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* SECTION 3: Hosted Programs & Beneficiary Conduct */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-8 h-8 rounded-full bg-[#001B44] text-white font-bold text-xs flex items-center justify-center">3</span>
                            <h2 className="text-2xl font-black text-[#001B44]">{t('terms.sec3_title', 'Hosted Outreach Programs & Application Rules')}</h2>
                        </div>
                        <p>{t('terms.sec3_p1')}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                            <div className="p-4 border border-slate-200 rounded-xl bg-white">
                                <h4 className="font-bold text-[#001B44] text-sm mb-1">{t('terms.sec3_item1_title')}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">{t('terms.sec3_item1_desc')}</p>
                            </div>

                            <div className="p-4 border border-slate-200 rounded-xl bg-white">
                                <h4 className="font-bold text-[#001B44] text-sm mb-1">{t('terms.sec3_item2_title')}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">{t('terms.sec3_item2_desc')}</p>
                            </div>

                            <div className="p-4 border border-slate-200 rounded-xl bg-white">
                                <h4 className="font-bold text-[#001B44] text-sm mb-1">{t('terms.sec3_item3_title')}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">{t('terms.sec3_item3_desc')}</p>
                            </div>

                            <div className="p-4 border border-slate-200 rounded-xl bg-white">
                                <h4 className="font-bold text-[#001B44] text-sm mb-1">{t('terms.sec3_item4_title')}</h4>
                                <p className="text-xs text-slate-600 leading-relaxed">{t('terms.sec3_item4_desc')}</p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: Cybersecurity & System Integrity */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-8 h-8 rounded-full bg-[#001B44] text-white font-bold text-xs flex items-center justify-center">4</span>
                            <h2 className="text-2xl font-black text-[#001B44]">{t('terms.sec4_title', 'Platform Security & Acceptable Use Policy')}</h2>
                        </div>
                        <p>{t('terms.sec4_p1')}</p>
                    </section>

                    {/* SECTION 5: Intellectual Property & Content Rights */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-8 h-8 rounded-full bg-[#001B44] text-white font-bold text-xs flex items-center justify-center">5</span>
                            <h2 className="text-2xl font-black text-[#001B44]">{t('terms.sec5_title', 'Intellectual Property & Media Releases')}</h2>
                        </div>
                        <p>{t('terms.sec5_p1')}</p>
                    </section>

                    {/* SECTION 6: Limitation of Liability & Governance */}
                    <section className="space-y-4">
                        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                            <span className="w-8 h-8 rounded-full bg-[#001B44] text-white font-bold text-xs flex items-center justify-center">6</span>
                            <h2 className="text-2xl font-black text-[#001B44]">{t('terms.sec6_title', 'Limitation of Liability & Amendments')}</h2>
                        </div>
                        <p>{t('terms.sec6_p1')}</p>
                        
                        <div className="bg-[#001B44] text-white rounded-xl p-6 mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                            <div>
                                <h4 className="font-bold text-lg text-white">{t('terms.questions_title', 'Questions about our Terms?')}</h4>
                                <p className="text-xs text-slate-300 mt-1">{t('terms.sec6_legal_contact')}</p>
                            </div>
                            <Link 
                                to="/contact" 
                                className="bg-[#1eb4d4] hover:bg-[#1593af] text-[#001B44] font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shrink-0 flex items-center gap-1.5"
                            >
                                {t('terms.sec6_contact_btn', 'Contact Legal Team')}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </section>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsOfService;
