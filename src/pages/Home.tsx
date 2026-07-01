import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PremiumHeroCarousel from '../components/PremiumHeroCarousel';
import ProgramsGrid from '../components/ProgramsGrid';
import ImpactDashboard from '../components/ImpactDashboard';
import BeneficiaryStories from '../components/BeneficiaryStories';
import LatestBlog from '../components/LatestBlog';
import NewsletterCTA from '../components/NewsletterCTA';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';
import CameroonMap from '../components/CameroonMap';
import FadeIn from '../components/FadeIn';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, MapPin, BookOpen, Droplets, HeartPulse, Users, Rocket, LifeBuoy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FaqSection from '../components/FaqSection';
import ToolsGridSection from '../components/ToolsGridSection';



/* ─── Mission points ─── */
const missionPoints = [
    { icon: <BookOpen className="w-14 h-14" strokeWidth={1.2} />, label: 'Education Access', desc: 'Scholarships from primary to university level', color: '#1eb4d4' },
    { icon: <Droplets className="w-14 h-14" strokeWidth={1.2} />, label: 'Clean Water', desc: 'Boreholes and purification for rural communities', color: '#1eb4d4' },
    { icon: <HeartPulse className="w-14 h-14" strokeWidth={1.2} />, label: 'Healthcare', desc: 'Mobile clinics and community health workers', color: '#1eb4d4' },
    { icon: <Users className="w-14 h-14" strokeWidth={1.2} />, label: 'Women Support', desc: 'Empowering single mothers and widows', color: '#1c4980' },
    { icon: <Rocket className="w-14 h-14" strokeWidth={1.2} />, label: 'Youth Empowerment', desc: 'Skills training and entrepreneurship support', color: '#1c4980' },
    { icon: <LifeBuoy className="w-14 h-14" strokeWidth={1.2} />, label: 'Emergency Relief', desc: 'Rapid response for crisis-affected families', color: '#1c4980' },
];

const Home = () => {
    const { t } = useTranslation();

    const missionPointsT = t('home.mission.points', { returnObjects: true }) as any[];
    const missionTagsT = t('home.mission.tags', { returnObjects: true }) as string[];
    const regionsT = t('home.focus_communities.regions', { returnObjects: true }) as any[];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="relative z-10">

                    {/* 1. Hero Carousel */}
                    <PremiumHeroCarousel />

                    {/* 2. Our Mission */}
                    <section className="py-24 bg-[#f8fafc]">
                        <div className="max-w-7xl mx-auto px-6 md:px-12">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <FadeIn direction="up" scale={0.96} threshold={0.3}>
                                    <span className="text-[#1eb4d4] font-bold text-sm uppercase tracking-widest block mb-4">{t('home.mission.badge')}</span>
                                    <h2 className="text-[#1c4980] font-black text-3xl md:text-5xl leading-tight mb-6">
                                        {t('home.mission.title')}
                                        <span className="block">{t('home.mission.title_highlight')}</span>
                                    </h2>
                                    <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                        {t('home.mission.desc')}
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {missionTagsT.map((tag: string) => (
                                            <span key={tag} className="px-5 py-2 bg-white text-[#1c4980] text-xs font-bold rounded-full border border-slate-200 shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </FadeIn>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
                                {missionPoints.map((item, i) => (
                                    <FadeIn key={i} delay={i * 0.1} scale={0.98} direction="up">
                                        <div 
                                            className="group flex flex-col sm:flex-row items-start bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 h-full"
                                        >
                                            <div 
                                                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 mb-6 sm:mb-0 sm:mr-6 transition-transform duration-300 group-hover:scale-110"
                                                style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                            >
                                                {item.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-xl text-[#1c4980] mb-3 group-hover:text-[#1eb4d4] transition-colors">
                                                    {missionPointsT[i]?.label || item.label}
                                                </h3>
                                                <p className="text-slate-500 text-sm leading-relaxed">
                                                    {missionPointsT[i]?.desc || item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>

                            <FadeIn direction="up" className="text-center">
                                <Link to="/about" className="inline-flex items-center gap-2 bg-[#1c4980] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#153760] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    {t('home.mission.btn')} <ArrowRight className="w-5 h-5" />
                                </Link>
                            </FadeIn>
                        </div>
                    </section>

                    {/* 3. Quick Action Tools */}
                    <ToolsGridSection />

                    {/* 4. Programs Grid */}
                    <ProgramsGrid />

                    {/* 5. Impact Dashboard */}
                    <ImpactDashboard />



                    {/* 7. Focus Communities Map Preview */}
                    <section className="py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-6 md:px-12">
                            <div className="grid lg:grid-cols-2 gap-14 items-center">
                                <FadeIn direction="right" scale={0.95} threshold={0.3}>
                                    <span className="text-green-600 font-bold text-xs uppercase tracking-widest block mb-3">{t('home.focus_communities.badge')}</span>
                                    <h2 className="text-slate-900 font-black text-4xl md:text-5xl mb-4">
                                        {t('home.focus_communities.title')}
                                        <span className="block text-green-600">{t('home.focus_communities.title_highlight')}</span>
                                    </h2>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-6">
                                        {t('home.focus_communities.desc')}
                                    </p>
                                    <div className="space-y-3 mb-8">
                                        {regionsT.map((r: any, i: number) => (
                                            <FadeIn key={r.region} delay={0.2 + (i * 0.1)} direction="right" scale={0.9} threshold={0.8}>
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="font-bold text-slate-900 text-sm">{r.name} — </span>
                                                        <span className="text-slate-500 text-sm">{r.work}</span>
                                                    </div>
                                                </div>
                                            </FadeIn>
                                        ))}
                                    </div>
                                    <Link to="/focus-communities" className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-700 transition-colors">
                                        {t('home.focus_communities.btn')} <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </FadeIn>
                                <FadeIn direction="left" scale={0.9} threshold={0.2}>
                                    <CameroonMap />
                                </FadeIn>
                            </div>
                        </div>
                    </section>



                    {/* 9. Beneficiary Stories component */}
                    <BeneficiaryStories />

                    {/* 10. Latest Blog */}
                    <LatestBlog />

                    {/* 10.5 FAQ Section */}
                    <FaqSection />

                    {/* 11. Donation CTA Section */}
                    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#00BFA5' }}>
                        <div className="absolute inset-0">
                            <img
                                src="/assets/charity/Your Donation Changes Real Lives.png"
                                alt="Donation impact background"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-[#00BFA5]/80" />
                        {/* Dot grid overlay */}
                        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                            style={{ backgroundImage: 'radial-gradient(circle, #001B44 1.5px, transparent 1.5px)', backgroundSize: '36px 36px' }} />
                        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                            <FadeIn direction="up">
                                <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: '#001B44', opacity: 0.65 }}>{t('home.donation_cta.badge')}</span>
                                <h2 className="text-4xl md:text-6xl mb-4" style={{ color: '#001B44' }}>
                                    {t('home.donation_cta.title')}
                                    <span className="block">{t('home.donation_cta.title_highlight')}</span>
                                </h2>
                                <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(0,27,68,0.7)' }}>
                                    {t('home.donation_cta.desc')}
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <Link to="/donate" className="btn-pill btn-pill-primary text-base">
                                        <Heart className="w-5 h-5" /> {t('home.donation_cta.btn_donate')}
                                    </Link>
                                    <Link to="/partnership" className="btn-pill text-base" style={{ border: '2px solid rgba(0,27,68,0.35)', color: '#001B44', borderRadius: '9999px', padding: '1rem 2.25rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {t('home.donation_cta.btn_partner')} <ArrowRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                    </section>

                    {/* 12. Newsletter */}
                    <NewsletterCTA />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
