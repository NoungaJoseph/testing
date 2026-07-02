import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const AboutHero = () => {
    const { t } = useTranslation();
    const pillarsT = t('about.hero.pillars', { returnObjects: true }) as any[];

    return (
        <>
            {/* Full-bleed Hero */}
            <section className="relative w-full h-[75vh] min-h-[550px] flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#001B44]/70 z-10" />
                    <img
                        src="/assets/charity/our-mission.png"
                        alt="African community education"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center gap-6 w-full">
                    <FadeIn direction="up" delay={0.1}>
                        {/* Est badge */}
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="h-px w-8 bg-secondary" />
                            <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase">{t('about.hero.est')}</span>
                            <span className="h-px w-8 bg-secondary" />
                        </div>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.2}>
                        <h1 className="text-white text-4xl md:text-6xl leading-tight">
                            {t('about.hero.title')}<br />
                            <span style={{ color: '#00BFA5' }}>{t('about.hero.title_highlight')}</span>
                        </h1>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.3}>
                        <p className="text-slate-200 text-lg md:text-xl font-normal max-w-2xl leading-relaxed mx-auto">
                            {t('about.hero.desc')}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Mission block below hero */}
            <section className="max-w-7xl mx-auto px-6 py-14">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-16">
                    <Link to="/" className="hover:text-secondary flex items-center gap-2 transition-colors">
                        <Home className="w-3 h-3" /> {t('about.hero.breadcrumb_home')}
                    </Link>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                    <span className="text-secondary">{t('about.hero.breadcrumb_about')}</span>
                </nav>

                {/* Mission split */}
                <FadeIn direction="up">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            <h4 className="text-secondary text-sm font-bold leading-normal tracking-widest uppercase flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-secondary" /> {t('about.hero.mission_badge')}
                            </h4>
                            <h3 className="text-3xl font-bold text-navy leading-tight">
                                {t('about.hero.mission_title')}
                            </h3>
                        </div>
                        <div className="lg:col-span-8">
                            <p className="text-slate-600 text-xl font-normal leading-relaxed">
                                {t('about.hero.mission_desc')}
                            </p>
                        </div>
                    </div>
                </FadeIn>

                {/* 3 value pillars - Icon-less Watermark Number Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-8">
                    {[1, 2, 3].map((item, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1} direction="up" fullWidth>
                            <div className="relative group p-8 -m-8 hover:bg-slate-50 rounded-3xl transition-colors duration-500 flex flex-col justify-start overflow-hidden">
                                {/* Giant Watermark Number */}
                                <div className="absolute top-0 right-4 text-[150px] font-black text-slate-100 group-hover:text-secondary/10 transition-colors duration-500 pointer-events-none -z-10 select-none leading-none -translate-y-8">
                                    0{idx + 1}
                                </div>
                                
                                {/* Content */}
                                <div className="pt-16 z-10 relative">
                                    <div className="w-10 h-1 bg-secondary rounded-full mb-6 group-hover:w-16 transition-all duration-500"></div>
                                    <h3 className="text-2xl font-black text-[#001B44] mb-4 group-hover:text-secondary transition-colors duration-300">
                                        {pillarsT[idx]?.title}
                                    </h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        {pillarsT[idx]?.desc}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>
        </>
    );
};

export default AboutHero;
