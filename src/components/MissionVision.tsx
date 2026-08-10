import { Rocket, Telescope, CheckCircle2, Sparkles, MoveRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const MissionVision = () => {
    const { t } = useTranslation();
    const missionPointsT = t('about.mission_vision.mission_points', { returnObjects: true }) as string[];
    const visionPointsT = t('about.mission_vision.vision_points', { returnObjects: true }) as string[];
    
    return (
        <section className="ds-section bg-white">
            <div className="ds-container">
                {/* Header */}
                <FadeIn direction="up">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
                        <span className="ds-badge mb-3">
                            {t('about.mission_vision.badge')}
                        </span>
                        <h2 className="ds-h2 mb-4">
                            {t('about.mission_vision.title')}
                        </h2>
                        <div className="w-12 h-1 bg-[#1eb4d4] rounded mb-6" />
                        <p className="ds-body">
                            {t('about.mission_vision.desc')}
                        </p>
                    </div>
                </FadeIn>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
                    {/* Mission Card */}
                    <FadeIn direction="up" delay={0.1}>
                        <div className="ds-card h-full flex flex-col">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-[#1c4980]">
                                    <Rocket className="w-6 h-6" />
                                </div>
                                <h3 className="ds-h3 text-xl text-[#1c4980]">{t('about.mission_vision.mission_title')}</h3>
                            </div>
                            <p className="ds-body-sm mb-6">
                                {t('about.mission_vision.mission_desc')}
                            </p>
                            <div className="mt-auto pt-6 border-t border-slate-200">
                                <ul className="space-y-3">
                                    {missionPointsT.map((item: string, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-[#1eb4d4] shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </FadeIn>

                    {/* Vision Card */}
                    <FadeIn direction="up" delay={0.2}>
                        <div className="ds-card h-full flex flex-col">
                            <div className="mb-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded bg-slate-100 flex items-center justify-center text-[#1c4980]">
                                    <Telescope className="w-6 h-6" />
                                </div>
                                <h3 className="ds-h3 text-xl text-[#1c4980]">{t('about.mission_vision.vision_title')}</h3>
                            </div>
                            <p className="ds-body-sm mb-6">
                                {t('about.mission_vision.vision_desc')}
                            </p>
                            <div className="mt-auto pt-6 border-t border-slate-200">
                                <ul className="space-y-3">
                                    {visionPointsT.map((item: string, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-sm">
                                            <Sparkles className="w-4 h-4 text-[#1eb4d4] shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Banner Image */}
                <FadeIn direction="up" delay={0.3}>
                    <div className="w-full relative rounded-lg overflow-hidden aspect-[21/9] bg-slate-100 group border border-slate-200 shadow-sm">
                        <img
                            src="/assets/images/new_assets/transparency_image.png"
                            alt="African community gathering"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default MissionVision;
