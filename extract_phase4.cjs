const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en/translation.json');
const frPath = path.join(__dirname, 'src/locales/fr/translation.json');

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const fr = JSON.parse(fs.readFileSync(frPath, 'utf8'));

// 1. TransparencySection
en.programs = en.programs || {};
en.programs.transparency = {
    "goal": "Goal: 120 Lives Targeted",
    "report_summary": "Annual report 2023 summary",
    "title": "Our work is guided by transparency and radical empathy.",
    "desc": "We believe that by providing the right tools—education, infrastructure, and healthcare—communities can build their own prosperous futures. Every dollar donated goes directly toward our program execution.",
    "stat1_val": "92%",
    "stat1_label": "Funds to programs",
    "stat2_val": "1",
    "stat2_label": "Country active",
    "btn": "Read Our Impact Report"
};

fr.programs = fr.programs || {};
fr.programs.transparency = {
    "goal": "Objectif : 120 Vies Ciblées",
    "report_summary": "Résumé du rapport annuel 2023",
    "title": "Notre travail est guidé par la transparence et l'empathie radicale.",
    "desc": "Nous croyons qu'en fournissant les bons outils (éducation, infrastructure et soins de santé), les communautés peuvent bâtir leur propre avenir prospère. Chaque dollar donné va directement à l'exécution de nos programmes.",
    "stat1_val": "92%",
    "stat1_label": "Fonds aux programmes",
    "stat2_val": "1",
    "stat2_label": "Pays actif",
    "btn": "Lire Notre Rapport d'Impact"
};

// 2. Contact
en.contact = {
    "hero": {
        "title": "Get in Touch",
        "title_highlight": "With Us",
        "desc": "Whether you have a question about our programs, want to partner with us, or need assistance, our team is here to help.",
        "breadcrumb_home": "Home",
        "breadcrumb_contact": "Contact"
    },
    "info": {
        "title": "Reach Out to Us",
        "desc": "We'd love to hear from you. Choose the most convenient way to reach us below.",
        "address_label": "Our Office",
        "address_val": "Douala, Cameroon",
        "phone_label": "Phone Number",
        "phone_val": "+237 6 78 45 79 26",
        "email_label": "Email Address",
        "email_val": "enakooutreach@gmail.com",
        "social_label": "Follow Us"
    },
    "form": {
        "title": "Send Us a Message",
        "desc": "Fill out the form below and we'll get back to you as soon as possible.",
        "name_label": "Full Name",
        "name_placeholder": "John Doe",
        "email_label": "Email Address",
        "email_placeholder": "john@example.com",
        "subject_label": "Subject",
        "subject_placeholder": "How can we help?",
        "message_label": "Message",
        "message_placeholder": "Your message here...",
        "submit_btn": "Send Message"
    }
};

fr.contact = {
    "hero": {
        "title": "Entrez en Contact",
        "title_highlight": "Avec Nous",
        "desc": "Que vous ayez une question sur nos programmes, que vous souhaitiez vous associer à nous ou que vous ayez besoin d'aide, notre équipe est là pour vous aider.",
        "breadcrumb_home": "Accueil",
        "breadcrumb_contact": "Contact"
    },
    "info": {
        "title": "Contactez-Nous",
        "desc": "Nous serions ravis de vous entendre. Choisissez le moyen le plus pratique de nous joindre ci-dessous.",
        "address_label": "Notre Bureau",
        "address_val": "Douala, Cameroun",
        "phone_label": "Numéro de Téléphone",
        "phone_val": "+237 6 78 45 79 26",
        "email_label": "Adresse E-mail",
        "email_val": "enakooutreach@gmail.com",
        "social_label": "Suivez-nous"
    },
    "form": {
        "title": "Envoyez-Nous un Message",
        "desc": "Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.",
        "name_label": "Nom Complet",
        "name_placeholder": "Jean Dupont",
        "email_label": "Adresse E-mail",
        "email_placeholder": "jean@exemple.com",
        "subject_label": "Sujet",
        "subject_placeholder": "Comment pouvons-nous aider ?",
        "message_label": "Message",
        "message_placeholder": "Votre message ici...",
        "submit_btn": "Envoyer le Message"
    }
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(frPath, JSON.stringify(fr, null, 2));
console.log('Translations updated.');
