import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

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

    return (
        <section className="py-24 px-6 md:px-12 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <FadeIn direction="right" className="max-w-2xl">
                        <span className="text-[#1eb4d4] font-bold text-sm uppercase tracking-widest block mb-4">
                            {t('components.programs_grid.badge')}
                        </span>
                        <h2 className="text-[#1c4980] font-black text-4xl md:text-5xl leading-tight">
                            {t('components.programs_grid.title')}{' '}
                            <span className="block">{t('components.programs_grid.title_highlight')}</span>
                        </h2>
                    </FadeIn>
                    <FadeIn direction="left">
                        <Link to="/programs" className="group inline-flex items-center gap-3 bg-[#1c4980] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#153760] transition-all hover:shadow-xl hover:-translate-y-1">
                            {t('components.programs_grid.btn_view_all')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </FadeIn>
                </div>

                {/* Immersive Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {programs.map((program, i) => (
                        <FadeIn key={program.id} delay={i * 0.1} direction="up" scale={0.98}>
                            <Link
                                to={program.href}
                                className="group relative block w-full h-[460px] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Background Image */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${program.image})` }}
                                />
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#001B44] via-[#001B44]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 z-10">
                                    <span className="text-[#1eb4d4] font-black text-sm tracking-widest mb-3 uppercase drop-shadow-md">
                                        0{i + 1}
                                    </span>
                                    <h3 className="text-white font-bold text-2xl md:text-3xl mb-4 leading-tight group-hover:-translate-y-2 transition-transform duration-500 drop-shadow-md">
                                        {programsT[i]?.name || program.name}
                                    </h3>
                                    
                                    <div className="overflow-hidden">
                                        <p className="text-slate-200 text-sm leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 group-hover:-translate-y-2 transition-all duration-500 delay-75">
                                            {programsT[i]?.desc || program.desc}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-4 flex items-center gap-2 text-white font-bold text-sm tracking-wide group-hover:text-[#1eb4d4] transition-colors">
                                        {t('components.programs_grid.btn_explore')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramsGrid;
