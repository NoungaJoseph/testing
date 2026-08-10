import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const programs = [
    {
        id: '01',
        name: 'Scholarships',
        desc: 'Full and partial scholarships for primary, secondary, and university students from low-income families across Cameroon.',
        href: '/programs/scholarships',
        image: '/assets/charity/scholarship.png',
    },
    {
        id: '02',
        name: 'Clean Water Initiative',
        desc: 'Installing boreholes, water purification systems and sanitation infrastructure in water-scarce communities.',
        href: '/programs/clean-water-initiative',
        image: '/assets/charity/clean-water-initiative.png',
    },
    {
        id: '03',
        name: 'Teacher Rewards',
        desc: 'Recognising and rewarding dedicated teachers with financial grants and professional development across all regions.',
        href: '/programs/teacher-rewards',
        image: '/assets/charity/teacher-rewards.png',
    },
    {
        id: '04',
        name: 'Community Health Support',
        desc: 'Mobile health clinics, medication supply, and preventive care campaigns reaching thousands of families quarterly.',
        href: '/programs/community-health-support',
        image: '/assets/charity/community-health-support.png',
    },
    {
        id: '05',
        name: 'Single Mothers Assistance',
        desc: 'Empowering single mothers and widows with micro-grants, skills training, trauma support, and childcare assistance.',
        href: '/programs/single-mothers-assistance',
        image: '/assets/charity/single-mothers-assistance.png',
    },
    {
        id: '06',
        name: 'Youth Empowerment',
        desc: 'Leadership training, vocational skills, and entrepreneurship programmes for youth aged 15-35 across Cameroon.',
        href: '/programs/youth-empowerment',
        image: '/assets/charity/youth-empowerment.png',
    },
];

const ProgramsGrid = () => {
    const { t } = useTranslation();
    const programsT = t('components.programs_grid.programs', { returnObjects: true }) as any[];
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const scrollLeft = target.scrollLeft;
        const cardWidth = target.scrollWidth / programs.length;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(index);
    };

    return (
        <section className="ds-section bg-white">
            <div className="ds-container">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <FadeIn direction="right" className="max-w-2xl">
                        <span className="ds-badge mb-3">
                            {t('components.programs_grid.badge')}
                        </span>
                        <h2 className="ds-h2">
                            {t('components.programs_grid.title')}{' '}
                            <span className="block text-[#1eb4d4]">{t('components.programs_grid.title_highlight')}</span>
                        </h2>
                    </FadeIn>
                    <FadeIn direction="left">
                        <Link to="/programs" className="ds-btn ds-btn-primary">
                            {t('components.programs_grid.btn_view_all')} <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </FadeIn>
                </div>

                {/* Cards Grid */}
                <div 
                    onScroll={handleScroll}
                    className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none scrollbar-none md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-4 md:pb-0"
                >
                    {programs.map((program, i) => (
                        <FadeIn 
                            key={program.id} 
                            delay={i * 0.1} 
                            direction="up" 
                            scale={0.98}
                            className="w-[85vw] md:w-full flex-shrink-0 md:flex-shrink snap-start snap-always"
                        >
                            <Link
                                to={program.href}
                                className="group relative block w-full h-[420px] rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                                {/* Background Image */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${program.image})` }}
                                />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/50 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                                    <span className="text-[#1eb4d4] font-extrabold text-xs tracking-widest mb-2 uppercase">
                                        0{i + 1}
                                    </span>
                                    <h3 className="text-white font-extrabold text-xl md:text-2xl mb-2 uppercase tracking-wide leading-tight">
                                        {programsT[i]?.name || program.name}
                                    </h3>
                                    
                                    <p className="text-slate-200 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {programsT[i]?.desc || program.desc}
                                    </p>
                                    
                                    <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider text-[#1eb4d4]">
                                        {t('components.programs_grid.btn_explore')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>

                {/* Pagination Dots for Mobile */}
                <div className="flex md:hidden justify-center gap-2 mt-6">
                    {programs.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                activeIndex === i ? 'w-6 bg-[#1c4980]' : 'w-2 bg-slate-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramsGrid;
