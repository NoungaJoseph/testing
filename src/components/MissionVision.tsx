import { Target, Eye, CheckCircle2, Sparkles } from 'lucide-react';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const MissionVision = () => {
    const { t } = useTranslation();
    const missionPointsT = t('about.mission_vision.mission_points', { returnObjects: true }) as string[];
    const visionPointsT = t('about.mission_vision.vision_points', { returnObjects: true }) as string[];
    
    return (
        <section className="bg-transparent flex flex-col items-center px-6 py-16 md:px-20 lg:px-40 relative overflow-hidden">
            <div className="relative z-10 w-full flex flex-col items-center">
                {/* Header */}
                <FadeIn direction="up">
                    <div className="max-w-4xl text-center mb-16">
                        <span className="text-secondary font-semibold tracking-widest uppercase text-xs">{t('about.mission_vision.badge')}</span>
                        <h2 className="text-navy tracking-tight text-4xl md:text-5xl font-extrabold leading-tight mt-4 mb-6">
                            {t('about.mission_vision.title')}
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            {t('about.mission_vision.desc')}
                        </p>
                    </div>
                </FadeIn>

                {/* Mission & Vision Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[1100px]">
                    {/* Mission */}
                    <FadeIn direction="up" fullWidth>
                        <div className="group rounded-xl p-10 flex flex-col items-start transition-all duration-300 h-full">
                            <div className="mb-8 w-20 h-20 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                <Target className="w-10 h-10" />
                            </div>
                            <h3 className="text-navy text-3xl font-bold mb-6">{t('about.mission_vision.mission_title')}</h3>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                {t('about.mission_vision.mission_desc')}
                            </p>
                            <div className="mt-auto pt-4 border-t border-slate-100 w-full">
                                <ul className="space-y-3">
                                    {missionPointsT.map((item: string) => (
                                        <li key={item} className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                            <CheckCircle2 className="w-5 h-5 text-secondary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Vision */}
                    <FadeIn direction="up" delay={0.2} fullWidth>
                        <div className="group rounded-xl p-10 flex flex-col items-start transition-all duration-300 h-full">
                            <div className="mb-8 w-20 h-20 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                <Eye className="w-10 h-10" />
                            </div>
                            <h3 className="text-navy text-3xl font-bold mb-6">{t('about.mission_vision.vision_title')}</h3>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                {t('about.mission_vision.vision_desc')}
                            </p>
                            <div className="mt-auto pt-4 border-t border-slate-100 w-full">
                                <ul className="space-y-3">
                                    {visionPointsT.map((item: string) => (
                                        <li key={item} className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                                            <Sparkles className="w-5 h-5 text-secondary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Community image section */}
                <FadeIn direction="up" className="w-full max-w-7xl">
                    <div className="mt-20 w-full aspect-[21/9] rounded-[3rem] overflow-hidden relative group">
                        <img
                            src="/assets/images/new_assets/transparency_image.png"
                            alt="African community gathering"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/0 transition-all duration-700" />
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default MissionVision;
