import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const ProgramsHero = () => {
    const { t } = useTranslation();
    const pillarsT = t('programs.hero.pillars', { returnObjects: true }) as any[];
    return (
        <>
            {/* Full-bleed Hero */}
            <section className="relative w-full min-h-[60vh] flex flex-col items-start justify-end overflow-hidden pb-16 pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img
                        src="/assets/images/new_assets/story_student.png"
                        alt="Group of diverse community members"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full">
                    <FadeIn direction="up">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-white text-sm mb-10">
                            <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-sm">home</span> {t('programs.hero.breadcrumb_home')}
                            </Link>
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                            <span className="text-white font-medium">{t('programs.hero.breadcrumb_programs')}</span>
                        </nav>
                        <h1 className="text-white text-4xl md:text-6xl leading-tight mb-6">
                            {t('programs.hero.title')}<br />
                            Creating <span style={{ color: '#00BFA5' }}>{t('programs.hero.title_highlight')}</span><br />
                            {t('programs.hero.title_suffix')}
                        </h1>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.2}>
                        <p className="text-slate-200 text-lg max-w-xl leading-relaxed mb-10">
                            {t('programs.hero.desc')}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Overview section */}
            <section className="bg-transparent py-16 px-6 lg:px-20" id="programs">
                <div className="max-w-7xl mx-auto">
                    <FadeIn direction="up">
                        <div className="text-center mb-12">
                            <span className="text-secondary font-bold tracking-widest uppercase text-xs">{t('programs.hero.focus_badge')}</span>
                            <h2 className="text-navy text-4xl font-extrabold mt-2 mb-4">{t('programs.hero.focus_title')}</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                                {t('programs.hero.focus_desc')}
                            </p>
                        </div>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: 'school' },
                            { icon: 'emoji_events' },
                            { icon: 'diversity_3' },
                            { icon: 'child_care' },
                        ].map((p, idx) => (
                            <FadeIn key={idx} direction="up" delay={idx * 0.1} fullWidth>
                                <div
                                    className="p-8 hover:-translate-y-1 transition-all group h-full"
                                    style={{ backgroundColor: '#FDFBF7', borderRadius: '2rem' }}
                                >
                                    <div className="w-12 h-12 flex items-center justify-center mb-6 rounded-xl" style={{ backgroundColor: 'rgba(0,191,165,0.12)' }}>
                                        <span className="material-symbols-outlined text-2xl" style={{ color: '#00BFA5' }}>{p.icon}</span>
                                    </div>
                                    <h3 className="text-lg mb-3" style={{ color: '#001B44' }}>{pillarsT[idx]?.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{pillarsT[idx]?.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProgramsHero;
