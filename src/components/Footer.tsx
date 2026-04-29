import { Link } from 'react-router-dom';
import { ACTION_LINKS } from '../constants/actionLinks';

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer style={{ backgroundColor: '#00BFA5' }} className="overflow-hidden relative">

            {/* ── TOP: Brand + Contact ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 pt-20 pb-12 border-b border-[#001B44]/15">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Logo */}
                    <div
                        className="cursor-pointer group"
                        onClick={scrollToTop}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && scrollToTop()}
                    >
                        <p
                            className="text-[#001B44] text-4xl md:text-5xl font-black tracking-[0.06em] uppercase leading-none mb-3 group-hover:opacity-80 transition-opacity"
                            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                        >
                            E NAKO<br />OUTREACH
                        </p>
                        <p className="text-[#001B44]/70 text-sm font-semibold uppercase tracking-[0.22em]">
                            Community Impact Foundation
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-5">
                        <a
                            href="mailto:enakooutreach@gmail.com"
                            className="flex items-center gap-3 group"
                        >
                            <img src="/assets/charity/contact us/email.png" alt="email" className="w-6 h-6 object-contain flex-shrink-0" />
                            <span className="text-[#001B44] font-semibold text-base group-hover:opacity-80 transition-opacity">
                                enakooutreach@gmail.com
                            </span>
                        </a>
                        <a
                            href="tel:+237670671249"
                            className="flex items-center gap-3 group"
                        >
                            <img src="/assets/charity/contact us/phone.png" alt="phone" className="w-6 h-6 object-contain flex-shrink-0" />
                            <span className="text-[#001B44] font-semibold text-base group-hover:opacity-80 transition-opacity">
                                +237 6 70 67 12 49
                            </span>
                        </a>
                        <div className="flex items-center gap-3">
                            <img src="/assets/charity/contact us/location.png" alt="location" className="w-6 h-6 object-contain flex-shrink-0" />
                            <span className="text-[#001B44]/75 font-medium text-base">
                                Akwa, Douala · Cameroon
                            </span>
                        </div>

                        {/* Socials */}
                        <div className="flex gap-4 pt-2">
                            {[
                                { src: '/assets/charity/social/facebook.png', href: '#', label: 'Facebook' },
                                { src: '/assets/charity/social/instagram.png', href: '#', label: 'Instagram' },
                                { src: '/assets/charity/social/twitter.png', href: '#', label: 'Twitter' },
                                { src: '/assets/charity/social/Youtube.png', href: '#', label: 'YouTube' },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    aria-label={s.label}
                                    className="hover:-translate-y-1 transition-transform"
                                >
                                    <img src={s.src} alt={s.label} className="w-8 h-8 object-contain hover:opacity-80 transition-opacity" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MIDDLE: Navigation Links ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 border-b border-[#001B44]/15">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Organisation */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#001B44]">
                            Organisation
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'About Us', href: '/about' },
                                { label: 'Our Impact', href: '/impact' },
                                { label: 'Success Stories', href: '/stories' },
                                { label: 'Blog', href: '/blog' },
                                { label: 'Partnership', href: '/partnership' },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.href}
                                        className="text-[#001B44]/75 text-sm font-medium hover:text-[#001B44] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#001B44]">
                            Programs
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Scholarships', href: '/programs/scholarships' },
                                { label: 'Clean Water', href: '/programs/clean-water-initiative' },
                                { label: 'Teacher Rewards', href: '/programs/teacher-rewards' },
                                { label: 'Health Support', href: '/programs/community-health-support' },
                                { label: 'Single Mothers', href: '/programs/single-mothers-assistance' },
                                { label: 'Youth Empowerment', href: '/programs/youth-empowerment' },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.href}
                                        className="text-[#001B44]/75 text-sm font-medium hover:text-[#001B44] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Communities */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#001B44]">
                            Communities
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Focus Communities', href: '/focus-communities' },
                                { label: 'Littoral Region', href: '/focus-communities' },
                                { label: 'Centre Region', href: '/focus-communities' },
                                { label: 'North West', href: '/focus-communities' },
                                { label: 'South West', href: '/focus-communities' },
                                { label: 'West Region', href: '/focus-communities' },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.href}
                                        className="text-[#001B44]/75 text-sm font-medium hover:text-[#001B44] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get Involved */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#001B44]">
                            Get Involved
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Donate', href: '/donate' },
                                { label: 'Volunteer', href: '/get-involved' },
                                { label: 'Partner With Us', href: '/partnership' },
                                { label: 'Apply for Scholarship', href: ACTION_LINKS.applyScholarship },
                                { label: 'Apply for Help', href: ACTION_LINKS.applyHelp },
                                { label: 'Report a Case', href: ACTION_LINKS.reportCase },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link
                                        to={item.href}
                                        className="text-[#001B44]/75 text-sm font-medium hover:text-[#001B44] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── BOTTOM: Copyright ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-[#001B44]/65 text-xs font-medium">
                    © {new Date().getFullYear()} Enako Outreach · All rights reserved · Akwa Douala, Cameroon
                </p>
                <div className="flex items-center gap-6 text-xs">
                    {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-[#001B44]/65 hover:text-[#001B44] transition-colors font-medium"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
