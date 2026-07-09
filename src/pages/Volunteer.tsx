import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Home, ChevronRight, Send, CheckCircle2, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';
import { useTranslation } from 'react-i18next';

const VolunteerPage = () => {
    const { t } = useTranslation();
    const rolesT = t('volunteer.roles.items', { returnObjects: true }) as any[];
    const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', message: '' });
    const [documentBase64, setDocumentBase64] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(false);

    const submitVolunteer = async () => {
        try {
            const payload = {
                type: 'VOLUNTEER',
                applicantName: form.name,
                email: form.email,
                phone: form.phone,
                details: { role: form.role, message: form.message },
                documents: documentBase64 ? [documentBase64] : [],
            };
            const response = await fetch('http://localhost:5000/api/v1/outreach/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                setIsComplete(true);
            } else {
                console.error('Failed to submit application');
                setIsComplete(true);
            }
        } catch (err) {
            console.error(err);
            setIsComplete(true);
        }
    };
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="flex-grow relative z-10">
                    {/* HERO */}
                    <section className="relative w-full min-h-[75vh] flex items-center overflow-hidden bg-navy pt-20">
                        <div className="absolute inset-0 z-0">
                            <motion.div
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.4 }}
                                transition={{ duration: 2 }}
                                className="w-full h-full"
                            >
                                <img
                                    src="/assets/images/new_assets/volunteer_hero.png"
                                    alt="Volunteers working"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent z-10" />
                        </div>
                        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full pt-32 pb-16">
                            <FadeIn direction="right">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                    <Users className="w-3 h-3" /> {t('volunteer.hero.badge')}
                                </div>
                                <h2 className="text-white text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter mb-8 max-w-4xl">
                                    {t('volunteer.hero.title')} <br />
                                    <span className="text-secondary ">{t('volunteer.hero.title_highlight')}</span>
                                </h2>
                                <p className="text-slate-300 text-xl font-medium max-w-2xl leading-relaxed mb-12">
                                    {t('volunteer.hero.desc')}
                                </p>
                                <div className="flex flex-wrap gap-6 mb-16">
                                    <a href="#apply" className="group relative flex items-center justify-center overflow-hidden rounded-xl bg-secondary px-10 h-16 text-white font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-secondary/40">
                                        {t('volunteer.hero.btn_start')}
                                    </a>
                                    <Link to="/impact" className="flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/20 px-10 h-16 text-white font-black hover:bg-white/10 transition-all text-lg">
                                        {t('volunteer.hero.btn_learn')}
                                    </Link>
                                </div>
                                {/* Mini volunteer stats */}
                                <div className="flex items-center gap-6 pt-10 border-t border-white/10">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-12 h-12 rounded-full border-4 border-navy bg-slate-400 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-secondary/20" />
                                            </div>
                                        ))}
                                        <div className="w-12 h-12 rounded-full border-4 border-navy bg-secondary flex items-center justify-center text-white text-[10px] font-black ">
                                            +18
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{t('volunteer.hero.stats_text')}</p>
                                </div>
                            </FadeIn>
                        </div>
                    </section>

                    {/* BREADCRUMB */}
                    <section className="bg-transparent border-b border-slate-100 py-10 px-6 lg:px-20">
                        <div className="max-w-7xl mx-auto">
                            <nav className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <Link to="/" className="hover:text-secondary flex items-center gap-2 transition-colors">
                                    <Home className="w-3 h-3" /> {t('nav.home')}
                                </Link>
                                <ChevronRight className="w-3 h-3 text-slate-300" />
                                <span className="text-secondary">{t('footer.volunteer')}</span>
                            </nav>
                        </div>
                    </section>

                    {/* ROLES */}
                    <section className="py-24 px-6 lg:px-20 bg-transparent">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col items-center text-center mb-20">
                                <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] block mb-6">{t('volunteer.roles.badge')}</span>
                                <h2 className="text-navy text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">
                                    {t('volunteer.roles.title')} <span className="text-secondary ">{t('volunteer.roles.title_highlight')}</span>
                                </h2>
                                <div className="w-24 h-2 bg-secondary rounded-full" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {[
                                    { icon: GraduationCap, title: 'Education Support', desc: 'Assist in local schools, provide tutoring, and help build learning resource centers for children.' },
                                    { icon: Users, title: 'Community Outreach', desc: 'Work directly with leaders to implement sustainable development projects and health programs.' },
                                    { icon: Award, title: 'Skill Development', desc: 'Share your expertise in technology, business, or trades to empower youth with marketable skills.' },
                                ].map((role, i) => (
                                    <FadeIn key={role.title} delay={i * 0.1} direction="up" fullWidth>
                                        <div className="p-10 rounded-[3rem] transition-all duration-500 group border border-transparent h-full flex flex-col">
                                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-navy group-hover:bg-secondary group-hover:text-white transition-all duration-500 mb-8">
                                                <role.icon className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl font-black mb-4 text-navy tracking-tight">{rolesT[i]?.title || role.title}</h3>
                                            <p className="text-slate-500 font-medium leading-relaxed flex-1">{rolesT[i]?.desc || role.desc}</p>
                                            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-2 text-secondary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                                {t('volunteer.roles.btn_learn')} <ChevronRight className="w-3 h-3" />
                                            </div>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* APPLICATION FORM */}
                    <section className="py-32 px-6 lg:px-20 bg-transparent" id="apply">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex flex-col items-center text-center mb-20">
                                <span className="text-slate-500 font-black tracking-[0.4em] uppercase text-[10px] block mb-6">{t('volunteer.apply.badge')}</span>
                                <h2 className="text-navy text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8 ">{t('volunteer.apply.title')}</h2>
                                <p className="text-slate-500 font-medium max-w-xl">{t('volunteer.apply.desc')}</p>
                            </div>

                            <div className="form-shell md:p-12">
                                {isComplete ? (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-green-50 rounded-full mx-auto mb-6 flex items-center justify-center">
                                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h2 className="text-3xl font-black text-navy mb-3">Application Received</h2>
                                        <p className="text-slate-500 mb-8 leading-relaxed">Thank you for stepping up to make a difference. We will review your application and get back to you shortly.</p>
                                    </div>
                                ) : (
                                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); submitVolunteer(); }}>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className="h-11 px-4 bg-white border border-slate-200 text-[#001F5B]"
                                                placeholder="Full name"
                                                required
                                            />
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                className="h-11 px-4 bg-white border border-slate-200 text-[#001F5B]"
                                                placeholder="Email address"
                                                required
                                            />
                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                className="h-11 px-4 bg-white border border-slate-200 text-[#001F5B]"
                                                placeholder="Phone number"
                                                required
                                            />
                                            <select
                                                value={form.role}
                                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                                className="h-11 px-4 bg-white border border-slate-200 text-[#001F5B]"
                                                required
                                            >
                                                <option value="">Select volunteer role</option>
                                                <option value="Educational Support">Educational Support</option>
                                                <option value="Community Outreach">Community Outreach</option>
                                                <option value="Skills Training">Skills Training</option>
                                                <option value="Fundraising">Fundraising</option>
                                                <option value="Remote Digital Support">Remote Digital Support</option>
                                            </select>
                                        </div>
                                        <textarea
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            rows={4}
                                            className="w-full p-4 bg-white border border-slate-200 text-[#001F5B] resize-none"
                                            placeholder="Why do you want to volunteer with us?"
                                            required
                                        />
                                        <div className="pt-2">
                                            <h3 className="text-[#001F5B] text-lg font-black mb-3">Resume / Supporting Document (Optional)</h3>
                                            <div className="space-y-3">
                                                <input
                                                    type="file"
                                                    accept=".pdf,image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => setDocumentBase64(reader.result as string);
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                    className="block w-full text-sm text-slate-600 file:mr-4 file:px-3 file:py-2 file:border-0 file:bg-[#001F5B] file:text-white cursor-pointer"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="h-11 px-6 bg-[#00C2C7] text-[#001F5B] font-bold hover:bg-[#00a8ad] transition-colors"
                                        >
                                            Submit Volunteer Application
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* FINAL CTA */}
                    <section className="py-32 px-6 bg-navy text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
                        <FadeIn direction="up">
                            <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
                                {t('volunteer.final_cta.title')} <span className="text-secondary ">{t('volunteer.final_cta.title_highlight')}</span>
                            </h2>
                            <p className="text-slate-400 max-w-xl mx-auto mb-16 text-xl font-medium leading-relaxed">
                                {t('volunteer.final_cta.desc')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                                <a href="#apply" className="group relative flex items-center justify-center overflow-hidden rounded-xl bg-secondary px-10 h-16 text-white font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-secondary/40 w-full">
                                    {t('volunteer.final_cta.btn_apply')}
                                </a>
                                <Link to="/donate" className="flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/20 px-10 h-16 text-white font-black hover:bg-white/10 transition-all text-lg w-full">
                                    {t('volunteer.final_cta.btn_donate')}
                                </Link>
                            </div>
                        </FadeIn>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default VolunteerPage;
