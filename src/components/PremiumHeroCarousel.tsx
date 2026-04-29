import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ACTION_LINKS } from '../constants/actionLinks';

const PremiumHeroCarousel = () => {
    return (
        <section className="relative w-full min-h-[100svh] overflow-hidden" style={{ backgroundColor: '#001B44' }}>
            <div className="relative z-10 w-full min-h-[100svh] flex items-start md:items-center pt-[72px] md:pt-0">
                <div className="grid lg:grid-cols-2 gap-0 w-full min-h-[100svh]">
                    <div className="flex items-center justify-center px-5 py-8 sm:p-8 md:p-16 lg:p-24 xl:p-32" style={{ backgroundColor: '#001B44' }}>
                        <div className="max-w-xl">
                            <span className="text-xs font-bold uppercase tracking-[0.32em] block mb-5" style={{ color: '#00BFA5' }}>
                                
                            </span>
                            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] font-black leading-[1.08] tracking-tight mb-6 md:mb-8">
                                Empowering Futures Across Cameroon
                            </h1>
                            <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-12">
                                Enako Outreach delivers scholarships, school rehabilitation, and teacher support to rural and urban communities across Cameroon.
                            </p>
                            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-5">
                                <Link to={ACTION_LINKS.applyHelp} className="btn-pill btn-pill-teal text-sm sm:text-base px-6 sm:px-10 py-3.5 sm:py-4 shadow-none justify-center">
                                    Apply for Help <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link to="/programs/scholarships" className="btn-pill text-sm sm:text-base px-6 sm:px-10 py-3.5 sm:py-4 justify-center" style={{ border: '2px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '9999px', fontWeight: 700 }}>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-[38svh] sm:h-[42svh] lg:h-full w-full overflow-hidden bg-slate-950">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                        >
                            <source src="/assets/updates/homepage.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PremiumHeroCarousel;
