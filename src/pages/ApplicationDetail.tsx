import { Link, useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FadeIn from '../components/FadeIn';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';

type ApplicationType = 'scholarship' | 'help' | 'report-case' | 'program-support';

const pageContent: Record<ApplicationType, {
    badge: string;
    title: string;
    image: string;
    description: string;
    points: string[];
    ctaLabel: string;
}> = {
    scholarship: {
        badge: 'Education Intake',
        title: 'Scholarship Application',
        image: '/assets/charity/scholarship.png',
        description: 'Apply for scholarship support and choose the exact academic track that matches the student profile.',
        points: [
            'Choose Primary, Secondary, or University track.',
            'Prepare school records and financial-need documents.',
            'Submit complete details for faster review.',
        ],
        ctaLabel: 'Continue to Scholarship Tracks',
    },
    help: {
        badge: 'Community Support',
        title: 'General Help Application',
        image: '/assets/charity/help.png',
        description: 'Request support for urgent needs affecting individuals, families, or local communities.',
        points: [
            'Describe the need clearly and briefly.',
            'Include exact location and contact details.',
            'Our response team reviews new requests weekly.',
        ],
        ctaLabel: 'Submit Help Request',
    },
    'report-case': {
        badge: 'Issue Reporting',
        title: 'Report a Community Case',
        image: '/assets/charity/report-community-issue.png',
        description: 'Report a specific community issue so the field team can validate and prioritize intervention.',
        points: [
            'Share the nearest town/landmark.',
            'State issue type: water, health, education, or emergency.',
            'Include a trusted local contact for verification.',
        ],
        ctaLabel: 'Submit Case Report',
    },
    'program-support': {
        badge: 'Programme Intake',
        title: 'Programme Support Application',
        image: '/assets/charity/our-expertize-in-action.png',
        description: 'Apply for support tied to a specific programme and share full context for beneficiaries.',
        points: [
            'Select and mention the target programme.',
            'Share beneficiary details and urgency level.',
            'Programme team contacts qualified requests directly.',
        ],
        ctaLabel: 'Submit Programme Request',
    },
};

const ApplicationDetail = () => {
    const { type } = useParams();
    const [searchParams] = useSearchParams();
    const applicationType = (type as ApplicationType) || 'help';
    const content = pageContent[applicationType] ?? pageContent.help;
    const programName = searchParams.get('program') ?? '';

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={30} />
                <main className="relative z-10 pt-32 pb-20 px-6 md:px-12">
                    <section className="max-w-6xl mx-auto">
                        <FadeIn direction="up">
                            <p className="text-[#00C2C7] text-xs font-bold uppercase tracking-widest">{content.badge}</p>
                            <h1 className="text-[#001F5B] text-3xl md:text-5xl font-black leading-tight mt-2 mb-5">{content.title}</h1>

                            <div className="grid lg:grid-cols-2 gap-8 items-start">
                                <div>
                                    <img src={content.image} alt={content.title} className="w-full max-w-[420px] aspect-square object-cover mb-6" />
                                </div>
                                <div className="max-w-xl">
                                    <p className="text-slate-600 leading-relaxed mb-6">{content.description}</p>
                                    {programName ? (
                                        <p className="text-sm text-slate-700 mb-5">
                                            Selected programme: <span className="font-bold text-[#001F5B]">{programName}</span>
                                        </p>
                                    ) : null}

                                    <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4 mb-6">
                                        {content.points.map((point) => (
                                            <li key={point}>{point}</li>
                                        ))}
                                    </ul>

                                    {applicationType === 'scholarship' ? (
                                        <div className="space-y-3">
                                            <Link to="/apply/scholarship/primary" className="block text-[#00C2C7] underline font-bold">
                                                Apply for Primary Scholarship
                                            </Link>
                                            <Link to="/apply/scholarship/secondary" className="block text-[#00C2C7] underline font-bold">
                                                Apply for Secondary Scholarship
                                            </Link>
                                            <Link to="/apply/scholarship/university" className="block text-[#00C2C7] underline font-bold">
                                                Apply for University Scholarship
                                            </Link>
                                        </div>
                                    ) : (
                                        <form className="form-shell space-y-4 max-w-3xl" onSubmit={(e) => e.preventDefault()}>
                                            <div className="grid md:grid-cols-2 gap-3">
                                                <input className="h-11 px-4 border border-slate-200 text-[#001F5B]" placeholder="Full name" />
                                                <input className="h-11 px-4 border border-slate-200 text-[#001F5B]" placeholder="Email address" />
                                                <input className="h-11 px-4 border border-slate-200 text-[#001F5B]" placeholder="Phone number" />
                                                <input className="h-11 px-4 border border-slate-200 text-[#001F5B]" placeholder="City / Region" />
                                            </div>
                                            <textarea rows={5} className="w-full p-4 border border-slate-200 text-[#001F5B] resize-none" placeholder="Describe your request..." />
                                            <button type="submit" className="h-11 px-5 bg-[#00C2C7] text-[#001F5B] font-bold hover:bg-[#0099A1] transition-colors">
                                                {content.ctaLabel}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </FadeIn>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ApplicationDetail;
