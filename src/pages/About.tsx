import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutHero from '../components/AboutHero';
import MissionVision from '../components/MissionVision';
import LeadershipTeam from '../components/LeadershipTeam';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';

const AboutPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="flex-grow relative z-10">
                    <AboutHero />
                    <MissionVision />
                    <LeadershipTeam />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default AboutPage;
