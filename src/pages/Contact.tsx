import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactHero from '../components/ContactHero';
import ContactInfo from '../components/ContactInfo';
import ContactForm from '../components/ContactForm';
import AnimatedNetworkBg from '../components/AnimatedNetworkBg';

const Contact = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <div className="relative">
                <AnimatedNetworkBg particleCount={40} />
                <main className="flex-grow pt-24 relative z-10">
                    <ContactHero />
                    <ContactInfo />
                    <ContactForm />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
