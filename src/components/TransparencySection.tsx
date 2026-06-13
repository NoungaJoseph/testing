import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import FadeIn from './FadeIn';

const TransparencySection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-20 px-6 lg:px-20 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                {/* Image with overlay */}
                <div className="lg:w-1/2 w-full">
                    <FadeIn direction="right">
                        <div className="aspect-video w-full rounded-2xl overflow-hidden relative shadow-xl">
                            <img
                                src="/assets/images/new_assets/transparency_image.png"
                                alt="Community impact"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-navy/20" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="text-xl font-bold">{t('programs.transparency.goal')}</p>
                                <p className="text-sm">{t('programs.transparency.report_summary')}</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
                {/* Text */}
                <div className="lg:w-1/2 w-full">
                    <FadeIn direction="left" delay={0.2}>
                        <h2 className="text-navy text-3xl font-extrabold mb-6">{t('programs.transparency.title')}</h2>
                        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                            {t('programs.transparency.desc')}
                        </p>
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <p className="text-secondary text-3xl font-extrabold">{t('programs.transparency.stat1_val')}</p>
                                <p className="text-slate-500 text-sm font-medium">{t('programs.transparency.stat1_label')}</p>
                            </div>
                            <div>
                                <p className="text-secondary text-3xl font-extrabold">{t('programs.transparency.stat2_val')}</p>
                                <p className="text-slate-500 text-sm font-medium">{t('programs.transparency.stat2_label')}</p>
                            </div>
                        </div>
                        <Link
                            to="/impact"
                            className="inline-flex items-center justify-center bg-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-navy/90 transition-all"
                        >
                            {t('programs.transparency.btn')}
                        </Link>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default TransparencySection;

