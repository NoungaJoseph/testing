import { Link } from 'react-router-dom';

import FadeIn from './FadeIn';

const TransparencySection = () => {
    return (
        <section className="py-20 px-6 lg:px-20 bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                {/* Image with overlay */}
                <div className="lg:w-1/2 w-full">
                    <FadeIn direction="right">
                        <div className="aspect-video w-full rounded-2xl overflow-hidden relative shadow-xl">
                            <img
                                src="/assets/charity/our-expertize-in-action.png"
                                alt="Community impact"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-navy  " />
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="text-xl font-bold">Goal: 120 Lives Targeted</p>
                                <p className="text-sm ">Annual report 2023 summary</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
                {/* Text */}
                <div className="lg:w-1/2 w-full">
                    <FadeIn direction="left" delay={0.2}>
                        <h2 className="text-navy text-3xl font-extrabold mb-6">Our work is guided by transparency and radical empathy.</h2>
                        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                            We believe that by providing the right tools—education, infrastructure, and healthcare—communities can build their own prosperous futures. Every dollar donated goes directly toward our program execution.
                        </p>
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <p className="text-secondary text-3xl font-extrabold">92%</p>
                                <p className="text-slate-500 text-sm font-medium">Funds to programs</p>
                            </div>
                            <div>
                                <p className="text-secondary text-3xl font-extrabold">1</p>
                                <p className="text-slate-500 text-sm font-medium">Country active</p>
                            </div>
                        </div>
                        <Link
                            to="/impact"
                            className="inline-flex items-center justify-center bg-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-navy transition-all"
                        >
                            Read Our Impact Report
                        </Link>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default TransparencySection;
