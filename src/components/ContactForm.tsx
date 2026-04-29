import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GOLD_UNDERLINE_LINK_CLASS } from '../constants/actionLinks';

const intentContent: Record<string, { title: string; hint: string; placeholder: string }> = {
    'general-help': {
        title: 'Help Application',
        hint: 'You are on the direct help-application form.',
        placeholder: 'Please describe your need, location, and urgency level.',
    },
    scholarship: {
        title: 'Scholarship Application',
        hint: 'You are on the direct scholarship-application form.',
        placeholder: 'Please share student details, academic level, and support needed.',
    },
    'report-case': {
        title: 'Community Case Report',
        hint: 'You are on the direct case-report form.',
        placeholder: 'Please describe the issue, community name, and contact person.',
    },
    'program-support': {
        title: 'Programme Support Application',
        hint: 'You are on the direct programme application form.',
        placeholder: 'Please explain the programme support request and beneficiary details.',
    },
};

const ContactForm = () => {
    const [searchParams] = useSearchParams();
    const intent = searchParams.get('intent') ?? '';
    const selectedContent = useMemo(() => intentContent[intent], [intent]);

    return (
        <section id="contact-form" className="bg-transparent dark:bg-background-dark py-12 px-6 md:px-12 mb-40">
            <div className="max-w-6xl mx-auto">
                {selectedContent && (
                    <div className="mb-8 rounded-2xl border border-[#00C2C7]/35 bg-[#00C2C7]/10 p-5">
                        <p className="text-sm font-black uppercase tracking-widest text-[#00C2C7] mb-1">{selectedContent.title}</p>
                        <p className="text-sm text-slate-700">
                            {selectedContent.hint}{' '}
                            <span className={GOLD_UNDERLINE_LINK_CLASS}>Share this page link directly.</span>
                        </p>
                    </div>
                )}
                <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-6 md:gap-8">
                    <div className="flex items-center justify-center md:w-96 md:h-96">
                        <div className="w-full h-full rounded-xl overflow-hidden">
                            <img src="/assets/charity/contact us/ccc.png" alt="ccc" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="md:w-96 md:h-96 w-full">
                        <form className="form-shell space-y-6 bg-white dark:bg-slate-800 h-full flex flex-col justify-between">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1 font-display">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full px-6 py-4 rounded-xl bg-white dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary text-navy dark:text-white transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1 font-display">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="hello@company.com"
                                    className="w-full px-6 py-4 rounded-xl bg-white dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary text-navy dark:text-white transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider pl-1 font-display">Message</label>
                                <textarea
                                    rows={6}
                                    placeholder={selectedContent?.placeholder ?? 'How can we help?'}
                                    className="w-full px-6 py-4 rounded-xl bg-white dark:bg-slate-800 border-none focus:ring-2 focus:ring-secondary text-navy dark:text-white transition-all resize-none"
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full py-5 bg-secondary text-[#001F5B] font-black rounded-xl text-lg hover:brightness-110 active:scale-95 transition-all">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
