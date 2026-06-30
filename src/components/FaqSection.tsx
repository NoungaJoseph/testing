import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

const FaqSection = () => {
    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            title: t('home.faq.q1_title'),
            desc: t('home.faq.q1_desc'),
        },
        {
            title: t('home.faq.q2_title'),
            desc: t('home.faq.q2_desc'),
        },
        {
            title: t('home.faq.q3_title'),
            desc: t('home.faq.q3_desc'),
        },
        {
            title: t('home.faq.q4_title'),
            desc: t('home.faq.q4_desc'),
        }
    ];

    // Helper to parse markdown links like [Text](/url) into React Router Links
    const parseTextWithLinks = (text: string) => {
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = linkRegex.exec(text)) !== null) {
            // Push preceding text
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }
            // Push the link component
            parts.push(
                <Link key={match.index} to={match[2]} className="text-[#1eb4d4] font-medium hover:underline hover:text-blue-500 ml-1">
                    {match[1]}
                </Link>
            );
            lastIndex = linkRegex.lastIndex;
        }

        // Push remaining text
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts.length > 0 ? parts : text;
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                <FadeIn direction="up" className="text-center mb-14">
                    <span className="text-[#1c4980] font-bold text-xs uppercase tracking-widest block mb-3">
                        {t('home.faq.badge')}
                    </span>
                    <h2 className="text-[#1c4980] font-black text-4xl md:text-5xl mb-4">
                        {t('home.faq.title')}
                    </h2>
                </FadeIn>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FadeIn key={index} delay={index * 0.1} direction="up">
                            <div className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${openIndex === index ? 'border-green-200 bg-green-50/30' : 'border-slate-200 bg-white hover:border-green-100'}`}>
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className="font-bold text-lg text-[#1c4980]">{faq.title}</span>
                                    <ChevronDown
                                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-[#1eb4d4]' : ''}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-slate-600 text-base leading-relaxed flex flex-wrap items-center">
                                                {parseTextWithLinks(faq.desc)}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
