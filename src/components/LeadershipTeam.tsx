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
        <section className="bg-white py-24 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-20">
                {/* Minimalist Header */}
                <FadeIn direction="up">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
                        <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4">
                            {t('about.leadership.badge')}
                        </span>
                        <h2 className="text-navy tracking-tight text-4xl md:text-5xl font-black mb-6">
                            {t('about.leadership.title')}
                        </h2>
                        <div className="w-16 h-1 bg-secondary rounded-full mb-8"></div>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            {t('about.leadership.desc')}
                        </p>
                    </div>
                </FadeIn>

                {/* Side-by-side Layout: Image directly on page, Text in a card */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full mb-24">
                    {/* Image on the page itself */}
                    <FadeIn direction="up" delay={0.1}>
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg border border-slate-100">
                            <img
                                src={founder.img}
                                alt={founder.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </FadeIn>

                    {/* Text Card (Styled like Option D) */}
                    <FadeIn direction="up" delay={0.2}>
                        <div className="bg-white border border-slate-200 p-10 md:p-12 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 hover:border-secondary/30 transition-all duration-300 flex flex-col">
                            <span className="text-secondary font-semibold tracking-wide uppercase text-sm mb-4">
                                {t('about.leadership.founder.role') || founder.role}
                            </span>
                            <h3 className="text-navy text-4xl font-bold mb-6">
                                {t('about.leadership.founder.name') || founder.name}
                            </h3>
                            <div className="w-12 h-1 bg-slate-200 rounded-full mb-8"></div>
                            <p className="text-slate-500 text-lg leading-relaxed">
                                {t('about.leadership.founder.bio') || founder.bio}
                            </p>
                        </div>
                    </FadeIn>
                </div>

                {/* Minimalist CTA */}
                <FadeIn direction="up">
                    <div className="text-center max-w-2xl mx-auto">
                        <h3 className="text-navy text-3xl font-black mb-6">{t('about.leadership.cta_title')}</h3>
                        <p className="text-slate-500 text-lg leading-relaxed mb-10">
                            {t('about.leadership.cta_desc')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/volunteer" className="flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-secondary text-white font-bold hover:bg-[#00a8ae] hover:shadow-lg hover:-translate-y-0.5 transition-all group">
                                {t('about.leadership.cta_btn1')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/volunteer" className="flex items-center justify-center rounded-xl h-14 px-8 border border-slate-200 text-navy font-bold hover:bg-slate-50 hover:shadow-sm hover:-translate-y-0.5 transition-all">
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
