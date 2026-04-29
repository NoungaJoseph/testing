import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';
import { ArrowRight, CheckCircle } from 'lucide-react';

const programDetails = [
    {
        id: 'scholarships',
        badge: 'Education Support',
        title: 'Scholarships for Academic Excellence',
        desc: 'Our flagship scholarship programme provides full-tuition coverage, textbooks, uniforms, and mentorship for high-achieving students from low-income families across Cameroon. We support students from primary level through to university.',
        image: '/assets/charity/scholarship.png',
        icon: '/assets/charity/scholarship.png',
        highlights: ['Full Tuition Coverage', 'Mentorship Program', 'Primary to University'],
        stats: ['8 Scholars', 'Strong Retention', '4 Schools', '2 Regions'],
        imageCaption: 'Empowering future leaders',
    },
    {
        id: 'clean-water-initiative',
        badge: 'Infrastructure',
        title: 'Clean Water Initiative',
        desc: 'Providing safe, accessible drinking water to rural and water-scarce communities through borehole drilling, water purification systems, and local maintenance training. We believe clean water is the first step to health.',
        image: '/assets/charity/clean-water-initiative.png',
        icon: '/assets/charity/clean-water-initiative.png',
        highlights: ['Borehole Drilling', 'Water Purification', 'Maintenance Training'],
        stats: ['18 Boreholes', '28k+ People', '22 Villages', '3 Regions'],
        imageCaption: 'Safe water for every village',
    },
    {
        id: 'teacher-rewards',
        badge: 'Teacher Excellence',
        title: 'Teacher Rewards Programme',
        desc: 'Recognising and rewarding dedicated educators in underserved communities. We provide financial grants, professional development, and community recognition to those who go above and beyond for their students.',
        image: '/assets/charity/teacher-rewards.png',
        icon: '/assets/charity/teacher-rewards.png',
        highlights: ['Financial Grants', 'Professional Training', 'Peer Network'],
        stats: ['6 Teachers', '2 Regions', '4 Sessions', 'Pilot Cohort'],
        imageCaption: 'Honouring dedicated educators',
    },
    {
        id: 'community-health-support',
        badge: 'Healthcare',
        title: 'Community Health Support',
        desc: 'Mobile healthcare clinics and medical outreach programs that bring doctors, nurses, and essential medication directly to families in remote and underserved areas of Cameroon.',
        image: '/assets/charity/community-health-support.png',
        icon: '/assets/charity/community-health-support.png',
        highlights: ['Mobile Clinics', 'Maternal Health', 'Malaria Prevention'],
        stats: ['42k+ Patients', '6 Clinics', '85 Trained', '5 Regions'],
        imageCaption: 'Healthcare within reach',
    },
    {
        id: 'single-mothers-assistance',
        badge: 'Social Support',
        title: 'Single Mothers Assistance',
        desc: 'Empowering single mothers and widows through micro-grants, vocational skills training (tailoring, catering, ICT), trauma counselling, and childcare support to foster economic independence.',
        image: '/assets/charity/single-mothers-assistance.png',
        icon: '/assets/charity/single-mothers-assistance.png',
        highlights: ['Micro-grants', 'Skills Training', 'Trauma Support'],
        stats: ['10 Women', '4 Businesses', '7 Active', '2 Regions'],
        imageCaption: 'Restoring hope and dignity',
    },
    {
        id: 'youth-empowerment',
        badge: 'Youth Development',
        title: 'Youth Empowerment Programme',
        desc: 'Building the next generation of Cameroonian changemakers through leadership development, vocational skills training, digital literacy bootcamps, and seed funding for young entrepreneurs.',
        image: '/assets/charity/youth-empowerment.png',
        icon: '/assets/charity/youth-empowerment.png',
        highlights: ['Leadership Training', 'Digital Skills', 'Seed Funding'],
        stats: ['12 Youth', '3 Ventures', 'Ongoing Placement', '2 Regions'],
        imageCaption: 'Building tomorrow\'s leaders',
    },
];

const ProgramsOverview = () => {
    return (
        <section className="py-20 px-6 lg:px-20 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-32">
                {programDetails.map((prog, idx) => (
                    <div
                        key={prog.id}
                        className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
                    >
                        {/* Image side */}
                        <div className="lg:w-1/2 relative w-full group">
                            <FadeIn direction={idx % 2 === 0 ? "right" : "left"}>
                                <div className="relative rounded-3xl overflow-hidden aspect-[4/3] w-full">
                                    <img src={prog.image} alt={prog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    {/* Overlay badge */}
                                    <div className="absolute top-6 left-6 p-1 flex items-center gap-3">
                                        <img src={prog.icon} alt={`${prog.title} icon`} className="w-12 h-12 object-contain" />
                                        <div>
                                            <p className="text-slate-900 font-black text-sm leading-none">{prog.imageCaption}</p>
                                            <p className="text-green-600 text-[10px] font-bold uppercase tracking-widest mt-1">Enako Impact</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Content side */}
                        <div className="lg:w-1/2 flex flex-col gap-6 w-full">
                            <FadeIn direction={idx % 2 === 0 ? "left" : "right"}>
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-black uppercase tracking-[0.2em] border border-green-100">
                                    {prog.badge}
                                </span>
                                <h2 className="text-slate-900 text-3xl lg:text-5xl font-black leading-tight mt-4">
                                    {prog.title}
                                </h2>
                                <p className="text-slate-500 text-lg leading-relaxed mt-4 font-medium">
                                    {prog.desc}
                                </p>
                                
                                <div className="grid sm:grid-cols-2 gap-4 mt-6">
                                    {prog.highlights.map((h) => (
                                        <div key={h} className="flex items-center gap-3 p-4 rounded-2xl group hover:shadow-lg transition-all duration-300">
                                            <CheckCircle className="text-green-600 w-5 h-5 flex-shrink-0" />
                                            <span className="text-slate-800 text-sm font-bold">{h}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100 mt-4">
                                    {prog.stats.map((s) => (
                                        <div key={s} className="text-left">
                                            <p className="text-green-600 text-xl font-black leading-none mb-1">{s.split(' ')[0]}</p>
                                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{s.split(' ').slice(1).join(' ')}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-4 pt-8">
                                    <Link to={`/programs/${prog.id}`} className="flex items-center justify-center gap-2 rounded-xl h-14 px-8 bg-green-600 text-white font-bold hover:bg-green-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-green-600/20 text-sm">
                                        View Full Programme <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link to="/donate" className="flex items-center justify-center rounded-xl h-14 px-8 border-2 border-slate-200 text-slate-800 font-bold hover:bg-slate-50 transition-all text-sm">
                                        Donate Now
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProgramsOverview;
