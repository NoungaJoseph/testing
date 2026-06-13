const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en/translation.json');
const frPath = path.join(__dirname, 'src/locales/fr/translation.json');

const impactEn = {
  "hero": {
    "badge": "Measurable Change",
    "title": "Driving Real",
    "title_highlight": "Transformation.",
    "desc": "Our data-driven approach ensures every resource reaches the communities that need it most.",
    "stats": [
      { "v": "120+", "l": "Lives Targeted" },
      { "v": "8", "l": "Communities" },
      { "v": "Pilot", "l": "Phase" }
    ]
  },
  "kpi": {
    "badge": "Our Numbers",
    "title": "Impact in",
    "title_highlight": "Focus.",
    "stats": [
      { "value": "120+", "label": "Students Targeted" },
      { "value": "8", "label": "Schools Targeted" },
      { "value": "6", "label": "Teachers Recognized" },
      { "value": "8", "label": "Communities Helped" }
    ]
  },
  "timeline": {
    "badge": "Our Journey",
    "title": "Our Story of Growth",
    "milestones": [
      { "year": "Phase 1", "title": "Douala Launch", "desc": "Enako Outreach establishes headquarters in Douala with 5 partner schools." },
      { "year": "Phase 2", "title": "First Charity Mission", "desc": "Launching our inaugural charity mission to provide immediate educational support." },
      { "year": "Phase 3", "title": "Regional Expansion", "desc": "Expanding coverage to 8 partner schools across target communities." }
    ]
  },
  "dashboard": {
    "badge": "Live Dashboard",
    "title": "Our Impact Dashboard",
    "desc": "Track how your contributions are making a difference across Cameroon in real time.",
    "stats": [
      { "label": "Partner Schools", "value": "5", "suffix": "" },
      { "label": "Target Students", "value": "120", "suffix": "+" },
      { "label": "Schools planned", "value": "8", "suffix": "" },
      { "label": "Regions Covered", "value": "2", "suffix": "" }
    ],
    "chart_title": "Program Distribution",
    "chart_labels": ["Scholarships", "Teacher Awards", "Community Dev", "Orphanage Support"]
  },
  "reports": {
    "badge": "Transparency",
    "title": "Strategic",
    "title_highlight": "Resources",
    "view_all": "View All Reports",
    "org_name": "Enako Outreach Foundation",
    "download": "Download Resource",
    "items": [
      { "title": "2026-2028 Strategic Plan" },
      { "title": "Organization Prospectus 2026" }
    ]
  }
};

const impactFr = {
  "hero": {
    "badge": "Changement Mesurable",
    "title": "Conduire une Vraie",
    "title_highlight": "Transformation.",
    "desc": "Notre approche basée sur les données garantit que chaque ressource atteint les communautés qui en ont le plus besoin.",
    "stats": [
      { "v": "120+", "l": "Vies Ciblées" },
      { "v": "8", "l": "Communautés" },
      { "v": "Pilote", "l": "Phase" }
    ]
  },
  "kpi": {
    "badge": "Nos Chiffres",
    "title": "L'Impact en",
    "title_highlight": "Lumière.",
    "stats": [
      { "value": "120+", "label": "Étudiants Ciblés" },
      { "value": "8", "label": "Écoles Ciblées" },
      { "value": "6", "label": "Enseignants Reconnus" },
      { "value": "8", "label": "Communautés Aidées" }
    ]
  },
  "timeline": {
    "badge": "Notre Parcours",
    "title": "Notre Histoire de Croissance",
    "milestones": [
      { "year": "Phase 1", "title": "Lancement à Douala", "desc": "Enako Outreach établit son siège à Douala avec 5 écoles partenaires." },
      { "year": "Phase 2", "title": "Première Mission de Charité", "desc": "Lancement de notre mission inaugurale pour fournir un soutien éducatif immédiat." },
      { "year": "Phase 3", "title": "Expansion Régionale", "desc": "Extension de la couverture à 8 écoles partenaires dans les communautés cibles." }
    ]
  },
  "dashboard": {
    "badge": "Tableau de Bord",
    "title": "Notre Tableau de Bord d'Impact",
    "desc": "Suivez comment vos contributions font une différence à travers le Cameroun en temps réel.",
    "stats": [
      { "label": "Écoles Partenaires", "value": "5", "suffix": "" },
      { "label": "Étudiants Ciblés", "value": "120", "suffix": "+" },
      { "label": "Écoles Prévues", "value": "8", "suffix": "" },
      { "label": "Régions Couvertes", "value": "2", "suffix": "" }
    ],
    "chart_title": "Distribution des Programmes",
    "chart_labels": ["Bourses", "Prix Enseignants", "Dév. Communautaire", "Soutien Orphelinat"]
  },
  "reports": {
    "badge": "Transparence",
    "title": "Ressources",
    "title_highlight": "Stratégiques",
    "view_all": "Voir Tous les Rapports",
    "org_name": "Fondation Enako Outreach",
    "download": "Télécharger la Ressource",
    "items": [
      { "title": "Plan Stratégique 2026-2028" },
      { "title": "Prospectus de l'Organisation 2026" }
    ]
  }
};

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.impact = impactEn;
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));
frData.impact = impactFr;
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2));

console.log('Impact translations added successfully.');
