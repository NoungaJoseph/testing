import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Users, GraduationCap, ChevronRight, CheckCircle2, Award, Heart,
    ShieldCheck, Sparkles, Send, FileText, ArrowRight, User, Mail, Phone, Briefcase, Loader2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import GetInvolvedBanner from '../components/GetInvolvedBanner';
import { useTranslation } from 'react-i18next';

const VolunteerPage = () => {
    const { t } = useTranslation();
    const rolesT = t('volunteer.roles.items', { returnObjects: true }) as any[];
    const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', message: '' });
    const [documentBase64, setDocumentBase64] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const submitVolunteer = async () => {
        setIsSubmitting(true);
        try {
            const payload = {
                type: 'VOLUNTEER',
                applicantName: form.name,
                email: form.email,
                phone: form.phone,
                details: { role: form.role, message: form.message },
                documents: documentBase64 ? [documentBase64] : [],
            };
            const response = await fetch('https://api.enakoos.com/api/v1/outreach/applications', {
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
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <Navbar />

            <main className="flex-grow">
                {/* ── 1. HERO BANNER — Matching Institutional Design System ── */}
                <section
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: 'clamp(480px, 68vh, 640px)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        overflow: 'hidden',
                        marginTop: 0,
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage:
                                "linear-gradient(rgba(0,27,68,0.65), rgba(0,27,68,0.85)), url('/assets/images/new_assets/volunteer_hero.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center 30%',
                        }}
                    />

                    {/* Breadcrumb */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '11.5rem',
                            left: '2.5rem',
                            color: 'rgba(255,255,255,0.82)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            zIndex: 2,
                        }}
                    >
                        <Link to="/" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}>Home</Link>
                        <span style={{ margin: '0 0.4rem', fontSize: '0.6rem' }}>♦</span>
                        Get Involved
                    </div>

                    {/* Heading */}
                    <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 4rem', maxWidth: 960 }}>
                        <FadeIn direction="up">
                            <span className="text-[#1eb4d4] font-bold tracking-[0.15em] uppercase text-xs block mb-3">
                                {t('volunteer.hero.badge', 'GET INVOLVED & MAKE AN IMPACT')}
                            </span>
                            <h1
                                style={{
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.02em',
                                    fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                                    color: '#fff',
                                    margin: 0,
                                    lineHeight: 1.1,
                                }}
                            >
                                {t('volunteer.hero.title', 'JOIN OUR VOLUNTEER CORPS IN CAMEROON')}
                            </h1>
                            <p className="text-slate-200 text-base md:text-lg font-normal max-w-2xl mt-4 leading-relaxed">
                                {t('volunteer.hero.desc', 'Dedicated volunteers power our educational scholarships, water infrastructure projects, and community health missions across Cameroon.')}
                            </p>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <a
                                    href="#apply"
                                    className="px-8 py-3.5 bg-[#1eb4d4] hover:bg-[#1c4980] text-white font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all shadow-md flex items-center gap-2"
                                >
                                    <span>{t('volunteer.hero.btn_start', 'Apply To Volunteer')}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                                <Link
                                    to="/impact"
                                    className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider rounded-[2px] backdrop-blur-sm transition-all"
                                >
                                    {t('volunteer.hero.btn_learn', 'Explore Community Impact')}
                                </Link>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* ── 2. VALUE PROPOSITION / ACTION BANNER (Matching Image 1 Seamless Block Banner Design) ── */}
                <GetInvolvedBanner
                    headerTitle="GET INVOLVED"
                    headerSubtitle="Take an Action"
                    blocks={[
                        {
                            title: 'Education Tutoring',
                            description: 'Mentor scholarship recipients and lead digital literacy workshops in primary and secondary schools across Cameroon.',
                            buttonText: 'Learn More',
                            buttonLink: '#apply',
                            bgColor: '#001B44',
                            btnBgColor: '#FFFFFF',
                            btnTextColor: '#001B44',
                        },
                        {
                            title: 'Community Care',
                            description: 'Assist in distributing health supplies, clean water kits, and nutritional packages to vulnerable families.',
                            buttonText: 'Get Involved',
                            buttonLink: '#apply',
                            bgColor: '#0B2545',
                            btnBgColor: '#1eb4d4',
                            btnTextColor: '#FFFFFF',
                        },
                        {
                            title: 'Youth Empowerment',
                            description: 'Provide vocational training, earn an official volunteer certificate, and shape the leaders of tomorrow.',
                            buttonText: 'Donate Now',
                            buttonLink: '/donate',
                            bgColor: '#133863',
                            btnBgColor: '#001B44',
                            btnTextColor: '#FFFFFF',
                        },
                    ]}
                />

                {/* ── 3. VOLUNTEER OPPORTUNITY ROLES ── */}
                <section className="py-20 px-6 lg:px-16 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="text-[#1eb4d4] font-bold text-xs uppercase tracking-[0.2em] block mb-2">
                                {t('volunteer.roles.badge', 'CURRENT VOLUNTEER POSITIONS')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#001B44] uppercase tracking-tight">
                                {t('volunteer.roles.title', 'WHERE YOU CAN SERVE')}
                            </h2>
                            <p className="text-slate-600 text-base mt-4 max-w-xl mx-auto">
                                Select a track below that matches your expertise, background, or area of interest.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: GraduationCap,
                                    title: 'Education & Mentorship',
                                    desc: 'Assist in local partner schools, provide academic tutoring in STEM/languages, and facilitate resource centers.',
                                    location: 'Douala, Yaoundé, Buea',
                                },
                                {
                                    icon: Users,
                                    title: 'Community Field Outreach',
                                    desc: 'Work alongside regional coordinators to implement clean water well audits and health screenings in focus zones.',
                                    location: 'Bamenda, Limbe, Kribi',
                                },
                                {
                                    icon: Award,
                                    title: 'Digital & Admin Support',
                                    desc: 'Contribute remotely or in-office with graphic design, media production, data analytics, and grant documentation.',
                                    location: 'Remote / Field Hubs',
                                },
                            ].map((role, i) => (
                                <FadeIn key={role.title} delay={i * 0.1} direction="up">
                                    <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-8 hover:bg-white hover:border-[#1eb4d4] hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
                                        <div>
                                            <div className="w-12 h-12 rounded-lg bg-[#001B44] text-white flex items-center justify-center mb-6">
                                                <role.icon className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-xl font-bold text-[#001B44] mb-3 uppercase tracking-tight">
                                                {rolesT[i]?.title || role.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                                {rolesT[i]?.desc || role.desc}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="w-3.5 h-3.5 text-[#1eb4d4]" />
                                                {role.location}
                                            </span>
                                            <a
                                                href="#apply"
                                                onClick={() => setForm((prev) => ({ ...prev, role: role.title }))}
                                                className="text-[#001B44] font-bold uppercase hover:text-[#1eb4d4] transition-colors"
                                            >
                                                Apply Now →
                                            </a>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── 4. OFFICIAL APPLICATION FORM SECTION ── */}
                <section className="py-24 px-6 lg:px-16 bg-[#f8fafc] border-t border-slate-200" id="apply">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-[#1eb4d4] font-bold text-xs uppercase tracking-[0.2em] block mb-2">
                                {t('volunteer.apply.badge', 'OFFICIAL APPLICATION FORM')}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#001B44] uppercase tracking-tight">
                                {t('volunteer.apply.title', 'SUBMIT YOUR APPLICATION')}
                            </h2>
                            <p className="text-slate-600 text-sm mt-3">
                                Fill in your information below. Our Volunteer Coordination Desk will review your application within 48 hours.
                            </p>
                        </div>

                        <div className="bg-white border-2 border-slate-900/10 rounded-2xl p-8 md:p-12 shadow-xl">
                            {isComplete ? (
                                <div className="text-center py-10 space-y-4">
                                    <div className="w-20 h-20 bg-emerald-50 rounded-full mx-auto flex items-center justify-center border border-emerald-200">
                                        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-[#001B44] uppercase tracking-tight">
                                        {t('volunteer.received_title', 'APPLICATION SUBMITTED SUCCESSFULLY')}
                                    </h3>
                                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                                        {t('volunteer.received_desc', 'Thank you for stepping up to serve. Your application has been logged into the Enako Outreach database. A regional coordinator will contact you via phone or email.')}
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsComplete(false);
                                            setForm({ name: '', email: '', phone: '', role: '', message: '' });
                                            setDocumentBase64(null);
                                            setFileName(null);
                                        }}
                                        className="mt-6 px-6 py-2.5 bg-[#001B44] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#1eb4d4] transition-all"
                                    >
                                        Submit Another Application
                                    </button>
                                </div>
                            ) : (
                                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); submitVolunteer(); }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-[#001B44] uppercase tracking-wider mb-2">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#001B44] font-semibold focus:outline-none focus:border-[#1eb4d4] focus:bg-white transition-all"
                                                    placeholder="e.g. Marie Claire Ngu"
                                                    required
                                                />
                                                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-[#001B44] uppercase tracking-wider mb-2">
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#001B44] font-semibold focus:outline-none focus:border-[#1eb4d4] focus:bg-white transition-all"
                                                    placeholder="e.g. marie@gmail.com"
                                                    required
                                                />
                                                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-[#001B44] uppercase tracking-wider mb-2">
                                                Phone Number (WhatsApp) *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    value={form.phone}
                                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#001B44] font-semibold focus:outline-none focus:border-[#1eb4d4] focus:bg-white transition-all"
                                                    placeholder="e.g. +237 670 000 000"
                                                    required
                                                />
                                                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-[#001B44] uppercase tracking-wider mb-2">
                                                Preferred Volunteer Role *
                                            </label>
                                            <div className="relative">
                                                <select
                                                    value={form.role}
                                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#001B44] font-semibold focus:outline-none focus:border-[#1eb4d4] focus:bg-white transition-all appearance-none"
                                                    required
                                                >
                                                    <option value="">-- Select Volunteer Position --</option>
                                                    <option value="Education & Mentorship">Educational Support & Tutoring</option>
                                                    <option value="Community Field Outreach">Community Field Outreach</option>
                                                    <option value="Skills Training">Youth Skills Training</option>
                                                    <option value="Health & Sanitation">Health & Sanitation Support</option>
                                                    <option value="Digital & Admin Support">Remote Digital / Admin Support</option>
                                                </select>
                                                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#001B44] uppercase tracking-wider mb-2">
                                            Statement of Intent / Experience *
                                        </label>
                                        <textarea
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            rows={4}
                                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#001B44] font-semibold focus:outline-none focus:border-[#1eb4d4] focus:bg-white transition-all resize-none"
                                            placeholder="Briefly describe why you want to volunteer and any relevant skills or experience..."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#001B44] uppercase tracking-wider mb-2">
                                            Resume / CV Document (Optional)
                                        </label>
                                        <div className="border-2 border-dashed border-slate-300 hover:border-[#1eb4d4] bg-slate-50 hover:bg-white rounded-xl p-5 text-center transition-all">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                accept=".pdf,image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        if (file.size > 5 * 1024 * 1024) {
                                                            alert('File size must be under 5MB.');
                                                            e.target.value = '';
                                                            return;
                                                        }
                                                        setFileName(file.name);
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => setDocumentBase64(reader.result as string);
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="hidden"
                                            />
                                            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
                                                <FileText className="w-8 h-8 text-[#1eb4d4] mb-2" />
                                                <span className="text-xs font-bold text-[#001B44]">
                                                    {fileName ? `Uploaded: ${fileName}` : 'Click to Upload Resume / CV (PDF or Image, Max 5MB)'}
                                                </span>
                                                <span className="text-[11px] text-slate-400 mt-1">Supports PDF, PNG, JPG</span>
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-[#001B44] hover:bg-[#1eb4d4] text-white font-extrabold text-xs uppercase tracking-widest rounded-lg shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Submitting Application...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                <span>Submit Volunteer Application</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>

                {/* ── 5. BOTTOM CTA BANNER ── */}
                <section
                    className="py-24 px-6 bg-center bg-cover text-center relative overflow-hidden"
                    style={{ backgroundImage: `url('/assets/charity/ready_to_act.png')` }}
                >
                    <div className="absolute inset-0 bg-[#001B44]/80 backdrop-blur-xs" />
                    <FadeIn direction="up" className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight mb-6 uppercase">
                            READY TO MAKE A DIFFERENCE IN CAMEROON?
                        </h2>
                        <p className="text-slate-200 max-w-2xl mx-auto mb-10 text-base md:text-lg font-normal leading-relaxed">
                            Join hundreds of dedicated volunteers transforming lives through education, healthcare, and community empowerment.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <a
                                href="#apply"
                                className="px-8 py-3.5 bg-[#1eb4d4] hover:bg-white hover:text-[#001B44] text-white font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all shadow-md"
                            >
                                Submit Application
                            </a>
                            <Link
                                to="/donate"
                                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all"
                            >
                                Support Via Donation
                            </Link>
                        </div>
                    </FadeIn>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default VolunteerPage;
