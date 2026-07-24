import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Rss, Bell, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { blogPosts as staticBlogPosts } from '../data/blogPosts';

const parseDate = (value: string) => new Date(value).getTime();

const urgentCategories = new Set(['Emergency Relief', 'Crisis']);

const BlogLatestNews = () => {
    const { t } = useTranslation();
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

    const latestNews = [...blogPosts]
        .filter(post => post.category === 'Latest News' || post.category === 'News' || urgentCategories.has(post.category))
        .sort((a, b) => parseDate(b.createdAt || b.date) - parseDate(a.createdAt || a.date))
        .slice(0, 6);
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-40 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/assets/charity/african-primary-school.png" 
                        alt="Enako Latest News Header Background" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#001B44]/80 backdrop-blur-[2px]" />
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <FadeIn direction="up">
                        <div className="flex items-center gap-2 mb-4">
                            <Rss className="w-4 h-4 text-secondary" />
                            <span className="text-secondary text-xs font-bold uppercase tracking-widest">Live Updates</span>
                        </div>
                        <h1 className="text-white font-black text-5xl md:text-6xl mb-4">Latest News</h1>
                        <p className="text-slate-300 text-xl max-w-2xl leading-relaxed">
                            Recent field updates, programme progress, and community stories from Enako Outreach.
                        </p>
                    </FadeIn>
                </div>
            </section>

            <div className="bg-red-600 text-white py-3 px-6">
                <div className="max-w-7xl mx-auto flex items-center gap-3 text-sm font-semibold">
                    <span className="flex items-center gap-1.5 bg-white text-red-600 px-3 py-1 rounded-full text-xs font-black">
                        <Bell className="w-3 h-3" /> URGENT
                    </span>
                    Ongoing emergency support updates are available in this feed.
                </div>
            </div>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <FadeIn direction="up">
                        <div className="mb-8">
                            <span className="text-secondary font-bold text-xs uppercase tracking-widest">Top Story</span>
                        </div>
                        {loading ? (
                            <>
                                <div className="grid lg:grid-cols-2 gap-8 mb-16 animate-pulse">
                                    <div className="lg:col-span-2 rounded-3xl overflow-hidden border border-slate-100 bg-white">
                                        <div className="grid md:grid-cols-2 h-72 md:h-96">
                                            <div className="bg-slate-200"></div>
                                            <div className="p-10 flex flex-col justify-center">
                                                <div className="w-24 h-6 bg-slate-200 rounded-full mb-4"></div>
                                                <div className="w-3/4 h-8 bg-slate-200 rounded mb-4"></div>
                                                <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
                                                <div className="w-5/6 h-4 bg-slate-200 rounded mb-6"></div>
                                                <div className="w-32 h-4 bg-slate-200 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {[1, 2, 3].map((i) => (
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
                            </>
                        ) : (
                            <>
                                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                                    {latestNews.slice(0, 1).map((post) => (
                                        <motion.article key={post.id} whileHover={{ y: -4 }} className="lg:col-span-2 group rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer">
                                            <Link to={`/blog/${post.id}`} className="grid md:grid-cols-2">
                                                <div className="relative h-72 md:h-full overflow-hidden bg-slate-100 flex items-center justify-center">
                                                    {post.coverImage || post.image ? (
                                                        <img src={post.coverImage || post.image} alt={t(`blog_posts.${post.id}.title`, { defaultValue: post.title })} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                    ) : (
                                                        <BookOpen className="w-12 h-12 text-slate-300" />
                                                    )}
                                                    {urgentCategories.has(post.category) && (
                                                        <span className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-black rounded-full">URGENT</span>
                                                    )}
                                                </div>
                                                <div className="p-10 flex flex-col justify-center">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <span className="px-3 py-1 rounded-full text-[10px] font-black bg-slate-100 text-secondary border border-secondary/20">
                                                            {post.category || 'News'}
                                                        </span>
                                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />{new Date(post.createdAt || post.date).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <h2 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-secondary transition-colors">{t(`blog_posts.${post.id}.title`, { defaultValue: post.title })}</h2>
                                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                                                        {(() => {
                                                            const text = t(`blog_posts.${post.id}.content`, { defaultValue: post.content || '' });
                                                            return text.length > 150 ? text.substring(0, 150) + '...' : text;
                                                        })()}
                                                    </p>
                                                    <span className="inline-flex items-center gap-2 text-secondary font-bold text-sm group-hover:gap-4 transition-all">
                                                        Read Full Story <ArrowRight className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            </Link>
                                        </motion.article>
                                    ))}
                                </div>
            
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {latestNews.slice(1).map((post, i) => (
                                        <FadeIn key={post.id} direction="up" delay={i * 0.07}>
                                            <motion.article whileHover={{ y: -4 }} className="group transition-all duration-500 flex flex-col h-full cursor-pointer">
                                                <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                                                    <div className="w-full aspect-square overflow-hidden relative bg-slate-100 flex items-center justify-center">
                                                        {post.coverImage || post.image ? (
                                                            <img src={post.coverImage || post.image} alt={t(`blog_posts.${post.id}.title`, { defaultValue: post.title })} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                        ) : (
                                                            <BookOpen className="w-12 h-12 text-slate-300" />
                                                        )}
                                                        {urgentCategories.has(post.category) && (
                                                            <span className="absolute top-3 left-3 px-2.5 py-1 bg-red-600 text-white text-[10px] font-black rounded-full">URGENT</span>
                                                        )}
                                                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black backdrop-blur-sm bg-white/85 text-slate-700">
                                                            {post.category || 'News'}
                                                        </span>
                                                    </div>
                                                    <div className="p-4 flex flex-col flex-1">
                                                        <div className="text-[12px] text-slate-500 mb-2">{new Date(post.createdAt || post.date).toLocaleDateString()} • {post.author}</div>
                                                        <h3 className="text-slate-900 font-black text-base leading-tight mb-2 group-hover:text-green-600 transition-colors">
                                                            {t(`blog_posts.${post.id}.title`, { defaultValue: post.title })}
                                                        </h3>
                                                    </div>
                                                </Link>
                                            </motion.article>
                                        </FadeIn>
                                    ))}
                                </div>
                            </>
                        )}
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BlogLatestNews;
