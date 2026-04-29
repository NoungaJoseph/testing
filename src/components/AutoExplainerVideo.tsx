import { Play, Sparkles } from 'lucide-react';
import FadeIn from './FadeIn';

const AutoExplainerVideo = () => {
    return (
        <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden group">
            {/* Background Video (Muted Auto-play) */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-[3000ms]"
                >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-african-children-standing-together-34505-large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-navy/40 backdrop-blur-[2px] transition-all duration-700 group-hover:bg-navy/30 group-hover:backdrop-blur-none" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
                <FadeIn direction="up">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-secondary/20 backdrop-blur-xl border border-secondary/40 text-secondary text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-2xl">
                        <Sparkles className="w-3 h-3" /> Leading with Heart
                    </div>
                    <h2 className="text-white text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8 max-w-4xl">
                        A Legacy of <br />
                        <span className="text-secondary ">Hope Redefined.</span>
                    </h2>
                    <p className="text-slate-200 text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-12 opacity-90">
                        At Enako Outreach, we don't just provide resources; we co-create sustainable ecosystems for growth, education, and health across the African continent.
                    </p>
                    <button className="group relative flex items-center gap-4 px-12 py-5 bg-secondary rounded-2xl text-navy font-black text-xs uppercase tracking-[0.2em] hover:bg-[#00a8ae] hover:text-white transition-all duration-500 shadow-2xl shadow-secondary/40">
                        <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-white/30">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                        </div>
                        Watch Our Story
                    </button>
                </FadeIn>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-light to-transparent z-20" />
        </section>
    );
};

export default AutoExplainerVideo;
