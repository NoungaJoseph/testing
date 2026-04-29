import FadeIn from './FadeIn';

const StoriesHero = () => {
    return (
        <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 z-0">
                <img
                    alt="African student studying in a modern library"
                    className="h-full w-full object-cover"
                    src="/assets/charity/our-expertize-in-action.png"
                />
                <div className="absolute inset-0 bg-navy   " />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-center text-white">
                <FadeIn direction="up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-secondary text-secondary text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="material-symbols-outlined text-sm">auto_stories</span>
                        Human Impact
                    </div>
                    <h1 className="text-4xl md:text-6xl leading-[1.05] mb-6">
                        Real Stories. <br />
                        <span style={{ color: '#00BFA5' }}>Real Change.</span>
                    </h1>
                    <p className="text-slate-200 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto ">
                        Discover the personal journeys of students, teachers, and communities empowered by Enako Outreach.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
};

export default StoriesHero;
