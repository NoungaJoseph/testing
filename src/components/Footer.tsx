import { Link } from 'react-router-dom';
import { ACTION_LINKS } from '../constants/actionLinks';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    const { t } = useTranslation();

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
                            {t('footer.community_impact_foundation')}
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
                            href="tel:+237 6 78 45 79 26"
                            className="flex items-center gap-3 group"
                        >
                            <img src="/assets/charity/contact us/phone.png" alt="phone" className="w-6 h-6 object-contain flex-shrink-0" />
                            <span className="text-[#001B44] font-semibold text-base group-hover:opacity-80 transition-opacity">
                                +237 6 78 45 79 26
                            </span>
                        </a>
                        <div className="flex items-center gap-3">
                            <img src="/assets/charity/contact us/location.png" alt="location" className="w-6 h-6 object-contain flex-shrink-0" />
                            <span className="text-[#001B44]/75 font-medium text-base">
                                {t('footer.location')}
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
                            {t('footer.organisation')}
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { labelKey: 'footer.about_us', href: '/about' },
                                { labelKey: 'footer.our_impact', href: '/impact' },
                                { labelKey: 'footer.success_stories', href: '/stories' },
                                { labelKey: 'footer.blog', href: '/blog' },
                                { labelKey: 'footer.partnership', href: '/partnership' },
                            ].map((item) => (
                                <li key={item.labelKey}>
                                    <Link
                                        to={item.href}
                                        className="text-[#001B44]/75 text-sm font-medium hover:text-[#001B44] transition-colors"
                                    >
                                        {t(item.labelKey)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Programs */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#001B44]">
                            {t('footer.programs')}
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { labelKey: 'footer.scholarships', href: '/programs/scholarships' },
                                { labelKey: 'footer.clean_water', href: '/programs/clean-water-initiative' },
                                { labelKey: 'footer.teacher_rewards', href: '/programs/teacher-rewards' },
                                { labelKey: 'footer.health_support', href: '/programs/community-health-support' },
                                { labelKey: 'footer.single_mothers', href: '/programs/single-mothers-assistance' },
                                { labelKey: 'footer.youth_empowerment', href: '/programs/youth-empowerment' },
                            ].map((item) => (
                                <li key={item.labelKey}>
                                    <Link
                                        to={item.href}
                                        className="text-[#001B44]/75 text-sm font-medium hover:text-[#001B44] transition-colors"
                                    >
                                        {t(item.labelKey)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Communities */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#001B44]">
                            {t('footer.communities')}
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { labelKey: 'footer.focus_communities', href: '/focus-communities' },
                                { labelKey: 'footer.littoral_region', href: '/focus-communities' },
                                { labelKey: 'footer.centre_region', href: '/focus-communities' },
                                { labelKey: 'footer.north_west', href: '/focus-communities' },
                                { labelKey: 'footer.south_west', href: '/focus-communities' },
                                { labelKey: 'footer.west_region', href: '/focus-communities' },
                            ].map((item) => (
                                <li key={item.labelKey}>
                                    <Link
                                        to={item.href}
                                        className="text-[#001B44]/75 text-sm font-medium hover:text-[#001B44] transition-colors"
                                    >
                                        {t(item.labelKey)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get Involved */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#001B44]">
                            {t('footer.get_involved')}
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                { labelKey: 'footer.donate', href: '/donate' },
                                { labelKey: 'footer.volunteer', href: '/get-involved' },
                                { labelKey: 'footer.partner_with_us', href: '/partnership' },
                                { labelKey: 'footer.apply_scholarship', href: ACTION_LINKS.applyScholarship },
                                { labelKey: 'footer.apply_help', href: ACTION_LINKS.applyHelp },
                                { labelKey: 'footer.report_case', href: ACTION_LINKS.reportCase },
                            ].map((item) => (
                                <li key={item.labelKey}>
                                    <Link
                                        to={item.href}
                                        className="text-[#001B44]/75 text-sm font-medium hover:text-[#001B44] transition-colors"
                                    >
                                        {t(item.labelKey)}
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
                    © {new Date().getFullYear()} Enako Outreach · {t('footer.all_rights_reserved')} · {t('footer.location')}
                </p>
                <div className="flex items-center gap-6 text-xs">
                    {[
                        { labelKey: 'footer.privacy_policy', href: '#' },
                        { labelKey: 'footer.terms_of_service', href: '#' },
                        { labelKey: 'footer.cookie_policy', href: '#' }
                    ].map((item) => (
                        <a
                            key={item.labelKey}
                            href={item.href}
                            className="text-[#001B44]/65 hover:text-[#001B44] transition-colors font-medium"
                        >
                            {t(item.labelKey)}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
