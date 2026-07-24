import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  customFields?: any[];
}

const ScholarshipDetail = () => {
    const { id } = useParams();
    const { i18n } = useTranslation();
    const isFr = i18n.language === 'fr';

    const [scholarship, setScholarship] = useState<Scholarship | null>(null);
    const [loading, setLoading] = useState(true);
    const [isComplete, setIsComplete] = useState(false);
    
    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [school, setSchool] = useState('');
    const [documentBase64, setDocumentBase64] = useState<string | null>(null);

    const [customFormData, setCustomFormData] = useState<Record<string, any>>({});
    
    useEffect(() => {
        const fetchScholarship = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'https://api.enakoos.com';
                const res = await fetch(`${API_URL}/api/v1/public/scholarships/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setScholarship(data);
                } else {
                    setScholarship(null);
                }
            } catch (err) {
                console.error(err);
                setScholarship(null);
            } finally {
                setLoading(false);
            }
        };
        fetchScholarship();
    }, [id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Document must be under 5MB.');
                e.target.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => setDocumentBase64(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleCustomFieldFile = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Document must be under 5MB.');
                e.target.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setCustomFormData(prev => ({
                    ...prev,
                    [fieldName]: { fileName: file.name, base64: reader.result as string }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const submitApplication = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'https://api.enakoos.com';
            
            const dynamicDocuments: string[] = [];
            const customDetails: Record<string, string> = {};
            
            Object.entries(customFormData).forEach(([key, val]) => {
                if (typeof val === 'object' && val.base64) {
                    dynamicDocuments.push(val.base64);
                    customDetails[key] = `Uploaded File: ${val.fileName}`;
                } else {
                    customDetails[key] = val;
                }
            });

            const allDocs = documentBase64 ? [documentBase64, ...dynamicDocuments] : dynamicDocuments;

            const payload = {
                type: 'SCHOLARSHIP',
                eventId: id,
                applicantName: name,
                email,
                phone,
                details: { targetSchool: school, ...customDetails },
                documents: allDocs
            };

            const response = await fetch(`${API_URL}/api/v1/outreach/applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to submit');
            setIsComplete(true);
        } catch (err) {
            alert('Failed to submit application. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col font-body text-primary bg-background overflow-hidden selection:bg-accent selection:text-white">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-secondary font-display text-xl animate-pulse">Loading scholarship details...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!scholarship) {
        return (
            <div className="min-h-screen flex flex-col font-body text-primary bg-background overflow-hidden selection:bg-accent selection:text-white">
                <Navbar />
                <div className="flex-grow flex items-center justify-center p-6 text-center">
                    <div>
                        <h2 className="font-display text-3xl font-bold mb-4">Scholarship Not Found</h2>
                        <p className="text-secondary mb-6">This scholarship might have expired or does not exist.</p>
                        <Link to="/programs" className="bg-primary text-white px-6 py-3 rounded-full font-bold">View Programs</Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const title = isFr && scholarship.titleFr ? scholarship.titleFr : scholarship.title;
    const description = isFr && scholarship.descriptionFr ? scholarship.descriptionFr : scholarship.description;

    return (
        <div className="min-h-screen flex flex-col font-body text-primary bg-background overflow-hidden selection:bg-accent selection:text-white">
            <Navbar />
            
            <main className="flex-grow pt-32 pb-20 relative">
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <Link to="/apply/scholarship" className="text-accent underline font-bold mb-6 inline-block">&larr; {isFr ? 'Retour aux Bourses' : 'Back to Scholarships'}</Link>
                    
                    <FadeIn>
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-outline-variant/30 mb-12">
                            <h1 className="font-display text-4xl md:text-5xl font-black text-primary mb-6">{title}</h1>
                            <p className="text-lg text-secondary leading-relaxed mb-8">{description}</p>
                            
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-8">
                                <h3 className="font-display font-bold text-xl mb-4 text-blue-900">{isFr ? 'Écoles Cibles' : 'Target Schools'}</h3>
                                {scholarship.targetSchools && scholarship.targetSchools.length > 0 ? (
                                    <ul className="list-disc list-inside space-y-2 text-blue-800">
                                        {scholarship.targetSchools.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                ) : (
                                    <p className="text-blue-800 italic">{isFr ? 'Ouvert à toutes les écoles' : 'Open to all schools'}</p>
                                )}
                            </div>

                            {isComplete ? (
                                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                                    <h3 className="font-display font-bold text-2xl text-green-800 mb-4">{isFr ? 'Candidature Soumise !' : 'Application Submitted!'}</h3>
                                    <p className="text-green-700">{isFr ? 'Nous avons reçu votre candidature avec succès. Nous vous contacterons bientôt.' : 'We have successfully received your application. We will contact you soon.'}</p>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="font-display font-bold text-2xl mb-6 border-b pb-4">{isFr ? 'Formulaire de Candidature' : 'Application Form'}</h3>
                                    <form onSubmit={submitApplication} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block font-semibold mb-2">{isFr ? 'Nom Complet' : 'Full Name'}</label>
                                                <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full bg-background border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent" />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-2">{isFr ? 'Email' : 'Email Address'}</label>
                                                <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full bg-background border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block font-semibold mb-2">{isFr ? 'Téléphone' : 'Phone Number'}</label>
                                                <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="w-full bg-background border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent" />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-2">{isFr ? 'École Cible' : 'Target School'}</label>
                                                {scholarship.targetSchools && scholarship.targetSchools.length > 0 ? (
                                                    <select required value={school} onChange={e => setSchool(e.target.value)} className="w-full bg-background border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent">
                                                        <option value="">{isFr ? '-- Sélectionnez votre école --' : '-- Select your school --'}</option>
                                                        {scholarship.targetSchools.map((s, i) => (
                                                            <option key={i} value={s}>{s}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input required value={school} onChange={e => setSchool(e.target.value)} type="text" className="w-full bg-background border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent" />
                                                )}
                                            </div>
                                        </div>
                                        {scholarship.customFields && scholarship.customFields.map((field: any, idx: number) => (
                                            <div key={idx}>
                                                <label className="block font-semibold mb-2">{field.label} {field.required && '*'}</label>
                                                {field.type === 'file' ? (
                                                    <input 
                                                        required={field.required}
                                                        type="file" 
                                                        accept=".pdf,image/*" 
                                                        onChange={e => handleCustomFieldFile(e, field.name)} 
                                                        className="w-full bg-background border border-outline-variant rounded-xl px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/90" 
                                                    />
                                                ) : (
                                                    <input 
                                                        required={field.required}
                                                        type="text" 
                                                        value={customFormData[field.name] || ''}
                                                        onChange={e => setCustomFormData({...customFormData, [field.name]: e.target.value})}
                                                        className="w-full bg-background border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent" 
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        <div>
                                            <label className="block font-semibold mb-2">{isFr ? 'Documents Justificatifs Généraux (Optionnel)' : 'General Supporting Documents (Optional)'}</label>
                                            <input type="file" accept=".pdf,image/*" onChange={handleFileChange} className="w-full bg-background border border-outline-variant rounded-xl px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/90" />
                                        </div>
                                        <div className="pt-4">
                                            <button type="submit" className="w-full bg-primary text-white rounded-xl py-4 font-bold text-lg hover:bg-primary/90 transition-colors shadow-xl">
                                                {isFr ? 'Soumettre la Candidature' : 'Submit Application'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </FadeIn>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default ScholarshipDetail;
