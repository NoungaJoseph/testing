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
            }, 800);
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
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed bottom-3 left-3 right-3 max-w-7xl mx-auto z-50"
                >
                    <div className="bg-[#001B44] text-white rounded-lg p-5 md:p-6 shadow-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden">
                        {/* Gradient Accent Top Border */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1eb4d4] via-[#38bdf8] to-[#1eb4d4]" />

                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                            {/* Icon & Message */}
                            <div className="flex items-start gap-3.5 max-w-4xl">
                                <div className="p-2.5 bg-[#1eb4d4]/10 rounded-md text-[#1eb4d4] shrink-0 mt-0.5">
                                    <Cookie className="w-5 h-5 animate-pulse" />
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-base font-bold text-white tracking-tight">
                                            {t('cookies.title', 'We Value Your Privacy & Cookies')}
                                        </h3>
                                        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#1eb4d4] font-medium bg-[#1eb4d4]/10 px-2.5 py-0.5 rounded">
                                            <Shield className="w-3 h-3" />
                                            <span>{t('cookies.security_guarantee', '256-bit Encrypted')}</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                                        {t(
                                            'cookies.description', 
                                            'Enako Outreach uses essential cookies, analytical tracking, and secure local sessions to optimize website performance, measure program impact, and secure financial contributions.'
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons & Close */}
                            <div className="flex items-center gap-2.5 w-full lg:w-auto shrink-0 justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 lg:flex-none bg-[#1eb4d4] hover:bg-[#1593af] text-[#001B44] font-bold px-5 py-2.5 rounded-md text-xs transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
                                >
                                    <Check className="w-4 h-4" />
                                    {t('cookies.accept_all', 'Accept All Cookies')}
                                </button>

                                <button
                                    onClick={handleDecline}
                                    className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded-md text-xs transition-all text-center active:scale-95 whitespace-nowrap"
                                >
                                    {t('cookies.decline', 'Essential Only')}
                                </button>

                                <Link
                                    to="/privacy-policy"
                                    onClick={() => setIsVisible(false)}
                                    className="text-slate-300 hover:text-[#1eb4d4] font-medium px-3 py-2.5 text-xs text-center transition-colors underline underline-offset-2 flex items-center justify-center gap-1 whitespace-nowrap"
                                >
                                    <Lock className="w-3 h-3" />
                                    {t('cookies.privacy_policy', 'Privacy Policy')}
                                </Link>

                                <button 
                                    onClick={handleDecline}
                                    aria-label="Close cookie banner"
                                    className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5 ml-1"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
