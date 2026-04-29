import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Home, ChevronRight, Send, CheckCircle2, Award } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';

const VolunteerPage = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', message: '' });
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
                                    src="/assets/charity/our-expertize-in-action.png"
                                    alt="Volunteers working"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent z-10" />
                        </div>
                        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full pt-32 pb-16">
                            <FadeIn direction="right">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                    <Users className="w-3 h-3" /> Volunteer Opportunity
                                </div>
                                <h2 className="text-white text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter mb-8 max-w-4xl">
                                    Be Part of <br />
                                    <span className="text-secondary ">the Change.</span>
                                </h2>
                                <p className="text-slate-300 text-xl font-medium max-w-2xl leading-relaxed mb-12">
                                    Your time and talent can transform lives. Join our global network of dedicated volunteers working across Africa to empower the next generation.
                                </p>
                                <div className="flex flex-wrap gap-6 mb-16">
                                    <a href="#apply" className="group relative flex items-center justify-center overflow-hidden rounded-xl bg-secondary px-10 h-16 text-white font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-secondary/40">
                                        Start Volunteering
                                    </a>
                                    <Link to="/impact" className="flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/20 px-10 h-16 text-white font-black hover:bg-white/10 transition-all text-lg">
                                        Learn More
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
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Join 18+ changemakers in our pilot network</p>
                                </div>
                            </FadeIn>
                        </div>
                    </section>

                    {/* BREADCRUMB */}
                    <section className="bg-transparent border-b border-slate-100 py-10 px-6 lg:px-20">
                        <div className="max-w-7xl mx-auto">
                            <nav className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <Link to="/" className="hover:text-secondary flex items-center gap-2 transition-colors">
                                    <Home className="w-3 h-3" /> Home
                                </Link>
                                <ChevronRight className="w-3 h-3 text-slate-300" />
                                <span className="text-secondary">Volunteer</span>
                            </nav>
                        </div>
                    </section>

                    {/* ROLES */}
                    <section className="py-24 px-6 lg:px-20 bg-transparent">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col items-center text-center mb-20">
                                <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] block mb-6">Ways to Act</span>
                                <h2 className="text-navy text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8">
                                    Where We <span className="text-secondary ">Need You.</span>
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
                                            <h3 className="text-2xl font-black mb-4 text-navy tracking-tight">{role.title}</h3>
                                            <p className="text-slate-500 font-medium leading-relaxed flex-1">{role.desc}</p>
                                            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-2 text-secondary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                                Learn More <ChevronRight className="w-3 h-3" />
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
                                <span className="text-slate-500 font-black tracking-[0.4em] uppercase text-[10px] block mb-6">Join the Mission</span>
                                <h2 className="text-navy text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8 ">Application.</h2>
                                <p className="text-slate-500 font-medium max-w-xl">We'll review your application and respond with potential placements within 48 hours.</p>
                            </div>

                            <div className="form-shell md:p-12">
                                <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-navy">Full Name *</label>
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                className="w-full h-16 px-8 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-secondary/20 transition-all text-navy font-bold"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-navy">Email Address *</label>
                                            <input
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                className="w-full h-16 px-8 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-secondary/20 transition-all text-navy font-bold"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-navy">Phone Number</label>
                                            <input
                                                type="tel"
                                                value={form.phone}
                                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                className="w-full h-16 px-8 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-secondary/20 transition-all text-navy font-bold appearance-none"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-navy">Preferred Role *</label>
                                            <select
                                                value={form.role}
                                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                                className="w-full h-16 px-8 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-secondary/20 transition-all text-navy font-bold appearance-none"
                                            >
                                                <option value="">Select a role...</option>
                                                <option>Education Support</option>
                                                <option>Community Outreach</option>
                                                <option>Skill Development</option>
                                                <option>Fundraising</option>
                                                <option>Remote / Digital</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-navy">Your Motivation</label>
                                        <textarea
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            rows={5}
                                            className="w-full p-8 bg-slate-50 rounded-3xl border-none focus:ring-2 focus:ring-secondary/20 transition-all text-navy font-bold resize-none"
                                            placeholder="Tell us why you'd like to join our community..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full h-20 bg-navy rounded-2xl text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-all shadow-2xl shadow-navy/20 flex items-center justify-center gap-4 group"
                                    >
                                        Submit Application <Send className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                    <div className="flex items-center justify-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest ">
                                        <CheckCircle2 className="w-3 h-3 text-secondary" /> Verified Secure Application
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>

                    {/* FINAL CTA */}
                    <section className="py-32 px-6 bg-navy text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
                        <FadeIn direction="up">
                            <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
                                Ready to <span className="text-secondary ">Act?</span>
                            </h2>
                            <p className="text-slate-400 max-w-xl mx-auto mb-16 text-xl font-medium leading-relaxed">
                                Join our growing family of volunteers changing lives across 12 countries in Africa.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                                <a href="#apply" className="group relative flex items-center justify-center overflow-hidden rounded-xl bg-secondary px-10 h-16 text-white font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-secondary/40 w-full">
                                    Apply Now
                                </a>
                                <Link to="/donate" className="flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/20 px-10 h-16 text-white font-black hover:bg-white/10 transition-all text-lg w-full">
                                    Donate
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
