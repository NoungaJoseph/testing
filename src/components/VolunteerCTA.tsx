import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const VolunteerCTA = () => {
    const { t } = useTranslation();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email) return;

        setIsSubmitting(true);
        try {
            await fetch('https://api.enakoos.com/api/v1/outreach/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'VOLUNTEER',
                    applicantName: form.name,
                    email: form.email,
                    details: { message: form.message }
                })
            });
            setSubmitted(true);
        } catch (err) {
            console.error('Volunteer CTA error:', err);
            setSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="py-24 px-6 md:px-16 bg-transparent overflow-hidden relative">
            {/* Ghost text */}
            <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none overflow-hidden select-none">
                <span className="text-[15vw] font-black text-slate-50 tracking-tighter whitespace-nowrap">{t('components.volunteer_cta.ghost_text')}</span>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT - Circular image with decorative shapes */}
                    <FadeIn direction="right">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-secondary/20 blur-2xl" />
                            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-blue-100 blur-2xl" />

                            <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden shadow-[0_40px_100px_-20px_rgba(10,15,44,0.15)] border-4 border-white z-10">
                                <img
                                    src="/assets/images/new_assets/volunteer_cta.png"
                                    alt="Volunteer with children"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/assets/images/new_assets/volunteer_cta.png';
                                    }}
                                />
                            </div>

                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                                className="absolute bottom-8 -right-4 bg-white rounded-2xl px-5 py-4 shadow-xl border border-slate-100 z-20"
                            >
                                <p className="text-navy font-black text-2xl">500+</p>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t('components.volunteer_cta.active_volunteers')}</p>
                            </motion.div>
                        </div>
                    </FadeIn>

                    {/* RIGHT - Form / CTA area */}
                    <FadeIn direction="left" delay={0.2}>
                        <div className="relative">
                            <span className="absolute -top-8 right-0 text-[8rem] font-black text-slate-50 tracking-tighter leading-none pointer-events-none select-none">
                                {t('components.volunteer_cta.ghost_text')}
                            </span>

                            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mb-3 relative">
                                {t('components.volunteer_cta.badge')}
                            </p>

                            <h2 className="text-navy text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 relative">
                                {t('components.volunteer_cta.title')} <span className="text-secondary ">{t('components.volunteer_cta.title_highlight')}</span>
                            </h2>

                            <p className="text-slate-500 text-base leading-relaxed mb-8 max-w-md relative">
                                {t('components.volunteer_cta.desc')}
                            </p>

                            {submitted ? (
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                                    <CheckCircle2 className="w-12 h-12 text-[#1eb4d4] mx-auto mb-3" />
                                    <h3 className="text-xl font-bold text-[#001B44] uppercase mb-1">Thank You!</h3>
                                    <p className="text-sm text-slate-600">Your volunteer interest has been received. We will be in touch shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4 mb-8 relative">
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder={t('components.volunteer_cta.form.name')}
                                        className="w-full px-5 py-4 border border-slate-200 rounded-2xl text-navy font-medium placeholder-slate-400 focus:outline-none focus:border-secondary transition-colors text-sm"
                                    />
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder={t('components.volunteer_cta.form.email')}
                                        className="w-full px-5 py-4 border border-slate-200 rounded-2xl text-navy font-medium placeholder-slate-400 focus:outline-none focus:border-secondary transition-colors text-sm"
                                    />
                                    <textarea
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        placeholder={t('components.volunteer_cta.form.message')}
                                        rows={3}
                                        className="w-full px-5 py-4 border border-slate-200 rounded-2xl text-navy font-medium placeholder-slate-400 focus:outline-none focus:border-secondary transition-colors resize-none text-sm"
                                    />

                                    <div className="flex flex-wrap gap-4 pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-white font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-[#00a8ae] hover:scale-105 transition-all shadow-xl shadow-secondary/30 disabled:opacity-50 cursor-pointer"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Submitting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{t('components.volunteer_cta.btn_submit')}</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                        <Link
                                            to="/volunteer"
                                            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-secondary text-secondary font-black text-sm uppercase tracking-widest rounded-2xl hover:bg-secondary hover:text-white transition-all"
                                        >
                                            {t('components.volunteer_cta.btn_learn')}
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default VolunteerCTA;
