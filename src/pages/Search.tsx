import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { useTranslation } from 'react-i18next';

// Static Data imports
import { blogPosts } from '../data/blogPosts';
import focusItems from '../data/focusItems';
import { communitiesData } from '../data/communitiesData';

import Fuse from 'fuse.js';

type SearchResult = {
    title: string;
    description: string;
    link: string;
    category: string;
    image?: string;
    keywords?: string[];
};

const Search = () => {
    const { t } = useTranslation();
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
            { title: 'About Us', desc: 'Learn about Enako Outreach, our mission, and our vision.', link: '/about', keywords: ['about', 'history', 'mission', 'vision'] },
            { title: 'Programs & Scholarships', desc: 'Discover the programs and initiatives we run, including scholarships.', link: '/programs', keywords: ['programs', 'scholarships', 'education', 'health', 'initiatives', 'schorlaship', 'grants', 'school'] },
            { title: 'Impact', desc: 'See the impact of our projects across Cameroon.', link: '/impact', keywords: ['impact', 'results', 'reports', 'success'] },
            { title: 'Get Involved', desc: 'Find out how you can volunteer or partner with us.', link: '/get-involved', keywords: ['volunteer', 'partner', 'join', 'help'] },
            { title: 'Contact Us', desc: 'Get in touch with the Enako Outreach team.', link: '/contact', keywords: ['contact', 'email', 'phone', 'support'] },
            { title: 'Donate', desc: 'Support our mission by making a donation.', link: '/donate', keywords: ['donate', 'give', 'fund', 'contribute'] },
            { title: 'Events & News', desc: 'Latest updates, upcoming events, and news from Enako Outreach.', link: '/blog', keywords: ['events', 'news', 'upcoming', 'announcements', 'updates', 'blog'] }
        ];
        staticPages.forEach(p => {
            data.push({
                title: p.title,
                description: p.desc,
                link: p.link,
                category: 'Page',
                keywords: p.keywords
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

        const fuse = new Fuse(allData, {
            keys: [
                { name: 'title', weight: 0.5 },
                { name: 'keywords', weight: 0.3 },
                { name: 'description', weight: 0.1 },
                { name: 'category', weight: 0.1 }
            ],
            threshold: 0.4, // Allows fuzzy matching for typos like "schorlaship"
            ignoreLocation: true,
            includeScore: true
        });

        const fuseResults = fuse.search(query);
        const filtered = fuseResults.map(res => res.item);

        setResults(filtered);
        setIsSearching(false);
    }, [query, allData]);

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            
            <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full">
                <FadeIn direction="up">
                    <div className="mb-12 border-b-2 border-slate-900 pb-8">
                        <span className="text-[#00BFA5] font-black tracking-[0.3em] uppercase text-[10px] block mb-4">{t('search_page.badge', 'Search Results')}</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#001B44] uppercase tracking-tighter">
                            {t('search_page.results_for', 'Results for')} <span className="text-[#00BFA5]">"{query}"</span>
                        </h1>
                        <p className="text-slate-500 font-bold mt-4 uppercase tracking-widest text-xs">
                            {results.length} {t('search_page.results_found', 'Results Found')}
                        </p>
                    </div>

                    {!query.trim() ? (
                        <div className="py-20 text-center bg-slate-50 border-2 border-slate-100 rounded-[2px]">
                            <h2 className="text-2xl font-black text-slate-800 mb-2">{t('search_page.start_searching', 'Start Searching')}</h2>
                            <p className="text-slate-500 font-medium">{t('search_page.start_desc', 'Type a keyword in the search bar above to find content.')}</p>
                        </div>
                    ) : isSearching ? (
                        <div className="py-20 flex justify-center">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-[#00BFA5] rounded-full animate-spin"></div>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="py-20 text-center bg-slate-50 border-2 border-slate-100 rounded-[2px]">
                            <h2 className="text-2xl font-black text-slate-800 mb-2">{t('search_page.no_results', 'No results found')}</h2>
                            <p className="text-slate-500 font-medium">{t('search_page.no_results_desc', "We couldn't find any content matching")} "{query}". {t('search_page.try_again', 'Try different keywords.')}</p>
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
