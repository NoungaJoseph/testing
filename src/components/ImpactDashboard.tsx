import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

const ImpactDashboard = () => {
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
                        Community Impact In Motion
                    </span>
                    <h2 className="text-white text-4xl md:text-5xl font-black leading-tight mb-5">
                        Real Outreach, Real People, Real Change
                    </h2>
                    <p className="text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                        This live field footage highlights how Enako Outreach is delivering clean water and essential support to communities across Cameroon.
                    </p>
                    <Link to="/impact" className="btn-pill btn-pill-teal text-sm">
                        View Full Impact Report
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
};

export default ImpactDashboard;
