import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { useParams, Link } from 'react-router-dom';
import { getCommunityData } from '../data/communitiesData';


const CommunityDetail = () => {
    const { slug } = useParams();
    const data = getCommunityData(slug || '');

    if (!data) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                    <h2 className="text-2xl font-black mb-4">Community not found</h2>
                    <p className="text-slate-500 mb-6">We couldn't find the requested community.</p>
                    <Link to="/focus-communities" className="text-[#1eb4d4] font-bold">Back to Communities</Link>
                </div>
                <Footer />
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        if (status === 'Completed') return 'text-[#00BFA5]';
        if (status === 'In Progress') return 'text-amber-600';
        return 'text-slate-500';
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <FadeIn direction="up">
                        {/* Cover Image */}
                        <div className="w-full aspect-[21/9] md:aspect-[16/6] overflow-hidden mb-12 relative group">
                            <img src={data.coverImage} alt={data.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white">
                                <span className="inline-block px-3 py-1 bg-[#00BFA5] text-white text-[10px] font-black uppercase tracking-[0.2em] mb-4 rounded-[2px]">
                                    {data.region}
                                </span>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">{data.name}</h1>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                            {/* Main Content */}
                            <div className="lg:col-span-8">
                                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Community Overview</h2>
                                <p className="text-slate-800 font-medium leading-relaxed text-xl md:text-2xl mb-16">{data.overview}</p>

                                <h2 className="text-3xl md:text-4xl font-black text-[#001B44] mb-10">Development & Plans</h2>
                                <div className="space-y-0 mb-16 border-t-2 border-slate-900">
                                    {data.plans.map((plan) => (
                                        <div key={plan.id} className="py-8 border-b border-slate-200 group">
                                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 mb-4">
                                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-[#00BFA5] transition-colors">{plan.title}</h3>
                                                <span className={`text-xs font-black uppercase tracking-[0.15em] ${getStatusColor(plan.status)}`}>
                                                    — {plan.status}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 leading-relaxed md:w-5/6 text-lg">{plan.description}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to={`/communities/${slug}/projects`} className="bg-[#001B44] hover:bg-[#00BFA5] transition-colors text-white px-8 py-4 rounded-[2px] font-black uppercase tracking-widest text-sm text-center">
                                        Fund a Project Here
                                    </Link>
                                    <Link to="/volunteer" className="bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors px-8 py-4 rounded-[2px] font-black uppercase tracking-widest text-sm text-center">
                                        Volunteer
                                    </Link>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <aside className="lg:col-span-4 space-y-12">
                                <div className="bg-[#f8fafc] border border-slate-200 rounded-[2px] p-8">
                                    <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-8">
                                        Impact Stats
                                    </h4>
                                    <div className="space-y-8">
                                        <div>
                                            <p className="text-slate-900 text-sm font-bold uppercase tracking-wider mb-2">Population Reached</p>
                                            <p className="text-3xl lg:text-4xl font-black text-[#00BFA5] leading-tight break-normal">{data.populationReached}</p>
                                        </div>
                                        <div className="w-full h-px bg-slate-200" />
                                        <div>
                                            <p className="text-slate-900 text-sm font-bold uppercase tracking-wider mb-2">Active Projects</p>
                                            <p className="text-3xl lg:text-4xl font-black text-[#00BFA5] leading-tight break-normal">{data.activeProjects}</p>
                                        </div>
                                    </div>
                                </div>

                                {data.gallery.length > 0 && (
                                    <div>
                                        <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">Gallery</h4>
                                        <div className="flex flex-col gap-4">
                                            {data.gallery.map((g, i) => (
                                                <div key={i} className="w-full aspect-[4/3] rounded-[2px] overflow-hidden bg-slate-100">
                                                    <img src={g} alt={`${data.name} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 grayscale hover:grayscale-0" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </aside>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CommunityDetail;
