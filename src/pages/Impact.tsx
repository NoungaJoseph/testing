import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getPublicImpactData, type ImpactDataResponse } from '../lib/api/impact';

const ImpactPage = () => {
    const { t } = useTranslation();
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    const [data, setData] = useState<ImpactDataResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getPublicImpactData()
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError('Failed to load impact data');
                setLoading(false);
            });
    }, []);

    // Animation variants
    const maskReveal = {
        hidden: { y: "100%" },
        visible: { y: "0%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-[#001B44] items-center justify-center">
                <div className="w-16 h-16 border-4 border-white/20 border-t-[#00BFA5] rounded-none animate-spin" />
            </div>
        );
    }

    if (error || !data || !data.stats) {
        return (
            <div className="flex flex-col min-h-screen bg-slate-50">
                <Navbar />
                <div className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-6 text-center">
                    <div className="bg-white p-8 md:p-12 rounded-[2px] shadow-sm max-w-lg w-full border-t-4 border-red-500">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Unable to Load Data</h2>
                        <p className="text-slate-600 mb-6">{error || 'Data missing or invalid format'}</p>
                        <button onClick={() => window.location.reload()} className="bg-slate-900 text-white px-8 py-3 rounded-[2px] font-bold uppercase tracking-wider text-sm hover:bg-[#00BFA5] transition-colors">
                            Try Again
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Helper to get stat
    const getStat = (key: string, fallback: { v: string, l: string }) => {
        const found = data.stats.find(s => s.key === key);
        return found ? { v: found.value, l: found.label } : fallback;
    };

    const heroStats = [
        getStat('lives_targeted', { v: '120+', l: 'Lives Targeted' }),
        getStat('communities', { v: '8', l: 'Communities' }),
        getStat('phase', { v: 'Pilot', l: 'Phase' })
    ];

    const kpiStats = [
        getStat('kpi_students', { v: '120+', l: 'Students Targeted' }),
        getStat('kpi_schools', { v: '8', l: 'Schools Targeted' }),
        getStat('kpi_teachers', { v: '6', l: 'Teachers Recognized' }),
        getStat('kpi_communities', { v: '8', l: 'Communities Helped' }),
    ];

    const dashboardStats = [
        getStat('dash_schools', { v: '5', l: 'Partner Schools' }),
        getStat('dash_students', { v: '120+', l: 'Target Students' }),
        getStat('dash_planned', { v: '8', l: 'Schools planned' }),
        getStat('dash_regions', { v: '2', l: 'Regions Covered' }),
    ];

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <main className="flex-grow">
                {/* HERO - PARALLAX & SHARP TYPOGRAPHY */}
                <section className="relative w-full h-[85vh] min-h-[600px] flex flex-col justify-end overflow-hidden bg-[#001B44]">
                    <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
                        <img
                            src="/assets/images/new_assets/impact_hero.png"
                            alt="Impact scene"
                            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001B44] via-[#001B44]/20 to-transparent z-10" />
                    
                    <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full pb-20">
                        <div className="overflow-hidden mb-6">
                            <motion.span 
                                variants={maskReveal} initial="hidden" animate="visible"
                                className="text-[#00BFA5] font-black tracking-[0.4em] uppercase text-[10px] block"
                            >
                                {t('impact.hero.badge')}
                            </motion.span>
                        </div>
                        <div className="overflow-hidden mb-8">
                            <motion.h1 
                                variants={maskReveal} initial="hidden" animate="visible"
                                className="text-white text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter"
                            >
                                {t('impact.hero.title')} <br />
                                <span className="text-[#00BFA5]">{t('impact.hero.title_highlight')}</span>
                            </motion.h1>
                        </div>
                        <motion.p 
                            variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}
                            className="text-slate-300 text-lg font-medium max-w-xl leading-relaxed mb-12"
                        >
                            {t('impact.hero.desc')}
                        </motion.p>

                        {/* Sharp Stats Strip */}
                        <div className="flex flex-wrap gap-16 pt-8 border-t border-white/20">
                            {heroStats.map((s, i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-white text-3xl font-black tracking-tighter">{s.v}</p>
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{s.l}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* KPI STATS - SHARP TYPOGRAPHY & NO ICONS */}
                <section className="py-32 px-6 lg:px-20 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b-2 border-slate-900 pb-8">
                            <div>
                                <span className="text-[#00BFA5] font-black tracking-[0.4em] uppercase text-[10px] block mb-4">{t('impact.kpi.badge')}</span>
                                <h2 className="text-[#001B44] text-4xl md:text-6xl font-black tracking-tighter uppercase">{t('impact.kpi.title')} <span className="text-[#00BFA5] ">{t('impact.kpi.title_highlight')}</span></h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200">
                            {kpiStats.map((stat, i) => (
                                <motion.div 
                                    key={i} 
                                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                                    variants={fadeUp} transition={{ delay: i * 0.1 }}
                                    className="flex flex-col justify-between p-12 border-r border-b border-slate-200 group hover:bg-[#001B44] transition-colors duration-500 h-64 relative overflow-hidden bg-white"
                                >
                                    <div className="absolute inset-0 bg-[#00BFA5] translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                                    <span className="text-[#001B44] text-4xl font-black tracking-tighter group-hover:text-white transition-colors duration-500 relative z-10">{stat.v}</span>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white relative z-10 transition-colors duration-500">{stat.l}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* TIMELINE - BRUTALIST LINES */}
                <section className="py-24 px-6 lg:px-20 bg-slate-50">
                    <div className="max-w-5xl mx-auto">
                        <div className="mb-20">
                            <span className="text-[#00BFA5] font-black tracking-widest uppercase text-[10px] block mb-4">{t('impact.timeline.badge')}</span>
                            <h2 className="text-[#001B44] text-5xl font-black uppercase tracking-tighter">{t('impact.timeline.title')}</h2>
                        </div>
                        <div className="space-y-0">
                            {data.milestones.map((item) => (
                                <motion.div 
                                    key={item.id} 
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                                    className="flex flex-col md:flex-row gap-8 md:gap-16 border-t-2 border-slate-200 py-12 group hover:border-[#00BFA5] transition-colors duration-500"
                                >
                                    <div className="w-32 flex-shrink-0">
                                        <p className="text-[#00BFA5] font-black text-xl tracking-tighter uppercase">{item.year}</p>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[#001B44] text-3xl font-black mb-4 uppercase tracking-tighter group-hover:text-[#00BFA5] transition-colors">{item.title}</h3>
                                        <p className="text-slate-600 text-lg leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                            <div className="border-t-2 border-slate-200" />
                        </div>
                    </div>
                </section>

                {/* IMPACT DASHBOARD - SHARP GRIDS */}
                <section className="py-32 px-6 lg:px-20 bg-[#001B44] text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-16 items-start">
                            <div className="lg:w-1/2">
                                <div className="mb-12">
                                    <span className="text-[#00BFA5] font-black tracking-[0.3em] uppercase text-[10px] block mb-4">{t('impact.dashboard.badge')}</span>
                                    <h2 className="text-5xl font-black tracking-tighter uppercase mb-6">{t('impact.dashboard.title')}</h2>
                                    <p className="text-slate-400 text-lg leading-relaxed">{t('impact.dashboard.desc')}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-0 border-t border-l border-white/10">
                                    {dashboardStats.map((d, i) => (
                                        <div key={i} className="p-8 border-r border-b border-white/10 hover:bg-white/5 transition-colors">
                                            <p className="text-[#00BFA5] text-5xl font-black tracking-tighter">{d.v}</p>
                                            <p className="text-slate-400 text-[10px] mt-4 uppercase tracking-[0.2em] font-black">{d.l}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Sharp Chart visualization */}
                            <div className="lg:w-1/2 bg-white/5 p-12 border-2 border-white/10 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00BFA5]/20 blur-[100px]" />
                                <p className="font-black text-[10px] mb-12 uppercase tracking-[0.3em] text-[#00BFA5]">{t('impact.dashboard.chart_title')}</p>
                                {data.charts.map((bar, i) => (
                                    <div key={bar.id} className="mb-8">
                                        <div className="flex justify-between text-xs mb-3 font-black uppercase tracking-widest">
                                            <span className="text-slate-300">{bar.label}</span>
                                            <motion.span
                                                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}
                                                className="text-white"
                                            >
                                                {bar.percentage}%
                                            </motion.span>
                                        </div>
                                        {/* Sharp loading bar */}
                                        <div className="w-full bg-white/10 h-[2px] relative">
                                            <motion.div
                                                className={`${bar.color} h-[2px] absolute top-0 left-0`}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${bar.percentage}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ANNUAL REPORTS - REVEAL HOVER */}
                {data.reports.length > 0 && (
                <section className="py-32 px-6 lg:px-20 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20 border-b-2 border-slate-900 pb-8">
                            <div>
                                <span className="text-[#00BFA5] font-black tracking-[0.3em] uppercase text-[10px] block mb-4">{t('impact.reports.badge')}</span>
                                <h2 className="text-[#001B44] text-5xl md:text-7xl font-black tracking-tighter uppercase">{t('impact.reports.title')} <span className="text-[#00BFA5] ">{t('impact.reports.title_highlight')}</span></h2>
                            </div>
                            <Link to="/impact" className="text-[#001B44] font-black text-xs uppercase tracking-[0.2em] hover:text-[#00BFA5] transition-colors">
                                {t('impact.reports.view_all')}
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {data.reports.map((item, i) => (
                                    <motion.a
                                        key={item.id}
                                        href={`data:application/${item.type.toLowerCase()};base64,${item.data}`}
                                        download={`${item.title}.${item.type.toLowerCase()}`}
                                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                                        className="group relative block bg-slate-50 border-2 border-slate-200 p-12 overflow-hidden hover:border-[#001B44] transition-colors duration-500"
                                    >
                                        <div className="absolute inset-0 bg-[#001B44] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" />
                                        <div className="relative z-10 flex flex-col justify-between h-full min-h-[200px]">
                                            <div>
                                                <p className="text-[#00BFA5] font-black text-[10px] uppercase tracking-[0.3em] mb-4">{t('impact.reports.org_name')}</p>
                                                <h3 className="text-[#001B44] text-3xl font-black tracking-tighter uppercase group-hover:text-white transition-colors duration-500 leading-tight pr-8">{item.title}</h3>
                                            </div>
                                            <div className="mt-12 overflow-hidden">
                                                <span className="inline-block text-[#001B44] font-black text-xs uppercase tracking-[0.2em] group-hover:text-[#00BFA5] transition-colors translate-y-full group-hover:translate-y-0 duration-500">
                                                    {t('impact.reports.download')}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                        </div>
                    </div>
                </section>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ImpactPage;
