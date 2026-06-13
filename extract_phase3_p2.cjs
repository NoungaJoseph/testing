const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en/translation.json');
const frPath = path.join(__dirname, 'src/locales/fr/translation.json');

const partnershipEn = {
  "hero": {
    "badge": "Institutional Collaboration",
    "title": "Building",
    "title_highlight": "Together.",
    "desc": "We partner with forward-thinking organizations to deliver transformative education and sustainable energy solutions across Africa."
  },
  "types": [
    {
      "title": "Public Sector",
      "desc": "Collaborating with local governments to align with national education agendas."
    },
    {
      "title": "Corporate Social",
      "desc": "Crafting bespoke CSR initiatives that deliver measurable ESG results."
    },
    {
      "title": "NGO Alliances",
      "desc": "Scaling impact through shared resources and ground-level expertise."
    }
  ],
  "inquiry": {
    "title": "Start a",
    "title_highlight": "Partnership",
    "title_end": "Inquiry.",
    "desc": "Our partnership team is ready to discuss how we can align our resources for maximum impact. Fill out the details and we'll be in touch within 48 hours.",
    "features": [
      {
        "title": "Expert Consultation",
        "desc": "Strategic planning for your CSR goals."
      },
      {
        "title": "Logistical Support",
        "desc": "End-to-end ground implementation."
      }
    ],
    "form": {
      "name_label": "Contact Name",
      "name_placeholder": "First & Last Name",
      "org_label": "Organization",
      "org_placeholder": "Company Name",
      "email_label": "Work Email",
      "email_placeholder": "your@email.com",
      "interest_label": "Project Interest",
      "interest_placeholder": "Briefly describe your partnership goals...",
      "btn_submit": "Submit Partnership Request"
    }
  }
};

const partnershipFr = {
  "hero": {
    "badge": "Collaboration Institutionnelle",
    "title": "Construire",
    "title_highlight": "Ensemble.",
    "desc": "Nous nous associons à des organisations avant-gardistes pour fournir une éducation transformatrice et des solutions énergétiques durables à travers l'Afrique."
  },
  "types": [
    {
      "title": "Secteur Public",
      "desc": "Collaboration avec les gouvernements locaux pour s'aligner sur les programmes d'éducation nationaux."
    },
    {
      "title": "Responsabilité Sociétale",
      "desc": "Création d'initiatives RSE sur mesure qui produisent des résultats ESG mesurables."
    },
    {
      "title": "Alliances d'ONG",
      "desc": "Améliorer l'impact grâce à des ressources partagées et à une expertise sur le terrain."
    }
  ],
  "inquiry": {
    "title": "Démarrer une Demande de",
    "title_highlight": "Partenariat.",
    "title_end": "",
    "desc": "Notre équipe de partenariat est prête à discuter de la manière dont nous pouvons aligner nos ressources pour un impact maximal. Remplissez les détails et nous vous contacterons dans les 48 heures.",
    "features": [
      {
        "title": "Consultation d'Experts",
        "desc": "Planification stratégique pour vos objectifs RSE."
      },
      {
        "title": "Soutien Logistique",
        "desc": "Mise en œuvre sur le terrain de bout en bout."
      }
    ],
    "form": {
      "name_label": "Nom du Contact",
      "name_placeholder": "Prénom et Nom",
      "org_label": "Organisation",
      "org_placeholder": "Nom de l'Entreprise",
      "email_label": "E-mail Professionnel",
      "email_placeholder": "votre@email.com",
      "interest_label": "Intérêt du Projet",
      "interest_placeholder": "Décrivez brièvement vos objectifs de partenariat...",
      "btn_submit": "Soumettre la Demande de Partenariat"
    }
  }
};

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.partnership = partnershipEn;
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));
frData.partnership = partnershipFr;
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2));

console.log('Partnership translations added successfully.');
