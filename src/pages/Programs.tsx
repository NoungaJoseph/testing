import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgramsHero from '../components/ProgramsHero';
import ProgramsOverview from '../components/ProgramsOverview';
import TransparencySection from '../components/TransparencySection';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';

const ProgramsPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="flex-grow relative z-10">
                    <ProgramsHero />
                    <ProgramsOverview />
                    <TransparencySection />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default ProgramsPage;
