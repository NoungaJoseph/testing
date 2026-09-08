import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Quote } from 'lucide-react';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const stories = [
    {
        name: 'Sarah Akot',
        role: 'Young Entrepreneur, Douala',
        text: 'The business training programme helped me start my own community garden, providing fresh produce for my village and financial independence for my family. Enako Outreach changed everything.',
        image: '/assets/images/testimonials/sarah.png',
        fallback: '/assets/images/testimonials/sarah.png',
    },
    {
        name: 'David Obi',
        role: 'Computer Science Scholar',
        text: 'Thanks to the technology grant, I completed my degree and launched a local tech hub that now trains fifty youth each month. This foundation believed in me before I believed in myself.',
        image: '/assets/images/testimonials/david.png',
        fallback: '/assets/images/testimonials/david.png',
    },
    {
        name: 'Abena Osei',
        role: 'Scholarship Recipient, Yaoundé',
        text: 'Being selected as top student in my district opened doors I only dreamed of. The Enako Outreach scholarship changed my entire family\'s trajectory - it is the reason I am in university today.',
        image: '/assets/images/testimonials/abena.png',
        fallback: '/assets/images/testimonials/abena.png',
    },
];

const BeneficiaryStories = () => {
    const { t } = useTranslation();
    const storiesT = t('components.beneficiary_stories.stories', { returnObjects: true }) as any[];
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((c) => (c === 0 ? stories.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c === stories.length - 1 ? 0 : c + 1));

    // ── Automatic Carousel Slide Timer (5 seconds) ──
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((c) => (c === stories.length - 1 ? 0 : c + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [current]);

    const story = stories[current];

    return (
        <section
            className="py-24 px-6 md:px-16 overflow-hidden bg-[#f8fafc] border-t border-slate-100"
            style={{ fontFamily: '"Open Sans", sans-serif' }}
        >
            <div className="max-w-7xl mx-auto">
                <FadeIn direction="up">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[#1eb4d4] font-bold text-xs uppercase tracking-[0.2em] block mb-2">
                            {t('components.beneficiary_stories.badge', 'HUMAN STORIES')}
                        </span>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-[#001B44] uppercase tracking-tight">
                            {t('components.beneficiary_stories.title', 'VOICES OF')}{' '}
                            <span className="text-[#1eb4d4]">{t('components.beneficiary_stories.title_highlight', 'TRANSFORMATION')}</span>
                        </h2>
                    </div>
                </FadeIn>

                <div className="relative bg-white rounded-3xl p-8 md:p-14 border border-slate-200 shadow-xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
                        >
                            {/* Photo Column */}
                            <div className="lg:col-span-5 relative">
                                <div className="w-full max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden aspect-[4/5] shadow-md border-4 border-slate-50 relative z-10">
                                    <img
                                        src={story.image}
                                        alt={story.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = story.fallback;
                                        }}
                                    />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-[#1eb4d4]/15 blur-xl pointer-events-none" />
                            </div>

                            {/* Quote & Text Column */}
                            <div className="lg:col-span-7 flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 rounded-xl bg-[#1eb4d4]/10 text-[#1eb4d4] flex items-center justify-center mb-6">
                                        <Quote className="w-6 h-6" />
                                    </div>

                                    <span className="text-[#1eb4d4] font-bold text-xs uppercase tracking-widest block mb-3">
                                        {t('components.beneficiary_stories.story_badge', 'COMMUNITY IMPACT STORY')}
                                    </span>

                                    <blockquote className="text-[#001B44] text-xl md:text-2xl font-bold leading-relaxed tracking-tight mb-8 font-sans">
                                        "{storiesT[current]?.text || story.text}"
                                    </blockquote>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-100">
                                    <div>
                                        <p className="text-[#001B44] font-extrabold text-lg uppercase tracking-wide">
                                            {storiesT[current]?.name || story.name}
                                        </p>
                                        <p className="text-slate-500 text-xs font-semibold mt-0.5">
                                            {storiesT[current]?.role || story.role}
                                        </p>
                                    </div>

                                    <Link
                                        to="/stories"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#001B44] hover:bg-[#1eb4d4] text-white font-bold text-xs uppercase tracking-widest rounded-[2px] transition-all shadow-sm w-fit"
                                    >
                                        <span>{t('components.beneficiary_stories.btn', 'Read More Stories')}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination & Next/Prev Controls */}
                    <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
                        {/* Dot Indicators */}
                        <div className="flex items-center gap-2">
                            {stories.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className="transition-all duration-300 rounded-full cursor-pointer"
                                    style={
                                        i === current
                                            ? { width: '2.5rem', height: '0.5rem', backgroundColor: '#1eb4d4' }
                                            : { width: '0.5rem', height: '0.5rem', backgroundColor: '#cbd5e1' }
                                    }
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={prev}
                                className="w-10 h-10 rounded-full border border-slate-300 text-[#001B44] hover:border-[#1eb4d4] hover:bg-[#1eb4d4] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                                aria-label="Previous story"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={next}
                                className="w-10 h-10 rounded-full border border-slate-300 text-[#001B44] hover:border-[#1eb4d4] hover:bg-[#1eb4d4] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                                aria-label="Next story"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeneficiaryStories;
