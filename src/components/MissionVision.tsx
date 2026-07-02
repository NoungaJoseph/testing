import { Rocket, Telescope, CheckCircle2, Sparkles, MoveRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const MissionVision = () => {
    const { t } = useTranslation();
    const missionPointsT = t('about.mission_vision.mission_points', { returnObjects: true }) as string[];
    const visionPointsT = t('about.mission_vision.vision_points', { returnObjects: true }) as string[];
    
    return (
        <section className="bg-white py-24 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-20">
                {/* Minimalist Header */}
                <FadeIn direction="up">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
                        <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4">
                            {t('about.mission_vision.badge')}
                        </span>
                        <h2 className="text-navy tracking-tight text-4xl md:text-5xl font-black mb-6">
                            {t('about.mission_vision.title')}
                        </h2>
                        <div className="w-16 h-1 bg-secondary rounded-full mb-8"></div>
                        <p className="text-slate-500 text-lg leading-relaxed">
                            {t('about.mission_vision.desc')}
                        </p>
                    </div>
                </FadeIn>

                {/* Classic Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-16">
                    {/* Mission Card */}
                    <FadeIn direction="up" delay={0.1}>
                        <div className="group h-full bg-white border border-slate-200 p-10 rounded-2xl hover:border-secondary/30 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                    <Rocket className="w-6 h-6" />
                                </div>
                                <h3 className="text-navy text-2xl font-bold">{t('about.mission_vision.mission_title')}</h3>
                            </div>
                            <p className="text-slate-500 text-base leading-relaxed mb-8">
                                {t('about.mission_vision.mission_desc')}
                            </p>
                            <div className="mt-auto pt-6 border-t border-slate-100">
                                <ul className="space-y-3">
                                    {missionPointsT.map((item: string, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Vision Card */}
                    <FadeIn direction="up" delay={0.2}>
                        <div className="group h-full bg-white border border-slate-200 p-10 rounded-2xl hover:border-secondary/30 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                                    <Telescope className="w-6 h-6" />
                                </div>
                                <h3 className="text-navy text-2xl font-bold">{t('about.mission_vision.vision_title')}</h3>
                            </div>
                            <p className="text-slate-500 text-base leading-relaxed mb-8">
                                {t('about.mission_vision.vision_desc')}
                            </p>
                            <div className="mt-auto pt-6 border-t border-slate-100">
                                <ul className="space-y-3">
                                    {visionPointsT.map((item: string, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                                            <Sparkles className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Minimalist Image Section */}
                <FadeIn direction="up" delay={0.3}>
                    <div className="w-full relative rounded-2xl overflow-hidden aspect-[21/9] bg-slate-100 group">
                        <img
                            src="/assets/images/new_assets/transparency_image.png"
                            alt="African community gathering"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-navy/10 group-hover:bg-navy/0 transition-colors duration-500" />
                        
                        <div className="absolute bottom-6 right-6">
                            <button className="bg-white text-navy px-6 py-3 rounded-xl font-bold text-sm shadow-sm flex items-center gap-2 hover:bg-secondary hover:text-white transition-colors">
                                Learn More <MoveRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default MissionVision;
