import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const VolunteerForm = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-slate-50 dark:bg-white border border-background-dark py-24 px-6 md:px-12">
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                <FadeIn direction="up">
                    <div className="text-center mb-12">
                        <h2 className="text-navy dark:text-white text-3xl md:text-4xl font-black mb-4 tracking-tight">{t('volunteer.form_title', 'Application Form')}</h2>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">{t('volunteer.form_subtitle', 'Please fill out the form below to begin your journey with us.')}</p>
                    </div>

                    <form className="form-shell space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1">{t('volunteer.fullname', 'Full Name')}</label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary text-navy dark:text-white transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1">{t('volunteer.email', 'Email Address')}</label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary text-navy dark:text-white transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1">{t('volunteer.role', 'Role of Interest')}</label>
                            <select className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary text-navy dark:text-white transition-all">
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
                                placeholder={t('volunteer.motivation_placeholder', 'Share your motivation...')}
                                className="w-full px-6 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary text-navy dark:text-white transition-all"
                            />
                        </div>

                        <button
                            type="button"
                            className="w-full py-5 rounded-xl bg-secondary text-white font-black text-lg uppercase tracking-wider hover:bg-secondary-dark transition-colors shadow-lg"
                        >
                            {t('volunteer.submit_btn', 'Submit Application')}
                        </button>
                    </form>
                </FadeIn>
            </div>
        </section>
    );
};

export default VolunteerForm;
