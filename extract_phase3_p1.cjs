const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en/translation.json');
const frPath = path.join(__dirname, 'src/locales/fr/translation.json');

const volunteerEn = {
  "hero": {
    "badge": "Volunteer Opportunity",
    "title": "Be Part of",
    "title_highlight": "the Change.",
    "desc": "Your time and talent can transform lives. Join our global network of dedicated volunteers working across Africa to empower the next generation.",
    "btn_start": "Start Volunteering",
    "btn_learn": "Learn More",
    "stats_text": "Join 18+ changemakers in our pilot network"
  },
  "roles": {
    "badge": "Ways to Act",
    "title": "Where We",
    "title_highlight": "Need You.",
    "btn_learn": "Learn More",
    "items": [
      {
        "title": "Education Support",
        "desc": "Assist in local schools, provide tutoring, and help build learning resource centers for children."
      },
      {
        "title": "Community Outreach",
        "desc": "Work directly with leaders to implement sustainable development projects and health programs."
      },
      {
        "title": "Skill Development",
        "desc": "Share your expertise in technology, business, or trades to empower youth with marketable skills."
      }
    ]
  },
  "apply": {
    "badge": "Join the Mission",
    "title": "Application.",
    "desc": "We'll review your application and respond with potential placements within 48 hours.",
    "form": {
      "name_label": "Full Name *",
      "name_placeholder": "John Doe",
      "email_label": "Email Address *",
      "email_placeholder": "john@example.com",
      "phone_label": "Phone Number",
      "phone_placeholder": "+1 (555) 000-0000",
      "role_label": "Preferred Role *",
      "role_options": {
        "default": "Select a role...",
        "edu": "Education Support",
        "outreach": "Community Outreach",
        "skill": "Skill Development",
        "fund": "Fundraising",
        "remote": "Remote / Digital"
      },
      "motivation_label": "Your Motivation",
      "motivation_placeholder": "Tell us why you'd like to join our community...",
      "btn_submit": "Submit Application",
      "secure_text": "Verified Secure Application"
    }
  },
  "final_cta": {
    "title": "Ready to",
    "title_highlight": "Act?",
    "desc": "Join our growing family of volunteers changing lives across 12 countries in Africa.",
    "btn_apply": "Apply Now",
    "btn_donate": "Donate"
  }
};

const volunteerFr = {
  "hero": {
    "badge": "Opportunité de Bénévolat",
    "title": "Faites Partie du",
    "title_highlight": "Changement.",
    "desc": "Votre temps et vos talents peuvent transformer des vies. Rejoignez notre réseau mondial de bénévoles dévoués travaillant à travers l'Afrique pour autonomiser la prochaine génération.",
    "btn_start": "Commencer le Bénévolat",
    "btn_learn": "En Savoir Plus",
    "stats_text": "Rejoignez plus de 18 acteurs du changement dans notre réseau pilote"
  },
  "roles": {
    "badge": "Façons d'Agir",
    "title": "Là où Nous Avons",
    "title_highlight": "Besoin de Vous.",
    "btn_learn": "En Savoir Plus",
    "items": [
      {
        "title": "Soutien à l'Éducation",
        "desc": "Aider dans les écoles locales, offrir du tutorat et contribuer à la création de centres de ressources d'apprentissage pour les enfants."
      },
      {
        "title": "Sensibilisation Communautaire",
        "desc": "Travailler directement avec les leaders pour mettre en œuvre des projets de développement durable et des programmes de santé."
      },
      {
        "title": "Développement des Compétences",
        "desc": "Partagez votre expertise en technologie, en affaires ou dans les métiers pour doter les jeunes de compétences monnayables sur le marché du travail."
      }
    ]
  },
  "apply": {
    "badge": "Rejoindre la Mission",
    "title": "Candidature.",
    "desc": "Nous examinerons votre candidature et vous répondrons avec des propositions de placement dans les 48 heures.",
    "form": {
      "name_label": "Nom Complet *",
      "name_placeholder": "Jean Dupont",
      "email_label": "Adresse E-mail *",
      "email_placeholder": "jean@exemple.com",
      "phone_label": "Numéro de Téléphone",
      "phone_placeholder": "+33 (0)1 00 00 00 00",
      "role_label": "Rôle Préféré *",
      "role_options": {
        "default": "Sélectionnez un rôle...",
        "edu": "Soutien à l'Éducation",
        "outreach": "Sensibilisation Communautaire",
        "skill": "Développement des Compétences",
        "fund": "Collecte de Fonds",
        "remote": "Travail à Distance / Numérique"
      },
      "motivation_label": "Votre Motivation",
      "motivation_placeholder": "Dites-nous pourquoi vous aimeriez rejoindre notre communauté...",
      "btn_submit": "Soumettre la Candidature",
      "secure_text": "Candidature Sécurisée Vérifiée"
    }
  },
  "final_cta": {
    "title": "Prêt à",
    "title_highlight": "Agir ?",
    "desc": "Rejoignez notre famille grandissante de bénévoles qui changent des vies dans 12 pays d'Afrique.",
    "btn_apply": "Postuler Maintenant",
    "btn_donate": "Faire un Don"
  }
};

const componentsEn = {
  "volunteer_cta": {
    "ghost_text": "Join",
    "active_volunteers": "Active Volunteers",
    "badge": "Community First",
    "title": "Join the",
    "title_highlight": "Movement.",
    "desc": "Let's take Cameroon's education and humanitarian mission to the next level — together. Share your skills and change a child's future.",
    "form": {
      "name": "Your Name *",
      "email": "Your Email *",
      "message": "How would you like to help? ..."
    },
    "btn_submit": "Get in Touch",
    "btn_learn": "Learn More"
  }
};

const componentsFr = {
  "volunteer_cta": {
    "ghost_text": "Rejoindre",
    "active_volunteers": "Bénévoles Actifs",
    "badge": "La Communauté d'Abord",
    "title": "Rejoindre le",
    "title_highlight": "Mouvement.",
    "desc": "Ensemble, faisons passer la mission éducative et humanitaire du Cameroun au niveau supérieur. Partagez vos compétences et changez l'avenir d'un enfant.",
    "form": {
      "name": "Votre Nom *",
      "email": "Votre E-mail *",
      "message": "Comment aimeriez-vous aider ? ..."
    },
    "btn_submit": "Nous Contacter",
    "btn_learn": "En Savoir Plus"
  }
};

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.volunteer = volunteerEn;
enData.components = { ...enData.components, ...componentsEn };
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));
frData.volunteer = volunteerFr;
frData.components = { ...frData.components, ...componentsFr };
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2));

console.log('Volunteer translations added successfully.');
