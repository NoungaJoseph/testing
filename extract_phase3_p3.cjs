const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en/translation.json');
const frPath = path.join(__dirname, 'src/locales/fr/translation.json');

const donateEn = {
  "hero": {
    "badge": "Secure Donation",
    "title": "Give Once. Give Monthly.",
    "title_highlight": "Build Lasting Impact.",
    "desc": "Inspired by top global donation experiences, this page is designed for clarity: simple amount selection, minimal form fields, clear payment options, and transparent impact preview."
  },
  "features": [
    {
      "title": "Education Support",
      "desc": "Books, fees, mentoring."
    },
    {
      "title": "Community Relief",
      "desc": "Water, health, essentials."
    }
  ],
  "form": {
    "type_label": "Donation Type",
    "type_one_time": "One-Time",
    "type_monthly": "Monthly",
    "amount_label": "Choose Amount (XAF)",
    "amount_custom_placeholder": "Custom amount",
    "method_label": "Payment Method",
    "name_placeholder": "Full name",
    "email_placeholder": "Email address",
    "phone_placeholder": "Phone number",
    "impact_preview_label": "Your Impact Preview",
    "donation_amount": "Donation amount:",
    "btn_submit": "Donate Securely",
    "success_title": "Thank you for your support",
    "success_desc": "Your {{frequency}} pledge of",
    "success_desc_end": "XAF has been recorded.",
    "btn_another": "Make another donation"
  },
  "impact_lines": {
    "low": [
      "Supports school supplies for one child.",
      "Adds to emergency support reserve."
    ],
    "med": [
      "Supports learning kits for 2 children.",
      "Contributes to one community outreach day."
    ],
    "high": [
      "Supports a partial scholarship package.",
      "Contributes to local health outreach transport."
    ],
    "max": [
      "Supports one full student support cycle.",
      "Contributes to clean-water and education field logistics."
    ]
  }
};

const donateFr = {
  "hero": {
    "badge": "Don Sécurisé",
    "title": "Donnez une Fois. Donnez Mensuellement.",
    "title_highlight": "Créez un Impact Durable.",
    "desc": "Inspirée des meilleures expériences mondiales de don, cette page est conçue pour la clarté : sélection de montant simple, champs de formulaire minimaux, options de paiement claires et aperçu d'impact transparent."
  },
  "features": [
    {
      "title": "Soutien à l'Éducation",
      "desc": "Livres, frais, mentorat."
    },
    {
      "title": "Secours Communautaire",
      "desc": "Eau, santé, biens de première nécessité."
    }
  ],
  "form": {
    "type_label": "Type de Don",
    "type_one_time": "Une Fois",
    "type_monthly": "Mensuel",
    "amount_label": "Choisissez le Montant (XAF)",
    "amount_custom_placeholder": "Montant personnalisé",
    "method_label": "Méthode de Paiement",
    "name_placeholder": "Nom complet",
    "email_placeholder": "Adresse e-mail",
    "phone_placeholder": "Numéro de téléphone",
    "impact_preview_label": "Aperçu de Votre Impact",
    "donation_amount": "Montant du don :",
    "btn_submit": "Donner en Toute Sécurité",
    "success_title": "Merci pour votre soutien",
    "success_desc": "Votre promesse de don {{frequency}} de",
    "success_desc_end": "XAF a été enregistrée.",
    "btn_another": "Faire un autre don"
  },
  "impact_lines": {
    "low": [
      "Fournit des fournitures scolaires pour un enfant.",
      "S'ajoute à la réserve de soutien d'urgence."
    ],
    "med": [
      "Fournit des kits d'apprentissage pour 2 enfants.",
      "Contribue à une journée de sensibilisation communautaire."
    ],
    "high": [
      "Soutient un programme de bourse partielle.",
      "Contribue au transport pour les interventions de santé locales."
    ],
    "max": [
      "Soutient un cycle complet d'accompagnement d'un étudiant.",
      "Contribue à la logistique de terrain pour l'eau potable et l'éducation."
    ]
  }
};

const blogEn = {
  "hero": {
    "badge": "Enako Insights",
    "title": "Stories from",
    "title_highlight": "Cameroon",
    "desc": "Deep dives into the challenges, triumphs, and stories shaping education and communities across Cameroon.",
    "nav_posts": "Blog Posts",
    "nav_news": "Latest News",
    "nav_archives": "Archives"
  },
  "filters": {
    "search_placeholder": "Search articles..."
  },
  "empty": {
    "title": "No articles found.",
    "desc": "Try adjusting your search or category filter."
  }
};

const blogFr = {
  "hero": {
    "badge": "Aperçus d'Enako",
    "title": "Histoires du",
    "title_highlight": "Cameroun",
    "desc": "Plongez dans les défis, les triomphes et les histoires qui façonnent l'éducation et les communautés à travers le Cameroun.",
    "nav_posts": "Articles",
    "nav_news": "Dernières Nouvelles",
    "nav_archives": "Archives"
  },
  "filters": {
    "search_placeholder": "Rechercher des articles..."
  },
  "empty": {
    "title": "Aucun article trouvé.",
    "desc": "Essayez d'ajuster votre recherche ou votre filtre de catégorie."
  }
};

const storiesEn = {
  "hero": {
    "badge": "Community Narratives",
    "title": "Voices of",
    "title_highlight": "Transformation.",
    "desc": "Real narratives of change from students, teachers, and communities across Africa.",
    "btn_explore": "Explore Narratives",
    "btn_impact": "Our Impact Report"
  },
  "stats": [
    { "v": "120+", "l": "Lives Targeted" },
    { "v": "8", "l": "Communities" },
    { "v": "Pilot", "l": "Stage" }
  ],
  "highlight": {
    "badge": "The Highlight",
    "title": "Featured",
    "title_highlight": "Narrative."
  },
  "latest": {
    "badge": "Latest Insights",
    "title": "More",
    "title_highlight": "Evidence."
  },
  "items": [
    {
      "category": "Student Success",
      "title": "\"From a Village Classroom to a University in Accra\"",
      "author": "Abena Osei, Scholarship Recipient",
      "country": "Ghana",
      "excerpt": "When I was selected as the top student in my district, I never imagined it would open doors I had only dreamed of. The Enako Outreach scholarship didn't just pay my fees — it changed my entire family's trajectory."
    },
    {
      "category": "Teacher Award",
      "title": "\"Being Recognized Changed How I Teach\"",
      "author": "Mr. Emmanuel Asante, Teacher",
      "country": "Nigeria",
      "excerpt": "The award was more than money; it was validation. For the first time in 15 years of teaching, someone said \"we see you.\" My students noticed the change in my energy immediately."
    },
    {
      "category": "Community Impact",
      "title": "\"Our Village Now Has Clean Water\"",
      "author": "Chief Yaw Darko, Community Leader",
      "country": "Kenya",
      "excerpt": "Before Enako came, our children walked 3 km each morning just to reach water. Now that borehole in our compound has freed our children to attend school instead."
    }
  ],
  "newsletter": {
    "title": "Stay Inspired",
    "desc": "Get the latest stories of impact delivered directly to your inbox.",
    "email_placeholder": "Your email address",
    "btn_subscribe": "Subscribe"
  }
};

const storiesFr = {
  "hero": {
    "badge": "Récits Communautaires",
    "title": "Voix de la",
    "title_highlight": "Transformation.",
    "desc": "De véritables histoires de changement de la part d'étudiants, d'enseignants et de communautés à travers l'Afrique.",
    "btn_explore": "Explorer les Récits",
    "btn_impact": "Notre Rapport d'Impact"
  },
  "stats": [
    { "v": "120+", "l": "Vies Ciblées" },
    { "v": "8", "l": "Communautés" },
    { "v": "Pilote", "l": "Étape" }
  ],
  "highlight": {
    "badge": "Le Fait Saillant",
    "title": "Récit en",
    "title_highlight": "Vedette."
  },
  "latest": {
    "badge": "Dernières Idées",
    "title": "Plus de",
    "title_highlight": "Preuves."
  },
  "items": [
    {
      "category": "Réussite Étudiante",
      "title": "\"D'une Salle de Classe de Village à une Université à Accra\"",
      "author": "Abena Osei, Boursière",
      "country": "Ghana",
      "excerpt": "Lorsque j'ai été sélectionnée comme la meilleure élève de mon district, je n'aurais jamais imaginé que cela m'ouvrirait des portes dont je n'avais fait que rêver. La bourse Enako Outreach n'a pas seulement payé mes frais de scolarité, elle a changé la trajectoire de toute ma famille."
    },
    {
      "category": "Prix de l'Enseignant",
      "title": "\"Être Reconnu a Changé ma Façon d'Enseigner\"",
      "author": "M. Emmanuel Asante, Enseignant",
      "country": "Nigeria",
      "excerpt": "Le prix était plus que de l'argent ; c'était une validation. Pour la première fois en 15 ans d'enseignement, quelqu'un m'a dit « nous vous voyons ». Mes élèves ont immédiatement remarqué le changement dans mon énergie."
    },
    {
      "category": "Impact Communautaire",
      "title": "\"Notre Village a Maintenant de l'Eau Potable\"",
      "author": "Chef Yaw Darko, Chef Communautaire",
      "country": "Kenya",
      "excerpt": "Avant l'arrivée d'Enako, nos enfants marchaient 3 km chaque matin juste pour aller chercher de l'eau. Maintenant, ce forage dans notre enceinte a libéré nos enfants pour qu'ils puissent aller à l'école."
    }
  ],
  "newsletter": {
    "title": "Restez Inspiré",
    "desc": "Recevez les dernières histoires d'impact directement dans votre boîte de réception.",
    "email_placeholder": "Votre adresse e-mail",
    "btn_subscribe": "S'abonner"
  }
};

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.donate = donateEn;
enData.blog = blogEn;
enData.stories = storiesEn;
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));
frData.donate = donateFr;
frData.blog = blogFr;
frData.stories = storiesFr;
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2));

console.log('Donate, Blog, Stories translations added successfully.');
