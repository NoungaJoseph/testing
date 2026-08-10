import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ACTION_LINKS } from '../constants/actionLinks';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PremiumHeroCarousel = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const { t } = useTranslation();

    const slides = [
        {
            image: '/assets/updates/5.png',
            title: t('carousel.slide1_title'),
            subtitle: t('carousel.slide1_subtitle'),
            buttonText: t('carousel.slide1_btn'),
            buttonLink: '/programs/scholarships',
        },
        {
            image: '/assets/updates/6.png',
            title: t('carousel.slide2_title'),
            subtitle: t('carousel.slide2_subtitle'),
            buttonText: t('carousel.slide2_btn'),
            buttonLink: ACTION_LINKS.applyHelp,
        },
        {
            image: '/assets/updates/8.png',
            title: t('carousel.slide3_title'),
            subtitle: t('carousel.slide3_subtitle'),
            buttonText: t('carousel.slide3_btn'),
            buttonLink: '/donate',
        },
    ];

    useEffect(() => {
        const timer = window.setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => window.clearInterval(timer);
    }, [slides.length]);

    return (
        <section className="w-full relative bg-[#111] overflow-hidden min-h-[580px] lg:min-h-[640px] flex flex-col justify-end pt-36 pb-16 md:pt-44 md:pb-24">
            {/* Image Carousel Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                            index === currentImage ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={slide.image}
                            alt={`Carousel image ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/40" />
                    </div>
                ))}
            </div>

            {/* Slide Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full text-center">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`transition-all duration-700 ${
                            index === currentImage
                                ? 'opacity-100 translate-y-0 relative'
                                : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                        }`}
                    >
                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.08] mb-4 md:mb-6 drop-shadow-md">
                            {slide.title}
                        </h1>
                        <p className="text-white/90 text-base md:text-xl leading-relaxed max-w-3xl mx-auto mb-8 font-medium drop-shadow-sm">
                            {slide.subtitle}
                        </p>
                        <div>
                            <Link
                                to={slide.buttonLink}
                                className="ds-btn ds-btn-accent text-sm md:text-base px-8 py-4 rounded"
                            >
                                {slide.buttonText} <ArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                ))}

                {/* Indicators */}
                <div className="flex justify-center gap-2 mt-12 z-20 relative">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                index === currentImage
                                    ? 'bg-[#1eb4d4] w-8'
                                    : 'bg-white/40 hover:bg-white/70 w-2.5'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PremiumHeroCarousel;
