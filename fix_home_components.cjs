const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en/translation.json');
const frPath = path.join(__dirname, 'src/locales/fr/translation.json');

const componentsEn = {
  "programs_grid": {
    "badge": "What We Do",
    "title": "Our Core",
    "title_highlight": "Initiatives",
    "desc": "Six targeted programmes designed to create lasting change in the communities that need it most.",
    "btn_view_all": "View All Programs",
    "btn_explore": "Explore Programme",
    "programs": [
      {
        "name": "Scholarships",
        "desc": "Full and partial scholarships for primary, secondary, and university students from low-income families across Cameroon."
      },
      {
        "name": "Clean Water Initiative",
        "desc": "Installing boreholes, water purification systems and sanitation infrastructure in water-scarce communities."
      },
      {
        "name": "Teacher Rewards",
        "desc": "Recognising and rewarding dedicated teachers with financial grants and professional development across all regions."
      },
      {
        "name": "Community Health Support",
        "desc": "Mobile health clinics, medication supply, and preventive care campaigns reaching thousands of families quarterly."
      },
      {
        "name": "Single Mothers Assistance",
        "desc": "Empowering single mothers and widows with micro-grants, skills training, trauma support, and childcare assistance."
      },
      {
        "name": "Youth Empowerment",
        "desc": "Leadership training, vocational skills, and entrepreneurship programmes for youth aged 15-35 across Cameroon."
      }
    ]
  },
  "impact_dashboard": {
    "badge": "Community Impact In Motion",
    "title": "Real Outreach, Real People, Real Change",
    "desc": "This live field footage highlights how Enako Outreach is delivering clean water and essential support to communities across Cameroon.",
    "btn": "View Full Impact Report"
  },
  "beneficiary_stories": {
    "badge": "Human Stories",
    "title": "Voices of",
    "title_highlight": "Transformation.",
    "story_badge": "Community Impact Story",
    "btn": "Read More Stories",
    "stories": [
      {
        "name": "Sarah Akot",
        "role": "Young Entrepreneur, Douala",
        "text": "The business training programme helped me start my own community garden, providing fresh produce for my village and financial independence for my family. Enako Outreach changed everything."
      },
      {
        "name": "David Obi",
        "role": "Computer Science Scholar",
        "text": "Thanks to the technology grant, I completed my degree and launched a local tech hub that now trains fifty youth each month. This foundation believed in me before I believed in myself."
      },
      {
        "name": "Abena Osei",
        "role": "Scholarship Recipient, Yaounde",
        "text": "Being selected as top student in my district opened doors I only dreamed of. The Enako Outreach scholarship changed my entire family's trajectory - it is the reason I am in university today."
      }
    ]
  },
  "latest_blog": {
    "badge": "Latest News",
    "title": "Insight &",
    "title_highlight": "Impact.",
    "desc": "Stay informed about the issues that matter most to communities in Cameroon.",
    "btn_view_all": "View All Articles",
    "btn_read_more": "Read More"
  },
  "newsletter_cta": {
    "badge": "Stay Updated",
    "title": "Insights from the",
    "title_highlight": "Frontlines.",
    "desc": "Subscribe to receive our monthly impact reports, community stories, and humanitarian bulletins directly in your inbox.",
    "success_title": "Thank you! 🎉",
    "success_desc": "You're now subscribed to our newsletter.",
    "placeholder": "your@email.com",
    "btn": "Subscribe",
    "privacy": "* We respect your privacy. Unsubscribe anytime."
  }
};

const componentsFr = {
  "programs_grid": {
    "badge": "Ce Que Nous Faisons",
    "title": "Nos Initiatives",
    "title_highlight": "Principales",
    "desc": "Six programmes ciblés conçus pour créer un changement durable dans les communautés qui en ont le plus besoin.",
    "btn_view_all": "Voir Tous les Programmes",
    "btn_explore": "Explorer le Programme",
    "programs": [
      {
        "name": "Bourses d'Études",
        "desc": "Bourses complètes et partielles pour les élèves du primaire, du secondaire et de l'université issus de familles à faible revenu à travers le Cameroun."
      },
      {
        "name": "Initiative pour l'Eau Potable",
        "desc": "Installation de puits, de systèmes de purification de l'eau et d'infrastructures d'assainissement dans les communautés où l'eau est rare."
      },
      {
        "name": "Récompenses des Enseignants",
        "desc": "Reconnaître et récompenser les enseignants dévoués avec des subventions financières et un développement professionnel dans toutes les régions."
      },
      {
        "name": "Soutien à la Santé Communautaire",
        "desc": "Cliniques de santé mobiles, approvisionnement en médicaments et campagnes de soins préventifs touchant des milliers de familles chaque trimestre."
      },
      {
        "name": "Assistance aux Mères Célibataires",
        "desc": "Autonomiser les mères célibataires et les veuves avec des micro-subventions, une formation professionnelle, un soutien psychologique et une aide à la garde d'enfants."
      },
      {
        "name": "Autonomisation des Jeunes",
        "desc": "Formation en leadership, compétences professionnelles et programmes d'entrepreneuriat pour les jeunes âgés de 15 à 35 ans à travers le Cameroun."
      }
    ]
  },
  "impact_dashboard": {
    "badge": "L'Impact Communautaire en Mouvement",
    "title": "Réelle Proximité, Vraies Personnes, Vrai Changement",
    "desc": "Ces images de terrain montrent comment Enako Outreach fournit de l'eau potable et un soutien essentiel aux communautés à travers le Cameroun.",
    "btn": "Voir le Rapport d'Impact Complet"
  },
  "beneficiary_stories": {
    "badge": "Histoires Humaines",
    "title": "Voix de la",
    "title_highlight": "Transformation.",
    "story_badge": "Histoire d'Impact Communautaire",
    "btn": "Lire Plus d'Histoires",
    "stories": [
      {
        "name": "Sarah Akot",
        "role": "Jeune Entrepreneure, Douala",
        "text": "Le programme de formation en affaires m'a aidée à démarrer mon propre jardin communautaire, fournissant des produits frais à mon village et une indépendance financière à ma famille. Enako Outreach a tout changé."
      },
      {
        "name": "David Obi",
        "role": "Boursier en Informatique",
        "text": "Grâce à la subvention technologique, j'ai obtenu mon diplôme et lancé un pôle technologique local qui forme aujourd'hui une cinquantaine de jeunes chaque mois. Cette fondation a cru en moi avant que je ne croie en moi-même."
      },
      {
        "name": "Abena Osei",
        "role": "Boursière, Yaoundé",
        "text": "Être sélectionnée comme meilleure élève de mon district m'a ouvert des portes dont je ne faisais que rêver. La bourse Enako Outreach a changé la trajectoire de toute ma famille - c'est la raison pour laquelle je suis à l'université aujourd'hui."
      }
    ]
  },
  "latest_blog": {
    "badge": "Dernières Nouvelles",
    "title": "Perspectives &",
    "title_highlight": "Impact.",
    "desc": "Restez informé des questions qui comptent le plus pour les communautés au Cameroun.",
    "btn_view_all": "Voir Tous les Articles",
    "btn_read_more": "Lire la Suite"
  },
  "newsletter_cta": {
    "badge": "Restez Informé",
    "title": "Actualités de la",
    "title_highlight": "Ligne de Front.",
    "desc": "Abonnez-vous pour recevoir nos rapports d'impact mensuels, nos histoires communautaires et nos bulletins humanitaires directement dans votre boîte de réception.",
    "success_title": "Merci ! 🎉",
    "success_desc": "Vous êtes maintenant abonné à notre newsletter.",
    "placeholder": "votre@email.com",
    "btn": "S'abonner",
    "privacy": "* Nous respectons votre vie privée. Désabonnez-vous à tout moment."
  }
};

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.components = componentsEn;
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));
frData.components = componentsFr;
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2));

console.log('Components translations added successfully.');
