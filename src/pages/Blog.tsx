import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { motion } from 'framer-motion';
import { Search, BookOpen, Rss, Archive } from 'lucide-react';
import { useState, useEffect } from 'react';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';
import { useTranslation } from 'react-i18next';

const Blog = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.enakoos.com/api/v1/outreach/posts?status=PUBLISHED')
            .then(res => res.json())
            .then(data => setBlogPosts(data))
            .catch(err => console.error(err))
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
                    {/* HERO */}
                    <section className="pt-40 pb-20 relative overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="/assets/charity/our-expertize-in-action.png" 
                                alt="Enako Blog Header Background" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-[#001B44]/80 backdrop-blur-[2px]" />
                        </div>
                        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                            <FadeIn direction="up">
                                <span className="text-secondary font-bold tracking-[0.4em] uppercase text-xs block mb-4">{t('blog.hero.badge')}</span>
                                <h1 className="text-white text-5xl md:text-6xl font-black leading-tight mb-6">
                                    {t('blog.hero.title')}
                                    <span className="block text-secondary">{t('blog.hero.title_highlight')}</span>
                                </h1>
                                <p className="text-slate-300 text-xl font-medium max-w-2xl leading-relaxed mb-10">
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
                                            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-xl hover:bg-secondary hover:border-secondary transition-all backdrop-blur-sm">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPosts.map((post, i) => (
                                    <FadeIn key={post.id} direction="up" delay={i * 0.05} fullWidth>
                                        <motion.article
                                            whileHover={{ y: -4 }}
                                            className="group overflow-hidden transition-all duration-500 flex flex-col h-full cursor-pointer"
                                        >
                                            <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                                                    <div className="w-full aspect-square overflow-hidden bg-slate-100 flex items-center justify-center">
                                                        {post.coverImage ? (
                                                            <img
                                                                src={post.coverImage}
                                                                alt={post.title}
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
                                                        <div className="text-[12px] text-slate-500 mb-3">{new Date(post.createdAt).toLocaleDateString()} • {post.author}</div>
                                                        <h3 className="text-xl font-black text-slate-900 leading-tight mb-3 group-hover:text-green-600 transition-colors">
                                                            {post.title}
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
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Blog;
