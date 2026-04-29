const ContactHero = () => {
    return (
        <section className="relative py-12 px-4 md:px-8 bg-transparent dark:bg-slate-950 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-6">
                    <h1 className="text-navy dark:text-white text-4xl md:text-5xl font-black leading-tight">Get in <span className="text-secondary">Touch</span>.</h1>
                    <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg mt-2">We're located in <span className="font-bold">Akwa, Douala</span>. Visit or contact us.</p>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-none border-0">
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
