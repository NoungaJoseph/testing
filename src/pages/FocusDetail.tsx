import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { useParams, Link } from 'react-router-dom';
import focusItems from '../data/focusItems';
import { ACTION_LINKS } from '../constants/actionLinks';

const FocusDetail = () => {
    const { slug } = useParams();
    const item = focusItems.find(i => i.slug === slug);

    if (!item) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                    <h2 className="text-2xl font-black mb-4">Item not found</h2>
                    <p className="text-slate-500 mb-6">We couldn't find the requested focus item.</p>
                    <Link to="/focus-communities" className="text-[#00BFA5] font-bold">Back</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const related = focusItems.filter(i => i.slug !== item.slug).slice(0, 3);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <FadeIn direction="up">
                        <div className="w-full aspect-[21/9] md:aspect-[16/6] overflow-hidden mb-12 relative group">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white">
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-2">{item.title}</h1>
                                <div className="text-slate-300 font-bold uppercase tracking-[0.2em] text-xs">{item.count}</div>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                            <div className="lg:w-2/3">
                                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Overview</h2>
                                <div className="space-y-6 mb-12">
                                    {item.longDesc.map((p, i) => (
                                        <p key={i} className="text-slate-800 leading-relaxed text-lg">{p}</p>
                                    ))}
                                </div>

                                <h3 className="text-3xl font-black text-[#001B44] mb-6">Key Impact</h3>
                                <ul className="space-y-4 mb-12">
                                    {item.impactPoints.map((pt, idx) => (
                                        <li key={idx} className="flex items-start gap-4 text-slate-700 text-lg">
                                            <span className="w-1.5 h-1.5 bg-[#00BFA5] flex-shrink-0 mt-2.5" />
                                            {pt}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to="/donate" className="bg-[#001B44] hover:bg-[#00BFA5] transition-colors text-white px-8 py-4 rounded-[2px] font-black uppercase tracking-widest text-sm text-center">
                                        Donate
                                    </Link>
                                    <Link to={ACTION_LINKS.applyHelp} className="bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors px-8 py-4 rounded-[2px] font-black uppercase tracking-widest text-sm text-center">
                                        Apply for Help
                                    </Link>
                                </div>
                            </div>

                            <aside className="lg:w-1/3 space-y-12">
                                {item.gallery && item.gallery.length > 0 && (
                                    <div>
                                        <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Gallery</h4>
                                        <div className="flex flex-col gap-4">
                                            {item.gallery.map((g, i) => (
                                                <div key={i} className="w-full aspect-[4/3] rounded-[2px] overflow-hidden bg-slate-100">
                                                    <img src={g} alt={`${item.title} ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Related</h4>
                                    <div className="space-y-4">
                                        {related.map((r) => (
                                            <Link key={r.slug} to={`/focus-communities/${r.slug}`} className="group flex items-center gap-4 hover:bg-slate-50 p-2 -ml-2 rounded-[2px] transition-colors">
                                                <div className="w-16 h-16 overflow-hidden rounded-[2px]">
                                                    <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0" />
                                                </div>
                                                <div>
                                                    <div className="font-black text-slate-900 group-hover:text-[#00BFA5] transition-colors">{r.title}</div>
                                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{r.count}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FocusDetail;
