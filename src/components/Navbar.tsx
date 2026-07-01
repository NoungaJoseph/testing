import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, Menu, X, GraduationCap, Award, Users,
    Droplets, Stethoscope, HandHeart, Newspaper, BookOpen, Archive,
    Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

/* ─── Language Switcher state ─── */

/* ─── Nav structure ─── */
const navLinks = [
    { nameKey: 'nav.home', href: '/' },
    { nameKey: 'nav.about_us', href: '/about' },
    {
        nameKey: 'nav.programs',
        href: '/programs',
        dropdown: [
            {
                titleKey: 'nav.education',
                items: [
                    {
                        nameKey: 'nav.scholarships',
                        href: '/programs/scholarships',
                        icon: <GraduationCap className="w-8 h-8" />,
                        descKey: 'nav.scholarships_desc',
                        sub: [
                            { nameKey: 'nav.primary_support', href: '/programs/scholarships-primary' },
                            { nameKey: 'nav.secondary_support', href: '/programs/scholarships-secondary' },
                            { nameKey: 'nav.university_support', href: '/programs/scholarships-university' },
                            { nameKey: 'nav.school_registration', href: '/school-registration' },
                        ],
                    },
                    {
                        nameKey: 'nav.teacher_rewards',
                        href: '/programs/teacher-rewards',
                        icon: <Award className="w-8 h-8" />,
                        descKey: 'nav.teacher_rewards_desc',
                    },
                    {
                        nameKey: 'nav.youth_empowerment',
                        href: '/programs/youth-empowerment',
                        icon: <Users className="w-8 h-8" />,
                        descKey: 'nav.youth_empowerment_desc',
                    },
                ],
            },
            {
                titleKey: 'nav.community_health',
                items: [
                    {
                        nameKey: 'nav.clean_water',
                        href: '/programs/clean-water-initiative',
                        icon: <Droplets className="w-8 h-8" />,
                        descKey: 'nav.clean_water_desc',
                    },
                    {
                        nameKey: 'nav.health_support',
                        href: '/programs/community-health-support',
                        icon: <Stethoscope className="w-8 h-8" />,
                        descKey: 'nav.health_support_desc',
                    },
                    {
                        nameKey: 'nav.single_mothers',
                        href: '/programs/single-mothers-assistance',
                        icon: <HandHeart className="w-8 h-8" />,
                        descKey: 'nav.single_mothers_desc',
                    },
                ],
            },
        ],
    },
    { nameKey: 'nav.projects', href: '/impact' },
    { nameKey: 'nav.focus_communities', href: '/focus-communities' },
    {
        nameKey: 'nav.blog',
        href: '/blog',
        dropdown: [
            {
                titleKey: 'nav.articles',
                items: [
                    { nameKey: 'nav.latest_news', href: '/blog/latest-news', icon: <Newspaper className="w-8 h-8" />, descKey: 'nav.latest_news_desc' },
                    { nameKey: 'nav.blog_posts', href: '/blog/posts', icon: <BookOpen className="w-8 h-8" />, descKey: 'nav.blog_posts_desc' },
                    { nameKey: 'nav.archives', href: '/blog/archives', icon: <Archive className="w-8 h-8" />, descKey: 'nav.archives_desc' },
                ],
            },
        ],
    },
    { nameKey: 'nav.get_involved', href: '/get-involved' },
    { nameKey: 'nav.contact_us', href: '/contact' },
];



const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeSub, setActiveSub] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const lang = (i18n.language || 'en').split('-')[0].toUpperCase();
    const setLang = (l: string) => { i18n.changeLanguage(l.toLowerCase()); setLangDropdownOpen(false); };
    const location = useLocation();

    useEffect(() => {
        // Close menu when navigation occurs
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
        setActiveSub(null);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar when at the top
            if (currentScrollY < 100) {
                setIsVisible(true);
            } 
            // Hide navbar when scrolling down
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } 
            // Show navbar when scrolling up
            else if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navbarFontStyle = { fontFamily: '"Open Sans", sans-serif' };

    return (
        <>
            {/* ═══════════════════ FIXED HEADER WRAPPER ═══════════════════ */}
            <motion.div 
                className="fixed top-0 left-0 right-0 z-50 bg-white"
                animate={{ y: isVisible ? 0 : -200 }}
                transition={{ duration: 0.3 }}
            >
                {/* ── TOP INFO BAR (Search & Secondary Links) ── */}
                <div className="hidden lg:block border-b border-slate-100 py-4">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-8">
                        {/* Logo */}
                        <Link to="/" className="flex items-center flex-shrink-0 w-48 lg:w-64 -ml-4">
                            <img src="/assets/logo/enakooutreach.png" alt="Enako Outreach logo" className="h-12 md:h-14 2xl:h-16 w-auto object-contain scale-[3] origin-left" />
                        </Link>

                        {/* Search Bar */}
                        <div className="flex-1 max-w-lg flex items-center justify-center mx-auto">
                            <div className="flex w-full overflow-hidden border border-slate-300 rounded focus-within:border-[#1eb4d4] transition-colors shadow-sm">
                                <input 
                                    type="text" 
                                    placeholder="Enter Keywords..." 
                                    className="w-full px-4 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                />
                                <button className="bg-[#1eb4d4] text-white px-6 py-2.5 text-sm font-bold flex items-center gap-2 hover:bg-[#1593af] transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Top Right Links */}
                        <div className="flex items-center justify-end w-48 lg:w-64 gap-4 text-[#1eb4d4]">
                            <a href="#" className="hover:text-[#1c4980] transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-[#1c4980] transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-[#1c4980] transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-[#1c4980] transition-colors"><Linkedin className="w-5 h-5" /></a>
                            
                            {/* Language Dropdown (Small) */}
                            <div className="relative ml-2">
                                <button
                                    onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                                    className="flex items-center gap-1 hover:text-[#1c4980] transition-colors"
                                >
                                    {lang} <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                                <AnimatePresence>
                                    {langDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            className="absolute right-0 top-full mt-2 w-24 bg-white rounded-md shadow-lg border border-slate-100 overflow-hidden z-[100]"
                                        >
                                            {(['EN', 'FR'] as const).map((l) => (
                                                <button
                                                    key={l}
                                                    onClick={() => setLang(l)}
                                                    className={`w-full text-left px-4 py-2 text-[12px] font-bold transition-all ${lang === l ? 'bg-[#f0f9fa] text-[#1eb4d4]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                                                >
                                                    {l}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── MAIN NAVBAR ── */}
                <header className="bg-white shadow-sm" style={navbarFontStyle}>
                    <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between lg:justify-center gap-4 min-h-[64px] lg:min-h-0">
                        
                        {/* Mobile Logo & Language (hidden on lg) */}
                        <div className="lg:hidden flex items-center justify-between w-full">
                            <Link to="/" className="flex items-center gap-2 group flex-shrink-0 min-w-0">
                                <img src="/assets/logo/enakooutreach.png" alt="Enako Outreach logo" className="h-10 w-auto object-contain scale-[3] origin-left ml-4" />
                            </Link>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
                                    className="text-[#1eb4d4] font-bold text-xs"
                                >
                                    {lang}
                                </button>
                                <button
                                    className="flex items-center justify-center transition-all duration-300 active:scale-90 text-[#1c4980] w-9 h-9"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    aria-label="Toggle Menu"
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        {isMobileMenuOpen ? (
                                            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                                <X className="w-7 h-7" />
                                            </motion.div>
                                        ) : (
                                            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                                <Menu className="w-7 h-7" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center justify-center w-full">
                            {navLinks.map((link, index) => (
                                <div
                                    key={link.nameKey}
                                    className={`relative flex items-center justify-center flex-1 ${index !== navLinks.length - 1 ? 'border-r border-slate-100' : ''}`}
                                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.nameKey)}
                                    onMouseLeave={() => { setActiveDropdown(null); setActiveSub(null); }}
                                >
                                    <Link
                                        to={link.href}
                                        className={`w-full text-center text-[12px] 2xl:text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap py-4 ${location.pathname === link.href ||
                                                (link.dropdown && link.dropdown.some(d => d.items.some(i => i.href === location.pathname)))
                                                ? 'text-[#1c4980]'
                                                : 'text-slate-700 hover:text-[#1eb4d4]'
                                            }`}
                                    >
                                        {t(link.nameKey)}
                                        {link.dropdown && (
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 text-slate-400 ${activeDropdown === link.nameKey ? 'rotate-180 text-[#1eb4d4]' : ''}`} />
                                        )}
                                    </Link>

                                    {/* Mega Dropdown */}
                                    <AnimatePresence>
                                        {link.dropdown && activeDropdown === link.nameKey && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 min-w-[520px] z-50"
                                            >
                                                <div className="bg-white rounded-xl shadow-2xl shadow-black/15 border border-slate-200 overflow-hidden p-5">
                                                    <div className={`grid gap-6 ${link.dropdown.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                                        {link.dropdown.map((section) => (
                                                            <div key={section.titleKey} className="text-left">
                                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1eb4d4] border-b border-slate-100 pb-2 mb-3">
                                                                    {t(section.titleKey)}
                                                                </h4>
                                                                <div className="space-y-0.5">
                                                                    {section.items.map((sub) => (
                                                                        <div
                                                                            key={sub.nameKey}
                                                                            className="relative"
                                                                            onMouseEnter={() => 'sub' in sub && sub.sub && setActiveSub(sub.nameKey)}
                                                                            onMouseLeave={() => setActiveSub(null)}
                                                                        >
                                                                            <Link
                                                                                to={sub.href}
                                                                                className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#f0f9fa] transition-all"
                                                                            >
                                                                                <div className="flex-1 text-left">
                                                                                    <div className="flex items-center gap-1">
                                                                                        <span className="text-slate-800 font-semibold text-sm group-hover:text-[#1c4980]">{t(sub.nameKey)}</span>
                                                                                        {'sub' in sub && sub.sub && (
                                                                                            <ChevronDown className="w-3 h-3 text-slate-400 -rotate-90" />
                                                                                        )}
                                                                                    </div>
                                                                                    <div className="text-xs text-slate-500 mt-1">{t(sub.descKey as any)}</div>
                                                                                </div>
                                                                            </Link>
                                                                            {/* Sub-dropdown */}
                                                                            <AnimatePresence>
                                                                                {'sub' in sub && sub.sub && activeSub === sub.nameKey && (
                                                                                    <motion.div
                                                                                        initial={{ opacity: 0, x: 8 }}
                                                                                        animate={{ opacity: 1, x: 0 }}
                                                                                        exit={{ opacity: 0, x: 8 }}
                                                                                        transition={{ duration: 0.18 }}
                                                                                        className="absolute left-full top-0 ml-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden p-2 z-10"
                                                                                    >
                                                                                        {sub.sub.map((s) => (
                                                                                            <Link
                                                                                                key={s.nameKey}
                                                                                                to={s.href}
                                                                                                className="flex items-center gap-2 px-3 py-2.5 rounded hover:bg-[#f0f9fa] hover:text-[#1c4980] text-sm text-slate-700 font-medium transition-colors"
                                                                                            >
                                                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#1eb4d4] flex-shrink-0" />
                                                                                                {t(s.nameKey)}
                                                                                            </Link>
                                                                                        ))}
                                                                                    </motion.div>
                                                                                )}
                                                                            </AnimatePresence>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>
                    </div>
                </header>
            </motion.div>

            {/* ═══════════════════ MOBILE MENU ═══════════════════ */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.nav
                            key="panel"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                            className="fixed right-0 top-0 bottom-0 w-[88%] max-w-sm bg-white z-[60] flex flex-col shadow-2xl"
                            style={navbarFontStyle}
                        >
                            {/* Panel Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-transparent">
                                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2.5 min-w-0">
                                    <img src="/assets/logo/enakooutreach.png" alt="Enako Outreach logo" className="h-12 w-auto object-contain scale-[3] origin-left ml-4" />
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-9 h-9 flex items-center justify-center bg-transparent text-[#00C2C7]"
                                    aria-label="Close Menu"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Contact bar */}
                            <div className="flex items-center gap-4 px-6 py-3 bg-transparent border-b border-transparent text-sm text-slate-700 font-medium">
                                <a href="tel:+237 6 78 45 79 26" className="flex items-center gap-2">
                                    <img src="/assets/charity/contact us/phone.png" alt="phone" className="w-4 h-4 object-contain" />+237 6 78 45 79 26
                                </a>
                            </div>

                            {/* Nav Links */}
                            <div className="flex-1 overflow-y-auto px-4 py-4">
                                {navLinks.map((link) => (
                                    <div key={link.nameKey}>
                                        {link.dropdown ? (
                                            <div className="mb-1">
                                                <button
                                                    onClick={() => setActiveDropdown(activeDropdown === link.nameKey ? null : link.nameKey)}
                                                    className="w-full text-left text-slate-800 text-base font-semibold py-3 px-4 flex items-center justify-between rounded-xl hover:bg-green-50 transition-colors"
                                                >
                                                    {t(link.nameKey)}
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-slate-400 ${activeDropdown === link.nameKey ? 'rotate-180' : ''}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {activeDropdown === link.nameKey && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.22 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="mx-2 mb-2 bg-slate-50 rounded-xl p-3 space-y-3">
                                                                {link.dropdown.map((section) => (
                                                                    <div key={section.titleKey}>
                                                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600 mb-2">{t(section.titleKey)}</p>
                                                                        <div className="space-y-0.5">
                                                                            {section.items.map((sub) => (
                                                                                <div key={sub.nameKey}>
                                                                                    <Link
                                                                                        to={sub.href}
                                                                                        className="flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-white transition-colors"
                                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                                    >
                                                                                        <span className="text-slate-700 font-semibold text-sm">{t(sub.nameKey)}</span>
                                                                                    </Link>
                                                                                    {'sub' in sub && sub.sub && (
                                                                                        <div className="ml-10 space-y-0.5 mt-0.5">
                                                                                            {sub.sub.map((s) => (
                                                                                                <Link
                                                                                                    key={s.nameKey}
                                                                                                    to={s.href}
                                                                                                    className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-green-50 text-slate-500 text-xs font-medium transition-colors"
                                                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                                                >
                                                                                                    <span className="w-1 h-1 rounded-full bg-green-400" />
                                                                                                    {t(s.nameKey)}
                                                                                                </Link>
                                                                                            ))}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                to={link.href}
                                                className={`flex items-center justify-between py-3 px-4 rounded-xl mb-1 text-base font-semibold transition-colors ${location.pathname === link.href
                                                    ? 'text-green-600 bg-green-50'
                                                    : 'text-slate-800 hover:bg-slate-50'
                                                    }`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {t(link.nameKey)}
                                                <ChevronDown className="-rotate-90 w-4 h-4 text-slate-300" />
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Language + Donate CTA */}
                            <div className="p-5 border-t border-slate-100 space-y-3">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-xs text-slate-400 font-medium">{t('nav.language')}:</span>
                                    {(['EN', 'FR'] as const).map((l) => (
                                        <button
                                            key={l}
                                            onClick={() => setLang(l)}
                                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${lang === l ? 'bg-green-600 text-white border-green-600' : 'bg-white text-slate-600 border-slate-200 hover:border-green-400'}`}
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                                <Link
                                    to="/donate"
                                    className="flex items-center justify-center gap-2 w-full h-14 text-white font-bold text-base rounded-full shadow-lg transition-opacity hover:opacity-90"
                                    style={{ backgroundColor: '#00C2C7' }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t('nav.donate_now')}
                                </Link>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
