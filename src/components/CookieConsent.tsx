import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, Check, X, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackCookieConsent } from '../lib/analyticsTracker';

const CookieConsent: React.FC = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const consent = localStorage.getItem('enako_cookie_consent');
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('enako_cookie_consent', 'accepted');
        trackCookieConsent('accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('enako_cookie_consent', 'essential_only');
        trackCookieConsent('essential_only');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-0 left-0 right-0 p-3 md:p-4 max-w-7xl mx-auto z-[999] w-full"
                >
                    <div className="bg-[#001B44] text-white rounded-xl p-4 sm:p-6 shadow-2xl border border-white/15 backdrop-blur-2xl relative overflow-hidden">
                        {/* Gradient Top Border */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1eb4d4] via-[#38bdf8] to-[#1eb4d4]" />

                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                            {/* Icon & Details */}
                            <div className="flex items-start gap-3 max-w-4xl">
                                <div className="p-2.5 bg-[#1eb4d4]/10 rounded-lg text-[#1eb4d4] shrink-0 mt-0.5">
                                    <Cookie className="w-5 h-5 animate-pulse text-[#1eb4d4]" />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                                            {t('cookies.title', 'We Value Your Privacy & Cookies')}
                                        </h3>
                                        <div className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-[#1eb4d4] font-medium bg-[#1eb4d4]/10 px-2 py-0.5 rounded">
                                            <Shield className="w-3 h-3" />
                                            <span>{t('cookies.security_guarantee', '256-bit Encrypted')}</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-xs leading-relaxed font-medium">
                                        {t(
                                            'cookies.description', 
                                            'Enako Outreach uses essential cookies, analytical tracking, and secure local sessions to optimize website performance, measure program impact, and secure financial contributions.'
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Responsive Action Buttons (Stacks vertically on small mobile, row on desktop) */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/10">
                                <button
                                    onClick={handleAcceptAll}
                                    className="w-full sm:w-auto bg-[#1eb4d4] hover:bg-[#1593af] text-[#001B44] font-black px-5 py-3 rounded-lg text-xs transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
                                >
                                    <Check className="w-4 h-4" />
                                    <span>{t('cookies.accept_all', 'Accept All Cookies')}</span>
                                </button>

                                <button
                                    onClick={handleDecline}
                                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-lg text-xs transition-all text-center active:scale-95 whitespace-nowrap"
                                >
                                    {t('cookies.decline', 'Essential Only')}
                                </button>

                                <div className="flex items-center justify-between sm:justify-start gap-2 pt-1 sm:pt-0">
                                    <Link
                                        to="/privacy-policy"
                                        onClick={() => setIsVisible(false)}
                                        className="text-slate-300 hover:text-[#1eb4d4] font-medium px-2 py-1.5 text-xs transition-colors underline underline-offset-2 flex items-center gap-1 whitespace-nowrap"
                                    >
                                        <Lock className="w-3 h-3" />
                                        <span>{t('cookies.privacy_policy', 'Privacy Policy')}</span>
                                    </Link>

                                    <button 
                                        onClick={handleDecline}
                                        aria-label="Close cookie banner"
                                        className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
