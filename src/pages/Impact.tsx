import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';

const ImpactPage = () => {
    const milestones = [
        { year: 'Phase 1', title: 'Douala Launch', desc: 'Enako Outreach establishes headquarters in Douala with 5 partner schools.' },
        { year: 'Phase 2', title: 'First Charity Mission', desc: 'Launching our inaugural charity mission to provide immediate educational support.' },
        { year: 'Phase 3', title: 'Regional Expansion', desc: 'Expanding coverage to 8 partner schools across target communities.' },
    ];
    const dashboardStats = [
        { label: 'Partner Schools', value: '5', suffix: '' },
        { label: 'Target Students', value: '120', suffix: '+' },
        { label: 'Schools planned', value: '8', suffix: '' },
        { label: 'Regions Covered', value: '2', suffix: '' },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="flex-grow relative z-10">
                    {/* HERO */}
                    <section className="relative w-full min-h-[70vh] flex flex-col items-start justify-center overflow-hidden bg-navy pt-20">
                        <div className="absolute inset-0 z-0">
                            <motion.div
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.4 }}
                                transition={{ duration: 2 }}
                                className="w-full h-full"
                            >
                                <img
                                    src="/assets/charity/our-expertize-in-action.png"
                                    alt="Impact scene"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent z-10" />
                        </div>
                        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full pt-32 pb-16">
                            <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] block mb-6">Measurable Change</span>
                            <h1 className="text-white text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter mb-8 max-w-4xl">
                                Driving Real <span className="text-secondary ">Transformation.</span>
                            </h1>
                            <p className="text-slate-300 text-xl font-medium max-w-xl leading-relaxed mb-12">
                                Our data-driven approach ensures every resource reaches the communities that need it most.
                            </p>
                            {/* Floating stats strip */}
                            <div className="flex flex-wrap gap-12 pt-12 border-t border-white/10">
                                {[{ v: '120+', l: 'Lives Targeted' }, { v: '8', l: 'Communities' }, { v: 'Pilot', l: 'Phase' }].map((s) => (
                                    <div key={s.l} className="space-y-1">
                                        <p className="text-white text-4xl font-black tracking-tighter">{s.v}</p>
                                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{s.l}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* KPI STATS */}
                    <section className="py-32 px-6 lg:px-20 bg-transparent text-center">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col items-center mb-20">
                                <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] block mb-6">Our Numbers</span>
                                <h2 className="text-navy text-4xl md:text-6xl font-black tracking-tighter">Impact in <span className="text-secondary ">Focus.</span></h2>
                                <div className="w-24 h-2 bg-secondary mt-8 rounded-full" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 animate-in fade-in duration-1000">
                                {[
                                    { icon: '/assets/charity website icons and photos/Scholarship.png', value: '120+', label: 'Students Targeted' },
                                    { icon: '/assets/charity website icons and photos/school.png', value: '8', label: 'Schools Targeted' },
                                    { icon: '/assets/charity website icons and photos/teacher rewards.png', value: '6', label: 'Teachers Recognized' },
                                    { icon: '/assets/charity website icons and photos/community health support.png', value: '8', label: 'Communities Helped' },
                                ].map((stat) => (
                                    <div key={stat.label} className="flex flex-col items-center gap-6 group">
                                        <div className="w-24 h-24 flex items-center justify-center text-navy transition-all duration-500">
                                            <img src={stat.icon} alt={stat.label} className="w-[4.5rem] h-[4.5rem] md:w-20 md:h-20 object-contain" />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-navy text-5xl font-black tracking-tighter">{stat.value}</span>
                                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* TIMELINE */}
                    <section className="py-20 px-6 lg:px-20 bg-transparent">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <span className="text-secondary font-bold tracking-widest uppercase text-xs block mb-4">Our Journey</span>
                                <h2 className="text-navy text-4xl font-black">Our Story of Growth</h2>
                            </div>
                            <div className="relative">
                                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />
                                <div className="space-y-12">
                                    {milestones.map((item) => (
                                        <div key={item.year} className="flex gap-8 pl-14 relative">
                                            <div className="absolute left-0 w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-black text-xs flex-shrink-0">
                                                {item.year.slice(2)}
                                            </div>
                                            <div className="flex-1 pb-12">
                                                <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-1">{item.year}</p>
                                                <h3 className="text-navy text-xl font-black mb-2">{item.title}</h3>
                                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* IMPACT DASHBOARD */}
                    <section className="py-20 px-6 lg:px-20 bg-navy">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col lg:flex-row gap-16 items-start">
                                <div className="lg:w-1/2">
                                    <span className="text-secondary font-bold tracking-widest uppercase text-xs block mb-4">Live Dashboard</span>
                                    <h2 className="text-white text-4xl font-black mb-4">Our Impact Dashboard</h2>
                                    <p className="text-slate-400 leading-relaxed mb-8">Track how your contributions are making a difference across Cameroon in real time.</p>
                                    <div className="grid grid-cols-2 gap-6">
                                        {dashboardStats.map((d) => (
                                            <div key={d.label} className="rounded-2xl p-6 text-center">
                                                <p className="text-secondary text-4xl font-black">{d.value}{d.suffix}</p>
                                                <p className="text-white text-sm mt-1 uppercase tracking-widest font-semibold opacity-60">{d.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Chart visualization */}
                                <div className="lg:w-1/2 rounded-[3rem] p-8">
                                    <p className="text-white font-bold text-sm mb-6 uppercase tracking-widest opacity-60">Program Distribution</p>
                                    {[
                                        { label: 'Scholarships', pct: 40, color: 'bg-secondary' },
                                        { label: 'Teacher Awards', pct: 25, color: 'bg-secondary' },
                                        { label: 'Community Dev', pct: 22, color: 'bg-secondary' },
                                        { label: 'Orphanage Support', pct: 13, color: 'bg-secondary' },
                                    ].map((bar, i) => (
                                        <div key={bar.label} className="mb-4">
                                            <div className="flex justify-between text-white text-xs mb-1">
                                                <span className="opacity-80">{bar.label}</span>
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    transition={{ delay: 0.5 + i * 0.1 }}
                                                    className="font-bold"
                                                >
                                                    {bar.pct}%
                                                </motion.span>
                                            </div>
                                            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                                                <motion.div
                                                    className={`${bar.color} h-2.5 rounded-full`}
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${bar.pct}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ANNUAL REPORTS */}
                    <section className="py-24 px-6 lg:px-20 bg-transparent">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                                <div>
                                    <span className="text-slate-500 font-black tracking-[0.3em] uppercase text-[10px] block mb-4">Transparency</span>
                                    <h2 className="text-navy text-4xl md:text-5xl font-black tracking-tighter">Strategic <span className="text-secondary ">Resources</span></h2>
                                </div>
                                <Link to="/impact" className="inline-flex items-center gap-3 text-navy font-black text-xs uppercase tracking-widest group">
                                    View All Reports <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {[
                                    { title: '2026-2028 Strategic Plan', href: '/resources/enako-strategic-plan-2026-2028.md', filename: 'enako-strategic-plan-2026-2028.md' },
                                    { title: 'Organization Prospectus 2026', href: '/resources/enako-organization-prospectus-2026.md', filename: 'enako-organization-prospectus-2026.md' },
                                ].map((item) => (
                                    <FadeIn key={item.title} direction="up" fullWidth>
                                        <div className="rounded-[3rem] p-12 transition-all duration-700 group relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:bg-secondary/10 transition-colors" />
                                            <div className="flex items-center gap-8 mb-10 relative z-10">
                                                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-500 shadow-inner">
                                                    <FileText className="w-10 h-10" />
                                                </div>
                                                <div>
                                                    <p className="text-navy text-2xl font-black tracking-tight mb-1 ">{item.title}</p>
                                                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Enako Outreach Foundation</p>
                                                </div>
                                            </div>
                                            <a
                                                href={item.href}
                                                download={item.filename}
                                                className="w-full h-20 bg-slate-50 rounded-2xl text-navy font-black text-xs uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500 flex items-center justify-center gap-4 shadow-sm active:scale-95 relative z-10"
                                            >
                                                <Download className="w-4 h-4" /> Download Resource
                                            </a>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ImpactPage;
