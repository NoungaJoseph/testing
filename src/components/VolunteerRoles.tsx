import FadeIn from './FadeIn';

const VolunteerRoles = () => {
    const roles = [
        {
            title: "Teaching & Mentoring",
            description: "Support students in literacy, math, and digital skills while providing career guidance.",
            icon: "school"
        },
        {
            title: "Community Outreach",
            description: "Assist in organizing local events, health awareness campaigns, and resource distribution.",
            icon: "diversity_3"
        },
        {
            title: "Project Support",
            description: "Help with construction, maintenance, and planning for sustainable infrastructure projects.",
            icon: "handyman"
        }
    ];

    return (
        <section className="bg-white dark:bg-background-dark py-24 px-6 md:px-12 max-w-7xl mx-auto">
            <FadeIn direction="up">
                <div className="text-center mb-16">
                    <h2 className="text-navy dark:text-white text-3xl md:text-5xl font-black mb-6">Ways to Contribute</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                        We have a variety of roles to match your unique skills and passion. Choose where you can make the most impact.
                    </p>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {roles.map((role, i) => (
                    <FadeIn key={role.title} direction="up" delay={i * 0.1}>
                        <div className="group p-10 rounded-3xl transition-all text-center h-full">
                            <div className="size-20 rounded-2xl flex items-center justify-center mb-8 mx-auto group-hover:bg-secondary transition-colors">
                                <span className="material-symbols-outlined text-4xl text-secondary group-hover:text-white">{role.icon}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">{role.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                                {role.description}
                            </p>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
};

export default VolunteerRoles;
