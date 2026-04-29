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
import { motion } from 'framer-motion';
import { Heart, ArrowRight, MapPin, CheckCircle } from 'lucide-react';
import { ACTION_LINKS } from '../constants/actionLinks';
import { useEffect, useState } from 'react';

/* ─── CTA Cards Data ─── */
const ctaCards = [
    {
        image: '/assets/charity/apply-for-help.png',
        title: 'Apply for Help',
        desc: 'Need support for education, healthcare, or emergency assistance? Apply through our programme intake.',
        to: ACTION_LINKS.applyHelp,
        label: 'Start Application',
    },
    {
        image: '/assets/charity/report-community-issue.png',
        title: 'Report Community Issue',
        desc: 'Know of a community in need of clean water, healthcare, or urgent humanitarian support?',
        to: ACTION_LINKS.reportCase,
        label: 'Report a Case',
    },
    {
        image: '/assets/charity/donate-now.png',
        title: 'Donate Now',
        desc: 'Every contribution funds education, clean water, and healthcare for families across Cameroon.',
        to: '/donate',
        label: 'Donate Today',
    },
    {
        image: '/assets/charity/partner-with-us.png',
        title: 'Partner With Us',
        desc: 'Organisations and individuals can partner with Enako Outreach to amplify our community impact.',
        to: '/partnership',
        label: 'Start Partnership',
    },
];

/* ─── Success Stories ─── */
const successStories = [
    {
        name: 'Amina Bello',
        region: 'North West Region',
        program: 'Single Mothers Assistance',
        quote: 'After losing my husband, I had no income and three children to feed. Enako gave me skills training and startup funds — I now run my own tailoring business and can pay my children\'s school fees.',
        image: '/assets/charity/our-expertize-in-action.png',
        color: 'border-purple-200 bg-purple-50',
        tagColor: 'bg-purple-100 text-purple-700',
    },
    {
        name: 'Emmanuel Fon',
        region: 'West Region',
        program: 'University Scholarship',
        quote: 'I scored top marks in my BEPC but my family couldn\'t afford university. Enako\'s scholarship paid my entire engineering degree. Today I work at a construction firm in Douala.',
        image: '/assets/charity/our-expertize-in-action.png',
        color: 'border-blue-200 bg-blue-50',
        tagColor: 'bg-blue-100 text-blue-700',
    },
    {
        name: 'Clarisse Mbah',
        region: 'Littoral Region',
        program: 'Clean Water Initiative',
        quote: 'Our village women used to walk 4km each morning for water. Since the borehole was installed last year, we have clean water 50 metres from our homes. It has changed everything.',
        image: '/assets/charity/our-expertize-in-action.png',
        color: 'border-cyan-200 bg-cyan-50',
        tagColor: 'bg-cyan-100 text-cyan-700',
    },
];

/* ─── Mission points ─── */
const missionPoints = [
    { icon: '/assets/charity/education-access.png', label: 'Education Access', desc: 'Scholarships from primary to university level' },
    { icon: '/assets/charity/clean-water.png', label: 'Clean Water', desc: 'Boreholes and purification for rural communities' },
    { icon: '/assets/charity/healthcare.png', label: 'Healthcare', desc: 'Mobile clinics and community health workers' },
    { icon: '/assets/charity/woman-support.png', label: 'Women Support', desc: 'Empowering single mothers and widows' },
    { icon: '/assets/updates/youth empowerment icon.png', label: 'Youth Empowerment', desc: 'Skills training and entrepreneurship support' },
    { icon: '/assets/charity/emergency-relief.png', label: 'Emergency Relief', desc: 'Rapid response for crisis-affected families' },
];

const Home = () => {
    const [activeStory, setActiveStory] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveStory((prev) => (prev + 1) % successStories.length);
        }, 7000);
        return () => window.clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="relative z-10">

                    {/* 1. Hero Carousel */}
                    <PremiumHeroCarousel />

                    {/* 2. Our Mission */}
                    <section className="py-24" style={{ backgroundColor: '#FDFBF7' }}>
                        <div className="max-w-7xl mx-auto px-6 md:px-12">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <FadeIn direction="right" scale={0.96} threshold={0.3}>
                                    <span className="text-green-600 font-bold text-xs uppercase tracking-widest block mb-3">Our Mission</span>
                                    <h2 className="text-slate-900 font-black text-4xl md:text-5xl leading-tight mb-6">
                                        Transforming Lives Across
                                        <span className="block text-green-600">Cameroon</span>
                                    </h2>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                                        Enako Outreach is a registered humanitarian NGO dedicated to empowering communities across Cameroon. We work at the grassroots level — partnering with local leaders, schools, and health workers to deliver targeted, sustainable programmes where they matter most.
                                    </p>
                                    <div className="flex flex-wrap gap-3 mb-8">
                                        {['Education', 'Healthcare', 'Clean Water', 'Women Empowerment', 'Youth', 'Emergency Relief'].map((tag, i) => (
                                            <FadeIn key={tag} delay={i * 0.05} direction="up" scale={0.8} threshold={0.5}>
                                                <span className="px-4 py-1.5 bg-green-50 text-slate-900 text-xs font-bold rounded-full border border-slate-200">
                                                    {tag}
                                                </span>
                                            </FadeIn>
                                        ))}
                                    </div>
                                    <Link to="/about" className="inline-flex items-center gap-2 text-green-600 font-bold hover:gap-4 transition-all">
                                        Learn About Our Work <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </FadeIn>
                                <FadeIn direction="right" scale={0.95}>
                                    <div className="grid grid-cols-2 gap-4">
                                        {missionPoints.map((item, i) => (
                                            <FadeIn key={i} delay={i * 0.1} scale={0.9} direction={i % 2 === 0 ? 'right' : 'left'}>
                                                <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }}
                                                    className="p-6 transition-all duration-300">
                                                    <img src={item.icon} alt={item.label} className="w-32 h-32 object-contain mb-4" />
                                                    <h4 className="font-black text-slate-900 text-2xl mb-2">{item.label}</h4>
                                                    <p className="text-slate-600 text-base leading-relaxed">{item.desc}</p>
                                                </motion.div>
                                            </FadeIn>
                                        ))}
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                    </section>

                    {/* 3. CTA Action Cards */}
                    <section className="py-16 bg-white">
                        <div className="max-w-7xl mx-auto px-6 md:px-12">
                            <FadeIn direction="up" scale={0.92} threshold={0.3} className="text-center mb-12">
                                <h2 className="text-slate-900 font-black text-3xl md:text-4xl mb-3">How Can We Help You?</h2>
                                <p className="text-slate-600 text-lg">Take action — whether you need assistance or want to give it.</p>
                            </FadeIn>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {ctaCards.map((card, i) => (
                                    <FadeIn key={card.title} direction="up" delay={i * 0.1} scale={0.9} threshold={0.2}>
                                        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                                            <Link to={card.to} className="no-underline relative block group h-[360px] overflow-hidden" style={{ borderRadius: '2rem' }}>
                                                <img
                                                    src={card.image}
                                                    alt={card.title}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent" />
                                                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                                                    <h3 className="font-black text-3xl text-white mb-2">{card.title}</h3>
                                                    <p className="text-white/90 text-base leading-relaxed mb-4 max-w-xl">{card.desc}</p>
                                                    <span className="inline-flex items-center gap-1.5 text-[#00C2C7] font-black text-sm uppercase tracking-widest group-hover:gap-3 transition-all">
                                                        {card.label} <ArrowRight className="w-3.5 h-3.5" />
                                                    </span>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 4. Programs Grid */}
                    <ProgramsGrid />

                    {/* 5. Impact Dashboard */}
                    <ImpactDashboard />

                    {/* 6. Cameroon Mapping Journey Video */}
                    <section className="py-24" style={{ backgroundColor: '#FDFBF7' }}>
                        <div className="max-w-7xl mx-auto px-6 md:px-12">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <FadeIn direction="right" scale={0.95} threshold={0.3}>
                                    <span className="text-green-600 font-bold text-xs uppercase tracking-widest block mb-3">Regional Mapping</span>
                                    <h2 className="text-slate-900 font-black text-4xl md:text-5xl mb-4">
                                        Following the Route
                                        <span className="block text-green-600">Across Cameroon</span>
                                    </h2>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-6">
                                        This visual line-map shows how our outreach path connects communities across Cameroon. It gives context to where programmes are delivered and why we prioritise each region.
                                    </p>
                                    <div className="space-y-3">
                                        {[
                                            'Shows key places connected by one outreach route.',
                                            'Complements the regional map below for deeper exploration.',
                                            'Helps donors and partners quickly understand geographic reach.',
                                        ].map((point, i) => (
                                            <FadeIn key={point} delay={0.2 + (i * 0.1)} direction="left" scale={0.8} threshold={0.8}>
                                                <div className="flex items-start gap-3">
                                                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <p className="text-slate-600 text-sm leading-relaxed">{point}</p>
                                                </div>
                                            </FadeIn>
                                        ))}
                                    </div>
                                </FadeIn>

                                <FadeIn direction="left" scale={0.9} threshold={0.2}>
                                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl bg-slate-950">
                                        <video
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            controls
                                            preload="metadata"
                                            poster="/assets/charity/cameroon-map.png"
                                            className="w-full h-full object-cover"
                                        >
                                            <source src="/assets/video/camerooon location 3d.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                    </section>

                    {/* 7. Focus Communities Map Preview */}
                    <section className="py-24 bg-white">
                        <div className="max-w-7xl mx-auto px-6 md:px-12">
                            <div className="grid lg:grid-cols-2 gap-14 items-center">
                                <FadeIn direction="right" scale={0.95} threshold={0.3}>
                                    <span className="text-green-600 font-bold text-xs uppercase tracking-widest block mb-3">Where We Work</span>
                                    <h2 className="text-slate-900 font-black text-4xl md:text-5xl mb-4">
                                        Focus Communities
                                        <span className="block text-green-600">Across Cameroon</span>
                                    </h2>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-6">
                                        We operate in 5 key regions of Cameroon — Littoral, Centre, North West, South West, and West. Click on any marker to explore our work in each region.
                                    </p>
                                    <div className="space-y-3 mb-8">
                                        {[
                                            { region: 'Littoral (Douala)', work: 'Clean Water, Healthcare, Emergency Relief' },
                                            { region: 'Centre (Yaoundé)', work: 'Scholarships, School Rehab, Teacher Rewards' },
                                            { region: 'North West (Bamenda)', work: 'Emergency Relief, Women Support' },
                                            { region: 'South West (Buea)', work: 'Emergency Relief, Clean Water' },
                                            { region: 'West (Bafoussam)', work: 'Women Empowerment, Healthcare' },
                                        ].map((r, i) => (
                                            <FadeIn key={r.region} delay={0.2 + (i * 0.1)} direction="right" scale={0.9} threshold={0.8}>
                                                <div className="flex items-start gap-3">
                                                    <MapPin className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                                    <div>
                                                        <span className="font-bold text-slate-900 text-sm">{r.region} — </span>
                                                        <span className="text-slate-500 text-sm">{r.work}</span>
                                                    </div>
                                                </div>
                                            </FadeIn>
                                        ))}
                                    </div>
                                    <Link to="/focus-communities" className="inline-flex items-center gap-2 bg-green-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-700 transition-colors">
                                        Explore All Regions <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </FadeIn>
                                <FadeIn direction="left" scale={0.9} threshold={0.2}>
                                    <CameroonMap />
                                </FadeIn>
                            </div>
                        </div>
                    </section>

                    {/* 8. Success Stories */}
                    <section className="py-24" style={{ backgroundColor: '#001B44' }}>
                        <div className="max-w-7xl mx-auto px-6 md:px-12">
                            <FadeIn direction="up" className="text-center mb-14">
                                <span className="font-bold text-xs uppercase tracking-widest block mb-3" style={{ color: '#00BFA5' }}>Real Impact</span>
                                <h2 className="text-white text-4xl md:text-5xl mb-4">Community Reviews</h2>
                                <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                                    Behind every statistic is a real person whose life has been transformed by your support.
                                </p>
                            </FadeIn>
                            <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
                                <FadeIn direction="right">
                                    <img
                                        src={successStories[activeStory].image}
                                        alt={successStories[activeStory].name}
                                        className="w-full h-[420px] object-cover"
                                        style={{ borderRadius: '60% 40% 50% 70%/60% 30% 70% 40%' }}
                                    />
                                </FadeIn>
                                <FadeIn direction="left" scale={0.92} threshold={0.2}>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#00BFA5' }}>
                                            {successStories[activeStory].program}
                                        </p>
                                        <h3 className="text-white text-3xl mb-2">{successStories[activeStory].name}</h3>
                                        <p className="text-slate-400 text-sm mb-4 flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            {successStories[activeStory].region}
                                        </p>
                                        <p className="text-slate-300 text-lg leading-relaxed mb-6 h-[200px] md:h-[140px] overflow-hidden">"{successStories[activeStory].quote}"</p>
                                        <div className="flex items-center gap-2">
                                            {successStories.map((story, i) => (
                                                <FadeIn key={story.name} delay={0.1 * i} direction="right" scale={0.5} threshold={0.9}>
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveStory(i)}
                                                        className={`h-2.5 rounded-full transition-all ${i === activeStory ? 'w-10' : 'w-4 bg-white/30'}`}
                                                        style={i === activeStory ? { backgroundColor: '#00BFA5', width: '2.5rem' } : {}}
                                                        aria-label={`Show story ${i + 1}`}
                                                    />
                                                </FadeIn>
                                            ))}
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>
                            <div className="text-center">
                                <Link to="/stories" className="btn-pill btn-pill-teal text-sm">
                                    Read More Stories <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* 9. Beneficiary Stories component */}
                    <BeneficiaryStories />

                    {/* 10. Latest Blog */}
                    <LatestBlog />

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
                                <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: '#001B44', opacity: 0.65 }}>Make A Difference</span>
                                <h2 className="text-4xl md:text-6xl mb-4" style={{ color: '#001B44' }}>
                                    Your Donation Changes
                                    <span className="block">Real Lives</span>
                                </h2>
                                <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(0,27,68,0.7)' }}>
                                    Every contribution funds education, clean water, and healthcare for families across Cameroon.
                                </p>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <Link to="/donate" className="btn-pill btn-pill-primary text-base">
                                        <Heart className="w-5 h-5" /> Donate Now
                                    </Link>
                                    <Link to="/partnership" className="btn-pill text-base" style={{ border: '2px solid rgba(0,27,68,0.35)', color: '#001B44', borderRadius: '9999px', padding: '1rem 2.25rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                                        Partner With Us <ArrowRight className="w-5 h-5" />
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
