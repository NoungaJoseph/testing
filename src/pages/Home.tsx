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
    { icon: <BookOpen className="w-10 h-10" strokeWidth={1.5} />, label: 'Education Access', desc: 'Scholarships from primary to university level across Cameroon', color: '#1eb4d4' },
    { icon: <Droplets className="w-10 h-10" strokeWidth={1.5} />, label: 'Clean Water', desc: 'Boreholes and purification for rural communities', color: '#1eb4d4' },
    { icon: <HeartPulse className="w-10 h-10" strokeWidth={1.5} />, label: 'Healthcare', desc: 'Mobile clinics and community health workers', color: '#1eb4d4' },
    { icon: <Users className="w-10 h-10" strokeWidth={1.5} />, label: 'Women Support', desc: 'Empowering single mothers and widows', color: '#1c4980' },
    { icon: <Rocket className="w-10 h-10" strokeWidth={1.5} />, label: 'Youth Empowerment', desc: 'Skills training and entrepreneurship support', color: '#1c4980' },
    { icon: <LifeBuoy className="w-10 h-10" strokeWidth={1.5} />, label: 'Emergency Relief', desc: 'Rapid response for crisis-affected families', color: '#1c4980' },
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
                    <section className="ds-section bg-[#f8fafc]">
                        <div className="ds-container">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <FadeIn direction="up" scale={0.96} threshold={0.3}>
                                    <span className="ds-badge mb-3">{t('home.mission.badge')}</span>
                                    <h2 className="ds-h2 mb-6">
                                        {t('home.mission.title')}{' '}
                                        <span className="block text-[#1eb4d4]">{t('home.mission.title_highlight')}</span>
                                    </h2>
                                    <p className="ds-body mb-8">
                                        {t('home.mission.desc')}
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2.5">
                                        {missionTagsT.map((tag: string) => (
                                            <span key={tag} className="px-4 py-1.5 bg-white text-[#1c4980] text-xs font-bold uppercase tracking-wider rounded border border-slate-200 shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </FadeIn>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {missionPoints.map((item, i) => (
                                    <FadeIn key={i} delay={i * 0.08} scale={0.98} direction="up">
                                        <div 
                                            className="ds-card flex flex-col items-start h-full"
                                        >
                                            <div 
                                                className="w-14 h-14 rounded-lg flex items-center justify-center mb-5"
                                                style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                            >
                                                {item.icon}
                                            </div>
                                            <h3 className="ds-h3 mb-2 text-[#1c4980]">
                                                {missionPointsT[i]?.label || item.label}
                                            </h3>
                                            <p className="ds-body-sm">
                                                {missionPointsT[i]?.desc || item.desc}
                                            </p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>

                            <FadeIn direction="up" className="text-center">
                                <Link to="/about" className="ds-btn ds-btn-primary">
                                    {t('home.mission.btn')} <ArrowRight className="w-4 h-4 ml-1" />
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
                    <section className="ds-section bg-white">
                        <div className="ds-container">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <FadeIn direction="right" scale={0.95} threshold={0.3}>
                                    <span className="ds-badge mb-3">{t('home.focus_communities.badge')}</span>
                                    <h2 className="ds-h2 mb-4">
                                        {t('home.focus_communities.title')}{' '}
                                        <span className="block text-[#1eb4d4]">{t('home.focus_communities.title_highlight')}</span>
                                    </h2>
                                    <p className="ds-body mb-6">
                                        {t('home.focus_communities.desc')}
                                    </p>
                                    <div className="space-y-3 mb-8">
                                        {regionsT.map((r: any, i: number) => (
                                            <FadeIn key={r.name || i} delay={0.15 + (i * 0.08)} direction="right" scale={0.9} threshold={0.8}>
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-4 h-4 text-[#1c4980] flex-shrink-0 mt-1" />
                                                    <div>
                                                        <span className="font-bold text-[#111] text-sm">{r.name} - </span>
                                                        <span className="text-slate-600 text-sm">{r.work}</span>
                                                    </div>
                                                </div>
                                            </FadeIn>
                                        ))}
                                    </div>
                                    <Link to="/focus-communities" className="ds-btn ds-btn-primary">
                                        {t('home.focus_communities.btn')} <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </FadeIn>
                                <FadeIn direction="left" scale={0.9} threshold={0.2}>
                                    <CameroonMap />
                                </FadeIn>
                            </div>
                        </div>
                    </section>

                    {/* 9. Beneficiary Stories */}
                    <BeneficiaryStories />

                    {/* 10. Latest Blog */}
                    <LatestBlog />

                    {/* 10.5 FAQ Section */}
                    <FaqSection />

                    {/* 11. Donation CTA Section (Matching Section 4 of Donate page - Dark Black CTA Banner) */}
                    <section className="bg-black py-16 px-6 text-center">
                        <div className="max-w-3xl mx-auto">
                            <FadeIn direction="up">
                                <p className="font-extrabold uppercase tracking-wide text-lg md:text-2xl text-white mb-8 leading-snug">
                                    YOU CANNOT CHANGE WHERE THEY WERE BORN.<br />
                                    BUT YOU CAN CHANGE WHAT HAPPENS NEXT.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <Link to="/donate" className="ds-btn ds-btn-primary px-8 py-4 text-base">
                                        <Heart className="w-4 h-4 mr-1" /> GIVE NOW
                                    </Link>
                                    <Link to="/partnership" className="ds-btn ds-btn-outline-white px-8 py-4 text-base">
                                        BECOME A PARTNER <ArrowRight className="w-4 h-4 ml-1" />
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
