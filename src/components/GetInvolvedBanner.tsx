import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

export interface ActionBlock {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    bgColor?: string;
    btnBgColor?: string;
    btnTextColor?: string;
}

interface GetInvolvedBannerProps {
    headerTitle?: string;
    headerSubtitle?: string;
    blocks?: ActionBlock[];
    className?: string;
}

const defaultBlocks: ActionBlock[] = [
    {
        title: 'Empowering Lives Together',
        description: 'We are here to support widows and orphans, offering hope and resources for a brighter future.',
        buttonText: 'Learn More',
        buttonLink: '/about',
        bgColor: '#001B44', // Dark Navy
        btnBgColor: '#FFFFFF',
        btnTextColor: '#001B44',
    },
    {
        title: 'Join Our Mission',
        description: 'Discover how your contribution can make a real difference in their lives.',
        buttonText: 'Get Involved',
        buttonLink: '/volunteer',
        bgColor: '#0B2545', // Medium Slate Navy
        btnBgColor: '#1eb4d4', // Cyan
        btnTextColor: '#FFFFFF',
    },
    {
        title: 'Create Lasting Change',
        description: 'Together, we can provide support, resources, and hope for brighter tomorrows.',
        buttonText: 'Donate Now',
        buttonLink: '/donate',
        bgColor: '#133863', // Deep Blue Accent
        btnBgColor: '#001B44',
        btnTextColor: '#FFFFFF',
    },
];

const GetInvolvedBanner: React.FC<GetInvolvedBannerProps> = ({
    headerTitle = 'GET INVOLVED',
    headerSubtitle = 'Take an Action',
    blocks = defaultBlocks,
    className = '',
}) => {
    return (
        <section className={`w-full overflow-hidden my-0 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full min-h-[260px] shadow-sm">
                {/* ── Left Title Header Tile ── */}
                <FadeIn direction="right" className="h-full">
                    <div className="h-full bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200/70 p-8 lg:p-12 flex flex-col justify-center">
                        <h2 className="text-2xl lg:text-3xl font-black text-[#001B44] uppercase tracking-wider leading-tight mb-1">
                            {headerTitle}
                        </h2>
                        <p className="text-base lg:text-lg font-bold text-[#1eb4d4] tracking-tight">
                            {headerSubtitle}
                        </p>
                    </div>
                </FadeIn>

                {/* ── 3 Solid Color Block Column Cards ── */}
                {blocks.map((block, idx) => (
                    <FadeIn key={block.title || idx} direction="up" delay={idx * 0.1} className="h-full">
                        <div
                            className="h-full p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 hover:brightness-110"
                            style={{ backgroundColor: block.bgColor || '#001B44' }}
                        >
                            <div>
                                <h3 className="text-white font-extrabold text-lg lg:text-xl uppercase tracking-wide mb-3 leading-snug">
                                    {block.title}
                                </h3>
                                <p className="text-slate-200 text-sm leading-relaxed font-normal mb-8 max-w-sm">
                                    {block.description}
                                </p>
                            </div>

                            <div>
                                <Link
                                    to={block.buttonLink}
                                    className="inline-block px-7 py-3.5 font-bold text-xs uppercase tracking-widest transition-transform duration-200 hover:scale-105 rounded-[2px] shadow-sm"
                                    style={{
                                        backgroundColor: block.btnBgColor || '#FFFFFF',
                                        color: block.btnTextColor || '#001B44',
                                    }}
                                >
                                    {block.buttonText}
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
};

export default GetInvolvedBanner;
