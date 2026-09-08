import { Link } from 'react-router-dom';
import { ChevronRight, Home, ArrowRight, Quote, Send, Loader2, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { fetchPublicStats } from '../lib/stats';

const stories = [
    {
        id: 1,
        category: 'Student Success',
        title: '"From a Village Classroom to a University in Douala"',
        author: 'Abena Osei, Scholarship Recipient',
        country: 'Ghana',
        image: '/assets/images/new_assets/story_student.png',
        excerpt: 'When I was selected as the top student in my district, I never imagined it would open doors I had only dreamed of. The Enako Outreach scholarship didn\'t just pay my fees - it changed my entire family\'s trajectory.',
        featured: true,
    },
    {
        id: 2,
        category: 'Teacher Award',
        title: '"Being Recognized Changed How I Teach"',
        author: 'Mr. Emmanuel Asante, Teacher',
        country: 'Nigeria',
        image: '/assets/images/new_assets/story_teacher.png',
        excerpt: 'The award was more than money; it was validation. For the first time in 15 years of teaching, someone said "we see you." My students noticed the change in my energy immediately.',
        featured: false,
    },
    {
        id: 3,
        category: 'Community Impact',
        title: '"Our Village Now Has Clean Water"',
        author: 'Chief Yaw Darko, Community Leader',
        country: 'Kenya',
        image: '/assets/images/new_assets/story_water.png',
        excerpt: 'Before Enako came, our children walked 3 km each morning just to reach water. Now that borehole in our compound has freed our children to attend school instead.',
        featured: false,
    },
];

const StoriesPage = () => {
    const { t } = useTranslation();
    const itemsT = t('stories.items', { returnObjects: true }) as any[];
    const statsT = t('stories.stats', { returnObjects: true }) as any[];

    const [stats, setStats] = useState<any[]>([]);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        fetchPublicStats().then(data => {
            const storiesStats = data.filter(s => s.section === 'stories');
            if (storiesStats.length > 0) {
                setStats(storiesStats.map(s => ({ v: s.value, l: s.label })));
            }
        });
    }, []);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail) return;
        setIsSubmitting(true);
        try {
            await fetch('https://api.enakoos.com/api/v1/outreach/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'NEWSLETTER',
                    email: newsletterEmail,
                    applicantName: 'Stories Newsletter Subscriber'
                })
            });
            setIsSubscribed(true);
        } catch (err) {
            console.error('Newsletter error:', err);
            setIsSubscribed(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const scrollToStories = () => {
        document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col min-h-screen bg-white" style={{ fontFamily: '"Open Sans", sans-serif' }}>
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="flex-grow relative z-10">
                    {/* ── 1. HERO BANNER ── */}
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
                                    "linear-gradient(rgba(0,27,68,0.7), rgba(0,27,68,0.85)), url('/assets/images/new_assets/story_hero.png')",
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
                            Stories
                        </div>

                        {/* Heading */}
                        <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 4rem', maxWidth: 960 }}>
                            <FadeIn direction="up">
                                <span className="text-[#1eb4d4] font-bold tracking-[0.15em] uppercase text-xs block mb-3">
                                    {t('stories.hero.badge', 'COMMUNITY NARRATIVES')}
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
                                    {t('stories.hero.title', 'VOICES OF')}{' '}
                                    <span className="text-[#1eb4d4]">{t('stories.hero.title_highlight', 'TRANSFORMATION')}</span>
                                </h1>
                                <p className="text-slate-200 text-base md:text-lg font-normal max-w-2xl mt-4 leading-relaxed">
                                    {t('stories.hero.desc', 'Real narratives of change from students, teachers, and communities across Africa.')}
                                </p>

                                <div className="flex flex-wrap gap-4 mt-8">
                                    <button
                                        type="button"
                                        onClick={scrollToStories}
                                        className="px-8 py-3.5 bg-[#1eb4d4] hover:bg-[#1c4980] text-white font-bold text-xs uppercase tracking-wider rounded-[2px] transition-all shadow-md flex items-center gap-2 cursor-pointer"
                                    >
                                        <span>{t('stories.hero.btn_explore', 'Explore Narratives')}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <Link
                                        to="/impact"
                                        className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs uppercase tracking-wider rounded-[2px] backdrop-blur-sm transition-all"
                                    >
                                        {t('stories.hero.btn_impact', 'Our Impact Report')}
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                    </section>

                    {/* ── 2. STATS BAR ── */}
                    <section className="bg-[#f8fafc] border-b border-slate-200 py-8 px-6 lg:px-20">
                        <div className="max-w-7xl mx-auto flex flex-wrap gap-12 justify-between items-center">
                            <nav className="flex items-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                <Link to="/" className="hover:text-[#1eb4d4] flex items-center gap-1.5 transition-colors text-[#001B44]">
                                    <Home className="w-3.5 h-3.5 text-[#1eb4d4]" /> {t('nav.home', 'Home')}
                                </Link>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                                <span className="text-[#1eb4d4]">{t('nav.stories', 'Stories')}</span>
                            </nav>
                            <div className="flex gap-12">
                                {(stats.length > 0 ? stats : statsT || [{ v: '120+', l: 'Lives Targeted' }, { v: '8', l: 'Communities' }, { v: 'Pilot', l: 'Stage' }]).map((s: any) => (
                                    <div key={s.l} className="space-y-0.5">
                                        <p className="text-[#001B44] text-2xl font-black tracking-tight">{s.v}</p>
                                        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{s.l}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── 3. FEATURED STORY NARRATIVE ── */}
                    <section className="py-20 px-6 lg:px-20 bg-white" id="stories">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col items-start mb-12">
                                <span className="text-[#1eb4d4] font-bold text-xs uppercase tracking-[0.2em] block mb-2">
                                    {t('stories.highlight.badge', 'THE HIGHLIGHT')}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-[#001B44] uppercase tracking-tight">
                                    {t('stories.highlight.title', 'FEATURED')}{' '}
                                    <span className="text-[#1eb4d4]">{t('stories.highlight.title_highlight', 'NARRATIVE')}</span>
                                </h2>
                            </div>

                            <div className="relative rounded-2xl overflow-hidden flex flex-col lg:flex-row bg-[#001B44] shadow-2xl border border-slate-800">
                                <div className="lg:w-1/2 h-[380px] lg:h-auto relative overflow-hidden">
                                    <img
                                        src={stories[0].image}
                                        alt={stories[0].title}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-[#001B44]/20" />
                                </div>
                                <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative">
                                    <Quote className="absolute top-8 right-8 w-20 h-20 text-white/5 pointer-events-none" />
                                    <span className="inline-block px-3 py-1 rounded bg-[#1eb4d4]/15 border border-[#1eb4d4]/30 text-[#1eb4d4] text-xs font-bold uppercase tracking-widest mb-6 w-fit">
                                        {itemsT?.[0]?.category || stories[0].category}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight uppercase tracking-tight mb-6">
                                        {itemsT?.[0]?.title || stories[0].title}
                                    </h3>
                                    <p className="text-slate-200 text-base leading-relaxed font-normal mb-8">
                                        {itemsT?.[0]?.excerpt || stories[0].excerpt}
                                    </p>
                                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                        <div>
                                            <p className="text-white text-base font-bold uppercase">
                                                {itemsT?.[0]?.author || stories[0].author}
                                            </p>
                                            <p className="text-[#1eb4d4] font-bold text-xs uppercase tracking-wider mt-0.5">
                                                {itemsT?.[0]?.country || stories[0].country}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── 4. LATEST INSIGHTS & STORY CARDS ── */}
                    <section className="py-20 px-6 lg:px-20 bg-[#f8fafc] border-t border-slate-200">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col items-start mb-12">
                                <span className="text-[#1eb4d4] font-bold text-xs uppercase tracking-[0.2em] block mb-2">
                                    {t('stories.latest.badge', 'LATEST INSIGHTS')}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-[#001B44] uppercase tracking-tight">
                                    {t('stories.latest.title', 'MORE')}{' '}
                                    <span className="text-[#1eb4d4]">{t('stories.latest.title_highlight', 'EVIDENCE')}</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {stories.slice(1).map((story, i) => (
                                    <FadeIn key={story.id} delay={i * 0.1} direction="up">
                                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md hover:shadow-xl hover:border-[#1eb4d4] transition-all duration-300 flex flex-col h-full">
                                            <div className="h-64 overflow-hidden relative">
                                                <img
                                                    src={story.image}
                                                    alt={story.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                                <div className="absolute bottom-4 left-4 px-3 py-1 rounded bg-[#001B44] text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                                                    {itemsT?.[i + 1]?.category || story.category}
                                                </div>
                                            </div>
                                            <div className="p-8 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-[#001B44] text-xl font-bold mb-3 uppercase tracking-tight leading-snug">
                                                        {itemsT?.[i + 1]?.title || story.title}
                                                    </h3>
                                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                                                        {itemsT?.[i + 1]?.excerpt || story.excerpt}
                                                    </p>
                                                </div>
                                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                                    <div>
                                                        <p className="text-[#001B44] font-bold text-sm uppercase">
                                                            {itemsT?.[i + 1]?.author || story.author}
                                                        </p>
                                                        <p className="text-[#1eb4d4] font-bold text-xs uppercase tracking-wider">
                                                            {itemsT?.[i + 1]?.country || story.country}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── 5. STAY INSPIRED NEWSLETTER FORM ── */}
                    <section className="py-20 px-6 bg-[#001B44] text-center text-white">
                        <div className="max-w-xl mx-auto">
                            <FadeIn direction="up">
                                <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-3">
                                    {t('stories.newsletter.title', 'STAY INSPIRED')}
                                </h2>
                                <p className="text-slate-300 text-sm mb-8 font-normal leading-relaxed">
                                    {t('stories.newsletter.desc', 'Get the latest stories of impact delivered directly to your inbox.')}
                                </p>

                                {isSubscribed ? (
                                    <div className="p-6 bg-white/10 rounded-xl border border-white/20 flex flex-col items-center justify-center">
                                        <CheckCircle2 className="w-12 h-12 text-[#1eb4d4] mb-2" />
                                        <p className="text-lg font-bold uppercase">Subscribed Successfully!</p>
                                        <p className="text-xs text-slate-300 mt-1">Thank you for connecting with Enako Outreach.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                        <input
                                            type="email"
                                            required
                                            value={newsletterEmail}
                                            onChange={(e) => setNewsletterEmail(e.target.value)}
                                            placeholder={t('stories.newsletter.email_placeholder', 'Enter your email address')}
                                            className="flex-1 h-12 px-4 rounded-[2px] bg-white text-[#001B44] font-semibold text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1eb4d4]"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="h-12 px-6 bg-[#1eb4d4] hover:bg-[#199bb7] text-[#001B44] font-bold text-xs uppercase tracking-widest rounded-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span>Subscribing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-4 h-4" />
                                                    <span>{t('stories.newsletter.btn_subscribe', 'Subscribe')}</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </FadeIn>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default StoriesPage;
