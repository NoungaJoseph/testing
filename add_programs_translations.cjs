const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en/translation.json');
const frPath = path.join(__dirname, 'src/locales/fr/translation.json');

const programsEn = {
  "hero": {
    "breadcrumb_home": "Home",
    "breadcrumb_programs": "Programs",
    "title": "Our Programs",
    "title_highlight": "Lasting",
    "title_suffix": "Impact",
    "desc": "Through education, recognition, and community development, Enako Outreach empowers individuals and transforms communities across Africa.",
    "focus_badge": "Our Focus Areas",
    "focus_title": "Nurturing growth through strategic pillars.",
    "focus_desc": "At Enako Outreach, we are dedicated to fostering sustainable growth through targeted humanitarian initiatives.",
    "pillars": [
      { "title": "Scholarships", "desc": "Empowering the next generation of African leaders through academic support and financial grants." },
      { "title": "Teacher Awards", "desc": "Recognizing excellence in education and honoring the dedicated mentors shaping the future." },
      { "title": "Community Dev", "desc": "Building sustainable local infrastructure and clean water systems for self-reliant villages." },
      { "title": "Orphanage Support", "desc": "Providing a safe haven, nutritional support, and emotional care for children in need." }
    ]
  },
  "overview": {
    "badge_prefix": "Enako Impact",
    "btn_view": "View Full Programme",
    "btn_donate": "Donate Now",
    "items": [
      {
        "id": "scholarships",
        "badge": "Education Support",
        "title": "Scholarships for Academic Excellence",
        "desc": "Our flagship scholarship programme provides full-tuition coverage, textbooks, uniforms, and mentorship for high-achieving students from low-income families across Cameroon. We support students from primary level through to university.",
        "highlights": ["Full Tuition Coverage", "Mentorship Program", "Primary to University"],
        "stats": ["8 Scholars", "Strong Retention", "4 Schools", "2 Regions"],
        "imageCaption": "Empowering future leaders"
      },
      {
        "id": "clean-water-initiative",
        "badge": "Infrastructure",
        "title": "Clean Water Initiative",
        "desc": "Providing safe, accessible drinking water to rural and water-scarce communities through borehole drilling, water purification systems, and local maintenance training. We believe clean water is the first step to health.",
        "highlights": ["Borehole Drilling", "Water Purification", "Maintenance Training"],
        "stats": ["18 Boreholes", "28k+ People", "22 Villages", "3 Regions"],
        "imageCaption": "Safe water for every village"
      },
      {
        "id": "teacher-rewards",
        "badge": "Teacher Excellence",
        "title": "Teacher Rewards Programme",
        "desc": "Recognising and rewarding dedicated educators in underserved communities. We provide financial grants, professional development, and community recognition to those who go above and beyond for their students.",
        "highlights": ["Financial Grants", "Professional Training", "Peer Network"],
        "stats": ["6 Teachers", "2 Regions", "4 Sessions", "Pilot Cohort"],
        "imageCaption": "Honouring dedicated educators"
      },
      {
        "id": "community-health-support",
        "badge": "Healthcare",
        "title": "Community Health Support",
        "desc": "Mobile healthcare clinics and medical outreach programs that bring doctors, nurses, and essential medication directly to families in remote and underserved areas of Cameroon.",
        "highlights": ["Mobile Clinics", "Maternal Health", "Malaria Prevention"],
        "stats": ["42k+ Patients", "6 Clinics", "85 Trained", "5 Regions"],
        "imageCaption": "Healthcare within reach"
      },
      {
        "id": "single-mothers-assistance",
        "badge": "Social Support",
        "title": "Single Mothers Assistance",
        "desc": "Empowering single mothers and widows through micro-grants, vocational skills training (tailoring, catering, ICT), trauma counselling, and childcare support to foster economic independence.",
        "highlights": ["Micro-grants", "Skills Training", "Trauma Support"],
        "stats": ["10 Women", "4 Businesses", "7 Active", "2 Regions"],
        "imageCaption": "Restoring hope and dignity"
      },
      {
        "id": "youth-empowerment",
        "badge": "Youth Development",
        "title": "Youth Empowerment Programme",
        "desc": "Building the next generation of Cameroonian changemakers through leadership development, vocational skills training, digital literacy bootcamps, and seed funding for young entrepreneurs.",
        "highlights": ["Leadership Training", "Digital Skills", "Seed Funding"],
        "stats": ["12 Youth", "3 Ventures", "Ongoing Placement", "2 Regions"],
        "imageCaption": "Building tomorrow's leaders"
      }
    ]
  }
};

const programsFr = {
  "hero": {
    "breadcrumb_home": "Accueil",
    "breadcrumb_programs": "Programmes",
    "title": "Nos Programmes",
    "title_highlight": "Durable",
    "title_suffix": "Impact",
    "desc": "À travers l'éducation, la reconnaissance et le développement communautaire, Enako Outreach autonomise les individus et transforme les communautés à travers l'Afrique.",
    "focus_badge": "Nos Domaines d'Action",
    "focus_title": "Favoriser la croissance grâce à des piliers stratégiques.",
    "focus_desc": "Chez Enako Outreach, nous nous engageons à favoriser une croissance durable grâce à des initiatives humanitaires ciblées.",
    "pillars": [
      { "title": "Bourses d'Études", "desc": "Autonomiser la prochaine génération de leaders africains grâce à un soutien académique et des subventions financières." },
      { "title": "Prix pour les Enseignants", "desc": "Reconnaître l'excellence dans l'éducation et honorer les mentors dévoués qui façonnent l'avenir." },
      { "title": "Dév. Communautaire", "desc": "Construire des infrastructures locales durables et des systèmes d'eau potable pour des villages autonomes." },
      { "title": "Soutien aux Orphelinats", "desc": "Fournir un refuge sûr, un soutien nutritionnel et des soins émotionnels aux enfants dans le besoin." }
    ]
  },
  "overview": {
    "badge_prefix": "Impact Enako",
    "btn_view": "Voir le Programme Complet",
    "btn_donate": "Faire un Don",
    "items": [
      {
        "id": "scholarships",
        "badge": "Soutien à l'Éducation",
        "title": "Bourses pour l'Excellence Académique",
        "desc": "Notre programme de bourses phare offre une couverture totale des frais de scolarité, des manuels scolaires, des uniformes et un mentorat pour les étudiants très performants issus de familles à faible revenu à travers le Cameroun. Nous soutenons les étudiants du niveau primaire jusqu'à l'université.",
        "highlights": ["Frais de Scolarité Couverts", "Programme de Mentorat", "Du Primaire à l'Université"],
        "stats": ["8 Boursiers", "Forte Rétention", "4 Écoles", "2 Régions"],
        "imageCaption": "Autonomiser les futurs leaders"
      },
      {
        "id": "clean-water-initiative",
        "badge": "Infrastructure",
        "title": "Initiative pour l'Eau Potable",
        "desc": "Fournir de l'eau potable salubre et accessible aux communautés rurales et confrontées à la pénurie d'eau grâce au forage de puits, à des systèmes de purification de l'eau et à la formation à l'entretien local. Nous croyons que l'eau potable est la première étape vers la santé.",
        "highlights": ["Forage de Puits", "Purification de l'Eau", "Formation à l'Entretien"],
        "stats": ["18 Puits", "28k+ Personnes", "22 Villages", "3 Régions"],
        "imageCaption": "De l'eau potable pour chaque village"
      },
      {
        "id": "teacher-rewards",
        "badge": "Excellence Enseignante",
        "title": "Programme de Récompenses des Enseignants",
        "desc": "Reconnaître et récompenser les éducateurs dévoués dans les communautés mal desservies. Nous offrons des subventions financières, un développement professionnel et une reconnaissance communautaire à ceux qui se surpassent pour leurs étudiants.",
        "highlights": ["Subventions Financières", "Formation Professionnelle", "Réseau de Pairs"],
        "stats": ["6 Enseignants", "2 Régions", "4 Sessions", "Cohorte Pilote"],
        "imageCaption": "Honorer les éducateurs dévoués"
      },
      {
        "id": "community-health-support",
        "badge": "Soins de Santé",
        "title": "Soutien à la Santé Communautaire",
        "desc": "Des cliniques de santé mobiles et des programmes de sensibilisation médicale qui amènent des médecins, des infirmières et des médicaments essentiels directement aux familles dans les zones éloignées et mal desservies du Cameroun.",
        "highlights": ["Cliniques Mobiles", "Santé Maternelle", "Prévention du Paludisme"],
        "stats": ["42k+ Patients", "6 Cliniques", "85 Formés", "5 Régions"],
        "imageCaption": "Soins de santé à portée de main"
      },
      {
        "id": "single-mothers-assistance",
        "badge": "Soutien Social",
        "title": "Assistance aux Mères Célibataires",
        "desc": "Autonomiser les mères célibataires et les veuves grâce à des micro-subventions, une formation professionnelle (couture, restauration, TIC), un soutien psychologique post-traumatique et une aide à la garde d'enfants pour favoriser l'indépendance économique.",
        "highlights": ["Micro-subventions", "Formation Professionnelle", "Soutien Traumatique"],
        "stats": ["10 Femmes", "4 Entreprises", "7 Actives", "2 Régions"],
        "imageCaption": "Restaurer l'espoir et la dignité"
      },
      {
        "id": "youth-empowerment",
        "badge": "Développement des Jeunes",
        "title": "Programme d'Autonomisation des Jeunes",
        "desc": "Construire la prochaine génération d'acteurs du changement camerounais grâce au développement du leadership, à la formation professionnelle, à des camps d'entraînement à la littératie numérique et à un financement de démarrage pour les jeunes entrepreneurs.",
        "highlights": ["Formation en Leadership", "Compétences Numériques", "Financement de Démarrage"],
        "stats": ["12 Jeunes", "3 Entreprises", "Placement Continu", "2 Régions"],
        "imageCaption": "Construire les leaders de demain"
      }
    ]
  }
};

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.programs = programsEn;
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));
frData.programs = programsFr;
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2));

console.log('Programs translations added successfully.');
