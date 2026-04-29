import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import FadeIn from './FadeIn';
import { ArrowRight, Calendar } from 'lucide-react';

const LatestBlog = () => {
    const latestPosts = blogPosts.slice(0, 3);

    return (
        <section className="py-32 bg-transparent px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <FadeIn direction="right" scale={0.92} threshold={0.3}>
                            <span className="text-secondary font-black tracking-[0.4em] uppercase text-[10px] block mb-6">Latest News</span>
                            <h2 className="text-navy text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4 ">
                                Insight & <span className="text-secondary not-">Impact.</span>
                            </h2>
                        </FadeIn>
                        <FadeIn direction="right" delay={0.2} scale={0.95} threshold={0.3}>
                            <p className="text-slate-500 text-xl font-medium leading-relaxed">
                                Stay informed about the issues that matter most to communities in Cameroon.
                            </p>
                        </FadeIn>
                    </div>
                    <FadeIn direction="left" scale={0.92} threshold={0.3}>
                        <Link to="/blog" className="inline-flex items-center gap-3 text-navy font-black text-xs uppercase tracking-widest group border-b-2 border-secondary pb-2">
                            View All Articles <ArrowRight className="w-4 h-4 text-secondary group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {latestPosts.map((post, i) => (
                        <FadeIn key={post.id} direction="up" delay={i * 0.1} scale={0.9} threshold={0.2} fullWidth>
                            <article className="group overflow-hidden transition-all duration-700 flex flex-col h-full bg-white">
                                <div className="relative aspect-square w-full overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-navy text-[10px] font-black uppercase tracking-widest">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="pt-8 pb-4 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                                        <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-secondary" /> {post.date}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-navy leading-tight mb-4 group-hover:text-secondary transition-colors ">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-navy font-black text-[10px] uppercase tracking-widest group/link">
                                        Read More <ArrowRight className="w-3 h-3 text-secondary group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestBlog;
