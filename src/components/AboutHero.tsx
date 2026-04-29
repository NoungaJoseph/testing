import { Link } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import FadeIn from './FadeIn';

const AboutHero = () => {
    return (
        <>
            {/* Full-bleed Hero */}
            <section className="relative w-full h-[75vh] min-h-[550px] flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#001B44]/70 z-10" />
                    <img
                        src="/assets/charity/our-mission.png"
                        alt="African community education"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center gap-6 w-full">
                    <FadeIn direction="up" delay={0.1}>
                        {/* Est badge */}
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="h-px w-8 bg-secondary" />
                            <span className="text-secondary font-bold tracking-[0.2em] text-xs uppercase">Est. 2024</span>
                            <span className="h-px w-8 bg-secondary" />
                        </div>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.2}>
                        <h1 className="text-white text-4xl md:text-6xl leading-tight">
                            Driven by Purpose.<br />
                            <span style={{ color: '#00BFA5' }}>Guided by Impact.</span>
                        </h1>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.3}>
                        <p className="text-slate-200 text-lg md:text-xl font-normal max-w-2xl leading-relaxed mx-auto">
                            Empowering communities and advancing education across Cameroon through sustainable humanitarian initiatives that foster growth and resilience from our base in Douala.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Mission block below hero */}
            <section className="max-w-7xl mx-auto px-6 py-14">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-16">
                    <Link to="/" className="hover:text-secondary flex items-center gap-2 transition-colors">
                        <Home className="w-3 h-3" /> Home
                    </Link>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                    <span className="text-secondary">About Us</span>
                </nav>

                {/* Mission split */}
                <FadeIn direction="up">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
                        <div className="lg:col-span-4 flex flex-col gap-4">
                            <h4 className="text-secondary text-sm font-bold leading-normal tracking-widest uppercase flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-secondary" /> Our Mission
                            </h4>
                            <h3 className="text-3xl font-bold text-navy leading-tight">
                                Building a foundation for the leaders of tomorrow.
                            </h3>
                        </div>
                        <div className="lg:col-span-8">
                            <p className="text-slate-600 text-xl font-normal leading-relaxed">
                                Enako Outreach is dedicated to creating lasting change by focusing on grassroots education and holistic community development projects in Cameroon. With our first 5 partner schools in Douala, we are about to carry out our inaugural charity mission to provide immediate support to the leaders of tomorrow.
                            </p>
                        </div>
                    </div>
                </FadeIn>

                {/* 3 value pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[ 
                        { icon: '/assets/charity website icons and photos/education access.png', title: 'Education First', desc: 'Providing resources and building classrooms to ensure every child has access to quality learning environments.' },
                        { icon: '/assets/charity website icons and photos/Healthcare.png', title: 'Health & Wellness', desc: 'Implementing clean water projects and medical outreach programs to improve community well-being.' },
                        { icon: '/assets/charity website icons and photos/partner with us.png', title: 'Local Partnership', desc: 'Working directly with community leaders to design programs that address specific local needs.' },
                    ].map((item, idx) => (
                        <FadeIn key={item.title} delay={idx * 0.1} direction="up" fullWidth>
                            <div
                                className="p-10 hover:-translate-y-2 transition-all duration-500 group border border-transparent hover:border-[#00BFA5] flex flex-col gap-8 h-full relative overflow-hidden"
                                style={{ backgroundColor: '#FDFBF7', borderRadius: '2.5rem' }}
                            >
                                <img src={item.icon} alt={item.title} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-2xl" style={{ color: '#001B44' }}>{item.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </section>
        </>
    );
};

export default AboutHero;
