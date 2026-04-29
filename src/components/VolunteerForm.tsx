import FadeIn from './FadeIn';

const VolunteerForm = () => {
    return (
        <section className="bg-slate-50 dark:bg-white border border-background-dark py-24 px-6 md:px-12">
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                <FadeIn direction="up">
                    <div className="text-center mb-12">
                        <h2 className="text-navy dark:text-white text-3xl md:text-4xl font-black mb-4 tracking-tight">Application Form</h2>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">Please fill out the form below to begin your journey with us.</p>
                    </div>

                    <form className="form-shell space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1">Full Name</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary text-navy dark:text-white transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary text-navy dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1">Preferred Role</label>
                            <select className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary text-navy dark:text-white transition-all appearance-none cursor-pointer">
                                <option>Teaching & Mentoring</option>
                                <option>Community Outreach</option>
                                <option>Project Support</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1">Message / Experience</label>
                            <textarea
                                rows={5}
                                placeholder="Tell us about yourself..."
                                className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary text-navy dark:text-white transition-all resize-none"
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full py-5 bg-secondary text-[#001F5B] font-black rounded-xl text-lg hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-secondary/20">
                            Submit Application
                        </button>
                    </form>
                </FadeIn>
            </div>
        </section>
    );
};

export default VolunteerForm;
