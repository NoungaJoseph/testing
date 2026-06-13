const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en/translation.json');
const frPath = path.join(__dirname, 'src/locales/fr/translation.json');

const aboutEn = {
  "hero": {
    "est": "Est. 2024",
    "title": "Driven by Purpose.",
    "title_highlight": "Guided by Impact.",
    "desc": "Empowering communities and advancing education across Cameroon through sustainable humanitarian initiatives that foster growth and resilience from our base in Douala.",
    "breadcrumb_home": "Home",
    "breadcrumb_about": "About Us",
    "mission_badge": "Our Mission",
    "mission_title": "Building a foundation for the leaders of tomorrow.",
    "mission_desc": "Enako Outreach is dedicated to creating lasting change by focusing on grassroots education and holistic community development projects in Cameroon. With our first 5 partner schools in Douala, we are about to carry out our inaugural charity mission to provide immediate support to the leaders of tomorrow.",
    "pillars": [
      { "title": "Education First", "desc": "Providing resources and building classrooms to ensure every child has access to quality learning environments." },
      { "title": "Health & Wellness", "desc": "Implementing clean water projects and medical outreach programs to improve community well-being." },
      { "title": "Local Partnership", "desc": "Working directly with community leaders to design programs that address specific local needs." }
    ]
  },
  "mission_vision": {
    "badge": "Our Purpose",
    "title": "Building a Legacy of Hope in Cameroon",
    "desc": "We are dedicated to long-term sustainable growth by addressing the core pillars of community development and educational excellence.",
    "mission_title": "Our Mission",
    "mission_desc": "To empower Cameroonian communities by providing sustainable access to quality education, essential resources, and innovative development programs.",
    "mission_points": ["Equitable Resource Distribution", "Sustainable Education Models"],
    "vision_title": "Our Vision",
    "vision_desc": "A future where every child in Cameroon has the opportunity to reach their full potential through world-class education and comprehensive community support.",
    "vision_points": ["100% Literacy and Literacy Access", "Innovation Hubs for Youth"]
  },
  "leadership": {
    "badge": "Governance & Vision",
    "title": "Our Leadership Team",
    "desc": "Meet the founder guiding Enako Outreach with a clear commitment to education, community dignity, and measurable impact.",
    "founder": {
      "role": "Founder",
      "name": "Ndolo Nako",
      "bio": "Ndolo Nako founded Enako Outreach to expand educational opportunity and practical community support for underserved families in Cameroon. Her leadership is centered on local partnership, accountability, and long-term impact that helps children, women, and communities move forward with dignity."
    },
    "cta_title": "Join Our Mission",
    "cta_desc": "We are always looking for passionate individuals and corporate partners who share our vision for a brighter future in Africa. Let's build something lasting together.",
    "cta_btn1": "Get in Touch",
    "cta_btn2": "View Careers"
  }
};

const aboutFr = {
  "hero": {
    "est": "Fondé en 2024",
    "title": "Poussés par un But.",
    "title_highlight": "Guidés par l'Impact.",
    "desc": "Autonomiser les communautés et faire progresser l'éducation à travers le Cameroun grâce à des initiatives humanitaires durables qui favorisent la croissance et la résilience depuis notre base à Douala.",
    "breadcrumb_home": "Accueil",
    "breadcrumb_about": "À Propos",
    "mission_badge": "Notre Mission",
    "mission_title": "Bâtir les fondations des leaders de demain.",
    "mission_desc": "Enako Outreach est dédié à la création d'un changement durable en se concentrant sur l'éducation de base et les projets de développement communautaire holistique au Cameroun. Avec nos 5 premières écoles partenaires à Douala, nous sommes sur le point de mener notre mission inaugurale de charité.",
    "pillars": [
      { "title": "L'Éducation d'Abord", "desc": "Fournir des ressources et construire des salles de classe pour garantir que chaque enfant ait accès à des environnements d'apprentissage de qualité." },
      { "title": "Santé et Bien-être", "desc": "Mettre en œuvre des projets d'eau potable et des programmes de sensibilisation médicale pour améliorer le bien-être." },
      { "title": "Partenariat Local", "desc": "Travailler directement avec les leaders communautaires pour concevoir des programmes qui répondent aux besoins locaux." }
    ]
  },
  "mission_vision": {
    "badge": "Notre Objectif",
    "title": "Bâtir un Héritage d'Espoir au Cameroun",
    "desc": "Nous sommes dédiés à une croissance durable à long terme en abordant les piliers fondamentaux du développement communautaire et de l'excellence éducative.",
    "mission_title": "Notre Mission",
    "mission_desc": "Autonomiser les communautés camerounaises en offrant un accès durable à une éducation de qualité, aux ressources essentielles et à des programmes de développement innovants.",
    "mission_points": ["Distribution Équitable des Ressources", "Modèles d'Éducation Durables"],
    "vision_title": "Notre Vision",
    "vision_desc": "Un avenir où chaque enfant au Cameroun a la possibilité d'atteindre son plein potentiel grâce à une éducation de classe mondiale et un soutien communautaire complet.",
    "vision_points": ["Accès 100% à l'Alphabétisation", "Centres d'Innovation pour les Jeunes"]
  },
  "leadership": {
    "badge": "Gouvernance et Vision",
    "title": "Notre Équipe Dirigeante",
    "desc": "Rencontrez la fondatrice qui guide Enako Outreach avec un engagement clair envers l'éducation, la dignité et un impact mesurable.",
    "founder": {
      "role": "Fondatrice",
      "name": "Ndolo Nako",
      "bio": "Ndolo Nako a fondé Enako Outreach pour élargir les opportunités éducatives et le soutien pratique aux familles mal desservies au Cameroun. Son leadership est centré sur le partenariat local, la responsabilité et un impact à long terme."
    },
    "cta_title": "Rejoignez Notre Mission",
    "cta_desc": "Nous sommes toujours à la recherche de personnes passionnées et d'entreprises partenaires qui partagent notre vision pour un avenir meilleur en Afrique. Bâtissons ensemble quelque chose de durable.",
    "cta_btn1": "Nous Contacter",
    "cta_btn2": "Voir les Carrières"
  }
};

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.about = aboutEn;
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));
frData.about = aboutFr;
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2));

console.log('About translations added successfully.');
