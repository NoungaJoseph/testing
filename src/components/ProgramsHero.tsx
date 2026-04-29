import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

const ProgramsHero = () => {
    return (
        <>
            {/* Full-bleed Hero */}
            <section className="relative w-full min-h-[60vh] flex flex-col items-start justify-end overflow-hidden pb-16 pt-20">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <img
                        src="/assets/charity/our-expertize-in-action.png"
                        alt="Group of diverse community members"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full">
                    <FadeIn direction="up">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-white text-sm mb-10">
                            <Link to="/" className="hover:text-white flex items-center gap-1 transition-colors">
                                <span className="material-symbols-outlined text-sm">home</span> Home
                            </Link>
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                            <span className="text-white font-medium">Programs</span>
                        </nav>
                        <h1 className="text-white text-4xl md:text-6xl leading-tight mb-6">
                            Our Programs<br />
                            Creating <span style={{ color: '#00BFA5' }}>Lasting</span><br />
                            Impact
                        </h1>
                    </FadeIn>
                    <FadeIn direction="up" delay={0.2}>
                        <p className="text-slate-200 text-lg max-w-xl leading-relaxed mb-10">
                            Through education, recognition, and community development, Enako Outreach empowers individuals and transforms communities across Africa.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Overview section */}
            <section className="bg-transparent py-16 px-6 lg:px-20" id="programs">
                <div className="max-w-7xl mx-auto">
                    <FadeIn direction="up">
                        <div className="text-center mb-12">
                            <span className="text-secondary font-bold tracking-widest uppercase text-xs">Our Focus Areas</span>
                            <h2 className="text-navy text-4xl font-extrabold mt-2 mb-4">Nurturing growth through strategic pillars.</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                                At Enako Outreach, we are dedicated to fostering sustainable growth through targeted humanitarian initiatives.
                            </p>
                        </div>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: 'school', title: 'Scholarships', desc: 'Empowering the next generation of African leaders through academic support and financial grants.' },
                            { icon: 'emoji_events', title: 'Teacher Awards', desc: 'Recognizing excellence in education and honoring the dedicated mentors shaping the future.' },
                            { icon: 'diversity_3', title: 'Community Dev', desc: 'Building sustainable local infrastructure and clean water systems for self-reliant villages.' },
                            { icon: 'child_care', title: 'Orphanage Support', desc: 'Providing a safe haven, nutritional support, and emotional care for children in need.' },
                        ].map((p, idx) => (
                            <FadeIn key={p.title} direction="up" delay={idx * 0.1} fullWidth>
                                <div
                                    className="p-8 hover:-translate-y-1 transition-all group h-full"
                                    style={{ backgroundColor: '#FDFBF7', borderRadius: '2rem' }}
                                >
                                    <div className="w-12 h-12 flex items-center justify-center mb-6 rounded-xl" style={{ backgroundColor: 'rgba(0,191,165,0.12)' }}>
                                        <span className="material-symbols-outlined text-2xl" style={{ color: '#00BFA5' }}>{p.icon}</span>
                                    </div>
                                    <h3 className="text-lg mb-3" style={{ color: '#001B44' }}>{p.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProgramsHero;
