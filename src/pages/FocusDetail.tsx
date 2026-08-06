import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useParams, Link } from 'react-router-dom';
import focusItems from '../data/focusItems';
import { ACTION_LINKS } from '../constants/actionLinks';
import { useTranslation } from 'react-i18next';
import { Image as ImageIcon, Heart, ArrowLeft, Calendar, CheckCircle } from 'lucide-react';

interface DynamicEvent {
  id: string;
  title: string;
  titleFr: string | null;
  description: string | null;
  descriptionFr: string | null;
  type: string;
  status: string;
  videoUrl?: string | null;
  gallery?: any; // [{ url: string, caption: string, captionFr: string }]
  storyTitle?: string | null;
  storyTitleFr?: string | null;
  storyDescription?: string | null;
  storyDescriptionFr?: string | null;
  storyMediaUrl?: string | null;
  storyMediaType?: string | null;
  createdAt: string;
}

const categorySlugMap: Record<string, string> = {
  'clean-water': 'CLEAN_WATER',
  'healthcare': 'HEALTHCARE',
  'education': 'SCHOLARSHIP',
  'women-mothers': 'WOMEN_MOTHERS',
  'community-relief': 'COMMUNITY_RELIEF',
};

const FocusDetail = () => {
    const { slug } = useParams();
    const { i18n } = useTranslation();
    const isFr = i18n.language === 'fr';

    const [events, setEvents] = useState<DynamicEvent[]>([]);
    const [loading, setLoading] = useState(true);

    const staticItem = focusItems.find(i => i.slug === slug);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/v1\/?$/, '') : 'https://api.enakoos.com';
                const backendType = slug ? categorySlugMap[slug] || slug.toUpperCase().replace(/-/g, '_') : '';
                const url = backendType 
                  ? `${baseUrl}/api/v1/public/events?type=${backendType}`
                  : `${baseUrl}/api/v1/public/events`;
                  
                const res = await fetch(url);
                const data = await res.json();
                setEvents(data);
            } catch (err) {
                console.error('Failed to load category events:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [slug]);

    const getEmbedUrl = (url: string) => {
      if (!url) return null;
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
      }
      return url;
    };

    if (loading) {
      return (
        <div className="min-h-screen bg-white">
          <Navbar />
          <div className="max-w-4xl mx-auto px-6 py-32 text-center text-slate-500 font-bold">
            {isFr ? 'Chargement des détails...' : 'Loading details...'}
          </div>
          <Footer />
        </div>
      );
    }

    // Determine what static content to fall back to if no active events exist
    const pageTitle = staticItem ? staticItem.title : (slug ? slug.replace(/-/g, ' ').toUpperCase() : '');
    const pageImage = staticItem ? staticItem.image : '/assets/focus communities/focus community.png';

    return (
        <div className="min-h-screen bg-white font-body selection:bg-accent selection:text-white">
            <Navbar />

            {/* Header / Cover */}
            <section className="pt-24 pb-10 bg-slate-50 border-b border-slate-100">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    <Link to="/focus-communities" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-green-600 transition-colors mb-6 no-underline">
                        <ArrowLeft className="w-4 h-4" /> {isFr ? 'Retour aux Communautés' : 'Back to Focus Communities'}
                    </Link>
                    <div className="w-full aspect-[21/9] md:aspect-[16/6] overflow-hidden rounded-3xl relative shadow-md">
                        <img src={pageImage} alt={pageTitle} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-2">{pageTitle}</h1>
                            <div className="text-slate-300 font-bold uppercase tracking-[0.2em] text-xs">
                              {events.length} {events.length === 1 ? (isFr ? 'Initiative Active' : 'Active Campaign') : (isFr ? 'Initiatives Actives' : 'Active Campaigns')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-6 md:px-12">
                    
                    {events.length === 0 ? (
                      // Fallback to static mock details
                      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
                        <div>
                          <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">{isFr ? 'Aperçu' : 'Overview'}</h2>
                          <div className="space-y-6 mb-12">
                            {staticItem ? staticItem.longDesc.map((p, i) => (
                              <p key={i} className="text-slate-700 leading-relaxed text-lg">{p}</p>
                            )) : <p className="text-slate-500">{isFr ? 'Aucune description disponible.' : 'No description available.'}</p>}
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 mb-6">{isFr ? 'Impact Clé' : 'Key Impact'}</h3>
                          <ul className="space-y-4 mb-12 list-none p-0">
                            {staticItem?.impactPoints.map((pt, idx) => (
                              <li key={idx} className="flex items-start gap-4 text-slate-700 text-lg">
                                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                                {pt}
                              </li>
                            ))}
                          </ul>
                          <div className="flex gap-4">
                            <Link to="/donate" className="bg-[#001B44] hover:bg-[#00BFA5] transition-colors text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm text-center no-underline">
                              {isFr ? 'Faire un Don' : 'Donate'}
                            </Link>
                          </div>
                        </div>

                        <aside className="space-y-10">
                          {staticItem?.gallery && staticItem.gallery.length > 0 && (
                            <div>
                              <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6">{isFr ? 'Galerie' : 'Gallery'}</h4>
                              <div className="grid gap-4">
                                {staticItem.gallery.map((g, i) => (
                                  <div key={i} className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
                                    <img src={g} alt={`${pageTitle} ${i+1}`} className="w-full h-full object-cover" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </aside>
                      </div>
                    ) : (
                      // Dynamic Events Listing
                      <div className="space-y-20">
                        {events.map((ev) => {
                          const hasVideo = !!ev.videoUrl;
                          const galleryArr = ev.gallery as any[];
                          const hasGallery = galleryArr && galleryArr.length > 0;
                          const hasStory = !!ev.storyTitle || !!ev.storyDescription;

                          return (
                            <div key={ev.id} className="border-b border-slate-100 last:border-0 pb-16 last:pb-0 space-y-12">
                              {/* Event Header Info */}
                              <div className="space-y-4">
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                  <Calendar className="w-4 h-4 text-green-600" />
                                  <span>{new Date(ev.createdAt).toLocaleDateString(isFr ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                                  {isFr && ev.titleFr ? ev.titleFr : ev.title}
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap max-w-4xl">
                                  {isFr && ev.descriptionFr ? ev.descriptionFr : ev.description}
                                </p>
                              </div>

                              {/* Rich Content Grid (Video & Story) */}
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                {/* Left Side: Video (if present) or Main Graphic */}
                                <div className={hasVideo ? 'col-span-1 lg:col-span-7' : 'col-span-1 lg:col-span-5'}>
                                  {hasVideo ? (
                                    <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50">
                                      <iframe
                                        src={getEmbedUrl(ev.videoUrl!)!}
                                        title={ev.title}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                      ></iframe>
                                    </div>
                                  ) : (
                                    <div className="w-full aspect-video rounded-3xl overflow-hidden bg-gradient-to-br from-green-500 to-emerald-800 text-white flex items-center justify-center p-6 text-center">
                                      <div>
                                        <Heart className="w-12 h-12 mx-auto mb-3 opacity-80" />
                                        <div className="font-bold text-lg">{isFr ? 'Initiative active de secours' : 'Active Relief Campaign'}</div>
                                        <div className="text-xs opacity-75 mt-1">{isFr ? 'Soutien direct aux communautés' : 'Direct Support for Communities'}</div>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Right Side: Highlighted Story Card */}
                                <div className={hasVideo ? 'col-span-1 lg:col-span-5' : 'col-span-1 lg:col-span-7'}>
                                  {hasStory && (
                                    <div className="bg-[#001B44] text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
                                      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#00BFA5]/20 blur-3xl" />
                                      <div className="relative space-y-4">
                                        <span className="bg-[#00BFA5] text-[#001B44] font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                                          {isFr ? 'Histoire d\'impact' : 'Impact Story'}
                                        </span>
                                        <h4 className="text-xl font-bold tracking-tight">
                                          {isFr && ev.storyTitleFr ? ev.storyTitleFr : ev.storyTitle}
                                        </h4>
                                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                          {isFr && ev.storyDescriptionFr ? ev.storyDescriptionFr : ev.storyDescription}
                                        </p>
                                        
                                        {ev.storyMediaUrl && (
                                          <div className="w-full aspect-video rounded-2xl overflow-hidden mt-4 bg-slate-900 border border-white/10">
                                            {ev.storyMediaType === 'VIDEO' ? (
                                              <video src={ev.storyMediaUrl} controls className="w-full h-full object-cover" />
                                            ) : (
                                              <img src={ev.storyMediaUrl} alt="Story visual representation" className="w-full h-full object-cover" />
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Gallery Grid */}
                              {hasGallery && (
                                <div className="space-y-6 pt-6 border-t border-slate-100">
                                  <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-green-600" />
                                    {isFr ? 'Galerie de photos de l\'événement' : 'Event Photo Gallery'}
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {galleryArr.map((g: any, i: number) => (
                                      <div key={i} className="group bg-slate-50 border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-full aspect-[4/3] overflow-hidden bg-slate-200">
                                          <img src={g.url} alt={g.caption || ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        </div>
                                        {(g.caption || g.captionFr) && (
                                          <div className="p-4 bg-white border-t border-slate-100">
                                            <p className="text-xs text-slate-600 italic">
                                              {isFr && g.captionFr ? g.captionFr : g.caption}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Actions Block */}
                              <div className="flex flex-wrap gap-4 pt-4">
                                <Link to="/donate" className="bg-green-600 hover:bg-green-700 transition-colors text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-center no-underline shadow-md">
                                  {isFr ? 'Soutenir cette campagne' : 'Support this Campaign'}
                                </Link>
                                <Link to={ACTION_LINKS.applyHelp} className="bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs text-center no-underline">
                                  {isFr ? 'Demander de l\'aide' : 'Apply for Help'}
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default FocusDetail;
