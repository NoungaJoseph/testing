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
    }, []);

    return (
        <section className="w-full h-screen bg-slate-950 relative">
            <div className="w-full h-screen relative overflow-hidden">
                    {/* Image Carousel */}
                    <div className="absolute inset-0 w-full h-full">
                        {slides.map((slide, index) => (
                            <img
                                key={index}
                                src={slide.image}
                                alt={`Carousel image ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                                    index === currentImage ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        ))}
                    </div>

                    {/* Individual Slide Content Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 flex items-center justify-center px-5 md:px-8 lg:p-16 xl:p-24 transition-opacity duration-1000 ${
                                    index === currentImage ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                }`}
                            >
                                <div className="text-center max-w-3xl">
                                    <div className="rounded-2xl p-8 md:p-12">
                                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-black leading-[1.08] tracking-tight mb-4 md:mb-6">
                                            {slide.title}
                                        </h1>
                                        <p className="text-white text-sm sm:text-base md:text-lg leading-relaxed mb-8 md:mb-12">
                                            {slide.subtitle}
                                        </p>
                                        <Link
                                            to={slide.buttonLink}
                                            className="btn-pill btn-pill-teal text-sm sm:text-base px-6 sm:px-10 py-3.5 sm:py-4 shadow-none inline-flex items-center gap-2"
                                        >
                                            {slide.buttonText} <ArrowRight className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel Indicators */}
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImage(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    index === currentImage
                                        ? 'bg-white w-8'
                                        : 'bg-white/50 hover:bg-white/70'
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
