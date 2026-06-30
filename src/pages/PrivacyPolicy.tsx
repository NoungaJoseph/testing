import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    const { t } = useTranslation();

    // Use a simple layout since it's just text
    return (
        <div className="min-h-screen flex flex-col bg-[#fdfbf7]">
            <Navbar />
            
            <main className="flex-1 pt-32 pb-24 px-6 md:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100"
                >
                    <h1 className="text-3xl md:text-4xl font-black text-[#001B44] mb-8">
                        {t('legal.privacy_policy_title')}
                    </h1>
                    
                    <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed whitespace-pre-wrap">
                        {t('legal.privacy_policy_content')}
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
