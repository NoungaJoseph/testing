import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

const steps = [
    {
        number: '01',
        title: 'Digital Equity Mission',
        desc: 'We identify remote schools with the greatest digital divide and deploy solar-powered computer labs to close the gap permanently.',
        illustration: '/assets/charity/our-expertize-in-action.png',
        illFallback: '/assets/charity/our-expertize-in-action.png',
    },
    {
        number: '02',
        title: 'Micro‑Grant Engine',
        desc: 'A direct-giving platform connects donors with teachers for targeted classroom supplies and project funding — every franc is tracked.',
        illustration: '/assets/charity/our-expertize-in-action.png',
        illFallback: '/assets/charity/our-expertize-in-action.png',
    },
    {
        number: '03',
        title: 'Vocation Hubs',
        desc: 'School facilities transform into evening vocational centres providing adult literacy, technical skill-building and community empowerment.',
        illustration: '/assets/charity/our-expertize-in-action.png',
        illFallback: '/assets/charity/our-expertize-in-action.png',
    },
];

const ArrowConnector = () => (
    <div className="hidden lg:flex items-center justify-center flex-shrink-0 mt-[-60px] px-2">
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" className="text-slate-300">
            <path
                d="M0 20 Q20 5 40 20 Q60 35 80 20"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 4"
                fill="none"
            />
            <polygon points="74,14 80,20 74,26" fill="currentColor" />
        </svg>
    </div>
);

const IdeasSection = () => {
    return (
        <section className="bg-transparent py-28 px-6 md:px-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <FadeIn direction="up">
                    <div className="text-center mb-20">
                        <span className="text-slate-500 font-black tracking-[0.4em] uppercase text-[10px] block mb-4">
                            Innovation Roadmap
                        </span>
                        <h2 className="text-navy text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
                            Strategic <span className="text-secondary ">Ideas</span> for Change.
                        </h2>
                        <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
                            Our work process — discover the strategic pillars shaping a better Cameroon, step by step.
                        </p>
                    </div>
                </FadeIn>

                {/* Steps row */}
                <div className="flex flex-col lg:flex-row items-start justify-center gap-0">
                    {steps.map((step, i) => (
                        <div key={step.number} className="flex flex-col lg:flex-row items-center w-full lg:w-auto">
                            <FadeIn direction="up" delay={i * 0.15} className="w-full lg:w-72 xl:w-80">
                                <div className="flex flex-col items-center text-center px-4 pb-10 lg:pb-0">
                                    {/* Number bubble */}
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-secondary/30 mb-6 relative z-10">
                                        {step.number}
                                    </div>

                                    {/* Illustration circle with light blue background */}
                                    <div className="relative w-44 h-44 mb-6">
                                        <div className="absolute inset-0 bg-blue-50 rounded-full" />
                                        <img
                                            src={step.illustration}
                                            alt={step.title}
                                            className="relative z-10 w-full h-full object-cover rounded-full shadow-md"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = step.illFallback;
                                            }}
                                        />
                                    </div>

                                    <h3 className="text-navy text-xl font-black tracking-tight mb-3">{step.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            </FadeIn>

                            {/* Arrow between steps */}
                            {i < steps.length - 1 && <ArrowConnector />}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <FadeIn direction="up" delay={0.4}>
                    <div className="text-center mt-16">
                        <Link
                            to="/programs"
                            className="inline-flex items-center gap-3 px-10 py-4 bg-navy text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-secondary transition-all duration-300 shadow-xl shadow-navy/20 hover:shadow-secondary/30 hover:scale-105"
                        >
                            Explore Full Roadmap
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

export default IdeasSection;
