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
                    <Link to="/focus-communities" className="text-green-600 font-bold">Back</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const related = focusItems.filter(i => i.slug !== item.slug).slice(0, 3);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-24 pb-10">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <FadeIn direction="up">
                        <div className="w-full aspect-[16/6] overflow-hidden mb-6 bg-slate-100">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="lg:w-2/3">
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">{item.title}</h1>
                                <div className="text-slate-500 mb-4">{item.count}</div>

                                {item.longDesc.map((p, i) => (
                                    <p key={i} className="text-slate-700 leading-relaxed mb-4">{p}</p>
                                ))}

                                <h3 className="text-xl font-bold text-slate-900 mb-3">Key Impact</h3>
                                <ul className="list-disc pl-5 text-slate-600 space-y-2 mb-6">
                                    {item.impactPoints.map((pt, idx) => (
                                        <li key={idx}>{pt}</li>
                                    ))}
                                </ul>

                                <div className="flex gap-4">
                                    <Link to="/donate" className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold">Donate</Link>
                                    <Link to={ACTION_LINKS.applyHelp} className="border border-green-600 text-green-600 px-6 py-3 rounded-xl font-bold">Apply for Help</Link>
                                </div>
                            </div>

                            <aside className="lg:w-1/3">
                                <div className="mb-6">
                                    <h4 className="text-slate-900 font-black mb-3">Gallery</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {(item.gallery || []).map((g, i) => (
                                            <div key={i} className="w-full h-32 overflow-hidden">
                                                <img src={g} alt={`${item.title} ${i+1}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-slate-900 font-black mb-3">Related</h4>
                                    <div className="space-y-3">
                                        {related.map((r) => (
                                            <Link key={r.slug} to={`/focus-communities/${r.slug}`} className="flex items-center gap-3 hover:underline">
                                                <img src={r.image} alt={r.title} className="w-14 h-14 object-cover" />
                                                <div>
                                                    <div className="font-semibold text-slate-800">{r.title}</div>
                                                    <div className="text-xs text-slate-500">{r.count}</div>
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
