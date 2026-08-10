import FadeIn from './FadeIn';
import { Link } from 'react-router-dom';

const StoriesHero = () => {
    return (
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
                        "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url('/assets/images/new_assets/story_hero.png')",
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
                Stories
            </div>

            {/* Heading */}
            <div style={{ position: 'relative', zIndex: 2, padding: '0 2.5rem 4rem', maxWidth: 960 }}>
                <FadeIn direction="up">
                    <span className="text-[#1eb4d4] font-bold tracking-[0.15em] uppercase text-xs block mb-3">
                        HUMAN IMPACT
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
                        REAL STORIES.<br />
                        <span className="text-[#1eb4d4]">REAL CHANGE.</span>
                    </h1>
                    <p className="text-white/90 text-base md:text-lg max-w-2xl leading-relaxed font-medium">
                        Discover the personal journeys of students, teachers, and communities empowered by Enako Outreach across Cameroon.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
};

export default StoriesHero;
