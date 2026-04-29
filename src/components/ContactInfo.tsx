const ContactInfo = () => {
    const infoItems = [
        {
            icon: '/assets/charity/contact us/email.png',
            title: "Email Us",
            value: "enakooutreach@gmail.com",
            description: "For general inquiries and partnerships",
            href: "mailto:enakooutreach@gmail.com"
        },
        {
            icon: '/assets/charity/contact us/phone.png',
            title: "Call Us",
            value: "+237 6 70 67 12 49",
            description: "Mon-Fri from 9am to 6pm",
            href: "tel:+237670671249"
        },
        {
            icon: '/assets/charity/contact us/location.png',
            title: "Visit Us",
            value: "Akwa, Akwa Douala, Cameroon ",
            description: "Littoral Region - Main Office",
            href: "https://maps.google.com/?q=Akwa+Douala+Cameroon"
        }
    ];

    return (
        <section className="py-12 px-6 md:px-12 max-w-6xl mx-auto bg-transparent">
            <div className="flex flex-col md:flex-row gap-6">
                {infoItems.map((item) => (
                    <a
                        key={item.title}
                        href={item.href}
                        target={item.title === 'Visit Us' ? '_blank' : undefined}
                        rel={item.title === 'Visit Us' ? 'noopener noreferrer' : undefined}
                        className="flex-1 flex flex-col items-start p-2 md:p-4 bg-transparent text-left"
                    >
                        <img src={item.icon} alt={item.title} className="w-14 h-14 mb-3 object-contain" />
                        <h3 className="text-xl font-bold text-navy dark:text-white mb-1">{item.title}</h3>
                        <p className="text-secondary font-extrabold text-base mb-1">{item.value}</p>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-2">{item.description}</p>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default ContactInfo;
