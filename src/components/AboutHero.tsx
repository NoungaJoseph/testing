import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';
import { useTranslation } from 'react-i18next';

const AboutHero = () => {
    const { t } = useTranslation();
    const pillarsT = t('about.hero.pillars', { returnObjects: true }) as any[];

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
                            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('/assets/charity/our-mission.png')",
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
                    About Us
                </div>

                {/* Heading */}
                <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 4rem', maxWidth: 960 }}>
                    <FadeIn direction="up">
                        <span className="text-[#1eb4d4] font-bold tracking-[0.15em] uppercase text-xs block mb-3">
                            {t('about.hero.est')}
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
                            {t('about.hero.title')}<br />
                            <span className="text-[#1eb4d4]">{t('about.hero.title_highlight')}</span>
                        </h1>
                        <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed font-medium">
                            {t('about.hero.desc')}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Mission block below hero */}
            <section className="ds-section bg-white">
                <div className="ds-container">
                    {/* Mission split */}
                    <FadeIn direction="up">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
                            <div className="lg:col-span-4 flex flex-col gap-3">
                                <span className="ds-badge">
                                    {t('about.hero.mission_badge')}
                                </span>
                                <h2 className="ds-h2">
                                    {t('about.hero.mission_title')}
                                </h2>
                            </div>
                            <div className="lg:col-span-8">
                                <p className="ds-body text-lg leading-relaxed">
                                    {t('about.hero.mission_desc')}
                                </p>
                            </div>
                        </div>
                    </FadeIn>

                    {/* 3 value pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-4">
                        {[1, 2, 3].map((_, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1} direction="up" fullWidth>
                                <div className="ds-card flex flex-col justify-start relative overflow-hidden h-full">
                                    {/* Number watermark */}
                                    <div className="text-4xl font-black text-[#1c4980]/15 mb-3">
                                        0{idx + 1}
                                    </div>
                                    <div className="w-8 h-1 bg-[#1eb4d4] rounded mb-4" />
                                    <h3 className="ds-h3 mb-3 text-[#1c4980]">
                                        {pillarsT[idx]?.title}
                                    </h3>
                                    <p className="ds-body-sm">
                                        {pillarsT[idx]?.desc}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutHero;
