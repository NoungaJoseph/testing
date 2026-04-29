import { Rocket, Zap, Shield, Globe } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';

const Roadmap = () => {
    const phases = [
        {
            title: "Phase 1: Foundation (2024)",
            status: "In Progress",
            items: [
                "Establish core partnerships with 4 pilot schools.",
                "Launch the Teacher Excellence Award program.",
                "Deploy initial solar power hubs in rural districts."
            ],
            icon: Rocket
        },
        {
            title: "Phase 2: Acceleration (2025)",
            status: "Planning",
            items: [
                "Targeting 120 students for scholarship eligibility.",
                "Expanding vocational evening hubs to 6 locations.",
                "Implementing the Teacher Micro-Grant platform."
            ],
            icon: Zap
        },
        {
            title: "Phase 3: Impact Scale (2026+)",
            status: "Future Vision",
            items: [
                "Establishing stronger coverage across priority regions in Cameroon.",
                "Digital Equity project: 8+ computer labs.",
                "Continental teacher training summits."
            ],
            icon: Globe
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
                    <FadeIn direction="up">
                        <div className="max-w-3xl mb-24">
                            <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] block mb-6">Strategic Vision</span>
                            <h1 className="text-navy text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter mb-8">
                                Innovation <br />
                                <span className="text-secondary ">Roadmap.</span>
                            </h1>
                            <p className="text-slate-500 text-xl font-medium leading-relaxed">
                                A multi-year commitment to rebuilding the educational and social infrastructure of communities across the continent.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="space-y-12">
                        {phases.map((phase, i) => (
                            <FadeIn key={phase.title} delay={i * 0.1} direction="up" fullWidth>
                                <div className="group rounded-[3rem] p-12 transition-all duration-700 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-secondary/10 transition-colors" />

                                    <div className="flex flex-col lg:flex-row gap-12 items-start relative z-10">
                                        <div className="w-24 h-24 rounded-3xl bg-slate-50 flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-500 shadow-inner">
                                            <phase.icon className="w-12 h-12" />
                                        </div>
                                        <div className="flex-grow space-y-8">
                                            <div className="space-y-2">
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                                    {phase.status}
                                                </div>
                                                <h3 className="text-4xl font-black text-navy tracking-tight ">{phase.title}</h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {phase.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-4 text-slate-500 text-lg font-medium leading-relaxed">
                                                        <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0 mt-1">
                                                            <Shield className="w-3 h-3" />
                                                        </div>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    <div className="mt-32 p-16 rounded-[4rem] bg-navy relative overflow-hidden text-center">
                        <div className="absolute inset-0 bg-secondary/10 blur-[100px] -translate-y-1/2" />
                        <FadeIn direction="up">
                            <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter mb-8 relative z-10">
                                Ready to be part of the <span className="text-secondary ">Future?</span>
                            </h2>
                            <button className="relative z-10 px-12 py-6 bg-secondary text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-secondary/40">
                                Partner for Scale
                            </button>
                        </FadeIn>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Roadmap;
