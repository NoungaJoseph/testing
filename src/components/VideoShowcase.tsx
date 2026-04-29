import { Play, ArrowRight, Video } from 'lucide-react';
import FadeIn from './FadeIn';

const videos = [
    {
        title: "Building Futures in Lagos",
        duration: "3:45",
        thumbnail: "/assets/charity/our-expertize-in-action.png",
        category: "Community Impact"
    },
    {
        title: "Teacher Excellence 2024",
        duration: "2:15",
        thumbnail: "/assets/charity/our-expertize-in-action.png",
        category: "Foundation Programs"
    },
    {
        title: "Scholarship Journey",
        duration: "5:30",
        thumbnail: "/assets/charity/our-expertize-in-action.png",
        category: "Success Stories"
    }
];

const VideoShowcase = () => {
    return (
        <section className="bg-white py-32 px-6 md:px-12 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-20">
                    <FadeIn direction="up">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-50 border border-slate-100 text-secondary text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-sm">
                            <Video className="w-3 h-3" /> Cinematic Gallery
                        </div>
                        <h2 className="text-navy text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter mb-8">
                            Our Story in <br />
                            <span className="text-secondary ">Motion.</span>
                        </h2>
                        <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                            Experience the real-world impact of our initiatives through the eyes of those we serve.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {videos.map((video, i) => (
                        <FadeIn key={video.title} delay={i * 0.1} direction="up" fullWidth>
                            <div className="group relative flex flex-col gap-6 h-full">
                                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/10 transition-all duration-700" />

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 group-hover:bg-secondary group-hover:border-secondary transition-all duration-500 shadow-2xl">
                                            <Play className="w-6 h-6 fill-current ml-1" />
                                        </button>
                                    </div>

                                    <div className="absolute bottom-6 right-6 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black tracking-widest uppercase border border-white/10">
                                        {video.duration}
                                    </div>
                                </div>
                                <div className="px-2 space-y-2">
                                    <p className="text-secondary text-[10px] font-black uppercase tracking-[0.2em]">{video.category}</p>
                                    <h3 className="text-navy text-2xl font-black tracking-tight leading-tight">{video.title}</h3>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn direction="up" className="mt-20 flex justify-center">
                    <button className="inline-flex items-center gap-4 px-12 py-5 border border-slate-200 bg-white text-navy font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-navy hover:text-white transition-all group shadow-sm hover:shadow-xl">
                        Enter Video Library <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                </FadeIn>
            </div>
        </section>
    );
};

export default VideoShowcase;
