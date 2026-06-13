import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
        role: 'Scholarship Recipient, Yaounde',
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

    const story = stories[current];

    return (
        <section className="py-24 px-6 md:px-16 overflow-hidden" style={{ backgroundColor: '#FDFBF7' }}>
            <div className="max-w-7xl mx-auto">
                <FadeIn direction="up">
                    <div className="text-center mb-16">
                        <span className="font-black uppercase tracking-[0.4em] text-[10px] block mb-4" style={{ color: '#001F5B' }}>
                            {t('components.beneficiary_stories.badge')}
                        </span>
                        <h2 className="text-4xl md:text-5xl leading-tight" style={{ color: '#001B44' }}>
                            {t('components.beneficiary_stories.title')} <span style={{ color: '#00BFA5' }}>{t('components.beneficiary_stories.title_highlight')}</span>
                        </h2>
                    </div>
                </FadeIn>

                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        >
                            <div className="relative">
                                <div className="w-full max-w-md mx-auto lg:mx-0 rounded-[3rem_3rem_8rem_3rem] overflow-hidden aspect-[4/5]">
                                    <img
                                        src={story.image}
                                        alt={story.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = story.fallback;
                                        }}
                                    />
                                </div>
                                <div className="absolute bottom-6 left-6 w-8 h-8 rounded-full bg-secondary shadow-lg shadow-secondary/40" />
                            </div>

                            <div className="lg:pl-8">
                                <span className="text-secondary font-black uppercase tracking-[0.3em] text-[10px] block mb-6">
                                    {t('components.beneficiary_stories.story_badge')}
                                </span>

                                <blockquote className="text-navy text-3xl md:text-4xl font-black leading-tight tracking-tight mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                                    "{storiesT[current]?.text || story.text}"
                                </blockquote>

                                <div className="mb-8">
                                    <p className="text-navy font-black text-lg">{storiesT[current]?.name || story.name}</p>
                                    <p className="text-slate-400 text-sm font-medium">{storiesT[current]?.role || story.role}</p>
                                </div>

                                <Link to="/stories" className="btn-pill btn-pill-primary text-sm">
                                    {t('components.beneficiary_stories.btn')}
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center justify-center gap-3 mt-12">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                            style={{ border: '2px solid #001B44', color: '#001B44' }}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        {stories.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className="transition-all duration-300 rounded-full"
                                style={
                                    i === current
                                        ? { width: '2rem', height: '0.75rem', backgroundColor: '#00BFA5' }
                                        : { width: '0.75rem', height: '0.75rem', backgroundColor: '#CBD5E1' }
                                }
                            />
                        ))}
                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                            style={{ border: '2px solid #001B44', color: '#001B44' }}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BeneficiaryStories;
