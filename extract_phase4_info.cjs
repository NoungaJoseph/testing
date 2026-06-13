const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en/translation.json');
const frPath = path.join(__dirname, 'src/locales/fr/translation.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const fr = JSON.parse(fs.readFileSync(frPath, 'utf8'));

en.contact.info_items = [
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
        value: "+237 6 78 45 79 26",
        description: "Mon-Fri from 9am to 6pm",
        href: "tel:+237 6 78 45 79 26"
    },
    {
        icon: '/assets/charity/contact us/location.png',
        title: "Visit Us",
        value: "Akwa, Akwa Douala, Cameroon ",
        description: "Littoral Region - Main Office",
        href: "https://maps.google.com/?q=Akwa+Douala+Cameroon"
    }
];

fr.contact.info_items = [
    {
        icon: '/assets/charity/contact us/email.png',
        title: "Envoyez-nous un Email",
        value: "enakooutreach@gmail.com",
        description: "Pour les demandes générales et les partenariats",
        href: "mailto:enakooutreach@gmail.com"
    },
    {
        icon: '/assets/charity/contact us/phone.png',
        title: "Appelez-nous",
        value: "+237 6 78 45 79 26",
        description: "Du lundi au vendredi de 9h à 18h",
        href: "tel:+237 6 78 45 79 26"
    },
    {
        icon: '/assets/charity/contact us/location.png',
        title: "Visitez-nous",
        value: "Akwa, Akwa Douala, Cameroun ",
        description: "Région du Littoral - Bureau Principal",
        href: "https://maps.google.com/?q=Akwa+Douala+Cameroon"
    }
];

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
console.log('info_items Translations updated.');
