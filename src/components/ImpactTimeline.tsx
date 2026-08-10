import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const ImpactTimeline = () => {
    const { t } = useTranslation();

    const milestones = [
        {
            year: t('impact_timeline.phase1_year', 'Phase 1: Launch'),
            title: t('impact_timeline.phase1_title', 'Foundation Establishment'),
            description: t('impact_timeline.phase1_desc', 'Establishing our central mission in Africa and identifying our key community hubs for 2024.'),
            icon: "foundation",
            image: "/assets/images/new_assets/timeline_1.png"
        },
        {
            year: t('impact_timeline.phase2_year', 'Phase 2: Pilot'),
            title: t('impact_timeline.phase2_title', 'Inaugural Scholarships'),
            description: t('impact_timeline.phase2_desc', 'Targeting the first 50 scholarship recipients with full tuition and resource coverage.'),
            icon: "school",
            image: "/assets/images/new_assets/timeline_1.png"
        },
        {
            year: t('impact_timeline.phase3_year', 'Phase 3: Community'),
            title: t('impact_timeline.phase3_title', 'Infrastructure Initiative'),
            description: t('impact_timeline.phase3_desc', 'Implementing sustainable solar power and clean water systems in target local villages.'),
            icon: "handyman",
            image: "/assets/images/new_assets/timeline_1.png"
        },
        {
            year: t('impact_timeline.phase4_year', 'Phase 4: Expansion'),
            title: t('impact_timeline.phase4_title', 'Cross-Border Scaling'),
            description: t('impact_timeline.phase4_desc', 'Expanding our proven humanitarian models across 12 countries in the region.'),
            icon: "public",
            image: "/assets/images/new_assets/timeline_1.png"
        }
    ];

    return (
        <section className="bg-slate-50 dark:bg-background-dark py-24 px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
                <FadeIn direction="up">
                    <div className="text-center mb-16 lg:mb-24">
                        <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest uppercase bg-white border border-secondary text-secondary rounded-full">{t('impact_timeline.story_badge', 'Our Story')}</span>
                        <h2 className="text-4xl lg:text-6xl font-black tracking-tight mb-6 text-navy dark:text-white">{t('impact_timeline.title', 'Our Journey of Impact')}</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto">
                            {t('impact_timeline.desc', 'Our strategic roadmap for empowering communities and fostering education across Africa, one phase at a time.')}
                        </p>
                    </div>
                </FadeIn>

                <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-32 space-y-16">
                    {milestones.map((milestone, i) => (
                        <FadeIn key={i} direction="up" delay={i * 0.1}>
                            <div className="relative pl-8 md:pl-12">
                                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg">
                                    <span className="material-symbols-outlined text-sm">{milestone.icon}</span>
                                </div>
                                <div className="md:absolute md:-left-36 md:top-1.5 text-sm font-bold text-secondary uppercase tracking-wider mb-2 md:mb-0 md:w-28 md:text-right">
                                    {milestone.year}
                                </div>
                                <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                                    <h3 className="text-2xl font-bold text-navy dark:text-white mb-3">{milestone.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                        {milestone.description}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactTimeline;
