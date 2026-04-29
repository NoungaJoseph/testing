import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Home, ArrowRight, Quote } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';

const stories = [
    {
        id: 1,
        category: 'Student Success',
        title: '"From a Village Classroom to a University in Accra"',
        author: 'Abena Osei, Scholarship Recipient',
        country: 'Ghana',
        image: '/assets/charity/our-expertize-in-action.png',
        excerpt: 'When I was selected as the top student in my district, I never imagined it would open doors I had only dreamed of. The Enako Outreach scholarship didn\'t just pay my fees — it changed my entire family\'s trajectory.',
        featured: true,
    },
    {
        id: 2,
        category: 'Teacher Award',
        title: '"Being Recognized Changed How I Teach"',
        author: 'Mr. Emmanuel Asante, Teacher',
        country: 'Nigeria',
        image: '/assets/charity/our-expertize-in-action.png',
        excerpt: 'The award was more than money; it was validation. For the first time in 15 years of teaching, someone said "we see you." My students noticed the change in my energy immediately.',
        featured: false,
    },
    {
        id: 3,
        category: 'Community Impact',
        title: '"Our Village Now Has Clean Water"',
        author: 'Chief Yaw Darko, Community Leader',
        country: 'Kenya',
        image: '/assets/charity/our-expertize-in-action.png',
        excerpt: 'Before Enako came, our children walked 3 km each morning just to reach water. Now that borehole in our compound has freed our children to attend school instead.',
        featured: false,
    },
];

const StoriesPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="flex-grow relative z-10">
                    {/* HERO */}
                    <section className="relative w-full min-h-[75vh] flex flex-col overflow-hidden bg-navy pt-20">
                        <div className="absolute inset-0 z-0">
                            <motion.div
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.3 }}
                                transition={{ duration: 2 }}
                                className="w-full h-full"
                            >
                                <img
                                    src="/assets/charity/our-expertize-in-action.png"
                                    alt="Community narratives"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent z-10" />
                        </div>
                        <div className="relative z-20 flex-1 flex flex-col justify-end max-w-7xl mx-auto px-6 lg:px-20 w-full pb-20 pt-40">
                            <FadeIn direction="up">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                    <BookOpen className="w-3 h-3" /> Community Narratives
                                </div>
                                <h1 className="text-white text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter mb-8 max-w-4xl">
                                    Voices of <br />
                                    <span className="text-secondary ">Transformation.</span>
                                </h1>
                                <p className="text-slate-300 text-xl font-medium max-w-2xl leading-relaxed mb-12">
                                    Real narratives of change from students, teachers, and communities across Africa.
                                </p>
                                <div className="flex flex-wrap gap-6">
                                    <a href="#stories" className="group relative flex items-center justify-center overflow-hidden rounded-xl bg-secondary px-10 h-16 text-white font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-secondary/40">
                                        Explore Narratives
                                    </a>
                                    <Link to="/impact" className="flex items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/20 px-10 h-16 text-white font-black hover:bg-white/10 transition-all text-lg">
                                        Our Impact Report
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                    </section>

                    {/* BREADCRUMB & STATS */}
                    <section className="bg-transparent border-b border-slate-100 py-10">
                        <div className="max-w-7xl mx-auto px-6 lg:px-20 flex flex-wrap gap-12 justify-between items-center">
                            <nav className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                <Link to="/" className="hover:text-secondary flex items-center gap-2 transition-colors">
                                    <Home className="w-3 h-3" /> Home
                                </Link>
                                <ChevronRight className="w-3 h-3 text-slate-300" />
                                <span className="text-secondary">Stories</span>
                            </nav>
                            <div className="flex gap-12">
                                {[{ v: '120+', l: 'Lives Targeted' }, { v: '8', l: 'Communities' }, { v: 'Pilot', l: 'Stage' }].map((s) => (
                                    <div key={s.l} className="space-y-1">
                                        <p className="text-navy text-3xl font-black tracking-tighter">{s.v}</p>
                                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{s.l}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FEATURED STORY */}
                    <section className="py-24 px-6 lg:px-20 bg-transparent" id="stories">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col items-start mb-16">
                                <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] block mb-4">The Highlight</span>
                                <h2 className="text-navy text-4xl md:text-5xl font-black tracking-tighter">Featured <span className="text-secondary ">Narrative.</span></h2>
                            </div>
                            <div className="relative group rounded-[3rem] overflow-hidden flex flex-col lg:flex-row transition-all duration-700 bg-navy">
                                <div className="lg:w-1/2 h-[450px] lg:h-auto relative overflow-hidden">
                                    <img src={stories[0].image} alt={stories[0].title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
                                </div>
                                <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center relative">
                                    <Quote className="absolute top-10 right-10 w-24 h-24 text-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-10 w-fit">
                                        {stories[0].category}
                                    </span>
                                    <h3 className="text-4xl font-black text-white leading-tight tracking-tighter mb-8 ">"{stories[0].title.replace(/"/g, '')}"</h3>
                                    <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">{stories[0].excerpt}</p>
                                    <div className="pt-10 border-t border-white/10 flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-white text-xl font-black">{stories[0].author}</p>
                                            <p className="text-secondary font-black text-[10px] uppercase tracking-[0.2em]">{stories[0].country}</p>
                                        </div>
                                        <button className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-navy hover:bg-secondary hover:text-white transition-all shadow-xl shadow-navy/20">
                                            <ArrowRight className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* STORY CARDS */}
                    <section className="py-24 px-6 lg:px-20 bg-transparent">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col items-start mb-16">
                                <span className="text-slate-500 font-black tracking-[0.4em] uppercase text-[10px] block mb-4">Latest Insights</span>
                                <h2 className="text-navy text-4xl md:text-5xl font-black tracking-tighter">More <span className="text-secondary ">Evidence.</span></h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {stories.slice(1).map((story, i) => (
                                    <FadeIn key={story.id} delay={i * 0.1} direction="up">
                                        <div className="rounded-[3rem] overflow-hidden transition-all duration-700 group flex flex-col h-full">
                                            <div className="h-72 overflow-hidden relative">
                                                <img src={story.image} alt={story.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                                                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors" />
                                                <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md text-navy text-[10px] font-black uppercase tracking-widest shadow-xl">
                                                    {story.category}
                                                </div>
                                            </div>
                                            <div className="p-10 flex-1 flex flex-col">
                                                <h3 className="text-navy text-2xl font-black mb-4 tracking-tight leading-tight group-hover:text-secondary transition-colors ">"{ story.title.replace(/"/g, '') }"</h3>
                                                <p className="text-slate-500 font-medium leading-relaxed mb-10 flex-1">{story.excerpt}</p>
                                                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-navy font-black text-sm uppercase tracking-tight">{story.author}</p>
                                                        <p className="text-secondary font-black text-[10px] uppercase tracking-[0.2em]">{story.country}</p>
                                                    </div>
                                                    <button className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-all shadow-inner">
                                                        <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* NEWSLETTER CTA */}
                    <section className="py-20 px-6 bg-navy text-center">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-white text-3xl font-black mb-4">Stay Inspired</h2>
                            <p className="text-slate-300 mb-8">Get the latest stories of impact delivered directly to your inbox.</p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="flex-1 h-12 px-4 rounded-lg bg-white border border-white text-navy placeholder:text-slate-400 focus:outline-none focus:border-secondary"
                                />
                                <button className="h-12 px-6 bg-secondary rounded-lg text-white font-bold hover:bg-[#00a8ae] transition-all">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default StoriesPage;
