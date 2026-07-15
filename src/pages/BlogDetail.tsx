import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

const BlogDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.enakoos.com/api/v1/outreach/posts?status=PUBLISHED')
            .then(res => res.json())
            .then(data => {
                const found = data.find((p: any) => p.id === id);
                setPost(found);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                    <p className="text-slate-500 mb-6">Loading article...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                    <h2 className="text-2xl font-black mb-4">Article not found</h2>
                    <p className="text-slate-500 mb-6">We couldn't find the article you're looking for.</p>
                    <Link to="/blog" className="text-slate-700 font-bold">Back to blog</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const paragraphs = post.content
        .split('\n\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <FadeIn direction="up">
                        {post.video && (
                            <div className="w-full overflow-hidden rounded-lg mb-6 bg-slate-900 shadow-xl border border-slate-200/50">
                                <video 
                                    src={post.video} 
                                    controls 
                                    preload="metadata"
                                    className="w-full max-h-[600px] object-contain"
                                    controlsList="nodownload"
                                />
                            </div>
                        )}

                        {!post.video && (
                            <div className="w-full aspect-[16/9] overflow-hidden rounded-lg mb-6 bg-slate-100 flex items-center justify-center">
                                {post.coverImage ? (
                                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                                ) : (
                                    <BookOpen className="w-24 h-24 text-slate-300" />
                                )}
                            </div>
                        )}
                        <div className="mb-4">
                            <span className="px-3 py-1 rounded-full text-[12px] font-black bg-green-100 text-slate-900">{post.category || 'Blog'}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">{post.title}</h1>
                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200">
                            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 uppercase">
                                {(post.author || 'E').charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">By {post.author || 'ENAKO OS'}</div>
                                <div className="text-sm text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</div>
                            </div>
                        </div>
                        <div className="prose prose-lg max-w-none text-slate-700 mb-12">
                            {paragraphs.map((paragraph, index) => (
                                <p key={index} className="mb-6 leading-8 text-slate-700">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        {post.images && post.images.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-slate-200">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Gallery</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {post.images.map((img: string, idx: number) => (
                                        <div key={idx} className="aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                            <img src={img} alt={`Gallery image ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {post.statisticsLinks && post.statisticsLinks.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-slate-200">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Sources & Proof Statistics</h3>
                                <ul className="space-y-3">
                                    {post.statisticsLinks.map((link, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-green-600 mt-1">✓</span>
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-green-600 font-medium underline underline-offset-4">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BlogDetail;
