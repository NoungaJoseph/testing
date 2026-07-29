import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackCookieConsent } from '../lib/analyticsTracker';

const CookieConsent: React.FC = () => {
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
                    className="fixed bottom-0 left-0 w-full bg-[#15202b] z-[9999] border-t border-slate-700 py-5 px-6 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] font-sans"
                >
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex-1 pr-0 md:pr-10 text-left">
                            <h3 className="text-white text-base sm:text-lg font-bold mb-1.5">
                                Did someone say ... cookies?
                            </h3>
                            <p className="text-[#8b98a5] text-[13px] sm:text-sm leading-relaxed">
                                Enako Outreach uses essential cookies, analytical tracking, and secure local sessions to optimize website performance, measure program impact, and secure financial contributions.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 w-full md:w-auto shrink-0 md:min-w-[320px]">
                            <button
                                onClick={handleAcceptAll}
                                className="w-full bg-white text-slate-900 font-bold py-2.5 px-6 rounded-full hover:bg-slate-200 transition-colors text-[15px]"
                            >
                                Accept all cookies
                            </button>
                            <button
                                onClick={handleDecline}
                                className="w-full bg-white text-slate-900 font-bold py-2.5 px-6 rounded-full hover:bg-slate-200 transition-colors text-[15px]"
                            >
                                Refuse non-essential cookies
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
