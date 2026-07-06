import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';

// Static Data imports
import { blogPosts } from '../data/blogPosts';
import focusItems from '../data/focusItems';
import { communitiesData } from '../data/communitiesData';

type SearchResult = {
    title: string;
    description: string;
    link: string;
    category: string;
    image?: string;
};

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(true);

    const allData = useMemo(() => {
        const data: SearchResult[] = [];
        
        // Add Blog Posts
        blogPosts.forEach((post: any) => {
            data.push({
                title: post.title,
                description: post.excerpt || post.content.substring(0, 150) + '...',
                link: `/blog/${post.id}`,
                category: 'Blog Post',
                image: post.image
            });
        });

        // Add Focus Items (Regions)
        focusItems.forEach(item => {
            data.push({
                title: item.title,
                description: item.longDesc[0] || 'Focus region for Enako Outreach initiatives.',
                link: `/focus-communities/${item.slug}`,
                category: 'Focus Region',
                image: item.image
            });
        });

        // Add Communities
        communitiesData.forEach((comm) => {
            data.push({
                title: comm.name || '',
                description: comm.overview || `Community in ${comm.region || 'Cameroon'}`,
                link: `/communities/${comm.slug}`,
                category: 'Community',
                image: comm.coverImage
            });
        });

        // Add static pages
        const staticPages = [
            { title: 'About Us', desc: 'Learn about Enako Outreach, our mission, and our vision.', link: '/about' },
            { title: 'Programs', desc: 'Discover the programs and initiatives we run.', link: '/programs' },
            { title: 'Impact', desc: 'See the impact of our projects across Cameroon.', link: '/impact' },
            { title: 'Get Involved', desc: 'Find out how you can volunteer or partner with us.', link: '/get-involved' },
            { title: 'Contact Us', desc: 'Get in touch with the Enako Outreach team.', link: '/contact' },
            { title: 'Donate', desc: 'Support our mission by making a donation.', link: '/donate' },
        ];
        staticPages.forEach(p => {
            data.push({
                title: p.title,
                description: p.desc,
                link: p.link,
                category: 'Page'
            });
        });

        return data;
    }, []);

    useEffect(() => {
        setIsSearching(true);
        if (!query.trim()) {
            setResults([]);
            setIsSearching(false);
            return;
        }

        const lowerQ = query.toLowerCase().trim();
        const filtered = allData.filter(item => 
            (item.title || '').toLowerCase().includes(lowerQ) || 
            (item.description || '').toLowerCase().includes(lowerQ) ||
            (item.category || '').toLowerCase().includes(lowerQ)
        );

        // Sort results: exact title matches first, then partial title matches, then descriptions
        filtered.sort((a, b) => {
            const aTitle = (a.title || '').toLowerCase();
            const bTitle = (b.title || '').toLowerCase();
            if (aTitle === lowerQ && bTitle !== lowerQ) return -1;
            if (bTitle === lowerQ && aTitle !== lowerQ) return 1;
            if (aTitle.includes(lowerQ) && !bTitle.includes(lowerQ)) return -1;
            if (bTitle.includes(lowerQ) && !aTitle.includes(lowerQ)) return 1;
            return 0;
        });

        setResults(filtered);
        setIsSearching(false);
    }, [query, allData]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            
            <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full">
                <FadeIn direction="up">
                    <div className="mb-12 border-b-2 border-slate-900 pb-8">
                        <span className="text-[#00BFA5] font-black tracking-[0.3em] uppercase text-[10px] block mb-4">Search Results</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#001B44] uppercase tracking-tighter">
                            Results for <span className="text-[#00BFA5]">"{query}"</span>
                        </h1>
                        <p className="text-slate-500 font-bold mt-4 uppercase tracking-widest text-xs">
                            {results.length} {results.length === 1 ? 'Result' : 'Results'} Found
                        </p>
                    </div>

                    {!query.trim() ? (
                        <div className="py-20 text-center bg-slate-50 border-2 border-slate-100 rounded-[2px]">
                            <h2 className="text-2xl font-black text-slate-800 mb-2">Start Searching</h2>
                            <p className="text-slate-500 font-medium">Type a keyword in the search bar above to find content.</p>
                        </div>
                    ) : isSearching ? (
                        <div className="py-20 flex justify-center">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-[#00BFA5] rounded-full animate-spin"></div>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="py-20 text-center bg-slate-50 border-2 border-slate-100 rounded-[2px]">
                            <h2 className="text-2xl font-black text-slate-800 mb-2">No results found</h2>
                            <p className="text-slate-500 font-medium">We couldn't find any content matching "{query}". Try different keywords.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {results.map((res, i) => (
                                <Link 
                                    key={i} 
                                    to={res.link} 
                                    className="group flex flex-col md:flex-row gap-6 p-6 border-2 border-slate-100 hover:border-[#001B44] transition-colors rounded-[2px] bg-white hover:bg-slate-50"
                                >
                                    {res.image && (
                                        <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-[2px] overflow-hidden bg-slate-100">
                                            <img src={res.image} alt={res.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                    )}
                                    <div className="flex-grow flex flex-col justify-center">
                                        <div className="mb-2 flex items-center gap-3">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white bg-[#00BFA5] px-2 py-1 rounded-[2px]">
                                                {res.category}
                                            </span>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-black text-[#001B44] mb-2 uppercase tracking-tight group-hover:text-[#00BFA5] transition-colors">
                                            {res.title}
                                        </h2>
                                        <p className="text-slate-600 line-clamp-2">
                                            {res.description}
                                        </p>
                                    </div>
                                    <div className="hidden md:flex items-center justify-center pl-6 border-l-2 border-slate-100 group-hover:border-[#00BFA5] transition-colors">
                                        <svg className="w-6 h-6 text-slate-300 group-hover:text-[#00BFA5] group-hover:translate-x-2 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </FadeIn>
            </main>
            
            <Footer />
        </div>
    );
};

export default Search;
