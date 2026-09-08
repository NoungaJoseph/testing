import { useState } from 'react';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';
import { Loader2, CheckCircle2, Send } from 'lucide-react';

const VolunteerForm = () => {
    const { t } = useTranslation();
    const [form, setForm] = useState({ name: '', email: '', role: 'field', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email) return;

        setIsSubmitting(true);
        try {
            const payload = {
                type: 'VOLUNTEER',
                applicantName: form.name,
                email: form.email,
                details: { role: form.role, message: form.message },
            };

            await fetch('https://api.enakoos.com/api/v1/outreach/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            setIsSubmitted(true);
        } catch (err) {
            console.error('Volunteer submission error:', err);
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-slate-50 dark:bg-white border border-background-dark py-24 px-6 md:px-12">
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                <FadeIn direction="up">
                    <div className="text-center mb-12">
                        <h2 className="text-navy dark:text-white text-3xl md:text-4xl font-black mb-4 tracking-tight">{t('volunteer.form_title', 'Application Form')}</h2>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">{t('volunteer.form_subtitle', 'Please fill out the form below to begin your journey with us.')}</p>
                    </div>

                    {isSubmitted ? (
                        <div className="text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100">
                            <CheckCircle2 className="w-16 h-16 text-[#1eb4d4] mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-navy dark:text-white mb-2 uppercase">Application Submitted!</h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6 max-w-md mx-auto">
                                Thank you for applying to volunteer with Enako Outreach. Our volunteer team will review your application and contact you soon.
                            </p>
                            <button
                                onClick={() => { setIsSubmitted(false); setForm({ name: '', email: '', role: 'field', message: '' }); }}
                                className="px-8 py-3 bg-[#001B44] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#1eb4d4] transition-all"
                            >
                                Submit Another Application
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="form-shell space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1">{t('volunteer.fullname', 'Full Name')} *</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder="John Doe"
                                        className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#1eb4d4] text-navy dark:text-white transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1">{t('volunteer.email', 'Email Address')} *</label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="john@example.com"
                                        className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#1eb4d4] text-navy dark:text-white transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1">{t('volunteer.role', 'Role of Interest')} *</label>
                                <select
                                    value={form.role}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                    className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#1eb4d4] text-navy dark:text-white transition-all"
                                >
                                    <option value="field">{t('volunteer.role_field', 'Field Volunteer')}</option>
                                    <option value="mentor">{t('volunteer.role_mentor', 'Youth Mentor')}</option>
                                    <option value="educator">{t('volunteer.role_educator', 'Community Educator')}</option>
                                    <option value="admin">{t('volunteer.role_admin', 'Administrative Support')}</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1">{t('volunteer.motivation', 'Why do you want to volunteer?')}</label>
                                <textarea
                                    rows={4}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    placeholder={t('volunteer.motivation_placeholder', 'Share your motivation...')}
                                    className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#1eb4d4] text-navy dark:text-white transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 rounded-xl bg-[#1eb4d4] text-[#001F5B] font-black text-lg uppercase tracking-wider hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Submitting Application...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>{t('volunteer.submit_btn', 'Submit Application')}</span>
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </FadeIn>
            </div>
        </section>
    );
};

export default VolunteerForm;
