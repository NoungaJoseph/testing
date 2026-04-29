import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown, Menu, X, GraduationCap, Award, Users,
    Droplets, Stethoscope, HandHeart, Newspaper, BookOpen, Archive
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/* ─── Language Switcher state ─── */

/* ─── Nav structure ─── */
const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    {
        name: 'Programs',
        href: '/programs',
        dropdown: [
            {
                title: 'Education',
                items: [
                    {
                        name: 'Scholarships',
                        href: '/programs/scholarships',
                        icon: <GraduationCap className="w-8 h-8" />,
                        desc: 'Primary, Secondary & University',
                        sub: [
                            { name: 'Primary School Support', href: '/programs/scholarships-primary' },
                            { name: 'Secondary School Support', href: '/programs/scholarships-secondary' },
                            { name: 'University Support', href: '/programs/scholarships-university' },
                            { name: 'School Partnership Registration', href: '/school-registration' },
                        ],
                    },
                    {
                        name: 'Teacher Rewards',
                        href: '/programs/teacher-rewards',
                        icon: <Award className="w-8 h-8" />,
                        desc: 'Honouring dedicated educators',
                    },
                    {
                        name: 'Youth Empowerment',
                        href: '/programs/youth-empowerment',
                        icon: <Users className="w-8 h-8" />,
                        desc: 'Skills & leadership for youth',
                    },
                ],
            },
            {
                title: 'Community & Health',
                items: [
                    {
                        name: 'Clean Water Initiative',
                        href: '/programs/clean-water-initiative',
                        icon: <Droplets className="w-8 h-8" />,
                        desc: 'Safe water for every family',
                    },
                    {
                        name: 'Community Health Support',
                        href: '/programs/community-health-support',
                        icon: <Stethoscope className="w-8 h-8" />,
                        desc: 'Healthcare & medical outreach',
                    },
                    {
                        name: 'Single Mothers Assistance',
                        href: '/programs/single-mothers-assistance',
                        icon: <HandHeart className="w-8 h-8" />,
                        desc: 'Support for women & families',
                    },
                ],
            },
        ],
    },
    { name: 'Projects', href: '/impact' },
    { name: 'Focus Communities', href: '/focus-communities' },
    {
        name: 'Blog',
        href: '/blog',
        dropdown: [
            {
                title: 'Articles',
                items: [
                    { name: 'Latest News', href: '/blog/latest-news', icon: <Newspaper className="w-8 h-8" />, desc: 'Breaking stories & updates' },
                    { name: 'Blog Posts', href: '/blog/posts', icon: <BookOpen className="w-8 h-8" />, desc: 'Insights & community stories' },
                    { name: 'Archives', href: '/blog/archives', icon: <Archive className="w-8 h-8" />, desc: 'Past articles & resources' },
                ],
            },
        ],
    },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Contact Us', href: '/contact' },
];

const socialLinks = [
    { icon: <img src="/assets/charity/social/facebook.png" alt="Facebook" className="w-7 h-7 object-contain" />, href: '#', label: 'Facebook' },
    { icon: <img src="/assets/charity/social/twitter.png" alt="Twitter" className="w-7 h-7 object-contain" />, href: '#', label: 'Twitter' },
    { icon: <img src="/assets/charity/social/instagram.png" alt="Instagram" className="w-7 h-7 object-contain" />, href: '#', label: 'Instagram' },
    { icon: <img src="/assets/charity/social/Youtube.png" alt="YouTube" className="w-7 h-7 object-contain" />, href: '#', label: 'YouTube' },
];

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [activeSub, setActiveSub] = useState<string | null>(null);
    const { lang, setLang } = useLanguage();
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

    const navbarFontStyle = { fontFamily: '"Playfair Display", Georgia, serif' };

    return (
        <>
            {/* ═══════════════════ FIXED HEADER WRAPPER ═══════════════════ */}
            <div className="fixed top-0 left-0 right-0 z-50 shadow-xl shadow-black/10">

                {/* ── TOP INFO BAR ── */}
                <div className="hidden md:block bg-[#FDFBF7] text-[#001F5B] border-b border-slate-200/60 py-2.5">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                        {/* Left: Contact */}
                        <div className="flex items-center gap-8 text-[13px] font-bold tracking-wide">
                            <a href="tel:+237670671249" className="flex items-center gap-2.5 hover:text-[#00C2C7] transition-all group">
                                <img src="/assets/charity/contact us/phone.png" alt="phone" className="w-3.5 h-3.5 object-contain group-hover:scale-110 transition-transform" />
                                <span className="hidden sm:inline">+237 6 70 67 12 49</span>
                            </a>
                            <a href="mailto:enakooutreach@gmail.com" className="flex items-center gap-2.5 hover:text-[#00C2C7] transition-all group">
                                <img src="/assets/charity/contact us/email.png" alt="email" className="w-3.5 h-3.5 object-contain group-hover:scale-110 transition-transform" />
                                <span className="hidden md:inline">enakooutreach@gmail.com</span>
                            </a>
                        </div>

                        {/* Right: Socials + Language */}
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-6 mr-2">
                                {socialLinks.map((s) => (
                                    <a key={s.label} href={s.href} aria-label={s.label} className="inline-flex items-center hover:scale-110 transition-transform">
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                            {/* Language Switcher */}
                            <div className="flex items-center gap-0.5 bg-transparent p-0">
                                {(['EN', 'FR'] as const).map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLang(l)}
                                        className={`px-3 py-1 text-[13px] font-black transition-all ${lang === l ? 'text-[#00C2C7]' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── MAIN NAVBAR ── */}
                <header className="bg-white/98 backdrop-blur-xl border-b border-slate-100 py-0" style={navbarFontStyle}>
                    <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-3 md:gap-4" style={{ minHeight: '72px' }}>

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group flex-shrink min-w-0">
                            <img src="/assets/logo/enako.png" alt="Enako Outreach logo" className="h-11 sm:h-14 md:h-[72px] w-auto object-contain group-hover:scale-105 transition-all duration-500" />
                            <div className="flex flex-col justify-center leading-none pt-1 min-w-0">
                                <p className="font-black text-[11px] sm:text-xs md:text-base uppercase tracking-[0.03em] sm:tracking-[0.05em] md:tracking-[0.07em] text-[#001F5B] whitespace-nowrap">ENAKO OUTREACH</p>
                                <p className="text-[#00C2C7] text-[7px] sm:text-[8px] md:text-[9px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.22em] mt-1 whitespace-nowrap">Community Impact</p>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden xl:flex items-center gap-4 ml-6">
                            {navLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                                    onMouseLeave={() => { setActiveDropdown(null); setActiveSub(null); }}
                                >
                                    <Link
                                        to={link.href}
                                        className={`text-[14px] font-semibold transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap px-2 py-1 rounded-md ${location.pathname === link.href ||
                                                (link.dropdown && link.dropdown.some(d => d.items.some(i => i.href === location.pathname)))
                                                ? 'text-[#00C2C7] bg-[#001F5B]/6'
                                                : 'text-[#001F5B] hover:text-[#00C2C7]'
                                            }`}
                                    >
                                        {link.name}
                                        {link.dropdown && (
                                            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                                        )}
                                    </Link>

                                    {/* Mega Dropdown */}
                                    <AnimatePresence>
                                        {link.dropdown && activeDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                                                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                                className="absolute top-full left-0 pt-3 min-w-[520px]"
                                            >
                                                <div className="bg-white rounded-2xl shadow-2xl shadow-black/15 border border-slate-100 overflow-hidden p-5">
                                                    <div className={`grid gap-6 ${link.dropdown.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                                        {link.dropdown.map((section) => (
                                                            <div key={section.title}>
                                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600 border-b border-slate-100 pb-2 mb-3">
                                                                    {section.title}
                                                                </h4>
                                                                <div className="space-y-0.5">
                                                                    {section.items.map((sub) => (
                                                                        <div
                                                                            key={sub.name}
                                                                            className="relative"
                                                                            onMouseEnter={() => 'sub' in sub && sub.sub && setActiveSub(sub.name)}
                                                                            onMouseLeave={() => setActiveSub(null)}
                                                                        >
                                                                            <Link
                                                                                to={sub.href}
                                                                                className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-green-50 transition-all"
                                                                            >
                                                                                <div className="flex-1">
                                                                                    <div className="flex items-center gap-1">
                                                                                        <span className="text-slate-800 font-semibold text-sm group-hover:text-green-700">{sub.name}</span>
                                                                                        {'sub' in sub && sub.sub && (
                                                                                            <ChevronDown className="w-3 h-3 text-slate-400 -rotate-90" />
                                                                                        )}
                                                                                    </div>
                                                                                    <div className="text-xs text-slate-400">{sub.desc}</div>
                                                                                </div>
                                                                            </Link>
                                                                            {/* Sub-dropdown */}
                                                                            <AnimatePresence>
                                                                                {'sub' in sub && sub.sub && activeSub === sub.name && (
                                                                                    <motion.div
                                                                                        initial={{ opacity: 0, x: 8 }}
                                                                                        animate={{ opacity: 1, x: 0 }}
                                                                                        exit={{ opacity: 0, x: 8 }}
                                                                                        transition={{ duration: 0.18 }}
                                                                                        className="absolute left-full top-0 ml-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden p-2 z-10"
                                                                                    >
                                                                                        {sub.sub.map((s) => (
                                                                                            <Link
                                                                                                key={s.name}
                                                                                                to={s.href}
                                                                                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-green-50 hover:text-green-700 text-sm text-slate-700 font-medium transition-colors"
                                                                                            >
                                                                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                                                                                                {s.name}
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

                        {/* Right: Donate + Hamburger */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex xl:hidden items-center gap-2 flex-shrink-0">
                                <Link to="/contact" className="px-4 py-2 text-xs font-bold text-[#001F5B] border border-slate-200 rounded-full hover:border-[#00BFA5] hover:text-[#00BFA5] transition-colors whitespace-nowrap">
                                    Contact Us
                                </Link>
                                <Link to="/donate" className="px-4 py-2 text-xs font-bold text-white rounded-full shadow-md hover:shadow-lg transition-all whitespace-nowrap" style={{ backgroundColor: '#00C2C7' }}>
                                    Donate
                                </Link>
                            </div>
                            <Link
                                to="/donate"
                                className="hidden xl:inline-flex items-center gap-2 px-7 py-3 font-bold text-sm tracking-wide transition-all duration-300 text-white rounded-full hover:opacity-90 whitespace-nowrap flex-shrink-0"
                                style={{ backgroundColor: '#00C2C7' }}
                            >
                                Donate Now
                            </Link>

                            <button
                                className="xl:hidden flex items-center justify-center transition-all duration-300 active:scale-90 text-slate-700 bg-transparent w-9 h-9"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle Menu"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {isMobileMenuOpen ? (
                                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <X className="w-5 h-5" />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <Menu className="w-5 h-5" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </header>
            </div>

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
                                    <img src="/assets/logo/enako.png" alt="Enako Outreach logo" className="h-12 w-auto object-contain" />
                                    <div className="leading-none pt-1 min-w-0">
                                        <p className="font-black text-sm uppercase tracking-[0.05em] text-slate-900 truncate">ENAKO OUTREACH</p>
                                        <p className="text-[#00C2C7] text-[9px] font-semibold uppercase tracking-[0.16em] mt-1">Community Impact</p>
                                    </div>
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
                                <a href="tel:+237670671249" className="flex items-center gap-2">
                                    <img src="/assets/charity/contact us/phone.png" alt="phone" className="w-4 h-4 object-contain" />+237 6 70 67 12 49
                                </a>
                            </div>

                            {/* Nav Links */}
                            <div className="flex-1 overflow-y-auto px-4 py-4">
                                {navLinks.map((link) => (
                                    <div key={link.name}>
                                        {link.dropdown ? (
                                            <div className="mb-1">
                                                <button
                                                    onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                                                    className="w-full text-left text-slate-800 text-base font-semibold py-3 px-4 flex items-center justify-between rounded-xl hover:bg-green-50 transition-colors"
                                                >
                                                    {link.name}
                                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 text-slate-400 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                                                </button>
                                                <AnimatePresence>
                                                    {activeDropdown === link.name && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.22 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="mx-2 mb-2 bg-slate-50 rounded-xl p-3 space-y-3">
                                                                {link.dropdown.map((section) => (
                                                                    <div key={section.title}>
                                                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600 mb-2">{section.title}</p>
                                                                        <div className="space-y-0.5">
                                                                            {section.items.map((sub) => (
                                                                                <div key={sub.name}>
                                                                                    <Link
                                                                                        to={sub.href}
                                                                                        className="flex items-center gap-2.5 py-2 px-3 rounded-lg hover:bg-white transition-colors"
                                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                                    >
                                                                                        <span className="text-slate-700 font-semibold text-sm">{sub.name}</span>
                                                                                    </Link>
                                                                                    {'sub' in sub && sub.sub && (
                                                                                        <div className="ml-10 space-y-0.5 mt-0.5">
                                                                                            {sub.sub.map((s) => (
                                                                                                <Link
                                                                                                    key={s.name}
                                                                                                    to={s.href}
                                                                                                    className="flex items-center gap-2 py-1.5 px-3 rounded-lg hover:bg-green-50 text-slate-500 text-xs font-medium transition-colors"
                                                                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                                                                >
                                                                                                    <span className="w-1 h-1 rounded-full bg-green-400" />
                                                                                                    {s.name}
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
                                                {link.name}
                                                <ChevronDown className="-rotate-90 w-4 h-4 text-slate-300" />
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Language + Donate CTA */}
                            <div className="p-5 border-t border-slate-100 space-y-3">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-xs text-slate-400 font-medium">Language:</span>
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
                                    Donate Now
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
