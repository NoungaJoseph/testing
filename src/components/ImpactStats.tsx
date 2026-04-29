import { Link } from 'react-router-dom';

import FadeIn from './FadeIn';

const ImpactStats = () => {
    const stats = [
        { icon: 'school', value: '120+', label: 'Students Targeted' },
        { icon: 'domain', value: '8', label: 'Schools Target' },
        { icon: 'workspace_premium', value: '6', label: 'Teachers Recognized' },
        { icon: 'volunteer_activism', value: '8', label: 'Communities Helped' },
    ];

    return (
        <section className="px-6 py-20 lg:py-28 max-w-7xl mx-auto text-center">
            {/* Header */}
            <FadeIn direction="up">
                <div className="max-w-3xl mx-auto mb-16">
                    <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block">Measurable Change</span>
                    <h2 className="text-navy text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                        Driving Real Progress Across the Continent
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed">
                        Our data-driven approach ensures every resource reaches the communities that need it most.
                    </p>
                </div>
            </FadeIn>

            {/* KPI Grid */}
            <div className="p-8 md:p-16 mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
                    {stats.map((stat, idx) => (
                        <FadeIn key={stat.label} delay={idx * 0.1} direction="up" fullWidth>
                            <div className="flex flex-col items-center gap-4 px-4 py-6 sm:py-0 h-full">
                                <span className="material-symbols-outlined text-secondary text-5xl">{stat.icon}</span>
                                <span className="text-navy text-4xl md:text-5xl font-black tracking-tight">{stat.value}</span>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{stat.label}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>

            {/* CTA below stats */}
            <FadeIn delay={0.2} direction="up">
                <div className="bg-navy rounded-2xl py-16 px-8 flex flex-col items-center gap-8">
                    <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight text-center">
                        Help us reach the next milestone for 2025.
                    </h3>
                    <p className="text-slate-300 text-lg max-w-2xl text-center leading-relaxed">
                        Your support directly funds essential educational infrastructure and critical teacher welfare programs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/donate" className="flex items-center justify-center px-10 py-4 bg-secondary text-white font-black rounded-lg hover:-translate-y-0.5 transition-all">
                            Donate Now
                        </Link>
                        <Link to="/impact" className="flex items-center justify-center px-10 py-4 border-2 border-slate-700 text-white font-black rounded-lg hover:bg-slate-800 transition-colors">
                            View Full Report
                        </Link>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
};

export default ImpactStats;
