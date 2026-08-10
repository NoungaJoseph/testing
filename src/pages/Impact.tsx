import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { getPublicImpactData, type ImpactDataResponse } from '../lib/api/impact';
import { FolderKanban, MapPin, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ImpactPage = () => {
    const { t } = useTranslation();
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    const [data, setData] = useState<ImpactDataResponse | null>(null);
    const [dbProjects, setDbProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPublicImpactData()
            .then(res => {
                setData(res);
            })
            .catch(() => {
                setData({
                    stats: [
                        { id: '1', key: 'lives_impacted', value: '500,000+', label: 'Lives Impacted', section: 'hero', order: 1 },
                        { id: '2', key: 'countries', value: '12', label: 'Countries Reached', section: 'hero', order: 2 },
                        { id: '3', key: 'volunteers', value: '1,200+', label: 'Active Volunteers', section: 'hero', order: 3 },
                        { id: '4', key: 'projects', value: '45+', label: 'Projects Completed', section: 'hero', order: 4 },
                    ],
                    milestones: [
                        { id: '1', year: '2020', title: 'Foundation', description: 'ENAKO OS established.', order: 1 },
                        { id: '2', year: '2023', title: 'Expansion', description: 'Reached 10 countries.', order: 2 }
                    ],
                    charts: [],
                    reports: []
                });
            });

        fetch('https://api.enakoos.com/api/v1/outreach/community-projects')
            .then(res => res.json())
            .then(resData => {
                if (Array.isArray(resData)) {
                    setDbProjects(resData);
                }
            })
            .catch(err => console.error('Failed to fetch projects:', err))
            .finally(() => setLoading(false));
    }, []);

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
    };

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-[#001B44] items-center justify-center">
                <div className="w-16 h-16 border-4 border-white/20 border-t-[#1eb4d4] rounded-full animate-spin" />
            </div>
        );
    }

    const kpiStats = data?.stats.map(s => ({ v: s.value, l: s.label })) || [];

    return (
        <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans selection:bg-[#1eb4d4] selection:text-[#001B44]">
            <Navbar />

            <main className="flex-grow">
                {/* HERO SECTION */}
                <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#001B44]">
                    <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
                        <img 
                            src="/assets/images/new_assets/impact_hero.png" 
                            alt="ENAKO OS Impact" 
                            className="w-full h-full object-cover opacity-30 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001B44] via-[#001B44]/60 to-transparent" />
                    </motion.div>

                    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white space-y-6">
                        <span className="inline-block text-[#1eb4d4] font-black text-xs uppercase tracking-[0.3em] bg-[#1eb4d4]/10 px-4 py-1.5 rounded-full border border-[#1eb4d4]/30">
                            Verified Field Projects & Regional Impact
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none">
                            Our Projects
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
                            Explore live community projects across Cameroon, posted directly by our field Outreach Managers.
                        </p>
                    </div>
                </section>

                {/* PROJECTS GALLERY SECTION - Styled matching user screenshot */}
                <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-200 pb-6">
                        <div>
                            <span className="text-[#1eb4d4] font-black tracking-widest uppercase text-xs block mb-2">{t('impact.live_registry', 'Live Database Registry')}</span>
                            <h2 className="text-[#001B44] text-4xl md:text-5xl font-black uppercase tracking-tight">{t('impact.active_projects', 'Active Regional Projects')}</h2>
                        </div>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                            {dbProjects.length} {t('impact.verified_initiatives', 'Verified Field Initiatives')}
                        </span>
                    </div>

                    {dbProjects.length === 0 ? (
                        <div className="bg-white border border-slate-200/90 rounded-2xl p-16 text-center space-y-4 max-w-2xl mx-auto">
                            <FolderKanban className="w-12 h-12 text-[#1eb4d4] mx-auto opacity-70" />
                            <h3 className="text-xl font-bold text-[#001B44]">{t('impact.no_projects_title', 'No Field Projects Published Yet')}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto font-medium">
                                {t('impact.no_projects_desc', 'Projects posted by Outreach Managers from the dashboard will appear here live with community details and funding targets.')}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {dbProjects.map((proj) => {
                                const target = parseFloat(proj.targetAmount || '0');
                                const current = parseFloat(proj.currentAmount || '0');
                                const percent = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

                                return (
                                    <div 
                                        key={proj.id}
                                        className="bg-white border border-slate-200/90 hover:border-[#1eb4d4]/60 rounded-2xl p-8 flex flex-col justify-between text-center transition-all duration-300 hover:shadow-md group"
                                    >
                                        <div className="space-y-4">
                                            {/* Town / City Badge */}
                                            <div className="inline-flex items-center gap-1.5 bg-[#1eb4d4]/10 text-[#1eb4d4] font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-[#1eb4d4]/20 mx-auto">
                                                <MapPin className="w-3.5 h-3.5" />
                                                <span>{proj.communitySlug.toUpperCase()}</span>
                                            </div>

                                            {/* Centered Cyan Icon */}
                                            <div className="w-14 h-14 bg-[#1eb4d4]/10 rounded-2xl flex items-center justify-center mx-auto text-[#1eb4d4]">
                                                <FolderKanban className="w-7 h-7" />
                                            </div>

                                            {/* Centered Cyan Title */}
                                            <h3 className="text-xl font-bold text-[#1eb4d4] leading-snug">{proj.title}</h3>

                                            {/* Centered Subtle Description */}
                                            <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-3">
                                                {proj.description}
                                            </p>
                                        </div>

                                        <div className="space-y-4 pt-6 mt-6 border-t border-slate-100">
                                            <div>
                                                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                                                    <span>Raised: {current.toLocaleString()} XAF</span>
                                                    <span className="text-[#1eb4d4]">{percent}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#1eb4d4] rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                                                </div>
                                            </div>

                                            <Link
                                                to={`/communities/${proj.communitySlug}/projects`}
                                                className="w-full py-3.5 bg-[#001B44] hover:bg-[#1eb4d4] hover:text-[#001B44] text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                            >
                                                <span>View Full Details & Fund</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* KPI STATS */}
                <section className="py-24 px-6 lg:px-20 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200">
                            {kpiStats.map((stat, i) => (
                                <motion.div 
                                    key={i} 
                                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    variants={fadeUp} transition={{ delay: i * 0.1 }}
                                    className="flex flex-col justify-between p-10 border-r border-b border-slate-200 group hover:bg-[#001B44] transition-colors duration-500 h-56 relative overflow-hidden bg-white"
                                >
                                    <span className="text-[#001B44] text-4xl font-black tracking-tighter group-hover:text-white transition-colors duration-500 relative z-10">{stat.v}</span>
                                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest group-hover:text-white relative z-10 transition-colors duration-500">{stat.l}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ImpactPage;
