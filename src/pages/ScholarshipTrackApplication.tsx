import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import { useTranslation } from 'react-i18next';

interface Scholarship {
  id: string;
  title: string;
  titleFr: string | null;
  description: string | null;
  descriptionFr: string | null;
  targetSchools: string[];
  status: string;
}

const ScholarshipTrackApplication = () => {
    const { track } = useParams();
    const { i18n } = useTranslation();
    const isFr = i18n.language === 'fr';

    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/v1\/?$/, '') : 'https://api.enakoos.com';
                const res = await fetch(`${baseUrl}/api/v1/public/scholarships`);
                const data = await res.json();
                setScholarships(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchScholarships();
    }, []);

    // Helper text depending on the URL track if they navigated from a specific program track
    const trackLabels = {
        primary: isFr ? 'Bourses Primaire' : 'Primary Scholarships',
        secondary: isFr ? 'Bourses Secondaire' : 'Secondary Scholarships',
        university: isFr ? 'Bourses Universitaires' : 'University Scholarships'
    };
    
    // Default title if no track or generic
    const pageTitle = track && trackLabels[track as keyof typeof trackLabels] 
        ? trackLabels[track as keyof typeof trackLabels] 
        : (isFr ? 'Bourses Actives' : 'Active Scholarships');

    return (
        <div className="min-h-screen flex flex-col font-body text-primary bg-background overflow-hidden selection:bg-accent selection:text-white">
            <Navbar />
            
            <main className="flex-grow pt-32 pb-20 relative">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-1/2 h-[500px] bg-accent/5 rounded-bl-[100px] -z-10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-[400px] bg-blue-100/30 rounded-tr-[100px] -z-10 blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h1 className="font-display text-4xl md:text-5xl font-black text-primary mb-6">
                                {pageTitle}
                            </h1>
                            <p className="text-lg text-secondary max-w-2xl mx-auto">
                                {isFr 
                                    ? "Découvrez et postulez aux bourses actuellement disponibles. Cliquez sur une bourse pour voir les détails, les écoles ciblées et soumettre votre candidature."
                                    : "Discover and apply for currently available scholarships. Click on a scholarship to see full details, targeted schools, and submit your application."}
                            </p>
                        </div>
                    </FadeIn>

                    {loading ? (
                        <div className="text-center py-20">
                            <p className="text-secondary font-display text-xl animate-pulse">Loading active scholarships...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {scholarships.length === 0 ? (
                                <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-outline-variant/30 shadow-sm">
                                    <h3 className="font-display text-2xl font-bold text-primary mb-4">
                                        {isFr ? 'Aucune bourse disponible' : 'No scholarships available'}
                                    </h3>
                                    <p className="text-secondary">
                                        {isFr ? 'Il n\'y a actuellement aucune bourse ouverte aux candidatures. Veuillez vérifier ultérieurement.' : 'There are currently no scholarships open for applications. Please check back later.'}
                                    </p>
                                </div>
                            ) : (
                                scholarships.map((scholarship) => {
                                    const title = isFr && scholarship.titleFr ? scholarship.titleFr : scholarship.title;
                                    const description = isFr && scholarship.descriptionFr ? scholarship.descriptionFr : scholarship.description;
                                    
                                    return (
                                        <FadeIn key={scholarship.id}>
                                            <div className="bg-white rounded-3xl p-8 border border-outline-variant/30 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col group">
                                                <div className="flex-grow">
                                                    <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold mb-4">
                                                        {isFr ? 'OUVERT' : 'OPEN'}
                                                    </div>
                                                    <h3 className="font-display text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                                                        {title}
                                                    </h3>
                                                    <p className="text-secondary line-clamp-3 mb-6">
                                                        {description}
                                                    </p>
                                                </div>
                                                
                                                <div className="mt-auto">
                                                    {scholarship.targetSchools && scholarship.targetSchools.length > 0 && (
                                                        <div className="mb-6">
                                                            <p className="text-sm font-bold text-primary mb-2">{isFr ? 'Écoles :' : 'Schools:'}</p>
                                                            <div className="flex flex-wrap gap-2">
                                                                {scholarship.targetSchools.slice(0, 3).map((school, i) => (
                                                                    <span key={i} className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded border border-blue-100">
                                                                        {school}
                                                                    </span>
                                                                ))}
                                                                {scholarship.targetSchools.length > 3 && (
                                                                    <span className="text-xs px-2 py-1 bg-gray-50 text-gray-500 rounded border">
                                                                        +{scholarship.targetSchools.length - 3} {isFr ? 'plus' : 'more'}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    <Link 
                                                        to={`/scholarships/${scholarship.id}`} 
                                                        className="block w-full text-center bg-primary text-white py-3 rounded-xl font-bold hover:bg-accent transition-colors"
                                                    >
                                                        {isFr ? 'Voir les Détails & Postuler' : 'View Details & Apply'}
                                                    </Link>
                                                </div>
                                            </div>
                                        </FadeIn>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ScholarshipTrackApplication;
