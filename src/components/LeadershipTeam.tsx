import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const founder = {
    name: 'Ndolo Nako',
    role: 'Founder',
    bio: 'Ndolo Nako founded Enako Outreach to expand educational opportunity and practical community support for underserved families in Cameroon. Her leadership is centered on local partnership, accountability, and long-term impact that helps children, women, and communities move forward with dignity.',
    img: '/assets/leadership/boss.jpeg',
};

const LeadershipTeam = () => {
    const { t } = useTranslation();
    return (
        <section className="px-6 lg:px-20 py-16 lg:py-24 max-w-7xl mx-auto">
            <FadeIn direction="up">
                <div className="flex flex-col gap-4 max-w-3xl mb-16">
                    <span className="text-secondary font-bold tracking-widest uppercase text-sm">{t('about.leadership.badge')}</span>
                    <h2 className="text-navy text-4xl lg:text-5xl font-black leading-tight tracking-tight">{t('about.leadership.title')}</h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        {t('about.leadership.desc')}
                    </p>
                </div>
            </FadeIn>

            <FadeIn direction="up" fullWidth>
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center rounded-[2rem] bg-white p-6 md:p-8 shadow-sm border border-slate-100">
                    <div className="relative overflow-hidden rounded-[1.75rem] aspect-[4/5]">
                        <img
                            src={founder.img}
                            alt={founder.name}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <div className="flex flex-col gap-5">
                        <span className="text-secondary font-semibold text-sm uppercase tracking-wide">{t('about.leadership.founder.role') || founder.role}</span>
                        <h3 className="text-navy text-3xl md:text-4xl font-bold">{t('about.leadership.founder.name') || founder.name}</h3>
                        <p className="text-slate-600 text-base leading-relaxed">{t('about.leadership.founder.bio') || founder.bio}</p>
                    </div>
                </div>
            </FadeIn>

            <FadeIn direction="up">
                <div className="mt-24 py-20 text-center">
                    <h3 className="text-navy text-3xl md:text-4xl font-black mb-4">{t('about.leadership.cta_title')}</h3>
                    <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
                        {t('about.leadership.cta_desc')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/volunteer" className="flex items-center justify-center gap-2 rounded-lg h-12 px-8 bg-secondary text-white font-bold hover:bg-[#00a8ae] transition-all">
                            {t('about.leadership.cta_btn1')} <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                        <Link to="/volunteer" className="flex items-center justify-center rounded-lg h-12 px-8 border-2 border-slate-200 text-navy font-bold hover:bg-slate-50 transition-all">
                            {t('about.leadership.cta_btn2')}
                        </Link>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
};

export default LeadershipTeam;
