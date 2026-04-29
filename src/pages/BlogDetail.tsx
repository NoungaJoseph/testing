import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const BlogDetail = () => {
    const { id } = useParams();
    const post = blogPosts.find((p) => p.id === id);

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
                        <div className="w-full aspect-[16/9] overflow-hidden rounded-lg mb-6">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="mb-4">
                            <span className="px-3 py-1 rounded-full text-[12px] font-black bg-green-100 text-slate-900">{post.category}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">{post.title}</h1>
                        <div className="text-sm text-slate-500 mb-8">{post.date} - {post.author}</div>
                        <div className="prose prose-lg max-w-none text-slate-700">
                            {paragraphs.map((paragraph, index) => (
                                <p key={index} className="mb-6 leading-8 text-slate-700">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BlogDetail;
