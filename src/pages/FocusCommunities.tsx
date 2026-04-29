import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CameroonMap from '../components/CameroonMap';
import FadeIn from '../components/FadeIn';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Users, Droplets, Heart, GraduationCap, HeartHandshake, AlertTriangle, CheckCircle } from 'lucide-react';
import { ACTION_LINKS } from '../constants/actionLinks';

const regionCards = [
    {
        name: 'Littoral Region',
        city: 'Douala',
        color: 'bg-cyan-500',
        colorLight: 'bg-cyan-50',
        colorText: 'text-cyan-700',
        colorBorder: 'border-cyan-200',
        icon: <Droplets className="w-5 h-5" />,
        tags: ['Clean Water', 'Healthcare', 'Emergency Relief'],
        stat: '40+ people reached',
        description: 'Delivering clean water systems and mobile healthcare across rapidly growing urban communities.',
    },
    {
        name: 'Centre Region',
        city: 'Yaoundé',
        color: 'bg-blue-500',
        colorLight: 'bg-blue-50',
        colorText: 'text-blue-700',
        colorBorder: 'border-blue-200',
        icon: <GraduationCap className="w-5 h-5" />,
        tags: ['Scholarships', 'School Rehab', 'Teacher Rewards'],
        stat: '8 students supported',
        description: 'Our scholarship hub supporting students from primary through university level education.',
    },
    {
        name: 'North West Region',
        city: 'Bamenda',
        color: 'bg-orange-500',
        colorLight: 'bg-orange-50',
        colorText: 'text-orange-700',
        colorBorder: 'border-orange-200',
        icon: <AlertTriangle className="w-5 h-5" />,
        tags: ['Emergency Relief', 'Women Support', 'Healthcare'],
        stat: '15 families reached',
        description: 'Critical humanitarian assistance for communities facing emergency situations and displacement.',
    },
    {
        name: 'South West Region',
        city: 'Buea',
        color: 'bg-red-500',
        colorLight: 'bg-red-50',
        colorText: 'text-red-700',
        colorBorder: 'border-red-200',
        icon: <AlertTriangle className="w-5 h-5" />,
        tags: ['Emergency Relief', 'Clean Water', 'School Rehab'],
        stat: '3 schools supported',
        description: 'Emergency response and infrastructure restoration across communities in Buea and surroundings.',
    },
    {
        name: 'West Region',
        city: 'Bafoussam',
        color: 'bg-purple-500',
        colorLight: 'bg-purple-50',
        colorText: 'text-purple-700',
        colorBorder: 'border-purple-200',
        icon: <HeartHandshake className="w-5 h-5" />,
        tags: ['Women Empowerment', 'Scholarships', 'Healthcare'],
        stat: '10 women supported',
        description: 'Our flagship women and single mothers programme with micro-grants and skills training.',
    },
];

const FocusCommunities = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ── HERO ── */}
            <section className="relative pt-40 pb-24 overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url('/assets/focus communities/focus community.png')` }}>
                <div className="absolute inset-0 bg-black/35" />
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <FadeIn direction="up">
                        <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 text-center">
                            Focus Communities
                        </h1>
                    </FadeIn>
                </div>
            </section>

            {/* ── KEY INTERVENTIONS (IMAGE + DESCRIPTION STACK) ── */}
            <section className="py-12 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
                    {[
                        { slug: 'clean-water', image: '/assets/focus communities/boreholes drilled.png', title: 'Clean Water Access', count: '3 boreholes completed', desc: 'We fund, drill, and maintain boreholes and water purification systems in water-scarce communities. Each project includes community training on maintenance and sustainable water management to ensure long-term impact.' },
                        { slug: 'healthcare', image: '/assets/focus communities/mobile clinics.png', title: 'Healthcare Outreach', count: '4 mobile clinic days', desc: 'Mobile clinics, medication supply, and preventive health campaigns serve nearby communities. Our teams provide vaccinations, maternal health services, and practical health education.' },
                        { slug: 'education', image: '/assets/focus communities/scholarships.png', title: 'Education Support', count: '8 scholarships active', desc: 'Full and partial scholarships for students across primary, secondary, and university levels. We also support school rehabilitation and teacher training to improve learning outcomes.' },
                        { slug: 'women-mothers', image: '/assets/focus communities/beneficiaries.png', title: 'Women & Mothers', count: '10 beneficiaries', desc: 'Micro-grants, skills training, and childcare assistance for vulnerable women and mothers. Programs combine livelihood support with psychosocial services and peer networks.' },
                        { slug: 'community-relief', image: '/assets/focus communities/families.png', title: 'Community Relief', count: '15 families assisted', desc: 'Rapid-response packages and shelter support for families affected by crises. We coordinate with local actors to distribute food, hygiene kits, and temporary shelter.' },
                    ].map((item) => (
                        <FadeIn key={item.slug} direction="up">
                            <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:h-64">
                                <div className="w-full lg:w-1/2 flex-shrink-0">
                                    <div className="w-full h-full overflow-hidden">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
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
                                <span className="text-green-600 font-bold text-xs uppercase tracking-widest block mb-3">Interactive Map</span>
                                <h2 className="text-slate-900 font-black text-3xl md:text-4xl mb-3">
                                    Click to Explore Our Regions
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                    Click any marker on the map to see what programs are active in that region. Use the filter buttons to overlay a heatmap of our focus areas.
                                </p>
                                <CameroonMap />
                            </div>
                        </FadeIn>

                        {/* Right: What we do */}
                        <FadeIn direction="left">
                            <div className="space-y-5">
                                <span className="text-green-600 font-bold text-xs uppercase tracking-widest block">Types of Intervention</span>
                                <h2 className="text-slate-900 font-black text-3xl md:text-4xl mb-6">
                                    How We Help Communities
                                </h2>
                                {[
                                    { icon: <Droplets className="w-5 h-5 text-cyan-600" />, title: 'Clean Water Support', desc: 'We fund, drill, and maintain boreholes and water purification systems in water-scarce communities.' },
                                    { icon: <Heart className="w-5 h-5 text-red-600" />, title: 'Healthcare Assistance', desc: 'Mobile clinics, medication supply, and preventive health campaigns reach thousands quarterly.' },
                                    { icon: <GraduationCap className="w-5 h-5 text-blue-600" />, title: 'Scholarship Support', desc: 'Full and partial scholarships for primary, secondary, and university students across Cameroon.' },
                                    { icon: <HeartHandshake className="w-5 h-5 text-purple-600" />, title: 'Women & Single Mothers', desc: 'Micro-grants, skills training, trauma support, and childcare assistance for vulnerable women.' },
                                    { icon: <Users className="w-5 h-5 text-green-600" />, title: 'School Rehabilitation', desc: 'Rebuilding classrooms, providing furniture, books, and equipping school labs for better learning.' },
                                    { icon: <AlertTriangle className="w-5 h-5 text-orange-600" />, title: 'Emergency Relief', desc: 'Rapid response food packages, shelter support, and displacement assistance for crisis-affected families.' },
                                ].map((item) => (
                                    <motion.div
                                        key={item.title}
                                        whileHover={{ x: 4 }}
                                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-green-50 transition-colors group cursor-default"
                                    >
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-shadow">
                                            {item.icon}
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
                        <span className="text-green-600 font-bold text-xs uppercase tracking-widest block mb-3">Our Regions</span>
                        <h2 className="text-slate-900 font-black text-4xl md:text-5xl mb-4">Focus Communities</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            Each region has a tailored intervention approach based on community needs and resources.
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regionCards.map((region, i) => (
                            <FadeIn key={region.name} direction="up" delay={i * 0.08}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className={`rounded-3xl overflow-hidden transition-all duration-500`}
                                >
                                    {/* Card Header */}
                                    <div className={`${region.colorLight} p-6 border-b ${region.colorBorder}`}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`w-10 h-10 rounded-xl ${region.color} text-white flex items-center justify-center`}>
                                                {region.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-black text-slate-900 text-base">{region.name}</h3>
                                                <div className={`flex items-center gap-1 text-xs font-semibold ${region.colorText}`}>
                                                    <MapPin className="w-3 h-3" />{region.city}
                                                </div>
                                            </div>
                                        </div>
                                        <p className={`text-xs font-bold ${region.colorText} flex items-center gap-1.5`}>
                                            <CheckCircle className="w-3.5 h-3.5" /> {region.stat}
                                        </p>
                                    </div>
                                    {/* Card Body */}
                                    <div className="p-6">
                                        <p className="text-slate-500 text-sm leading-relaxed mb-4">{region.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {region.tags.map((tag) => (
                                                <span key={tag} className={`px-2.5 py-1 ${region.colorLight} ${region.colorText} text-[10px] font-bold rounded-full border ${region.colorBorder}`}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 relative overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url('/assets/charity/Ready to Make a Difference.png')` }}>
                <div className="absolute inset-0 bg-black/35" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <FadeIn direction="up">
                        <h2 className="text-white font-black text-4xl md:text-5xl mb-6">
                            Ready to Make a Difference?
                        </h2>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/donate" className="no-underline bg-white text-green-700 font-bold px-10 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-xl">
                                Donate to a Region
                            </Link>
                            <Link to={ACTION_LINKS.reportCase} className="no-underline border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white/10 transition-colors">
                                Report a Community Need
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
