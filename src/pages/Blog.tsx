import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { motion } from 'framer-motion';
import { Search, BookOpen, Rss, Archive } from 'lucide-react';
import { useState, useEffect } from 'react';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';
import { useTranslation } from 'react-i18next';
import { blogPosts as staticBlogPosts } from '../data/blogPosts';

const Blog = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.enakoos.com/api/v1/outreach/posts?status=PUBLISHED')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const merged = [...data];
                    staticBlogPosts.forEach(sp => {
                        if (!merged.some(m => m.title === sp.title || m.id === sp.id)) {
                            merged.push(sp);
                        }
                    });
                    setBlogPosts(merged);
                } else {
                    setBlogPosts(staticBlogPosts);
                }
            })
            .catch(err => {
                console.error(err);
                setBlogPosts(staticBlogPosts);
            })
            .finally(() => setLoading(false));
    }, []);

    const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

    const filteredPosts = blogPosts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const contentMatch = post.content?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSearch = titleMatch || contentMatch;
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={30} />
                <main className="flex-grow relative z-10">
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
                                    'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url(/assets/charity/our-expertize-in-action.png)',
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
                            Blog & News
                        </div>

                        {/* Heading */}
                        <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 4rem', maxWidth: 960 }}>
                            <FadeIn direction="up">
                                <span className="text-[#1eb4d4] font-bold tracking-[0.15em] uppercase text-xs block mb-3">
                                    {t('blog.hero.badge')}
                                </span>
                                <h1
                                    style={{
                                        fontWeight: 900,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.02em',
                                        fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                                        color: '#fff',
                                        margin: '0 0 1rem 0',
                                        lineHeight: 1.08,
                                    }}
                                >
                                    {t('blog.hero.title')}
                                    <span className="block text-[#1eb4d4]">{t('blog.hero.title_highlight')}</span>
                                </h1>
                                <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed mb-6 font-medium">
                                    {t('blog.hero.desc')}
                                </p>
                                {/* Sub-nav */}
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { to: '/blog/posts', icon: <BookOpen className="w-4 h-4" />, label: t('blog.hero.nav_posts') },
                                        { to: '/blog/latest-news', icon: <Rss className="w-4 h-4" />, label: t('blog.hero.nav_news') },
                                        { to: '/blog/archives', icon: <Archive className="w-4 h-4" />, label: t('blog.hero.nav_archives') },
                                    ].map((item) => (
                                        <Link key={item.label} to={item.to}
                                            className="ds-btn ds-btn-outline-white ds-btn-sm">
                                            {item.icon} {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </FadeIn>
                        </div>
                    </section>

                    {/* FILTERS */}
                    <section className="py-10 bg-white border-b border-slate-100 sticky top-[80px] z-30">
                        <div className="max-w-7xl mx-auto px-6 md:px-12">
                            <div className="flex flex-col md:flex-row gap-4 items-center">
                                <div className="relative w-full md:w-80">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder={t('blog.filters.search_placeholder')}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-5 h-10 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat
                                                ? 'bg-green-600 text-white shadow-lg shadow-green-600/20'
                                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* POSTS GRID */}
                    <section className="py-16">
                        <div className="max-w-7xl mx-auto px-6 md:px-12">
                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="animate-pulse flex flex-col h-full bg-white rounded-xl overflow-hidden border border-slate-100">
                                            <div className="w-full aspect-square bg-slate-200"></div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="w-16 h-4 bg-slate-200 rounded mb-4"></div>
                                                <div className="w-3/4 h-6 bg-slate-200 rounded mb-4"></div>
                                                <div className="w-1/2 h-6 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post, i) => (
                                    <FadeIn key={post.id} direction="up" delay={i * 0.05} fullWidth>
                                        <motion.article
                                            whileHover={{ y: -4 }}
                                            className="group overflow-hidden transition-all duration-500 flex flex-col h-full cursor-pointer"
                                        >
                                            <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                                                    <div className="w-full aspect-square overflow-hidden bg-slate-100 flex items-center justify-center">
                                                        {post.coverImage || post.image ? (
                                                            <img
                                                                src={post.coverImage || post.image}
                                                                alt={t(`blog_posts.${post.id}.title`, { defaultValue: post.title })}
                                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                            />
                                                        ) : (
                                                            <BookOpen className="w-12 h-12 text-slate-300" />
                                                        )}
                                                    </div>
                                                        <div className="p-6 flex flex-col flex-grow">
                                                        <div className="mb-3">
                                                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">{post.category || 'Blog'}</span>
                                                        </div>
                                                        <div className="text-[11px] text-slate-400 mb-3 flex items-center gap-1.5 flex-wrap">
                                                            <span>{new Date(post.publishedAt || post.createdAt || post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                            {post.author && <><span>·</span><span className="font-semibold text-slate-500">{post.author}</span></>}
                                                        </div>
                                                        <h3 className="text-xl font-black text-slate-900 leading-tight mb-3 group-hover:text-green-600 transition-colors">
                                                            {t(`blog_posts.${post.id}.title`, { defaultValue: post.title })}
                                                        </h3>
                                                    </div>
                                            </Link>
                                        </motion.article>
                                    </FadeIn>
                                ))}
                            </div>
                            {filteredPosts.length === 0 && (
                                <div className="text-center py-32 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                    <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-slate-400 font-bold text-lg">{t('blog.empty.title')}</p>
                                    <p className="text-slate-400 text-sm mt-2">{t('blog.empty.desc')}</p>
                                </div>
                            )}
                                </>
                            )}
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Blog;
