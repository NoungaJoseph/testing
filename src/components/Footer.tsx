import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    const topLinks = [
        { labelKey: 'nav.home', href: '/' },
        { labelKey: 'nav.about_us', href: '/about' },
        { labelKey: 'nav.programs', href: '/programs' },
        { labelKey: 'nav.projects', href: '/impact' },
        { labelKey: 'nav.focus_communities', href: '/focus-communities' },
        { labelKey: 'nav.blog', href: '/blog' },
        { labelKey: 'nav.get_involved', href: '/get-involved' },
        { labelKey: 'nav.contact_us', href: '/contact' },
    ];

    const bottomLinks = [
        { labelKey: 'legal.privacy_policy_title', href: '/privacy-policy' },
        { labelKey: 'legal.terms_of_service_title', href: '/terms-of-service' },
        { labelKey: 'nav.blog', href: '/blog' },
        { labelKey: 'nav.about_us', href: '/about' },
        { labelKey: 'nav.contact_us', href: '/contact' },
    ];

    return (
        <footer className="w-full mt-auto">
            {/* ── TOP SECTION (Light Background) ── */}
            <div className="bg-[#f8f9fa] py-10 px-4 border-t border-slate-200">
                <div className="max-w-7xl mx-auto flex flex-col items-center">
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 mb-6 text-[13px] text-[#1eb4d4] font-medium">
                        {topLinks.map((link, index) => (
                            <div key={link.href} className="flex items-center gap-2">
                                <Link to={link.href} className="hover:underline hover:text-[#1593af] transition-colors">
                                    {t(link.labelKey)}
                                </Link>
                                {index < topLinks.length - 1 && (
                                    <span className="text-slate-300">|</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-slate-500 text-[13px]">
                        Enako Outreach - {t('footer.community_impact_foundation')}
                    </p>
                </div>
            </div>

            {/* ── BOTTOM SECTION (Dark Blue Background) ── */}
            <div className="bg-[#1c4980] pt-10 pb-12 px-4">
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
                    
                    {/* Top Row: Copyright & Links */}
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-[13px] text-white/80 font-medium text-center md:text-left">
                            © {new Date().getFullYear()} Enako Outreach. {t('footer.all_rights_reserved')}
                        </div>
                        
                        <div className="flex flex-wrap items-center justify-center gap-6 text-[13px] font-medium text-white/90">
                            {bottomLinks.map((link) => (
                                <Link 
                                    key={link.labelKey} 
                                    to={link.href} 
                                    className="hover:text-white transition-colors"
                                >
                                    {t(link.labelKey)}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Row: Socials */}
                    <div className="flex items-center justify-center gap-6">
                        <a href="#" className="text-white hover:text-[#1eb4d4] transition-colors" aria-label="Facebook">
                            <Facebook className="w-5 h-5 fill-current" />
                        </a>
                        <a href="#" className="text-white hover:text-[#1eb4d4] transition-colors" aria-label="Twitter">
                            <Twitter className="w-5 h-5 fill-current" />
                        </a>
                        <a href="#" className="text-white hover:text-[#1eb4d4] transition-colors" aria-label="Instagram">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-white hover:text-[#1eb4d4] transition-colors" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5 fill-current" />
                        </a>
                        <a href="#" className="text-white hover:text-[#1eb4d4] transition-colors" aria-label="YouTube">
                            <Youtube className="w-6 h-6" />
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
