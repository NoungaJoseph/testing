import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { GraduationCap, School, Users, AlertCircle, Heart, Handshake } from 'lucide-react';
import FadeIn from './FadeIn';

const ToolsGridSection = () => {
    const { t } = useTranslation();

    const tools = [
        {
            key: 'apply_scholarship',
            icon: <GraduationCap className="w-14 h-14" strokeWidth={1.2} />,
            path: '/apply/scholarship',
            color: '#1eb4d4'
        },
        {
            key: 'register_school',
            icon: <School className="w-14 h-14" strokeWidth={1.2} />,
            path: '/school-registration',
            color: '#1eb4d4'
        },
        {
            key: 'volunteer',
            icon: <Users className="w-14 h-14" strokeWidth={1.2} />,
            path: '/volunteer',
            color: '#1eb4d4'
        },
        {
            key: 'report_case',
            icon: <AlertCircle className="w-14 h-14" strokeWidth={1.2} />,
            path: '/contact',
            color: '#1c4980'
        },
        {
            key: 'donate',
            icon: <Heart className="w-14 h-14" strokeWidth={1.2} />,
            path: '/donate',
            color: '#1c4980'
        },
        {
            key: 'partner',
            icon: <Handshake className="w-14 h-14" strokeWidth={1.2} />,
            path: '/partnership',
            color: '#1c4980'
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <FadeIn direction="up" className="text-center mb-10">
                    <h2 className="text-[#1c4980] font-black text-2xl md:text-3xl">
                        {t('home.tools.title')}
                    </h2>
                </FadeIn>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200">
                    {tools.map((tool, index) => (
                        <FadeIn key={tool.key} delay={index * 0.1} direction="up" scale={1}>
                            <Link 
                                to={tool.path}
                                className="group flex flex-col items-center text-center bg-white border-b border-r border-slate-200 p-10 transition-all duration-300 hover:shadow-2xl hover:z-10 relative"
                            >
                                <h3 
                                    className="font-bold text-lg mb-6 transition-colors"
                                    style={{ color: tool.color }}
                                >
                                    {t(`home.tools.${tool.key}.title`)}
                                </h3>
                                <div 
                                    className="mb-6 transition-transform duration-300 group-hover:scale-110"
                                    style={{ color: tool.color }}
                                >
                                    {tool.icon}
                                </div>
                                <p className="text-slate-500 text-sm font-light leading-relaxed max-w-[250px]">
                                    {t(`home.tools.${tool.key}.desc`)}
                                </p>
                            </Link>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ToolsGridSection;
