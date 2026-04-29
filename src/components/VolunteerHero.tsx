import FadeIn from './FadeIn';

const VolunteerHero = () => {
    return (
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 z-0">
                <img
                    alt="Volunteers working with children in a sunny outdoor setting"
                    className="h-full w-full object-cover"
                    src="/assets/charity/our-expertize-in-action.png"
                />
                <div className="absolute inset-0 bg-navy " />
                <div className="absolute inset-0 bg-navy    " />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 text-center text-white space-y-8">
                <FadeIn direction="up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-secondary text-secondary text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                        <span className="material-symbols-outlined text-sm">volunteer_activism</span>
                        Join Our Mission
                    </div>
                    <h1 className="text-4xl md:text-6xl leading-tight">
                        Make a <span style={{ color: '#00BFA5' }}>Difference</span> Today.
                    </h1>
                    <p className="text-slate-200 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto ">
                        Enako Outreach relies on the passion and skills of volunteers like you to empower communities across Africa.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
};

export default VolunteerHero;
