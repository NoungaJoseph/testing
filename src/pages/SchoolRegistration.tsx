import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';
import { useTranslation } from 'react-i18next';

const steps = [
    { icon: 'verified_user', title: 'Verify Your School', desc: 'Ensure your school meets our eligibility requirements and register in our partner portal.' },
    { icon: 'group_add', title: 'Submit Top 5 Students', desc: 'Nominate your highest achieving students with supporting academic documentation.' },
    { icon: 'emoji_events', title: 'Scholarship Award', desc: 'Selected students receive full scholarship packages and are announced at our annual gala.' },
];

const SchoolRegistrationPage = () => {
    const { t } = useTranslation();
    const [form, setForm] = useState({
        schoolName: '', country: '', city: '', email: '', phone: '', type: '', students: '',
        principal: '', website: '', message: ''
    });
    const [isComplete, setIsComplete] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const submitRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');
        try {
            const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/v1\/?$/, '') : 'https://api.enakoos.com';
            const payload = {
                type: 'SCHOOL_REGISTRATION',
                applicantName: form.principal,
                email: form.email,
                phone: form.phone,
                details: {
                    schoolName: form.schoolName,
                    country: form.country,
                    city: form.city,
                    schoolType: form.type,
                    studentCount: form.students,
                    website: form.website,
                    message: form.message,
                },
                documents: [],
            };
            const res = await fetch(`${baseUrl}/api/v1/outreach/applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                setIsComplete(true);
            } else {
                const body = await res.json().catch(() => ({}));
                setErrorMsg(body.message || 'Submission failed. Please try again.');
            }
        } catch (err) {
            setErrorMsg('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="flex-grow relative z-10">
                    {/* HERO */}
                    <section className="relative w-full min-h-[60vh] flex flex-col lg:flex-row overflow-hidden">
                        <div className="lg:w-1/2 pt-40 pb-16 px-6 lg:px-20 flex flex-col justify-center bg-transparent w-full">
                            <FadeIn direction="right">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-secondary text-secondary text-xs font-bold uppercase tracking-widest w-fit mb-6">
                                    <span className="material-symbols-outlined text-sm">school</span>
                                    School Registration
                                </span>
                                <h1 className="text-navy text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
                                    Register Your School's<br /><span className="text-secondary">Top Students</span>
                                </h1>
                                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                    Nominate your school's top 5 students for our annual scholarship program and give them the academic support they deserve.
                                </p>
                                <div className="flex gap-4">
                                    <a href="#form" className="flex items-center justify-center gap-2 h-12 px-6 bg-secondary rounded-lg text-white font-bold hover:bg-[#00a8ae] transition-all">
                                        Register Now <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </a>
                                    <Link to="/programs" className="flex items-center justify-center h-12 px-6 border-2 border-slate-200 rounded-lg text-navy font-bold hover:bg-slate-50 transition-all">
                                        Learn More
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                        <div className="lg:w-1/2 min-h-[400px] lg:min-h-full relative w-full">
                            <FadeIn direction="left" className="h-full">
                                <img
                                    src="/assets/images/new_assets/story_student.png"
                                    alt="School students"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute bottom-8 left-8 rounded-xl p-5">
                                    <p className="text-navy font-black text-2xl">6+</p>
                                    <p className="text-slate-500 text-sm">Partner Schools</p>
                                </div>
                            </FadeIn>
                        </div>
                    </section>

                    {/* ELIGIBILITY */}
                    <section className="py-16 px-6 lg:px-20 bg-transparent">
                        <div className="max-w-7xl mx-auto">
                            <FadeIn direction="up">
                                <div className="text-center mb-12">
                                    <span className="text-secondary font-bold tracking-widest uppercase text-xs block mb-2">{t('school_reg.criteria', 'Criteria')}</span>
                                    <h2 className="text-navy text-3xl font-black">{t('school_reg.eligibility_title', 'Eligibility Requirements')}</h2>
                                </div>
                            </FadeIn>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { icon: 'location_on', title: 'Location', desc: 'School must be located in a rural or underserved community in Africa.' },
                                    { icon: 'school', title: 'Accreditation', desc: 'Must be a registered government or accredited private institution.' },
                                    { icon: 'groups', title: 'Student Body', desc: 'Minimum 100 enrolled students with at least 3 years of operation.' },
                                    { icon: 'grade', title: 'Academic Standing', desc: 'Nominated students must be in top 5% of their cohort by grades.' },
                                ].map((item, i) => (
                                    <FadeIn key={item.title} direction="up" delay={i * 0.1}>
                                        <div className="rounded-xl p-6 h-full">
                                            <div className="w-12 h-12 bg-white border border-secondary rounded-xl flex items-center justify-center text-secondary mb-4">
                                                <span className="material-symbols-outlined">{item.icon}</span>
                                            </div>
                                            <h3 className="text-navy font-bold mb-2">{item.title}</h3>
                                            <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* PROCESS TIMELINE */}
                    <section className="py-16 px-6 lg:px-20 bg-transparent">
                        <div className="max-w-5xl mx-auto">
                            <FadeIn direction="up">
                                <div className="text-center mb-12">
                                    <span className="text-secondary font-bold tracking-widest uppercase text-xs block mb-2">{t('school_reg.how_it_works', 'How It Works')}</span>
                                    <h2 className="text-navy text-3xl font-black">{t('school_reg.process_title', 'Application Process')}</h2>
                                </div>
                            </FadeIn>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {steps.map((s, i) => (
                                    <FadeIn key={s.title} direction="up" delay={i * 0.3}>
                                        <div className="relative flex flex-col items-center text-center group">
                                            {i < steps.length - 1 && (
                                                <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-slate-200" />
                                            )}
                                            <div className="relative z-10 w-12 h-12 bg-white border-2 border-secondary rounded-full flex items-center justify-center text-secondary mb-4 transition-transform group-hover:scale-110 duration-300">
                                                <span className="material-symbols-outlined text-xl">{s.icon}</span>
                                            </div>
                                            <div className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">Step {i + 1}</div>
                                            <h3 className="text-navy text-lg font-bold mb-2">{s.title}</h3>
                                            <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* REGISTRATION FORM */}
                    <section className="py-16 px-6 lg:px-20 bg-transparent" id="form">
                        <div className="max-w-3xl mx-auto">
                            <FadeIn direction="up">
                                <div className="text-center mb-10">
                                    <span className="text-secondary font-bold tracking-widest uppercase text-xs block mb-2">{t('school_reg.application', 'Application')}</span>
                                    <h2 className="text-navy text-3xl font-black mb-2">{t('school_reg.form_title', 'School Registration Form')}</h2>
                                    <p className="text-slate-500">{t('school_reg.required_note', 'All fields marked with * are required')}</p>
                                </div>
                            </FadeIn>
                            <FadeIn direction="up" delay={0.2}>
                                <div className="rounded-2xl p-8 md:p-12">
                                    {isComplete ? (
                                        <div className="text-center py-16">
                                            <div className="w-20 h-20 bg-green-50 rounded-full mx-auto mb-6 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-4xl text-green-500">check_circle</span>
                                            </div>
                                            <h2 className="text-3xl font-black text-navy mb-3">{t('school_reg.received_title', 'Registration Received!')}</h2>
                                            <p className="text-slate-500 mb-8 leading-relaxed max-w-md mx-auto">
                                                Thank you for registering <strong>{form.schoolName}</strong>. Our team will review your application and reach out within 5 business days.
                                            </p>
                                            <Link to="/programs" className="inline-flex items-center gap-2 h-12 px-8 bg-secondary rounded-lg text-white font-bold hover:bg-[#00a8ae] transition-all">
                                                View Our Programs <span className="material-symbols-outlined text-base">arrow_forward</span>
                                            </Link>
                                        </div>
                                    ) : (
                                        <form onSubmit={submitRegistration}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-navy mb-2">School Name *</label>
                                                    <input type="text" value={form.schoolName} onChange={(e) => setForm({ ...form, schoolName: e.target.value })}
                                                        className="w-full h-12 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-secondary text-navy bg-white"
                                                        placeholder="Official school name" required />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-navy mb-2">Country *</label>
                                                    <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                                                        className="w-full h-12 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-secondary text-navy bg-white" required>
                                                        <option value="">Select country...</option>
                                                        {['Cameroon', 'Ghana', 'Nigeria', 'Kenya', 'Uganda', 'Tanzania', 'Ethiopia', 'Rwanda', 'Senegal', "Côte d'Ivoire", 'Other'].map(c => (
                                                            <option key={c}>{c}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-navy mb-2">City / Region *</label>
                                                    <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                                                        className="w-full h-12 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-secondary text-navy bg-white"
                                                        placeholder="City or region name" required />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-navy mb-2">Principal / Director *</label>
                                                    <input type="text" value={form.principal} onChange={(e) => setForm({ ...form, principal: e.target.value })}
                                                        className="w-full h-12 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-secondary text-navy bg-white"
                                                        placeholder="Full name" required />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-navy mb-2">Email Address *</label>
                                                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                        className="w-full h-12 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-secondary text-navy bg-white"
                                                        placeholder="school@email.com" required />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-navy mb-2">Phone Number *</label>
                                                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                        className="w-full h-12 px-4 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-secondary text-navy bg-white"
                                                        placeholder="+237 XXX XXX XXX" required />
                                                </div>
                                            </div>
                                            {errorMsg && (
                                                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                                                    {errorMsg}
                                                </div>
                                            )}
                                            <button type="submit" disabled={isSubmitting}
                                                className="w-full h-14 bg-secondary rounded-xl text-[#001F5B] font-black text-lg hover:bg-[#00a8ae] hover:-translate-y-0.5 transition-all shadow-xl shadow-secondary/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                                {isSubmitting ? (
                                                    <><span className="material-symbols-outlined animate-spin text-xl">refresh</span> Submitting...</>
                                                ) : (
                                                    'Submit Registration'
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </FadeIn>
                        </div>
                    </section>

                    {/* FINAL CTA */}
                    <section className="py-20 px-6 bg-navy text-center">
                        <FadeIn direction="up">
                            <h2 className="text-white text-3xl font-black mb-4">{t('school_reg.questions_title', "Questions? We're Here to Help")}</h2>
                            <p className="text-slate-300 max-w-xl mx-auto mb-8">{t('school_reg.questions_desc', 'Our team reviews all applications within 5 business days and will reach out to discuss next steps.')}</p>
                            <div className="flex gap-4 justify-center">
                                <Link to="/volunteer" className="inline-flex items-center gap-2 h-12 px-8 bg-secondary rounded-lg text-white font-bold hover:bg-[#00a8ae] transition-all">
                                    Contact Us <span className="material-symbols-outlined text-base">arrow_forward</span>
                                </Link>
                                <Link to="/programs" className="inline-flex items-center h-12 px-8 border-2 border-white rounded-lg text-white font-bold hover:bg-white border border-white transition-all">
                                    View Programs
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

export default SchoolRegistrationPage;
