import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';

type TrackKey = 'primary' | 'secondary' | 'university';
type SchoolType = 'government' | 'private';

interface TrackContent {
    badge: string;
    title: string;
    heroImage: string;
    summary: string;
    eligibility: { text: string; learnMore: string }[];
    documents: { id: string; label: string; learnMore: string }[];
    timeline: string[];
    faqs: { q: string; a: string }[];
    schools: Record<SchoolType, string[]>;
}

const trackContent: Record<TrackKey, TrackContent> = {
    primary: {
        badge: 'Primary Track',
        title: 'Primary School Scholarship Application',
        heroImage: '/assets/updates/2.png',
        summary: 'For pupils in foundational classes who need early academic support, fees assistance, uniforms, and learning materials.',
        eligibility: [
            { text: 'Student currently enrolled in a recognized primary school.', learnMore: '/apply/requirements/academic-record' },
            { text: 'Family demonstrates financial need.', learnMore: '/apply/requirements/financial-need' },
            { text: 'School recommendation is required.', learnMore: '/apply/requirements/school-reference' },
        ],
        documents: [
            { id: 'reportCard', label: 'Upload latest report card', learnMore: '/apply/requirements/academic-record' },
            { id: 'guardianId', label: 'Upload parent/guardian ID', learnMore: '/apply/requirements/guardian-id' },
            { id: 'schoolLetter', label: 'Upload school recommendation letter', learnMore: '/apply/requirements/school-reference' },
        ],
        timeline: ['Stage 1: Form + document review.', 'Stage 2: School and guardian verification.', 'Stage 3: Final selection and onboarding.'],
        faqs: [
            { q: 'Can a guardian apply on behalf of the child?', a: 'Yes. Guardian details are required and must match uploaded ID.' },
            { q: 'Do we support uniform and books?', a: 'Yes, support packages may include uniforms and core learning materials.' },
            { q: 'Can schools submit multiple primary students?', a: 'Yes, schools can submit candidates through the school registration section below.' },
            { q: 'What if a student has no formal transcript?', a: 'A verified school result slip or class assessment record is accepted.' },
        ],
        schools: {
            government: [
                'Government Primary School Akwa - Douala',
                'Government Primary School Bonaberi - Douala',
                'Government Primary School Bafoussam Central',
                'Government Primary School Bamenda Town',
                'Government Primary School Molyko - Buea',
            ],
            private: [
                'St. Mary Primary School - Douala',
                'Bright Future Primary School - Yaounde',
                'Wisdom Gate Primary School - Bafoussam',
                'Kingdom Kids Primary School - Bamenda',
                'Gracefield Primary Academy - Buea',
            ],
        },
    },
    secondary: {
        badge: 'Secondary Track',
        title: 'Secondary School Scholarship Application',
        heroImage: '/assets/updates/4.png',
        summary: 'For secondary students requiring tuition support, exam preparation assistance, and structured academic mentoring.',
        eligibility: [
            { text: 'Student enrolled in lower or upper secondary school.', learnMore: '/apply/requirements/academic-record' },
            { text: 'Demonstrated financial need and academic commitment.', learnMore: '/apply/requirements/financial-need' },
            { text: 'Strong recommendation from school administration.', learnMore: '/apply/requirements/school-reference' },
        ],
        documents: [
            { id: 'transcript', label: 'Upload latest transcript/result', learnMore: '/apply/requirements/academic-record' },
            { id: 'guardianId', label: 'Upload parent/guardian ID', learnMore: '/apply/requirements/guardian-id' },
            { id: 'schoolLetter', label: 'Upload school recommendation', learnMore: '/apply/requirements/school-reference' },
        ],
        timeline: ['Stage 1: Application intake.', 'Stage 2: Eligibility and reference checks.', 'Stage 3: Award notification.'],
        faqs: [
            { q: 'Is this for both BEPC and GCE pathways?', a: 'Yes. Both pathways are reviewed under the same intake process.' },
            { q: 'Can boarding students apply?', a: 'Yes. Include boarding status and related cost details in your statement.' },
            { q: 'Can previous applicants reapply?', a: 'Yes, with updated results and current school recommendation.' },
            { q: 'Do you provide exam support materials?', a: 'Selected candidates may receive targeted exam prep support.' },
        ],
        schools: {
            government: [
                'Government Bilingual High School Akwa - Douala',
                'Government High School Bonaberi - Douala',
                'Government High School Bafoussam',
                'Government High School Bamenda',
                'Government Bilingual High School Molyko - Buea',
            ],
            private: [
                'St. Joseph College - Douala',
                'Progressive College - Yaounde',
                'Victory Secondary School - Bafoussam',
                'Hillside College - Bamenda',
                'Summit College - Buea',
            ],
        },
    },
    university: {
        badge: 'University Track',
        title: 'University Scholarship Application',
        heroImage: '/assets/updates/university.png',
        summary: 'For undergraduate students needing support with tuition, study materials, and guided transition into career pathways.',
        eligibility: [
            { text: 'Applicant admitted to or enrolled in an accredited university.', learnMore: '/apply/requirements/academic-record' },
            { text: 'Clear evidence of financial need.', learnMore: '/apply/requirements/financial-need' },
            { text: 'Academic recommendation or faculty reference provided.', learnMore: '/apply/requirements/school-reference' },
        ],
        documents: [
            { id: 'admission', label: 'Upload admission letter / registration proof', learnMore: '/apply/requirements/academic-record' },
            { id: 'transcript', label: 'Upload transcript / latest result', learnMore: '/apply/requirements/academic-record' },
            { id: 'guardianId', label: 'Upload parent/guardian ID or sponsor ID', learnMore: '/apply/requirements/guardian-id' },
        ],
        timeline: ['Stage 1: Screening.', 'Stage 2: Interview and reference validation.', 'Stage 3: Final grant list publication.'],
        faqs: [
            { q: 'Can first-year students apply?', a: 'Yes. Admission proof is required.' },
            { q: 'Can private universities apply?', a: 'Yes, if the institution is accredited.' },
            { q: 'Can continuing students apply?', a: 'Yes. Updated transcript and recommendation are required.' },
            { q: 'Do you support accommodation?', a: 'Support is based on available scholarship package and intake decisions.' },
        ],
        schools: {
            government: [
                'University of Douala',
                'University of Yaounde I',
                'University of Buea',
                'University of Bamenda',
                'University of Dschang',
            ],
            private: [
                'Catholic University of Central Africa',
                'ICT University - Yaounde',
                'Siantou University Institute',
                'HIT Polytechnic - Bamenda',
                'University Institute of the Gulf - Douala',
            ],
        },
    },
};

const ScholarshipTrackApplication = () => {
    const { track } = useParams();
    const selectedTrack = (track as TrackKey) || 'secondary';
    const content = useMemo(() => trackContent[selectedTrack] ?? trackContent.secondary, [selectedTrack]);
    const [schoolType, setSchoolType] = useState<SchoolType>('government');

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={25} />
                <main className="relative z-10 pt-32 pb-20 px-6 md:px-12">
                    <section className="max-w-6xl mx-auto">
                        <FadeIn direction="up">
                            <p className="text-[#00C2C7] text-xs font-bold uppercase tracking-widest mb-2">{content.badge}</p>
                            <h1 className="text-[#001F5B] text-3xl md:text-5xl font-black leading-tight mb-4">{content.title}</h1>
                            <p className="text-slate-600 leading-relaxed mb-6 max-w-3xl">{content.summary}</p>
                            <img src={content.heroImage} alt={content.title} className="w-full max-w-[420px] aspect-square object-cover mb-8" />
                            <div className="flex flex-wrap gap-4 text-sm">
                                <Link to="/apply/scholarship/primary" className="text-[#00C2C7] underline font-bold">Primary</Link>
                                <Link to="/apply/scholarship/secondary" className="text-[#00C2C7] underline font-bold">Secondary</Link>
                                <Link to="/apply/scholarship/university" className="text-[#00C2C7] underline font-bold">University</Link>
                            </div>
                        </FadeIn>

                        <section className="mt-12">
                            <h2 className="text-[#001F5B] text-2xl font-black mb-4">Eligibility</h2>
                            <ul className="space-y-4">
                                {content.eligibility.map((item) => (
                                    <li key={item.text} className="text-slate-700">
                                        {item.text}{' '}
                                        <Link to={item.learnMore} className="text-[#00C2C7] underline text-sm font-bold">
                                            Learn more
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="mt-12">
                            <h2 className="text-[#001F5B] text-2xl font-black mb-4">Application Timeline</h2>
                            <ul className="space-y-3 text-slate-700">
                                {content.timeline.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="mt-12 max-w-3xl">
                            <h2 className="text-[#001F5B] text-2xl font-black mb-5">Student Application Form</h2>
                            <form className="form-shell space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid md:grid-cols-2 gap-3">
                                    <input className="h-11 px-4 bg-white border border-slate-200 text-[#001F5B]" placeholder="Student full name" required />
                                    <input className="h-11 px-4 bg-white border border-slate-200 text-[#001F5B]" placeholder="Parent/Guardian full name" required />
                                    <input type="email" className="h-11 px-4 bg-white border border-slate-200 text-[#001F5B]" placeholder="Email address" required />
                                    <input className="h-11 px-4 bg-white border border-slate-200 text-[#001F5B]" placeholder="Phone number" required />
                                </div>

                                <div className="grid md:grid-cols-2 gap-3">
                                    <select
                                        className="h-11 px-4 bg-white border border-slate-200 text-[#001F5B]"
                                        value={schoolType}
                                        onChange={(e) => setSchoolType(e.target.value as SchoolType)}
                                    >
                                        <option value="government">Government School</option>
                                        <option value="private">Private School</option>
                                    </select>
                                    <select className="h-11 px-4 bg-white border border-slate-200 text-[#001F5B]" required>
                                        <option value="">Select school</option>
                                        {content.schools[schoolType].map((school) => (
                                            <option key={school} value={school}>
                                                {school}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <textarea rows={4} className="w-full p-4 bg-white border border-slate-200 text-[#001F5B] resize-none" placeholder="Scholarship statement and need summary..." required />

                                <div className="pt-2">
                                    <h3 className="text-[#001F5B] text-lg font-black mb-3">Required Documents</h3>
                                    <div className="space-y-3">
                                        {content.documents.map((doc) => (
                                            <div key={doc.id}>
                                                <label className="block text-sm text-slate-700 mb-1">{doc.label}</label>
                                                <input type="file" className="block w-full text-sm text-slate-600 file:mr-4 file:px-3 file:py-2 file:border-0 file:bg-[#001F5B] file:text-white" required />
                                                <Link to={doc.learnMore} className="text-[#00C2C7] underline text-xs font-bold">Learn more about this document</Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button type="submit" className="h-11 px-6 bg-[#00C2C7] text-[#001F5B] font-bold">
                                    Submit Scholarship Application
                                </button>
                            </form>
                        </section>

                        <section className="mt-16 max-w-3xl bg-slate-50 border border-slate-200 p-6 md:p-8">
                            <h2 className="text-[#001F5B] text-2xl font-black mb-3">School Partnership Registration</h2>
                            <p className="text-slate-600 mb-4">
                                This registration now has a dedicated page for schools and education partners.
                            </p>
                            <Link to="/school-registration" className="inline-flex items-center h-11 px-6 bg-[#001F5B] text-white font-bold">
                                Go to School Partnership Registration
                            </Link>
                        </section>

                        <section className="mt-16 max-w-4xl">
                            <h2 className="text-[#001F5B] text-2xl font-black mb-4">Frequently Asked Questions</h2>
                            <div className="space-y-3">
                                {content.faqs.map((item) => (
                                    <details key={item.q} className="group">
                                        <summary className="cursor-pointer text-[#001F5B] font-bold py-2">{item.q}</summary>
                                        <p className="text-slate-600 pb-2">{item.a}</p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ScholarshipTrackApplication;
