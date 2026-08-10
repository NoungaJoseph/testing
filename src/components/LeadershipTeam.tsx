import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

const founder = {
    name: 'Ndolo Nako',
    role: 'Founder',
    bio: 'Ndolo Nako founded Enako Outreach to expand educational opportunity and practical community support for underserved families in Cameroon. Her leadership is centered on local partnership, accountability, and long-term impact that helps children, women, and communities move forward with dignity.',
    img: '/assets/leadership/boss.jpeg',
};

const LeadershipTeam = () => {
    const { t } = useTranslation();
    return (
        <section className="ds-section bg-white">
            <div className="ds-container">
                {/* Header */}
                <FadeIn direction="up">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
                        <span className="ds-badge mb-3">
                            {t('about.leadership.badge')}
                        </span>
                        <h2 className="ds-h2 mb-4">
                            {t('about.leadership.title')}
                        </h2>
                        <div className="w-12 h-1 bg-[#1eb4d4] rounded mb-6" />
                        <p className="ds-body">
                            {t('about.leadership.desc')}
                        </p>
                    </div>
                </FadeIn>

                {/* Side-by-side Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full mb-20">
                    {/* Image */}
                    <FadeIn direction="up" delay={0.1}>
                        <div className="relative rounded-lg overflow-hidden aspect-[4/5] border border-slate-200 shadow-sm">
                            <img
                                src={founder.img}
                                alt={founder.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </FadeIn>

                    {/* Text Card */}
                    <FadeIn direction="up" delay={0.2}>
                        <div className="ds-card flex flex-col p-8 md:p-10">
                            <span className="text-[#1eb4d4] font-bold tracking-wider uppercase text-xs mb-3">
                                {t('about.leadership.founder.role') || founder.role}
                            </span>
                            <h3 className="ds-h2 text-3xl mb-4 text-[#1c4980]">
                                {t('about.leadership.founder.name') || founder.name}
                            </h3>
                            <div className="w-12 h-1 bg-[#1eb4d4] rounded mb-6" />
                            <p className="ds-body leading-relaxed">
                                {t('about.leadership.founder.bio') || founder.bio}
                            </p>
                        </div>
                    </FadeIn>
                </div>

                {/* CTA */}
                <FadeIn direction="up">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="ds-h2 text-2xl mb-4">{t('about.leadership.cta_title')}</h3>
                        <p className="ds-body mb-8">
                            {t('about.leadership.cta_desc')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/volunteer" className="ds-btn ds-btn-primary">
                                {t('about.leadership.cta_btn1')} <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                            <Link to="/contact" className="ds-btn ds-btn-outline">
                                {t('about.leadership.cta_btn2')}
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default LeadershipTeam;
