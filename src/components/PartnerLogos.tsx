import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

const logos = [
    { src: '/assets/charity/our-expertize-in-action.png', alt: 'Global Education Fund' },
    { src: '/assets/charity/our-expertize-in-action.png', alt: 'African Development' },
    { src: '/assets/charity/our-expertize-in-action.png', alt: 'Literacy Worldwide' },
    { src: '/assets/charity/our-expertize-in-action.png', alt: 'Sustainable Communities' },
    { src: '/assets/charity/our-expertize-in-action.png', alt: 'Unity Foundation' },
    { src: '/assets/charity/our-expertize-in-action.png', alt: 'Heritage Trust' },
];

const PartnerLogos = () => {
    return (
        <section className="py-32 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center mb-24">
                <FadeIn direction="up">
                    <div className="flex items-center justify-center gap-2 text-secondary font-black text-[10px] uppercase tracking-[0.4em] mb-6">
                        <Star className="w-3 h-3 fill-current" /> Trust & Collaboration
                    </div>
                    <h2 className="text-navy text-4xl md:text-6xl font-black tracking-tight leading-none mb-8">
                        The Wall of <span className="text-secondary ">Trust.</span>
                    </h2>
                    <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
                        We collaborate with international institutions, local governments, and global foundations to deliver sustainable change.
                    </p>
                </FadeIn>
            </div>

            {/* Infinite Marquee */}
            <div className="relative flex overflow-hidden group py-10">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {[...logos, ...logos].map((logo, idx) => (
                        <div key={idx} className="flex-shrink-0 px-16 py-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer">
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="h-14 w-auto object-contain"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Gradient Masks */}
                <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto text-center mt-12">
                <FadeIn direction="up" delay={0.2}>
                    <Link to="/partnership" className="inline-flex items-center gap-3 text-navy font-black text-xs uppercase tracking-widest group">
                        Become a Partner <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-2 transition-transform" />
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
};

export default PartnerLogos;
