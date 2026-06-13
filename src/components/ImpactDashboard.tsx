import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const ImpactDashboard = () => {
    const { t } = useTranslation();
    return (
        <section className="relative min-h-[70vh] overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/assets/updates/clean water.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-slate-900/55" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
                <FadeIn direction="up">
                    <span className="text-[#00BFA5] font-black uppercase tracking-[0.28em] text-[10px] block mb-5">
                        {t('components.impact_dashboard.badge')}
                    </span>
                    <h2 className="text-white text-4xl md:text-5xl font-black leading-tight mb-5">
                        {t('components.impact_dashboard.title')}
                    </h2>
                    <p className="text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                        {t('components.impact_dashboard.desc')}
                    </p>
                    <Link to="/impact" className="btn-pill btn-pill-teal text-sm">
                        {t('components.impact_dashboard.btn')}
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
};

export default ImpactDashboard;
