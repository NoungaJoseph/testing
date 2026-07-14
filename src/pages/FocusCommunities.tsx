import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CameroonMap from '../components/CameroonMap';
import FadeIn from '../components/FadeIn';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Users, Droplets, Heart, GraduationCap, HeartHandshake, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';
import { ACTION_LINKS } from '../constants/actionLinks';
import { useTranslation } from 'react-i18next';

const regionIconMap = [
    <Droplets className="w-5 h-5" />,
    <GraduationCap className="w-5 h-5" />,
    <AlertTriangle className="w-5 h-5" />,
    <AlertTriangle className="w-5 h-5" />,
    <HeartHandshake className="w-5 h-5" />,
];

const regionColors = [
    { color: 'bg-cyan-500', colorLight: 'bg-cyan-50', colorText: 'text-cyan-700', colorBorder: 'border-cyan-200' },
    { color: 'bg-blue-500', colorLight: 'bg-blue-50', colorText: 'text-blue-700', colorBorder: 'border-blue-200' },
    { color: 'bg-orange-500', colorLight: 'bg-orange-50', colorText: 'text-orange-700', colorBorder: 'border-orange-200' },
    { color: 'bg-red-500', colorLight: 'bg-red-50', colorText: 'text-red-700', colorBorder: 'border-red-200' },
    { color: 'bg-purple-500', colorLight: 'bg-purple-50', colorText: 'text-purple-700', colorBorder: 'border-purple-200' },
];

const interventionIcons = [
    <Droplets className="w-5 h-5 text-cyan-600" />,
    <Heart className="w-5 h-5 text-red-600" />,
    <GraduationCap className="w-5 h-5 text-blue-600" />,
    <HeartHandshake className="w-5 h-5 text-purple-600" />,
    <Users className="w-5 h-5 text-green-600" />,
    <AlertTriangle className="w-5 h-5 text-orange-600" />,
];

// Map backend event types to local category slugs
const categorySlugMap: Record<string, string> = {
  CLEAN_WATER: 'clean-water',
  HEALTHCARE: 'healthcare',
  SCHOLARSHIP: 'education',
  WOMEN_MOTHERS: 'women-mothers',
  COMMUNITY_RELIEF: 'community-relief',
};

const categoryImages: Record<string, string> = {
  'clean-water': '/assets/focus communities/boreholes drilled.png',
  'healthcare': '/assets/focus communities/mobile clinics.png',
  'education': '/assets/focus communities/scholarships.png',
  'women-mothers': '/assets/focus communities/beneficiaries.png',
  'community-relief': '/assets/focus communities/families.png',
};

interface OutreachEvent {
  id: string;
  title: string;
  titleFr: string | null;
  description: string | null;
  descriptionFr: string | null;
  type: string;
  status: string;
  gallery?: any;
}

const FocusCommunities = () => {
    const { t, i18n } = useTranslation();
    const isFr = i18n.language === 'fr';

    const [events, setEvents] = useState<OutreachEvent[]>([]);
    const [loading, setLoading] = useState(true);

    const regionCards = t('focus_communities.region_cards', { returnObjects: true }) as any[];
    const interventionsList = t('focus_communities.interventions_list', { returnObjects: true }) as any[];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'https://backend-production-e10c8.up.railway.app';
                const res = await fetch(`${API_URL}/api/v1/public/events`);
                const data = await res.json();
                setEvents(data);
            } catch (err) {
                console.error('Failed to load events:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    // Filter events into dynamic categories
    const categoriesToShow: any[] = [];
    const customInitiatives: OutreachEvent[] = [];

    // Group active events
    const groupedEvents: Record<string, OutreachEvent[]> = {};
    events.forEach(event => {
      if (!groupedEvents[event.type]) {
        groupedEvents[event.type] = [];
      }
      groupedEvents[event.type].push(event);
    });

    // 1. Process default categories based on active events
    const defaultInterventions = t('focus_communities.interventions', { returnObjects: true }) as any[];
    defaultInterventions.forEach(item => {
      // Find matching type for the slug
      const matchingType = Object.keys(categorySlugMap).find(key => categorySlugMap[key] === item.slug);
      const activeEventsForCategory = matchingType ? groupedEvents[matchingType] : [];
      
      // ONLY show if there is at least one active event created by the manager!
      if (activeEventsForCategory && activeEventsForCategory.length > 0) {
        categoriesToShow.push({
          ...item,
          events: activeEventsForCategory,
          image: categoryImages[item.slug] || '/assets/focus communities/focus community.png',
        });
      }
    });

    // 2. Process custom / new categories
    Object.keys(groupedEvents).forEach(type => {
      const isDefault = Object.keys(categorySlugMap).includes(type);
      if (!isDefault) {
        // This is a custom category defined by the manager
        groupedEvents[type].forEach(event => {
          customInitiatives.push(event);
        });
      }
    });

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ── HERO ── */}
            <section className="relative pt-40 pb-24 overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url('/assets/focus communities/focus community.png')` }}>
                <div className="absolute inset-0 bg-black/35" />
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <FadeIn direction="up">
                        <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6 text-center">
                            {t('focus_communities.hero_title')}
                        </h1>
                    </FadeIn>
                </div>
            </section>

            {/* ── KEY INTERVENTIONS (IMAGE + DESCRIPTION STACK) ── */}
            <section className="py-12 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
                    {loading ? (
                        <div className="text-center py-10 text-slate-500 font-bold">{isFr ? 'Chargement des initiatives...' : 'Loading initiatives...'}</div>
                    ) : categoriesToShow.length === 0 && customInitiatives.length === 0 ? (
                        <div className="text-center py-16 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                            <Sparkles className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                            <h3 className="font-bold text-lg text-slate-600 mb-1">{isFr ? 'Aucune initiative active' : 'No Active Initiatives'}</h3>
                            <p className="text-sm max-w-sm mx-auto">{isFr ? "Notre responsable de l'aide sociale n'a pas encore répertorié d'initiatives de soutien." : 'Our outreach manager has not listed any active support campaigns yet.'}</p>
                        </div>
                    ) : (
                        categoriesToShow.map((item: any) => (
                            <FadeIn key={item.slug} direction="up">
                                <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:min-h-64 border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-full lg:w-1/2 flex-shrink-0">
                                        <div className="w-full h-full min-h-[220px] overflow-hidden">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
                                        <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                                          {item.events.length} {item.events.length > 1 ? (isFr ? 'événements actifs' : 'active events') : (isFr ? 'événement actif' : 'active event')}
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-3">
                                            <Link to={`/focus-communities/${item.slug}`} className="underline hover:text-green-600">{item.title}</Link>
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed text-sm mb-4">{item.desc}</p>
                                        
                                        <div className="space-y-2 mt-2">
                                          <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{isFr ? 'Campagnes actives :' : 'Active Campaigns:'}</div>
                                          {item.events.map((ev: OutreachEvent) => (
                                            <Link key={ev.id} to={`/focus-communities/${item.slug}`} className="block text-sm font-bold text-green-600 hover:underline">
                                              → {isFr && ev.titleFr ? ev.titleFr : ev.title}
                                            </Link>
                                          ))}
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))
                    )}
                </div>
            </section>

            {/* ── CUSTOM DYNAMIC INITIATIVES (Created on the fly) ── */}
            {!loading && customInitiatives.length > 0 && (
              <section className="py-16 bg-slate-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                  <FadeIn direction="up" className="text-center mb-10">
                    <span className="text-green-600 font-bold text-xs uppercase tracking-widest block mb-2">{isFr ? 'Autres initiatives' : 'Other Campaigns'}</span>
                    <h2 className="text-slate-900 font-black text-3xl md:text-4xl">{isFr ? 'Initiatives Actives Supplémentaires' : 'Additional Active Initiatives'}</h2>
                    <p className="text-slate-500 text-sm max-w-xl mx-auto mt-2">{isFr ? 'Découvrez des campagnes de secours créées sur mesure par notre équipe.' : 'Discover custom relief campaigns created on the fly by our outreach team.'}</p>
                  </FadeIn>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {customInitiatives.map((ev, i) => {
                      const typeSlug = ev.type.toLowerCase().replace(/_/g, '-');
                      const galleryArr = ev.gallery as any[];
                      const coverImage = galleryArr && galleryArr.length > 0 ? galleryArr[0].url : '/assets/focus communities/focus community.png';
                      return (
                        <FadeIn key={ev.id} direction="up" delay={i * 0.08}>
                          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                            <div className="h-48 overflow-hidden bg-slate-100 relative">
                              <img src={coverImage} alt={ev.title} className="w-full h-full object-cover" />
                              <span className="absolute top-4 left-4 bg-green-600 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full">
                                {ev.type.replace(/_/g, ' ')}
                              </span>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                              <div>
                                <h3 className="font-black text-slate-900 text-lg mb-2">{isFr && ev.titleFr ? ev.titleFr : ev.title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 mb-4">{isFr && ev.descriptionFr ? ev.descriptionFr : ev.description}</p>
                              </div>
                              <Link to={`/focus-communities/${typeSlug}`} className="text-green-600 font-bold text-xs hover:underline uppercase tracking-widest mt-2 block">
                                {isFr ? 'En savoir plus' : 'Learn More'} &rarr;
                              </Link>
                            </div>
                          </div>
                        </FadeIn>
                      );
                    })}
                  </div>
                </div>
              </section>
            )}

            {/* ── INTERACTIVE MAP ── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Left: Map */}
                        <FadeIn direction="right">
                            <div>
                                <span className="text-green-600 font-bold text-xs uppercase tracking-widest block mb-3">{t('focus_communities.map_label')}</span>
                                <h2 className="text-slate-900 font-black text-3xl md:text-4xl mb-3">
                                    {t('focus_communities.map_title')}
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                                    {t('focus_communities.map_desc')}
                                </p>
                                <CameroonMap />
                            </div>
                        </FadeIn>

                        {/* Right: What we do */}
                        <FadeIn direction="left">
                            <div className="space-y-5">
                                <span className="text-green-600 font-bold text-xs uppercase tracking-widest block">{t('focus_communities.intervention_types_label')}</span>
                                <h2 className="text-slate-900 font-black text-3xl md:text-4xl mb-6">
                                    {t('focus_communities.intervention_types_title')}
                                </h2>
                                {interventionsList.map((item: any, idx: number) => (
                                    <motion.div
                                        key={item.title}
                                        whileHover={{ x: 4 }}
                                        className="flex items-start gap-4 p-4 rounded-2xl hover:bg-green-50 transition-colors group cursor-default"
                                    >
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-shadow">
                                            {interventionIcons[idx]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm mb-0.5">{item.title}</h4>
                                            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── REGION CARDS ── */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <FadeIn direction="up" className="text-center mb-14">
                        <span className="text-green-600 font-bold text-xs uppercase tracking-widest block mb-3">{t('focus_communities.regions_label')}</span>
                        <h2 className="text-slate-900 font-black text-4xl md:text-5xl mb-4">{t('focus_communities.regions_title')}</h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            {t('focus_communities.regions_desc')}
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {regionCards.map((region: any, i: number) => {
                            const colors = regionColors[i] || regionColors[0];
                            return (
                                <FadeIn key={region.name} direction="up" delay={i * 0.08}>
                                    <motion.div
                                        whileHover={{ y: -4 }}
                                        className={`rounded-3xl overflow-hidden transition-all duration-500`}
                                    >
                                        {/* Card Header */}
                                        <div className={`${colors.colorLight} p-6 border-b ${colors.colorBorder}`}>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className={`w-10 h-10 rounded-xl ${colors.color} text-white flex items-center justify-center`}>
                                                    {regionIconMap[i]}
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-slate-900 text-base">{region.name}</h3>
                                                    <div className={`flex items-center gap-1 text-xs font-semibold ${colors.colorText}`}>
                                                        <MapPin className="w-3 h-3" />{region.city}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className={`text-xs font-bold ${colors.colorText} flex items-center gap-1.5`}>
                                                <CheckCircle className="w-3.5 h-3.5" /> {region.stat}
                                            </p>
                                        </div>
                                        {/* Card Body */}
                                        <div className="p-6">
                                            <p className="text-slate-500 text-sm leading-relaxed mb-4">{region.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {region.tags.map((tag: string) => (
                                                    <span key={tag} className={`px-2.5 py-1 ${colors.colorLight} ${colors.colorText} text-[10px] font-bold rounded-full border ${colors.colorBorder}`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-20 relative overflow-hidden bg-center bg-cover" style={{ backgroundImage: `url('/assets/charity/Ready to Make a Difference.png')` }}>
                <div className="absolute inset-0 bg-black/35" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <FadeIn direction="up">
                        <h2 className="text-white font-black text-4xl md:text-5xl mb-6">
                            {t('focus_communities.cta_title')}
                        </h2>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to="/donate" className="no-underline bg-white text-green-700 font-bold px-10 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-xl">
                                {t('focus_communities.cta_donate')}
                            </Link>
                            <Link to={ACTION_LINKS.reportCase} className="no-underline border-2 border-white text-white font-bold px-10 py-4 rounded-xl hover:bg-white/10 transition-colors">
                                {t('focus_communities.cta_report')}
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FocusCommunities;
