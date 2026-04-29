import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';

const requirementDetails: Record<string, { title: string; body: string[] }> = {
    'financial-need': {
        title: 'Proof of Financial Need',
        body: [
            'Provide any available household income evidence or a signed declaration from a local authority.',
            'If formal income documents are unavailable, submit a short explanation letter signed by parent/guardian.',
            'This helps our team prioritize applicants with the highest need.',
        ],
    },
    'academic-record': {
        title: 'Academic Record Requirement',
        body: [
            'Upload the latest report card, transcript, or official result slip from the school.',
            'The document must include student name, class/level, and school details.',
            'Scanned copies or clear phone photos are accepted.',
        ],
    },
    'school-reference': {
        title: 'School Reference / Recommendation',
        body: [
            'A school recommendation confirms attendance, behavior, and academic commitment.',
            'It can be signed by head teacher, principal, or authorized school admin staff.',
            'Upload as PDF, JPG, or PNG.',
        ],
    },
    'guardian-id': {
        title: 'Parent or Guardian ID',
        body: [
            'Upload one valid ID document for the parent/guardian handling the application.',
            'Accepted: National ID, passport, voter card, or other government-issued ID.',
            'This is used only for verification during intake.',
        ],
    },
};

const RequirementDetail = () => {
    const { slug } = useParams();
    const item = useMemo(() => requirementDetails[slug ?? ''], [slug]);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={20} />
                <main className="relative z-10 pt-32 pb-20 px-6 md:px-12">
                    <div className="max-w-3xl mx-auto">
                        <Link to="/apply/scholarship" className="text-[#00C2C7] underline text-sm font-bold">Back to Scholarship Application</Link>
                        <h1 className="text-[#001F5B] text-3xl md:text-4xl font-black mt-4 mb-6">{item?.title ?? 'Requirement Information'}</h1>
                        <div className="space-y-4 text-slate-700 leading-relaxed">
                            {(item?.body ?? ['Details for this requirement are not available yet.']).map((line) => (
                                <p key={line}>{line}</p>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default RequirementDetail;
