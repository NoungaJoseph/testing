import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Rss, Bell } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const parseDate = (value: string) => new Date(value).getTime();

const latestNews = [...blogPosts]
    .sort((a, b) => parseDate(b.date) - parseDate(a.date))
    .slice(0, 6);

const urgentCategories = new Set(['Emergency Relief', 'Crisis']);

const BlogLatestNews = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-40 pb-16 bg-gradient-to-br from-slate-900 to-green-950 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
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
                        <div className="grid lg:grid-cols-2 gap-8 mb-16">
                            {latestNews.slice(0, 1).map((post) => (
                                <motion.article key={post.id} whileHover={{ y: -4 }} className="lg:col-span-2 group rounded-3xl overflow-hidden transition-all duration-500">
                                    <div className="grid md:grid-cols-2">
                                        <div className="relative h-72 md:h-full overflow-hidden">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            {urgentCategories.has(post.category) && (
                                                <span className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-black rounded-full">URGENT</span>
                                            )}
                                        </div>
                                        <div className="p-10 flex flex-col justify-center">
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-white/30 text-secondary border border-secondary/20">
                                                    {post.category}
                                                </span>
                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />{post.date}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-secondary transition-colors">{post.title}</h2>
                                            <p className="text-slate-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                                            <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-secondary font-bold text-sm hover:gap-4 transition-all">
                                                Read Full Story <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestNews.slice(1).map((post, i) => (
                            <FadeIn key={post.id} direction="up" delay={i * 0.07}>
                                <motion.article whileHover={{ y: -4 }} className="group transition-all duration-500 flex flex-col h-full">
                                    <div className="w-full aspect-square overflow-hidden relative">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        {urgentCategories.has(post.category) && (
                                            <span className="absolute top-3 left-3 px-2.5 py-1 bg-red-600 text-white text-[10px] font-black rounded-full">URGENT</span>
                                        )}
                                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-black backdrop-blur-sm bg-white/85 text-slate-700">
                                            {post.category}
                                        </span>
                                    </div>
                                    <div className="p-4 flex flex-col flex-1">
                                        <div className="text-[12px] text-slate-500 mb-2">{post.date} • {post.author}</div>
                                        <h3 className="text-slate-900 font-black text-base leading-tight mb-2">
                                            <Link to={`/blog/${post.id}`} className="underline hover:text-green-700">{post.title}</Link>
                                        </h3>
                                    </div>
                                </motion.article>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BlogLatestNews;
