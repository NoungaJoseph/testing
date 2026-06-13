import { Handshake, MessageSquare, Globe, Heart, Landmark } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';
import { useTranslation } from 'react-i18next';

const Partnership = () => {
    const { t } = useTranslation();
    const typesT = t('partnership.types', { returnObjects: true }) as any[];
    const featuresT = t('partnership.inquiry.features', { returnObjects: true }) as any[];
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="pt-32 pb-24 relative z-10">
                    {/* Hero Header */}
                    <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
                        <FadeIn direction="up">
                            <div className="max-w-4xl">
                                <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] block mb-6 px-1">{t('partnership.hero.badge')}</span>
                                <h1 className="text-navy text-4xl md:text-6xl font-black leading-[0.85] tracking-tighter mb-8">
                                    {t('partnership.hero.title')} <br />
                                    <span className="text-secondary ">{t('partnership.hero.title_highlight')}</span>
                                </h1>
                                <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl">
                                    {t('partnership.hero.desc')}
                                </p>
                            </div>
                        </FadeIn>
                    </section>

                    {/* Partnership Types */}
                    <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                        {[
                            { icon: Landmark, title: "Public Sector", desc: "Collaborating with local governments to align with national education agendas." },
                            { icon: Handshake, title: "Corporate Social", desc: "Crafting bespoke CSR initiatives that deliver measurable ESG results." },
                            { icon: Heart, title: "NGO Alliances", desc: "Scaling impact through shared resources and ground-level expertise." }
                        ].map((type, i) => (
                            <FadeIn key={type.title} delay={i * 0.1} direction="up" fullWidth>
                                <div className="p-12 rounded-[3.5rem] flex flex-col gap-8 transition-all duration-700 h-full group">
                                    <div className="w-20 h-20 rounded-2xl bg-white shadow-inner flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all duration-500">
                                        <type.icon className="w-10 h-10" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-black text-navy tracking-tight">{typesT[i]?.title || type.title}</h3>
                                        <p className="text-slate-500 font-medium leading-relaxed">{typesT[i]?.desc || type.desc}</p>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </section>

                    {/* Inquiry Form Section */}
                    <section className="bg-transparent py-32 px-6 md:px-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 relative z-10">
                            <div className="lg:w-1/2 space-y-12">
                                <div className="space-y-6">
                                    <h2 className="text-navy text-5xl font-black tracking-tighter">{t('partnership.inquiry.title')} <br /><span className="text-secondary ">{t('partnership.inquiry.title_highlight')}</span> {t('partnership.inquiry.title_end')}</h2>
                                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                                        {t('partnership.inquiry.desc')}
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-6 p-6 rounded-3xl">
                                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                            <MessageSquare className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-navy font-black text-sm uppercase tracking-widest">{featuresT[0]?.title}</p>
                                            <p className="text-slate-500 text-sm font-medium">{featuresT[0]?.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 p-6 rounded-3xl">
                                        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                            <Globe className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-navy font-black text-sm uppercase tracking-widest">{featuresT[1]?.title}</p>
                                            <p className="text-slate-500 text-sm font-medium">{featuresT[1]?.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:w-1/2">
                                <form className="form-shell space-y-8" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-navy text-[10px] font-black uppercase tracking-widest px-2">{t('partnership.inquiry.form.name_label')}</label>
                                            <input type="text" className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl px-6 outline-none focus:border-secondary transition-colors text-navy font-bold" placeholder={t('partnership.inquiry.form.name_placeholder')} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-navy text-[10px] font-black uppercase tracking-widest px-2">{t('partnership.inquiry.form.org_label')}</label>
                                            <input type="text" className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl px-6 outline-none focus:border-secondary transition-colors text-navy font-bold" placeholder={t('partnership.inquiry.form.org_placeholder')} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-navy text-[10px] font-black uppercase tracking-widest px-2">{t('partnership.inquiry.form.email_label')}</label>
                                        <input type="email" className="w-full h-16 bg-slate-50 border border-slate-100 rounded-2xl px-6 outline-none focus:border-secondary transition-colors text-navy font-bold" placeholder={t('partnership.inquiry.form.email_placeholder')} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-navy text-[10px] font-black uppercase tracking-widest px-2">{t('partnership.inquiry.form.interest_label')}</label>
                                        <textarea rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 outline-none focus:border-secondary transition-colors text-navy font-bold resize-none" placeholder={t('partnership.inquiry.form.interest_placeholder')} />
                                    </div>
                                    <button className="w-full h-20 bg-navy text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-all shadow-xl active:scale-[0.98]">
                                        {t('partnership.inquiry.form.btn_submit')}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Partnership;
