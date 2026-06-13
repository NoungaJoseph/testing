const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en/translation.json');
const frPath = path.join(__dirname, 'src/locales/fr/translation.json');

const homeEn = {
  "mission": {
    "badge": "Our Mission",
    "title": "Transforming Lives Across",
    "title_highlight": "Cameroon",
    "desc": "Enako Outreach is a registered humanitarian NGO dedicated to empowering communities across Cameroon. We work at the grassroots level — partnering with local leaders, schools, and health workers to deliver targeted, sustainable programmes where they matter most.",
    "tags": ["Education", "Healthcare", "Clean Water", "Women Empowerment", "Youth", "Emergency Relief"],
    "btn": "Learn About Our Work",
    "points": [
      { "label": "Education Access", "desc": "Scholarships from primary to university level" },
      { "label": "Clean Water", "desc": "Boreholes and purification for rural communities" },
      { "label": "Healthcare", "desc": "Mobile clinics and community health workers" },
      { "label": "Women Support", "desc": "Empowering single mothers and widows" },
      { "label": "Youth Empowerment", "desc": "Skills training and entrepreneurship support" },
      { "label": "Emergency Relief", "desc": "Rapid response for crisis-affected families" }
    ]
  },
  "cta": {
    "title": "How Can We Help You?",
    "subtitle": "Take action — whether you need assistance or want to give it.",
    "cards": [
      { "title": "Apply for Help", "desc": "Need support for education, healthcare, or emergency assistance? Apply through our programme intake.", "label": "Start Application" },
      { "title": "Report Community Issue", "desc": "Know of a community in need of clean water, healthcare, or urgent humanitarian support?", "label": "Report a Case" },
      { "title": "Donate Now", "desc": "Every contribution funds education, clean water, and healthcare for families across Cameroon.", "label": "Donate Today" },
      { "title": "Partner With Us", "desc": "Organisations and individuals can partner with Enako Outreach to amplify our community impact.", "label": "Start Partnership" }
    ]
  },
  "regional_mapping": {
    "badge": "Regional Mapping",
    "title": "Following the Route",
    "title_highlight": "Across Cameroon",
    "desc": "This visual line-map shows how our outreach path connects communities across Cameroon. It gives context to where programmes are delivered and why we prioritise each region.",
    "points": [
      "Shows key places connected by one outreach route.",
      "Complements the regional map below for deeper exploration.",
      "Helps donors and partners quickly understand geographic reach."
    ]
  },
  "focus_communities": {
    "badge": "Where We Work",
    "title": "Focus Communities",
    "title_highlight": "Across Cameroon",
    "desc": "We operate in 5 key regions of Cameroon — Littoral, Centre, North West, South West, and West. Click on any marker to explore our work in each region.",
    "btn": "Explore All Regions",
    "regions": [
      { "name": "Littoral (Douala)", "work": "Clean Water, Healthcare, Emergency Relief" },
      { "name": "Centre (Yaoundé)", "work": "Scholarships, School Rehab, Teacher Rewards" },
      { "name": "North West (Bamenda)", "work": "Emergency Relief, Women Support" },
      { "name": "South West (Buea)", "work": "Emergency Relief, Clean Water" },
      { "name": "West (Bafoussam)", "work": "Women Empowerment, Healthcare" }
    ]
  },
  "reviews": {
    "badge": "Real Impact",
    "title": "Community Reviews",
    "subtitle": "Behind every statistic is a real person whose life has been transformed by your support.",
    "btn": "Read More Stories",
    "stories": [
      {
        "name": "Amina Bello",
        "region": "North West Region",
        "program": "Single Mothers Assistance",
        "quote": "After losing my husband, I had no income and three children to feed. Enako gave me skills training and startup funds — I now run my own tailoring business and can pay my children's school fees."
      },
      {
        "name": "Emmanuel Fon",
        "region": "West Region",
        "program": "University Scholarship",
        "quote": "I scored top marks in my BEPC but my family couldn't afford university. Enako's scholarship paid my entire engineering degree. Today I work at a construction firm in Douala."
      },
      {
        "name": "Clarisse Mbah",
        "region": "Littoral Region",
        "program": "Clean Water Initiative",
        "quote": "Our village women used to walk 4km each morning for water. Since the borehole was installed last year, we have clean water 50 metres from our homes. It has changed everything."
      }
    ]
  },
  "donation_cta": {
    "badge": "Make A Difference",
    "title": "Your Donation Changes",
    "title_highlight": "Real Lives",
    "desc": "Every contribution funds education, clean water, and healthcare for families across Cameroon.",
    "btn_donate": "Donate Now",
    "btn_partner": "Partner With Us"
  }
};

const homeFr = {
  "mission": {
    "badge": "Notre Mission",
    "title": "Transformer des Vies à Travers le",
    "title_highlight": "Cameroun",
    "desc": "Enako Outreach est une ONG humanitaire enregistrée dédiée à l'autonomisation des communautés à travers le Cameroun. Nous travaillons à la base — en partenariat avec des leaders locaux, des écoles et des agents de santé pour offrir des programmes ciblés et durables là où ils sont le plus nécessaires.",
    "tags": ["Éducation", "Santé", "Eau Potable", "Autonomisation des Femmes", "Jeunesse", "Secours d'Urgence"],
    "btn": "Découvrez Notre Travail",
    "points": [
      { "label": "Accès à l'Éducation", "desc": "Bourses du primaire au niveau universitaire" },
      { "label": "Eau Potable", "desc": "Forages et purification pour les communautés rurales" },
      { "label": "Santé", "desc": "Cliniques mobiles et agents de santé communautaires" },
      { "label": "Soutien aux Femmes", "desc": "Autonomisation des mères célibataires et des veuves" },
      { "label": "Autonomisation des Jeunes", "desc": "Formation professionnelle et soutien à l'entrepreneuriat" },
      { "label": "Secours d'Urgence", "desc": "Réponse rapide pour les familles touchées par des crises" }
    ]
  },
  "cta": {
    "title": "Comment Pouvons-Nous Vous Aider ?",
    "subtitle": "Agissez — que vous ayez besoin d'aide ou que vous souhaitiez en apporter.",
    "cards": [
      { "title": "Demander de l'Aide", "desc": "Besoin de soutien pour l'éducation, la santé ou une aide d'urgence ? Postulez via notre programme.", "label": "Commencer la Demande" },
      { "title": "Signaler un Problème", "desc": "Vous connaissez une communauté ayant besoin d'eau potable, de soins ou de soutien humanitaire urgent ?", "label": "Signaler un Cas" },
      { "title": "Faire un Don", "desc": "Chaque contribution finance l'éducation, l'eau potable et la santé pour des familles à travers le Cameroun.", "label": "Faire un Don" },
      { "title": "Devenir Partenaire", "desc": "Les organisations et individus peuvent s'associer à Enako Outreach pour amplifier notre impact.", "label": "Devenir Partenaire" }
    ]
  },
  "regional_mapping": {
    "badge": "Cartographie Régionale",
    "title": "Suivre l'Itinéraire",
    "title_highlight": "À Travers le Cameroun",
    "desc": "Cette carte visuelle montre comment notre parcours d'intervention relie les communautés. Elle contextualise la livraison des programmes et nos priorités.",
    "points": [
      "Affiche les lieux clés connectés par une route d'intervention.",
      "Complète la carte régionale pour une exploration approfondie.",
      "Aide les donateurs et partenaires à comprendre notre portée."
    ]
  },
  "focus_communities": {
    "badge": "Où Nous Travaillons",
    "title": "Communautés Cibles",
    "title_highlight": "Au Cameroun",
    "desc": "Nous opérons dans 5 régions clés — Littoral, Centre, Nord-Ouest, Sud-Ouest et Ouest. Cliquez sur un marqueur pour explorer notre travail.",
    "btn": "Explorer Toutes les Régions",
    "regions": [
      { "name": "Littoral (Douala)", "work": "Eau Potable, Santé, Secours d'Urgence" },
      { "name": "Centre (Yaoundé)", "work": "Bourses, Réhab. Écoles, Récompenses Enseignants" },
      { "name": "Nord-Ouest (Bamenda)", "work": "Secours d'Urgence, Soutien aux Femmes" },
      { "name": "Sud-Ouest (Buéa)", "work": "Secours d'Urgence, Eau Potable" },
      { "name": "Ouest (Bafoussam)", "work": "Autonomisation des Femmes, Santé" }
    ]
  },
  "reviews": {
    "badge": "Impact Réel",
    "title": "Avis de la Communauté",
    "subtitle": "Derrière chaque statistique se cache une personne dont la vie a été transformée par votre soutien.",
    "btn": "Lire Plus d'Histoires",
    "stories": [
      {
        "name": "Amina Bello",
        "region": "Région du Nord-Ouest",
        "program": "Assistance aux Mères Célibataires",
        "quote": "Après avoir perdu mon mari, je n'avais aucun revenu et trois enfants à nourrir. Enako m'a offert une formation et des fonds. Je gère maintenant ma propre entreprise de couture et paie les frais scolaires."
      },
      {
        "name": "Emmanuel Fon",
        "region": "Région de l'Ouest",
        "program": "Bourse Universitaire",
        "quote": "J'ai eu d'excellentes notes au BEPC, mais ma famille ne pouvait pas payer l'université. La bourse d'Enako a financé mon diplôme d'ingénieur. Aujourd'hui, je travaille dans la construction à Douala."
      },
      {
        "name": "Clarisse Mbah",
        "region": "Région du Littoral",
        "program": "Initiative Eau Potable",
        "quote": "Les femmes de notre village marchaient 4 km chaque matin pour l'eau. Depuis le forage l'année dernière, nous avons de l'eau potable à 50 mètres. Cela a tout changé."
      }
    ]
  },
  "donation_cta": {
    "badge": "Faire une Différence",
    "title": "Votre Don Change",
    "title_highlight": "Des Vies Réelles",
    "desc": "Chaque contribution finance l'éducation, l'eau potable et la santé pour des familles à travers le Cameroun.",
    "btn_donate": "Faire un Don",
    "btn_partner": "Devenir Partenaire"
  }
};

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.home = homeEn;
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));
frData.home = homeFr;
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2));

console.log('Translations added successfully.');
