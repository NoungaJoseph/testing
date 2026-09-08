import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GOLD_UNDERLINE_LINK_CLASS } from '../constants/actionLinks';
import { useTranslation } from 'react-i18next';
import { Loader2, CheckCircle2, Send } from 'lucide-react';

const intentContent: Record<string, { title: string; hint: string; placeholder: string }> = {
    'general-help': {
        title: 'Help Application',
        hint: 'You are on the direct help-application form.',
        placeholder: 'Please describe your need, location, and urgency level.',
    },
    scholarship: {
        title: 'Scholarship Application',
        hint: 'You are on the direct scholarship-application form.',
        placeholder: 'Please share student details, academic level, and support needed.',
    },
    'report-case': {
        title: 'Community Case Report',
        hint: 'You are on the direct case-report form.',
        placeholder: 'Please describe the issue, community name, and contact person.',
    },
    'program-support': {
        title: 'Programme Support Application',
        hint: 'You are on the direct programme application form.',
        placeholder: 'Please explain the programme support request and beneficiary details.',
    },
};

const ContactForm = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const intent = searchParams.get('intent') ?? '';
    const selectedContent = useMemo(() => intentContent[intent], [intent]);

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;

        setIsSubmitting(true);
        try {
            const payload = {
                type: intent ? intent.toUpperCase() : 'GENERAL_CONTACT',
                applicantName: form.name,
                email: form.email,
                details: { message: form.message, intent },
            };

            await fetch('https://api.enakoos.com/api/v1/outreach/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            setIsSubmitted(true);
        } catch (err) {
            console.error('Submission error:', err);
            setIsSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact-form" className="bg-transparent dark:bg-background-dark py-12 px-6 md:px-12 mb-40">
            <div className="max-w-6xl mx-auto">
                {selectedContent && (
                    <div className="mb-8 rounded-2xl border border-[#00C2C7]/35 bg-[#00C2C7]/10 p-5">
                        <p className="text-sm font-black uppercase tracking-widest text-[#00C2C7] mb-1">{selectedContent.title}</p>
                        <p className="text-sm text-slate-700">
                            {selectedContent.hint}{' '}
                            <span className={GOLD_UNDERLINE_LINK_CLASS}>Share this page link directly.</span>
                        </p>
                    </div>
                )}
                <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-6 md:gap-8">
                    <div className="flex items-center justify-center md:w-96 md:h-96">
                        <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
                            <img src="/assets/charity/contact us/ccc.png" alt="ccc" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="md:w-96 md:h-96 w-full">
                        {isSubmitted ? (
                            <div className="bg-white dark:bg-slate-800 h-full p-8 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center shadow-lg">
                                <CheckCircle2 className="w-16 h-16 text-[#00C2C7] mb-4" />
                                <h3 className="text-xl font-bold text-navy dark:text-white uppercase mb-2">Message Received!</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                                    Thank you for reaching out to Enako Outreach. Our team will review your submission and follow up shortly.
                                </p>
                                <button
                                    onClick={() => { setIsSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                                    className="px-6 py-2.5 bg-[#001B44] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#1eb4d4] transition-all"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="form-shell space-y-6 bg-white dark:bg-slate-800 h-full flex flex-col justify-between p-6 rounded-2xl border border-slate-100 shadow-md">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1 font-display">
                                        {t('contact.form.name_label')} *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        placeholder={t('contact.form.name_placeholder')}
                                        className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#1eb4d4] text-navy dark:text-white transition-all text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1 font-display">
                                        {t('contact.form.email_label')} *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder={t('contact.form.email_placeholder')}
                                        className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#1eb4d4] text-navy dark:text-white transition-all text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1 font-display">
                                        {t('contact.form.message_label')} *
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        placeholder={selectedContent?.placeholder ?? t('contact.form.message_placeholder')}
                                        className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#1eb4d4] text-navy dark:text-white transition-all resize-none text-sm"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-[#1eb4d4] text-[#001F5B] font-black rounded-xl text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Submitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            <span>{t('contact.form.submit_btn')}</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
