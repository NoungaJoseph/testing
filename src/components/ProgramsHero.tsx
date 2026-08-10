import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const ProgramsHero = () => {
    const { t } = useTranslation();
    const pillarsT = t('programs.hero.pillars', { returnObjects: true }) as any[];

    return (
        <>
            {/* HERO BANNER — Donate page style */}
            <section
                style={{
                    position: 'relative',
                    width: '100%',
                    height: 'clamp(460px, 68vh, 640px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    overflow: 'hidden',
                    marginTop: 0,
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage:
                            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('/assets/images/new_assets/story_student.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 30%',
                    }}
                />

                {/* Breadcrumb */}
                <div
                    style={{
                        position: 'absolute',
                        top: '9.5rem',
                        left: '2.5rem',
                        color: 'rgba(255,255,255,0.82)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em',
                        zIndex: 2,
                    }}
                >
                    <Link to="/" style={{ color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}>Home</Link>
                    <span style={{ margin: '0 0.4rem', fontSize: '0.6rem' }}>♦</span>
                    Programs
                </div>

                {/* Heading */}
                <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 4rem', maxWidth: 960 }}>
                    <FadeIn direction="up">
                        <span className="text-[#1eb4d4] font-bold tracking-[0.15em] uppercase text-xs block mb-3">
                            OUR COMMUNITY INITIATIVES
                        </span>
                        <h1
                            style={{
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                letterSpacing: '0.02em',
                                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                                color: '#fff',
                                margin: '0 0 1rem 0',
                                lineHeight: 1.08,
                            }}
                        >
                            {t('programs.hero.title')}<br />
                            <span className="text-[#1eb4d4]">CREATING OPPORTUNITY.</span>
                        </h1>
                        <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed font-medium">
                            {t('programs.hero.desc')}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Focus Section */}
            <section className="ds-section bg-white" id="programs">
                <div className="ds-container">
                    <FadeIn direction="up">
                        <div className="text-center mb-16 max-w-3xl mx-auto">
                            <span className="ds-badge mb-3">{t('programs.hero.focus_badge')}</span>
                            <h2 className="ds-h2 mb-4">{t('programs.hero.focus_title')}</h2>
                            <p className="ds-body">
                                {t('programs.hero.focus_desc')}
                            </p>
                        </div>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: 'school' },
                            { icon: 'emoji_events' },
                            { icon: 'diversity_3' },
                            { icon: 'child_care' },
                        ].map((p, idx) => (
                            <FadeIn key={idx} direction="up" delay={idx * 0.08} fullWidth>
                                <div className="ds-card flex flex-col h-full">
                                    <div className="w-12 h-12 flex items-center justify-center mb-5 rounded bg-slate-100">
                                        <span className="material-symbols-outlined text-2xl text-[#1c4980]">{p.icon}</span>
                                    </div>
                                    <h3 className="ds-h3 text-lg mb-2 text-[#1c4980]">{pillarsT[idx]?.title}</h3>
                                    <p className="ds-body-sm">{pillarsT[idx]?.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProgramsHero;
