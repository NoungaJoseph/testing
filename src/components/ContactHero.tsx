import { useTranslation } from 'react-i18next';

const ContactHero = () => {
    const { t } = useTranslation();

    return (
        <section className="relative pt-36 pb-12 px-6 bg-white overflow-hidden">
            <div className="ds-container max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <span className="ds-badge mb-3">Reach Out To Us</span>
                    <h1 className="ds-h1 text-4xl md:text-5xl mb-4 text-[#1c4980]">
                        {t('contact.hero.title', 'Get in')} <span className="text-[#1eb4d4]">{t('contact.hero.title_highlight', 'Touch')}</span>
                    </h1>
                    <p className="ds-body max-w-xl mx-auto">
                        {t('contact.hero.desc', "We're located in Akwa, Douala. Visit or contact us.")}
                    </p>
                </div>

                <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                    <iframe
                        title="Akwa Douala Map"
                        src="https://www.google.com/maps?q=Akwa+Douala+Cameroon&output=embed"
                        width="100%"
                        height="420"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
};

export default ContactHero;
