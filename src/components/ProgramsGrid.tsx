import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { motion } from 'framer-motion';

const programs = [
    {
        id: '01',
        name: 'Scholarships',
        desc: 'Full and partial scholarships for primary, secondary, and university students from low-income families across Cameroon.',
        href: '/programs/scholarships',
        image: '/assets/charity/scholarship.png',
        imageClass: 'object-center',
        imageScale: 1.5,
        imagePosition: '50% 78%',
        bg: '#BBF7D0',
        textColor: '#064E3B',
        tagBg: '#86EFAC',
    },
    {
        id: '02',
        name: 'Clean Water Initiative',
        desc: 'Installing boreholes, water purification systems and sanitation infrastructure in water-scarce communities.',
        href: '/programs/clean-water-initiative',
        image: '/assets/charity/clean-water-initiative.png',
        imageClass: 'object-center',
        imageScale: 1.04,
        imagePosition: '50% 50%',
        bg: '#FEF08A',
        textColor: '#713F12',
        tagBg: '#FDE047',
    },
    {
        id: '03',
        name: 'Teacher Rewards',
        desc: 'Recognising and rewarding dedicated teachers with financial grants and professional development across all regions.',
        href: '/programs/teacher-rewards',
        image: '/assets/charity/teacher-rewards.png',
        imageClass: 'object-center',
        imageScale: 1.05,
        imagePosition: '50% 42%',
        bg: '#E9D5FF',
        textColor: '#581C87',
        tagBg: '#D8B4FE',
    },
    {
        id: '04',
        name: 'Community Health Support',
        desc: 'Mobile health clinics, medication supply, and preventive care campaigns reaching thousands of families quarterly.',
        href: '/programs/community-health-support',
        image: '/assets/charity/community-health-support.png',
        imageClass: 'object-center',
        imageScale: 1.46,
        imagePosition: '50% 76%',
        bg: '#FED7AA',
        textColor: '#7C2D12',
        tagBg: '#FDBA74',
    },
    {
        id: '05',
        name: 'Single Mothers Assistance',
        desc: 'Empowering single mothers and widows with micro-grants, skills training, trauma support, and childcare assistance.',
        href: '/programs/single-mothers-assistance',
        image: '/assets/charity/single-mothers-assistance.png',
        imageClass: 'object-center',
        imageScale: 1.03,
        imagePosition: '50% 50%',
        bg: '#BFDBFE',
        textColor: '#1E3A5F',
        tagBg: '#93C5FD',
    },
    {
        id: '06',
        name: 'Youth Empowerment',
        desc: 'Leadership training, vocational skills, and entrepreneurship programmes for youth aged 15-35 across Cameroon.',
        href: '/programs/youth-empowerment',
        image: '/assets/charity/youth-empowerment.png',
        imageClass: 'object-center',
        imageScale: 1.06,
        imagePosition: '50% 45%',
        bg: '#FDFBF7',
        textColor: '#001F5B',
        tagBg: '#E2E8F0',
    },
];

const ProgramsGrid = () => {
    return (
        <section className="py-24 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: '#FDFBF7' }}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
                    <FadeIn direction="right" className="max-w-xl">
                        <span
                            className="font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
                            style={{ color: '#001F5B' }}
                        >
                            What We Do
                        </span>
                        <h2 className="text-slate-900 text-4xl md:text-5xl leading-tight">
                            Our Core{' '}
                            <span className="block" style={{ color: '#00BFA5' }}>
                                Initiatives
                            </span>
                        </h2>
                    </FadeIn>
                    <FadeIn direction="left" className="max-w-sm">
                        <p className="text-slate-500 text-lg leading-relaxed mb-6">
                            Six targeted programmes designed to create lasting change in the communities that need it most.
                        </p>
                        <Link to="/programs" className="btn-pill btn-pill-primary text-sm">
                            View All Programs <ArrowRight className="w-4 h-4" />
                        </Link>
                    </FadeIn>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {programs.map((program, i) => (
                        <FadeIn key={program.id} delay={i * 0.08} direction="up" scale={0.9}>
                            <motion.div whileHover={{ y: -8, scale: 1.01 }} transition={{ duration: 0.3 }}>
                                <Link
                                    to={program.href}
                                    className="group relative flex flex-col overflow-hidden transition-all duration-500 no-underline"
                                    style={{
                                        backgroundColor: program.bg,
                                        borderRadius: '2.5rem',
                                        minHeight: '360px',
                                    }}
                                >
                                    {/* Icon / Top Image */}
                                    <div className="w-full h-52 md:h-56 mb-6 overflow-hidden rounded-t-[2.5rem]">
                                        <img
                                            src={program.image}
                                            alt={program.name}
                                            className={`w-full h-full object-cover scale-[1.03] ${program.imageClass ?? ''}`}
                                            style={{
                                                transform: `scale(${program.imageScale ?? 1.03})`,
                                                objectPosition: program.imagePosition ?? '50% 50%',
                                            }}
                                        />
                                    </div>

                                    <div className="flex flex-col flex-1 px-8 pb-8">
                                        {/* Number badge */}
                                        <span
                                            className="text-xs font-black uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded-full w-fit"
                                            style={{ backgroundColor: program.tagBg, color: program.textColor }}
                                        >
                                            {program.id}
                                        </span>

                                        {/* Heading */}
                                        <h3
                                            className="text-2xl md:text-3xl leading-snug mb-3"
                                            style={{ color: program.textColor }}
                                        >
                                            {program.name}
                                        </h3>

                                        {/* Description */}
                                        <p
                                            className="text-sm leading-relaxed mb-6 flex-1"
                                            style={{ color: program.textColor, opacity: 0.72 }}
                                        >
                                            {program.desc}
                                        </p>

                                        {/* CTA link */}
                                        <span
                                            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all duration-300"
                                            style={{ color: program.textColor }}
                                        >
                                            Explore Programme <ArrowRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramsGrid;
