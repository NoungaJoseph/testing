import FadeIn from './FadeIn';

const ImpactHero = () => {
    return (
        <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden pt-20">
            {/* Background Image with Gradient Overlays */}
            <div className="absolute inset-0 z-0">
                <img
                    alt="Modern sustainable school building in a vibrant rural African community"
                    className="h-full w-full object-cover"
                    src="/assets/charity/our-expertize-in-action.png"
                />
                <div className="absolute inset-0 bg-navy/60 dark:bg-black/80"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-start">
                <FadeIn direction="up">
                    <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-secondary text-secondary text-xs font-bold uppercase tracking-widest">
                            <span className="size-2 rounded-full bg-secondary animate-pulse"></span>
                            Impact Report 2024
                        </div>
                        <h1 className="text-white text-4xl md:text-6xl leading-[1.1] mb-2">
                            Measuring Change. <br />
                            <span style={{ color: '#00BFA5' }}>Sharing Progress.</span>
                        </h1>
                        <p className="text-navy dark:text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                            A premium humanitarian foundation dedicated to elevating education and sustainable community development across the African continent.
                        </p>
                    </div>
                </FadeIn>

                {/* Impact Stats Strip (Floating) */}
                <div className="absolute bottom-12 left-6 md:left-12 right-6 md:right-auto">
                    <FadeIn direction="up" delay={0.2}>
                        <div className="grid grid-cols-2 md:flex gap-8 md:gap-16 p-8 backdrop-blur-xl rounded-2xl" style={{ backgroundColor: '#FDFBF7', border: '2px solid rgba(0,191,165,0.3)' }}>
                            <div>
                                <p className="text-3xl font-black" style={{ color: '#00BFA5' }}>8</p>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Schools Planned</p>
                            </div>
                            <div className="border-l border-slate-200 pl-8 md:pl-16">
                                <p className="text-3xl font-black" style={{ color: '#00BFA5' }}>120+</p>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Students Goal</p>
                            </div>
                            <div className="hidden md:block border-l border-slate-200 pl-16">
                                <p className="text-3xl font-black" style={{ color: '#00BFA5' }}>1</p>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Nation Served</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default ImpactHero;
