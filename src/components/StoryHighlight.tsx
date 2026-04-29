import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
    {
        quote: 'Enako Outreach is doing what governments have failed to do for decades. Their scholarship programme transformed my daughter\'s life and gave our entire family hope. I am proud to have been part of this mission.',
        name: 'Mariam Fon',
        title: 'Parent - Bamenda, Cameroon',
        image: '/assets/imported/review-1.jpg',
    },
    {
        quote: 'The teacher award I received through Enako Outreach was more than a prize - it was recognition that my 15 years of dedication in a rural classroom actually mattered. This organisation sees us.',
        name: 'Emmanuel Nkeng',
        title: 'Primary School Teacher - Buea',
        image: '/assets/imported/review-2.jpg',
    },
    {
        quote: 'I came across Enako Outreach while looking for a cause that truly makes a difference. After just one visit to their impact report, I was fully convinced. Transparent, passionate, and deeply impactful.',
        name: 'Claire Mbarga',
        title: 'International Donor & Advocate',
        image: '/assets/imported/review-3.jpg',
    },
];

const StoryHighlight = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((c) => (c + 1) % reviews.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    const prev = () => setCurrent((c) => (c === 0 ? reviews.length - 1 : c - 1));
    const next = () => setCurrent((c) => (c + 1) % reviews.length);

    return (
        <section className="relative py-28 px-6 md:px-16 bg-navy overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
                <span className="text-[18vw] font-black text-white/[0.03] tracking-tighter whitespace-nowrap">Reviews</span>
            </div>

            <div
                className="absolute top-8 left-8 w-24 h-24 pointer-events-none opacity-30"
                style={{ backgroundImage: 'radial-gradient(circle, #00C2C760 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}
            />
            <div
                className="absolute bottom-8 right-8 w-24 h-24 pointer-events-none opacity-30"
                style={{ backgroundImage: 'radial-gradient(circle, #00C2C760 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}
            />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="mb-12">
                    <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mb-3">Community Voices</p>
                    <h2 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tight">
                        What They Say About <span className="text-secondary">Enako Outreach</span>
                    </h2>
                </div>

                <div className="flex items-center justify-center -space-x-3 mb-12">
                    {reviews.map((r, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`relative w-14 h-14 rounded-full border-4 overflow-hidden transition-all duration-300 ${i === current ? 'border-secondary scale-125 z-10' : 'border-navy/50 opacity-60 hover:opacity-100'}`}
                        >
                            <img
                                src={r.image}
                                alt={r.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${r.name}`;
                                }}
                            />
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 min-h-[340px] md:min-h-[300px]"
                    >
                        <blockquote className="text-slate-200 text-xl md:text-2xl font-medium leading-relaxed mb-8 max-w-3xl mx-auto h-[180px] md:h-[140px] overflow-hidden">
                            "{reviews[current].quote}"
                        </blockquote>
                        <p className="text-white font-black text-lg">{reviews[current].name}</p>
                        <p className="text-slate-400 text-sm font-medium mt-1">{reviews[current].title}</p>
                    </motion.div>
                </AnimatePresence>

                <div className="flex items-center justify-center gap-6">
                    <button
                        onClick={prev}
                        className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2">
                        {reviews.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2.5 bg-secondary' : 'w-2.5 h-2.5 bg-white/20'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 hover:border-white transition-all"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default StoryHighlight;
