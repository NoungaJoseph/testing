import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CameroonMap from '../components/CameroonMap';
import FadeIn from '../components/FadeIn';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Users, Droplets, Heart, GraduationCap, HeartHandshake, AlertTriangle, CheckCircle } from 'lucide-react';
import { ACTION_LINKS } from '../constants/actionLinks';
import { useTranslation } from 'react-i18next';

const regionIconMap = [
    <Droplets className="w-5 h-5" />,
    <GraduationCap className="w-5 h-5" />,
    <AlertTriangle className="w-5 h-5" />,
    <AlertTriangle className="w-5 h-5" />,
    <HeartHandshake className="w-5 h-5" />,
];

const regionColors = [
    { color: 'bg-cyan-500', colorLight: 'bg-cyan-50', colorText: 'text-cyan-700', colorBorder: 'border-cyan-200' },
    { color: 'bg-blue-500', colorLight: 'bg-blue-50', colorText: 'text-blue-700', colorBorder: 'border-blue-200' },
    { color: 'bg-orange-500', colorLight: 'bg-orange-50', colorText: 'text-orange-700', colorBorder: 'border-orange-200' },
    { color: 'bg-red-500', colorLight: 'bg-red-50', colorText: 'text-red-700', colorBorder: 'border-red-200' },
    { color: 'bg-purple-500', colorLight: 'bg-purple-50', colorText: 'text-purple-700', colorBorder: 'border-purple-200' },
];

const interventionImages = [
    '/assets/focus communities/boreholes drilled.png',
    '/assets/focus communities/mobile clinics.png',
    '/assets/focus communities/scholarships.png',
    '/assets/focus communities/beneficiaries.png',
    '/assets/focus communities/families.png',
];

const interventionIcons = [
    <Droplets className="w-5 h-5 text-cyan-600" />,
    <Heart className="w-5 h-5 text-red-600" />,
    <GraduationCap className="w-5 h-5 text-blue-600" />,
    <HeartHandshake className="w-5 h-5 text-purple-600" />,
    <Users className="w-5 h-5 text-green-600" />,
    <AlertTriangle className="w-5 h-5 text-orange-600" />,
];

const FocusCommunities = () => {
    const { t } = useTranslation();

    const interventions = t('focus_communities.interventions', { returnObjects: true }) as any[];
    const regionCards = t('focus_communities.region_cards', { returnObjects: true }) as any[];
    const interventionsList = t('focus_communities.interventions_list', { returnObjects: true }) as any[];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ── HERO ── */}
            <section className="relative pt-40 pb-24 overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url('/assets/focus communities/focus community.png')` }}>
                <div className="absolute inset-0 bg-black/35" />
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <FadeIn direction="up">
                        <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 text-center">
                            {t('focus_communities.hero_title')}
                        </h1>
                    </FadeIn>
                </div>
            </section>

            {/* ── KEY INTERVENTIONS (IMAGE + DESCRIPTION STACK) ── */}
            <section className="py-12 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
                    {interventions.map((item: any, idx: number) => (
                        <FadeIn key={item.slug} direction="up">
                            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:h-64">
                                <div className="w-full lg:w-1/2 flex-shrink-0">
                                    <div className="w-full h-full overflow-hidden">
                                        <img src={interventionImages[idx]} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/2 flex-1 flex flex-col justify-center">
                                    <div className="text-slate-400 text-sm font-semibold mb-2">{item.count}</div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-3">
                                        <Link to={`/focus-communities/${item.slug}`} className="underline hover:text-green-600">{item.title}</Link>
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* ── INTERACTIVE MAP ── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left: Map */}
                        <FadeIn direction="right">
                            <div>
                                <span className="text-green-600 font-bold text-xs uppercase tracking-widest block mb-3">{t('focus_communities.map_label')}</span>
                                <h2 className="text-slate-900 font-black text-3xl md:text-4xl mb-3">
                                    {t('focus_communities.map_title')}
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                    {t('focus_communities.map_desc')}
                                </p>
                                <CameroonMap />
                            </div>
                        </FadeIn>

                        {/* Right: What we do */}
                        <FadeIn direction="left">
                            <div className="space-y-5">
                                <span className="text-green-600 font-bold text-xs uppercase tracking-widest block">{t('focus_communities.intervention_types_label')}</span>
                                <h2 className="text-slate-900 font-black text-3xl md:text-4xl mb-6">
                                    {t('focus_communities.intervention_types_title')}
                                </h2>
                                {interventionsList.map((item: any, idx: number) => (
                                    <motion.div
                                        key={item.title}
                                        whileHover={{ x: 4 }}
                                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-green-50 transition-colors group cursor-default"
                                    >
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-shadow">
                                            {interventionIcons[idx]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm mb-0.5">{item.title}</h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── REGION CARDS ── */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <FadeIn direction="up" className="text-center mb-14">
                        <span className="text-green-600 font-bold text-xs uppercase tracking-widest block mb-3">{t('focus_communities.regions_label')}</span>
                        <h2 className="text-slate-900 font-black text-4xl md:text-5xl mb-4">{t('focus_communities.regions_title')}</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            {t('focus_communities.regions_desc')}
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regionCards.map((region: any, i: number) => {
                            const colors = regionColors[i] || regionColors[0];
                            return (
                                <FadeIn key={region.name} direction="up" delay={i * 0.08}>
                                    <motion.div
                                        whileHover={{ y: -4 }}
                                        className={`rounded-3xl overflow-hidden transition-all duration-500`}
                                    >
                                        {/* Card Header */}
                                        <div className={`${colors.colorLight} p-6 border-b ${colors.colorBorder}`}>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className={`w-10 h-10 rounded-xl ${colors.color} text-white flex items-center justify-center`}>
                                                    {regionIconMap[i]}
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-slate-900 text-base">{region.name}</h3>
                                                    <div className={`flex items-center gap-1 text-xs font-semibold ${colors.colorText}`}>
                                                        <MapPin className="w-3 h-3" />{region.city}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className={`text-xs font-bold ${colors.colorText} flex items-center gap-1.5`}>
                                                <CheckCircle className="w-3.5 h-3.5" /> {region.stat}
                                            </p>
                                        </div>
                                        {/* Card Body */}
                                        <div className="p-6">
                                            <p className="text-slate-500 text-sm leading-relaxed mb-4">{region.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {region.tags.map((tag: string) => (
                                                    <span key={tag} className={`px-2.5 py-1 ${colors.colorLight} ${colors.colorText} text-[10px] font-bold rounded-full border ${colors.colorBorder}`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 relative overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url('/assets/charity/Ready to Make a Difference.png')` }}>
                <div className="absolute inset-0 bg-black/35" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <FadeIn direction="up">
                        <h2 className="text-white font-black text-4xl md:text-5xl mb-6">
                            {t('focus_communities.cta_title')}
                        </h2>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/donate" className="no-underline bg-white text-green-700 font-bold px-10 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-xl">
                                {t('focus_communities.cta_donate')}
                            </Link>
                            <Link to={ACTION_LINKS.reportCase} className="no-underline border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white/10 transition-colors">
                                {t('focus_communities.cta_report')}
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FocusCommunities;
