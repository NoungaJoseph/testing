import { useState } from 'react';
import { Send, Mail } from 'lucide-react';
import FadeIn from './FadeIn';

const NewsletterCTA = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) setSubmitted(true);
    };

    return (
        <section className="py-24 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: '#001B44' }}>
            <div className="max-w-7xl mx-auto">
                <div
                    className="relative overflow-hidden"
                    style={{ backgroundColor: '#FDFBF7', borderRadius: '2.5rem', padding: '4rem 3rem' }}
                >
                    {/* Decorative teal blob */}
                    <div
                        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
                        style={{ backgroundColor: '#00BFA5', transform: 'translate(30%, -30%)' }}
                    />
                    <div
                        className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-15 pointer-events-none"
                        style={{ backgroundColor: '#FEF08A', transform: 'translate(-30%, 30%)' }}
                    />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Left: Text */}
                        <div className="max-w-xl text-center lg:text-left">
                            <FadeIn direction="right">
                                <span
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6"
                                    style={{ backgroundColor: 'rgba(0,191,165,0.15)', color: '#00BFA5' }}
                                >
                                    <Mail className="w-3 h-3" /> Stay Updated
                                </span>
                                <h2 className="text-4xl md:text-5xl leading-tight mb-5" style={{ color: '#001B44' }}>
                                    Insights from the{' '}
                                    <span style={{ color: '#00BFA5' }}>Frontlines.</span>
                                </h2>
                                <p className="text-lg leading-relaxed" style={{ color: '#475569' }}>
                                    Subscribe to receive our monthly impact reports, community stories, and humanitarian bulletins directly in your inbox.
                                </p>
                            </FadeIn>
                        </div>

                        {/* Right: Form */}
                        <div className="w-full max-w-md">
                            <FadeIn direction="left" delay={0.2}>
                                {submitted ? (
                                    <div
                                        className="rounded-2xl p-8 text-center"
                                        style={{ backgroundColor: 'rgba(0,191,165,0.12)' }}
                                    >
                                        <p className="text-2xl mb-2" style={{ color: '#001B44', fontFamily: '"Playfair Display", serif' }}>
                                            Thank you! 🎉
                                        </p>
                                        <p className="text-sm" style={{ color: '#475569' }}>
                                            You're now subscribed to our newsletter.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="form-shell space-y-4">
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="your@email.com"
                                                required
                                                className="w-full h-16 pl-6 pr-6 text-base font-medium transition-all focus:outline-none"
                                                style={{
                                                    borderRadius: '9999px',
                                                    border: '2px solid #E2E8F0',
                                                    backgroundColor: '#fff',
                                                    color: '#0F172A',
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn-pill btn-pill-primary w-full justify-center text-sm"
                                        >
                                            Subscribe <Send className="w-4 h-4" />
                                        </button>
                                        <p className="text-[10px] font-bold text-center uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                                            * We respect your privacy. Unsubscribe anytime.
                                        </p>
                                    </form>
                                )}
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterCTA;
