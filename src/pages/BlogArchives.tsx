import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Search, ChevronDown, RefreshCw } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import { blogPosts as staticBlogPosts } from '../data/blogPosts';

const parseDate = (value: string) => new Date(value);

type ArchiveMonth = {
    monthKey: string;
    monthLabel: string;
    posts: any[];
};

export type ArchiveYear = {
    year: string;
    months: ArchiveMonth[];
};

const BlogArchives = () => {
    const { t } = useTranslation();
    const [livePosts, setLivePosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch('https://api.enakoos.com/api/v1/outreach/posts?status=PUBLISHED')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setLivePosts(data);
                } else {
                    setLivePosts(staticBlogPosts);
                }
            })
            .catch(() => setLivePosts(staticBlogPosts))
            .finally(() => setLoading(false));
    }, []);

    const allPosts = useMemo(() => {
        if (livePosts.length === 0) return staticBlogPosts;
        
        // Format live posts to ensure compatible fields
        const formatted = livePosts.map(p => ({
            id: p.id,
            title: p.title,
            excerpt: p.content ? p.content.slice(0, 120) + '...' : '',
            category: p.category || 'Archives',
            date: p.createdAt || p.date || new Date().toISOString(),
        }));

        // Merge with static posts if live post count is small
        const merged = [...formatted];
        staticBlogPosts.forEach(sp => {
            if (!merged.some(m => m.title === sp.title)) {
                merged.push(sp);
            }
        });
        return merged;
    }, [livePosts]);

    const archive = useMemo(() => {
        const sorted = [...allPosts].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
        const yearMap = new Map<string, Map<string, ArchiveMonth>>();

        sorted.forEach((post) => {
            const date = parseDate(post.date);
            const year = String(date.getFullYear());
            const monthKey = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const monthLabel = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

            if (!yearMap.has(year)) {
                yearMap.set(year, new Map<string, ArchiveMonth>());
            }
            const monthMap = yearMap.get(year)!;
            if (!monthMap.has(monthKey)) {
                monthMap.set(monthKey, { monthKey, monthLabel, posts: [] });
            }
            monthMap.get(monthKey)!.posts.push(post);
        });

        return [...yearMap.entries()]
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([year, monthMap]) => ({
                year,
                months: [...monthMap.values()].sort((a, b) => b.monthKey.localeCompare(a.monthKey)),
            }));
    }, [allPosts]);

    const [openYear, setOpenYear] = useState<string>('');
    const [openMonth, setOpenMonth] = useState<string | null>(null);

    useEffect(() => {
        if (archive.length > 0 && !openYear) {
            setOpenYear(archive[0].year);
            if (archive[0].months.length > 0) {
                setOpenMonth(archive[0].months[0].monthKey);
            }
        }
    }, [archive, openYear]);

    const stats = useMemo(() => {
        const categories = new Set(allPosts.map((post) => post.category));
        const years = new Set(allPosts.map((post) => String(parseDate(post.date).getFullYear())));
        return {
            total: allPosts.length,
            categories: categories.size,
            years: years.size,
            monthly: archive.reduce((acc, year) => acc + year.months.length, 0),
        };
    }, [allPosts, archive]);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* HERO BANNER — Donate page style */}
            <section
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 'clamp(460px, 68vh, 640px)',
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
                            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('/assets/charity/documents.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 30%',
                    }}
                />

                {/* Breadcrumb */}
                <div
                    style={{
                        position: 'absolute',
                        top: '9.5rem',
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
                    <Link to="/blog" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}>Blog</Link>
                    <span style={{ margin: '0 0.4rem', fontSize: '0.6rem' }}>♦</span>
                    Archives
                </div>

                {/* Heading */}
                <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 4rem', maxWidth: 960 }}>
                    <FadeIn direction="up">
                        <span className="text-[#1eb4d4] font-bold tracking-[0.15em] uppercase text-xs block mb-3">
                            ARTICLE ARCHIVE
                        </span>
                        <h1
                            style={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em',
                                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                                color: '#fff',
                                margin: 0,
                                lineHeight: 1.08,
                            }}
                        >
                            ENAKO <span className="text-[#1eb4d4]">DOCUMENT ARCHIVES</span>
                        </h1>
                    </FadeIn>
                </div>
            </section>

            <section className="py-8 bg-[#001B44] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Articles', value: String(stats.total) },
                            { label: 'Categories', value: String(stats.categories) },
                            { label: 'Years Active', value: String(stats.years) },
                            { label: 'Archive Months', value: String(stats.monthly) },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="text-white font-black text-3xl mb-1">{s.value}</div>
                                <div className="text-secondary text-xs font-semibold uppercase tracking-widest">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <FadeIn direction="up">
                        <div className="relative mb-10">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search archived articles by title, content, or category..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-14 pl-14 pr-6 rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-900 focus:outline-none focus:border-[#1eb4d4] focus:ring-2 focus:ring-[#1eb4d4]/20 transition-all"
                            />
                        </div>
                    </FadeIn>

                    {loading ? (
                        <div className="text-center py-12 text-slate-500 font-medium flex items-center justify-center gap-2">
                            <RefreshCw className="w-5 h-5 animate-spin text-[#1eb4d4]" />
                            <span>Loading live archive database...</span>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {archive.map((yearGroup) => (
                                <FadeIn key={yearGroup.year} direction="up">
                                    <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                                        <button
                                            onClick={() => setOpenYear(openYear === yearGroup.year ? '' : yearGroup.year)}
                                            className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#001B44] text-white flex items-center justify-center font-black">
                                                    {yearGroup.year.slice(-2)}
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-black text-slate-900 text-lg">{yearGroup.year}</div>
                                                    <div className="text-slate-400 text-xs">
                                                        {yearGroup.months.reduce((count, month) => count + month.posts.length, 0)} articles across {yearGroup.months.length} months
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openYear === yearGroup.year ? 'rotate-180' : ''}`} />
                                        </button>

                                        {openYear === yearGroup.year && (
                                            <div className="border-t border-slate-100 bg-slate-50 p-4 space-y-2">
                                                {yearGroup.months.map((monthGroup) => {
                                                    const filteredPosts = monthGroup.posts.filter((post) => {
                                                        const q = search.trim().toLowerCase();
                                                        if (!q) return true;
                                                        const translatedTitle = t(`blog_posts.${post.id}.title`, { defaultValue: post.title }).toLowerCase();
                                                        const translatedExcerpt = t(`blog_posts.${post.id}.excerpt`, { defaultValue: post.excerpt || '' }).toLowerCase();
                                                        return translatedTitle.includes(q) || translatedExcerpt.includes(q) || (post.category && post.category.toLowerCase().includes(q));
                                                    });

                                                    if (filteredPosts.length === 0) return null;

                                                    return (
                                                        <div key={monthGroup.monthKey} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                                                            <button
                                                                onClick={() => setOpenMonth(openMonth === monthGroup.monthKey ? null : monthGroup.monthKey)}
                                                                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <Calendar className="w-4 h-4 text-[#1eb4d4]" />
                                                                    <span className="font-semibold text-slate-800 text-sm">{monthGroup.monthLabel}</span>
                                                                    <span className="px-2 py-0.5 bg-[#1eb4d4]/10 text-[#1eb4d4] text-[10px] font-black rounded-full">
                                                                        {filteredPosts.length} posts
                                                                    </span>
                                                                </div>
                                                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openMonth === monthGroup.monthKey ? 'rotate-180' : ''}`} />
                                                            </button>

                                                            {openMonth === monthGroup.monthKey && (
                                                                <div className="border-t border-slate-100 px-5 pb-4 pt-2 space-y-2">
                                                                    {filteredPosts.map((post, idx) => (
                                                                        <motion.div key={post.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                                                                            <Link
                                                                                to={`/blog/${post.id}`}
                                                                                className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#1eb4d4] text-sm font-medium transition-colors group"
                                                                            >
                                                                                <div className="flex items-center gap-3">
                                                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#1eb4d4] flex-shrink-0 group-hover:scale-125 transition-transform" />
                                                                                    <span>{t(`blog_posts.${post.id}.title`, { defaultValue: post.title })}</span>
                                                                                </div>
                                                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                                                                    {post.category}
                                                                                </span>
                                                                            </Link>
                                                                        </motion.div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    )}

                    <FadeIn direction="up" className="mt-12 text-center">
                        <p className="text-slate-500 text-sm mb-4">Looking for all blog posts?</p>
                        <Link to="/blog/posts" className="inline-flex items-center gap-2 bg-[#001B44] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#001535] transition-colors">
                            Browse All Blog Posts
                        </Link>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BlogArchives;
