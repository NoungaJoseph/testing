const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en/translation.json');
const frPath = path.join(__dirname, 'src/locales/fr/translation.json');

const programDetailEn = {
  "not_found": {
    "title": "Programme Not Found",
    "desc": "We couldn't locate this programme. Browse all our programmes below.",
    "btn": "View All Programs"
  },
  "sections": {
    "about": "About This Programme",
    "goals": "Programme Goals",
    "serve": "Who We Serve",
    "gallery": "Programme Gallery",
    "milestones": "Milestones",
    "apply": {
      "title": "Apply for Support",
      "desc": "Think you or someone you know qualifies for this programme? Fill in our application form and our team will be in touch.",
      "btn_apply": "Apply Now",
      "btn_donate": "Donate to This Programme"
    },
    "partner": {
      "title": "Partner or Volunteer",
      "desc": "Organisations and individuals can partner with us to scale this programme.",
      "btn": "Partner With Us"
    },
    "back": "Back to All Programmes"
  },
  "programs": {
    "scholarships": {
      "title": "Scholarships Programme",
      "subtitle": "Education for Every Child in Cameroon",
      "category": "Education",
      "description": "Our flagship scholarship programme provides full-tuition coverage, textbooks, uniforms, and mentorship for high-achieving students from low-income families across Cameroon.",
      "longDesc": "Every talented child in Cameroon deserves the opportunity to pursue their education regardless of their family's financial situation. Our scholarship programme removes financial barriers by funding primary, secondary, and university education. We identify top-performing students through partner schools and community nominations, then provide comprehensive support that goes beyond fees to include stationery, uniforms, and access to mentorship networks.",
      "goals": [
        "Support 10 new students in the next intake cycle",
        "Maintain strong completion and retention for all scholars",
        "Build active collaboration with 4 partner schools",
        "Start a mentor circle for scholarship beneficiaries"
      ],
      "beneficiaries": ["Primary school pupils aged 6–12", "Secondary school students aged 13–18", "University students aged 18–25", "Students from displaced or conflict-affected families"],
      "stats": [{ "label": "Students Funded", "value": "8" }, { "label": "Graduation Rate", "value": "92%" }, { "label": "Partner Schools", "value": "4" }],
      "milestones": [
        { "year": "2025", "event": "Launched with 3 inaugural scholarship recipients." },
        { "year": "2025", "event": "Expanded to cover university-level education in Yaoundé and Douala." },
        { "year": "2026", "event": "Reached 8 active scholarship beneficiaries." }
      ]
    },
    "scholarships-primary": {
      "title": "Primary School Support",
      "subtitle": "Building Foundations for the Future",
      "category": "Education",
      "description": "Covering full school fees, uniforms, textbooks, and school supplies for primary school children from families in financial hardship.",
      "longDesc": "Primary education is the critical foundation for lifelong learning. Our primary school support streams ensure that no child is turned away from school due to inability to pay fees. We work with community leaders to identify the most in-need families and provide complete academic packages so children can attend school with dignity.",
      "goals": ["Support 6 primary pupils this academic year", "Provide full stationery kits each term", "Train supported children in digital literacy basics"],
      "beneficiaries": ["Children aged 6–12", "Orphans and children of single mothers", "Children in rural and peri-urban areas"],
      "stats": [{ "label": "Children Supported", "value": "6" }, { "label": "Schools Covered", "value": "3" }, { "label": "Regions", "value": "5" }],
      "milestones": [{ "year": "2025", "event": "First cohort of 3 primary pupils enrolled." }, { "year": "2026", "event": "Expanded to 6 supported children across 2 regions." }]
    },
    "scholarships-secondary": {
      "title": "Secondary School Support",
      "subtitle": "Supporting the Critical Teen Years",
      "category": "Education",
      "description": "Comprehensive secondary school scholarship covering fees, boarding where needed, textbooks, and exam preparation support for BEPC and GCE candidates.",
      "longDesc": "Secondary school is where many Cameroonian students drop out due to financial pressure — especially when boarding school fees are involved. Our secondary programme provides holistic support including boarding allowances, examination preparation classes, and career guidance to help students make informed choices about higher education.",
      "goals": ["Fund 5 secondary students this academic year", "Improve exam readiness through mentorship support", "Provide practical career guidance for each student"],
      "beneficiaries": ["Students aged 13–18", "Students in boarding or distant schools", "First-generation secondary students"],
      "stats": [{ "label": "Students Funded", "value": "5" }, { "label": "Exam Readiness", "value": "88%" }, { "label": "Boarding Grants", "value": "2" }],
      "milestones": [{ "year": "2025", "event": "Secondary track launched with 2 students." }, { "year": "2026", "event": "91% national exam pass rate recorded." }]
    },
    "scholarships-university": {
      "title": "University Support",
      "subtitle": "Fuelling the Next Generation of Leaders",
      "category": "Education",
      "description": "University grants covering tuition, accommodation support, and access to professional mentorship networks for high-performing students at Cameroonian universities.",
      "longDesc": "University-level funding is among the most impactful interventions we make. A university-educated graduate changes the trajectory of their entire family. Our university grants are merit-based with financial need priority, covering fees at public and accredited private universities in Cameroon, supplemented by mentorship from professionals in the student's field of study.",
      "goals": ["Fund 3 university students in the current cycle", "Connect students with internship and mentorship opportunities", "Support graduation and transition planning"],
      "beneficiaries": ["Undergraduates at Cameroonian universities", "Students in STEM, Healthcare, Law, and Education fields", "First-generation university students"],
      "stats": [{ "label": "University Grants", "value": "3" }, { "label": "Academic Standing", "value": "Good" }, { "label": "Mentorship Matches", "value": "3" }],
      "milestones": [{ "year": "2025", "event": "First university scholarship awarded in Yaounde." }, { "year": "2026", "event": "87% employment rate for programme graduates." }]
    },
    "clean-water-initiative": {
      "title": "Clean Water Initiative",
      "subtitle": "Safe Water for Every Cameroonian Family",
      "category": "Infrastructure",
      "description": "Drilling boreholes, installing water purification systems, and building sanitation facilities in water-scarce communities across Cameroon.",
      "longDesc": "Access to clean water is a fundamental human right, yet millions of Cameroonians still walk hours daily to collect unsafe water. Our clean water initiative identifies communities with the highest need, funds borehole drilling and pump installation, trains local maintenance committees, and conducts hygiene education to ensure long-term sustainability of each project.",
      "goals": ["Complete 3 borehole projects in priority communities", "Reach nearby households with safe water access", "Train maintenance committees in 100% of project communities", "Conduct quarterly water quality testing"],
      "beneficiaries": ["Rural households without pipe-borne water", "Schools lacking safe drinking water", "Health centres in underserved areas", "Women who currently carry water over long distances"],
      "stats": [{ "label": "Boreholes Drilled", "value": "3" }, { "label": "Beneficiaries", "value": "120+" }, { "label": "Communities", "value": "3" }],
      "milestones": [
        { "year": "2025", "event": "First borehole completed in Littoral region." },
        { "year": "2025", "event": "Expanded to South West and North West regions." },
        { "year": "2026", "event": "Three boreholes operational with local maintenance teams." }
      ]
    },
    "teacher-rewards": {
      "title": "Teacher Rewards Programme",
      "subtitle": "Honouring the Backbone of Education",
      "category": "Education",
      "description": "Financial grants, professional development, and public recognition for outstanding teachers who go above and beyond for their students in underserved communities.",
      "longDesc": "Teachers are the most powerful force in any education system. In Cameroon, dedicated teachers often work in difficult conditions with minimal resources. Our Teacher Rewards Programme identifies, publicly celebrates, and financially supports exceptional teachers nominated by their school communities. Beyond financial rewards, we fund professional training, provide teaching materials, and create a peer network of excellence.",
      "goals": ["Recognize 6 teachers through pilot awards", "Provide modest classroom grants to selected teachers", "Host practical training sessions for partner teachers", "Document teacher-impact case studies"],
      "beneficiaries": ["Primary and secondary school teachers", "Teachers in rural and hard-to-reach areas", "Recently-qualified teachers lacking resources"],
      "stats": [{ "label": "Teachers Awarded", "value": "6" }, { "label": "Regions Covered", "value": "2" }, { "label": "Training Sessions", "value": "4" }],
      "milestones": [{ "year": "2025", "event": "Pilot recognition ceremony held in Yaounde." }, { "year": "2026", "event": "Programme expanded to 2 regions with 6 teachers recognized." }]
    },
    "community-health-support": {
      "title": "Community Health Support",
      "subtitle": "Bringing Healthcare Closer to Every Family",
      "category": "Healthcare",
      "description": "Mobile health clinics, medication supply campaigns, maternal health programmes, and preventive care outreach for underserved communities.",
      "longDesc": "Quality healthcare remains out of reach for millions of Cameroonians due to distance, cost, and lack of health workers. Our community health programme deploys mobile clinics to underserved areas, staffed by volunteer nurses, doctors, and community health workers. We run malaria prevention, maternal and child health, nutrition, and screening programmes — ensuring every family can access basic healthcare regardless of location or income.",
      "goals": ["Run 4 mobile outreach clinic days monthly", "Serve identified families with essential care", "Train 8 community health volunteers", "Achieve 80% malaria net coverage in target areas"],
      "beneficiaries": ["Pregnant women and new mothers", "Children under 5", "Elderly community members", "Residents more than 5km from the nearest health facility"],
      "stats": [{ "label": "Patients Served", "value": "90+" }, { "label": "Mobile Clinics", "value": "2" }, { "label": "Health Workers Trained", "value": "8" }],
      "milestones": [{ "year": "2025", "event": "First mobile clinic deployed in North West region." }, { "year": "2026", "event": "Two recurring clinic points established in partner communities." }]
    },
    "single-mothers-assistance": {
      "title": "Single Mothers Assistance",
      "subtitle": "Supporting Women Who Support Families",
      "category": "Social Support",
      "description": "Micro-grants, skills training, trauma counselling, childcare support, and livelihood assistance for single mothers and widows across Cameroon.",
      "longDesc": "Single mothers in Cameroon bear immense burdens — raising children alone, often with no income source, no formal education, and no support network. Our programme wraps around each beneficiary: financial micro-grants to start small businesses, practical skills training in tailoring, catering, cosmetology, and agriculture; trauma and psychosocial counselling; and access to childcare to free mothers for training and work. We track outcomes for 12 months post-programme to ensure lasting impact.",
      "goals": ["Enroll 10 single mothers and widows in the pilot cycle", "Provide practical livelihood coaching", "Support small business starter grants", "Establish childcare partnerships in 5 regions"],
      "beneficiaries": ["Single mothers with children under 18", "War widows and conflict-affected women", "Women who have experienced domestic violence", "Women with no formal income source"],
      "stats": [{ "label": "Women Enrolled", "value": "10" }, { "label": "Businesses Started", "value": "4" }, { "label": "Active Graduates", "value": "7" }],
      "milestones": [{ "year": "2025", "event": "Programme launched in Bafoussam with an initial pilot cohort." }, { "year": "2026", "event": "Expanded support to 10 women in active training and livelihood support." }]
    },
    "youth-empowerment": {
      "title": "Youth Empowerment",
      "subtitle": "Building the Changemakers of Tomorrow",
      "category": "Youth",
      "description": "Leadership development, vocational training, digital skills, and entrepreneurship programmes for young people aged 15–35 across Cameroon.",
      "longDesc": "Youth account for over 60% of Cameroon's population yet face high unemployment and limited opportunities. Our Youth Empowerment programme combines leadership training, practical vocational skills (welding, plumbing, ICT, agriculture), digital literacy, and business mentorship with seed funding for promising youth entrepreneurs. We run residential bootcamps, apprenticeships, and ongoing coaching sessions throughout the year.",
      "goals": ["Train 12 young people in the first cohort", "Offer employability and entrepreneurship coaching", "Support 3 youth-led micro ventures", "Build a starter mentorship network"],
      "beneficiaries": ["Youth aged 15–35 without formal employment", "School dropouts seeking vocational paths", "Young entrepreneurs with business ideas", "University graduates who are unemployed"],
      "stats": [{ "label": "Youth Trained", "value": "12" }, { "label": "Businesses Funded", "value": "3" }, { "label": "Placement Progress", "value": "Ongoing" }],
      "milestones": [{ "year": "2025", "event": "First youth pilot cohort completed training sessions." }, { "year": "2026", "event": "Three youth-led ventures received starter support." }]
    }
  }
};

const programDetailFr = {
  "not_found": {
    "title": "Programme Introuvable",
    "desc": "Nous n'avons pas pu localiser ce programme. Parcourez tous nos programmes ci-dessous.",
    "btn": "Voir Tous les Programmes"
  },
  "sections": {
    "about": "À Propos de ce Programme",
    "goals": "Objectifs du Programme",
    "serve": "Ceux Que Nous Servons",
    "gallery": "Galerie du Programme",
    "milestones": "Jalons",
    "apply": {
      "title": "Demander de l'Aide",
      "desc": "Pensez-vous que vous ou quelqu'un que vous connaissez êtes éligible à ce programme ? Remplissez notre formulaire de candidature et notre équipe vous contactera.",
      "btn_apply": "Postuler Maintenant",
      "btn_donate": "Faire un Don à ce Programme"
    },
    "partner": {
      "title": "Partenaire ou Bénévole",
      "desc": "Les organisations et les individus peuvent s'associer à nous pour étendre ce programme.",
      "btn": "S'associer avec Nous"
    },
    "back": "Retour à Tous les Programmes"
  },
  "programs": {
    "scholarships": {
      "title": "Programme de Bourses",
      "subtitle": "L'Éducation pour Chaque Enfant au Cameroun",
      "category": "Éducation",
      "description": "Notre programme de bourses phare offre une couverture totale des frais de scolarité, des manuels scolaires, des uniformes et un mentorat pour les étudiants très performants issus de familles à faible revenu à travers le Cameroun.",
      "longDesc": "Chaque enfant talentueux au Cameroun mérite l'opportunité de poursuivre ses études indépendamment de la situation financière de sa famille. Notre programme de bourses élimine les obstacles financiers en finançant l'enseignement primaire, secondaire et universitaire. Nous identifions les élèves les plus performants par l'intermédiaire d'écoles partenaires et de nominations communautaires, puis nous fournissons un soutien complet qui va au-delà des frais pour inclure la papeterie, les uniformes et l'accès à des réseaux de mentorat.",
      "goals": [
        "Soutenir 10 nouveaux étudiants lors du prochain cycle d'admission",
        "Maintenir un fort taux d'achèvement et de rétention pour tous les boursiers",
        "Construire une collaboration active avec 4 écoles partenaires",
        "Créer un cercle de mentorat pour les bénéficiaires de bourses"
      ],
      "beneficiaries": ["Élèves du primaire âgés de 6 à 12 ans", "Élèves du secondaire âgés de 13 à 18 ans", "Étudiants universitaires âgés de 18 à 25 ans", "Étudiants issus de familles déplacées ou touchées par un conflit"],
      "stats": [{ "label": "Étudiants Financés", "value": "8" }, { "label": "Taux d'Obtention de Diplôme", "value": "92%" }, { "label": "Écoles Partenaires", "value": "4" }],
      "milestones": [
        { "year": "2025", "event": "Lancement avec 3 boursiers inauguraux." },
        { "year": "2025", "event": "Expansion pour couvrir l'enseignement universitaire à Yaoundé et Douala." },
        { "year": "2026", "event": "Atteint 8 bénéficiaires actifs de bourses." }
      ]
    },
    "scholarships-primary": {
      "title": "Soutien à l'École Primaire",
      "subtitle": "Bâtir les Fondations pour l'Avenir",
      "category": "Éducation",
      "description": "Couverture complète des frais de scolarité, uniformes, manuels et fournitures scolaires pour les enfants du primaire issus de familles en difficulté financière.",
      "longDesc": "L'enseignement primaire est le fondement critique de l'apprentissage tout au long de la vie. Nos filières de soutien à l'école primaire garantissent qu'aucun enfant n'est renvoyé de l'école en raison de son incapacité à payer les frais. Nous travaillons avec des leaders communautaires pour identifier les familles qui en ont le plus besoin et fournissons des packages académiques complets pour que les enfants puissent aller à l'école dans la dignité.",
      "goals": ["Soutenir 6 élèves du primaire cette année académique", "Fournir des kits de papeterie complets chaque trimestre", "Former les enfants soutenus aux bases de la littératie numérique"],
      "beneficiaries": ["Enfants âgés de 6 à 12 ans", "Orphelins et enfants de mères célibataires", "Enfants des zones rurales et périurbaines"],
      "stats": [{ "label": "Enfants Soutenus", "value": "6" }, { "label": "Écoles Couvertes", "value": "3" }, { "label": "Régions", "value": "5" }],
      "milestones": [{ "year": "2025", "event": "Première cohorte de 3 élèves du primaire inscrits." }, { "year": "2026", "event": "Expansion à 6 enfants soutenus dans 2 régions." }]
    },
    "scholarships-secondary": {
      "title": "Soutien à l'École Secondaire",
      "subtitle": "Soutenir les Années Critiques de l'Adolescence",
      "category": "Éducation",
      "description": "Bourse complète pour l'école secondaire couvrant les frais, l'internat si nécessaire, les manuels scolaires et le soutien à la préparation des examens pour les candidats au BEPC et au GCE.",
      "longDesc": "L'école secondaire est l'endroit où de nombreux étudiants camerounais abandonnent en raison de pressions financières, en particulier lorsque des frais d'internat sont impliqués. Notre programme secondaire offre un soutien holistique comprenant des allocations d'internat, des cours de préparation aux examens et une orientation professionnelle pour aider les étudiants à faire des choix éclairés concernant l'enseignement supérieur.",
      "goals": ["Financer 5 élèves du secondaire cette année académique", "Améliorer la préparation aux examens grâce à un soutien par mentorat", "Fournir une orientation professionnelle pratique à chaque élève"],
      "beneficiaries": ["Étudiants âgés de 13 à 18 ans", "Étudiants en internat ou dans des écoles éloignées", "Étudiants du secondaire de première génération"],
      "stats": [{ "label": "Étudiants Financés", "value": "5" }, { "label": "Préparation aux Examens", "value": "88%" }, { "label": "Bourses d'Internat", "value": "2" }],
      "milestones": [{ "year": "2025", "event": "Filière secondaire lancée avec 2 étudiants." }, { "year": "2026", "event": "Taux de réussite à l'examen national de 91% enregistré." }]
    },
    "scholarships-university": {
      "title": "Soutien Universitaire",
      "subtitle": "Alimenter la Prochaine Génération de Leaders",
      "category": "Éducation",
      "description": "Subventions universitaires couvrant les frais de scolarité, l'aide au logement et l'accès à des réseaux de mentorat professionnel pour les étudiants très performants des universités camerounaises.",
      "longDesc": "Le financement au niveau universitaire est l'une de nos interventions les plus percutantes. Un diplômé ayant fait des études universitaires change la trajectoire de toute sa famille. Nos subventions universitaires sont fondées sur le mérite avec priorité aux besoins financiers, couvrant les frais dans les universités publiques et privées accréditées au Cameroun, complétées par le mentorat de professionnels dans le domaine d'études de l'étudiant.",
      "goals": ["Financer 3 étudiants universitaires dans le cycle actuel", "Connecter les étudiants aux opportunités de stage et de mentorat", "Soutenir la planification de l'obtention du diplôme et de la transition"],
      "beneficiaries": ["Étudiants de premier cycle dans les universités camerounaises", "Étudiants dans les domaines STEM, de la Santé, du Droit et de l'Éducation", "Étudiants universitaires de première génération"],
      "stats": [{ "label": "Subventions Universitaires", "value": "3" }, { "label": "Statut Académique", "value": "Bon" }, { "label": "Correspondances de Mentorat", "value": "3" }],
      "milestones": [{ "year": "2025", "event": "Première bourse universitaire accordée à Yaoundé." }, { "year": "2026", "event": "Taux d'emploi de 87% pour les diplômés du programme." }]
    },
    "clean-water-initiative": {
      "title": "Initiative pour l'Eau Potable",
      "subtitle": "De l'Eau Salubre pour Chaque Famille Camerounaise",
      "category": "Infrastructure",
      "description": "Forage de puits, installation de systèmes de purification de l'eau et construction d'installations sanitaires dans les communautés confrontées à la pénurie d'eau à travers le Cameroun.",
      "longDesc": "L'accès à l'eau potable est un droit humain fondamental, pourtant des millions de Camerounais marchent encore des heures chaque jour pour collecter de l'eau insalubre. Notre initiative pour l'eau potable identifie les communautés où les besoins sont les plus importants, finance le forage de puits et l'installation de pompes, forme des comités d'entretien locaux et dispense une éducation à l'hygiène pour assurer la viabilité à long terme de chaque projet.",
      "goals": ["Achever 3 projets de puits dans les communautés prioritaires", "Permettre aux ménages voisins d'accéder à l'eau potable", "Former des comités d'entretien dans 100% des communautés de projet", "Effectuer des tests trimestriels de qualité de l'eau"],
      "beneficiaries": ["Ménages ruraux sans eau courante", "Écoles manquant d'eau potable", "Centres de santé dans les zones mal desservies", "Femmes qui transportent actuellement de l'eau sur de longues distances"],
      "stats": [{ "label": "Puits Forés", "value": "3" }, { "label": "Bénéficiaires", "value": "120+" }, { "label": "Communautés", "value": "3" }],
      "milestones": [
        { "year": "2025", "event": "Premier puits achevé dans la région du Littoral." },
        { "year": "2025", "event": "Expansion dans les régions du Sud-Ouest et du Nord-Ouest." },
        { "year": "2026", "event": "Trois puits opérationnels avec des équipes d'entretien locales." }
      ]
    },
    "teacher-rewards": {
      "title": "Programme de Récompenses des Enseignants",
      "subtitle": "Honorer la Colonne Vertébrale de l'Éducation",
      "category": "Éducation",
      "description": "Subventions financières, développement professionnel et reconnaissance publique pour les enseignants exceptionnels qui se surpassent pour leurs étudiants dans les communautés mal desservies.",
      "longDesc": "Les enseignants sont la force la plus puissante de tout système éducatif. Au Cameroun, les enseignants dévoués travaillent souvent dans des conditions difficiles avec des ressources minimales. Notre programme de récompenses des enseignants identifie, célèbre publiquement et soutient financièrement les enseignants exceptionnels nominés par leurs communautés scolaires. Au-delà des récompenses financières, nous finançons la formation professionnelle, fournissons du matériel pédagogique et créons un réseau de pairs d'excellence.",
      "goals": ["Reconnaître 6 enseignants par le biais de récompenses pilotes", "Fournir de modestes subventions de classe à des enseignants sélectionnés", "Organiser des sessions de formation pratique pour les enseignants partenaires", "Documenter les études de cas sur l'impact des enseignants"],
      "beneficiaries": ["Enseignants des écoles primaires et secondaires", "Enseignants dans les zones rurales et difficiles d'accès", "Enseignants récemment qualifiés manquant de ressources"],
      "stats": [{ "label": "Enseignants Récompensés", "value": "6" }, { "label": "Régions Couvertes", "value": "2" }, { "label": "Sessions de Formation", "value": "4" }],
      "milestones": [{ "year": "2025", "event": "Cérémonie pilote de reconnaissance tenue à Yaoundé." }, { "year": "2026", "event": "Programme étendu à 2 régions avec 6 enseignants reconnus." }]
    },
    "community-health-support": {
      "title": "Soutien à la Santé Communautaire",
      "subtitle": "Rapprocher les Soins de Santé de Chaque Famille",
      "category": "Soins de Santé",
      "description": "Cliniques de santé mobiles, campagnes de fourniture de médicaments, programmes de santé maternelle et actions de soins préventifs pour les communautés mal desservies.",
      "longDesc": "Des soins de santé de qualité restent hors de portée pour des millions de Camerounais en raison de la distance, du coût et du manque d'agents de santé. Notre programme de santé communautaire déploie des cliniques mobiles dans les zones mal desservies, composées d'infirmières, de médecins et d'agents de santé communautaires bénévoles. Nous menons des programmes de prévention du paludisme, de santé maternelle et infantile, de nutrition et de dépistage — en veillant à ce que chaque famille puisse accéder aux soins de santé de base indépendamment de son emplacement ou de ses revenus.",
      "goals": ["Gérer 4 jours de cliniques mobiles de proximité par mois", "Servir les familles identifiées avec des soins essentiels", "Former 8 bénévoles en santé communautaire", "Atteindre une couverture en moustiquaires de 80% dans les zones cibles"],
      "beneficiaries": ["Femmes enceintes et nouvelles mères", "Enfants de moins de 5 ans", "Membres âgés de la communauté", "Résidents à plus de 5 km du centre de santé le plus proche"],
      "stats": [{ "label": "Patients Servis", "value": "90+" }, { "label": "Cliniques Mobiles", "value": "2" }, { "label": "Agents de Santé Formés", "value": "8" }],
      "milestones": [{ "year": "2025", "event": "Première clinique mobile déployée dans la région du Nord-Ouest." }, { "year": "2026", "event": "Deux points de clinique récurrents établis dans les communautés partenaires." }]
    },
    "single-mothers-assistance": {
      "title": "Assistance aux Mères Célibataires",
      "subtitle": "Soutenir les Femmes qui Soutiennent les Familles",
      "category": "Soutien Social",
      "description": "Micro-subventions, formation professionnelle, conseil psychologique, aide à la garde d'enfants et aide aux moyens de subsistance pour les mères célibataires et les veuves à travers le Cameroun.",
      "longDesc": "Les mères célibataires au Cameroun portent d'immenses fardeaux — élever des enfants seules, souvent sans source de revenus, sans éducation formelle et sans réseau de soutien. Notre programme entoure chaque bénéficiaire : des micro-subventions financières pour démarrer de petites entreprises, une formation pratique en couture, restauration, cosmétologie et agriculture ; des conseils psychologiques et post-traumatiques ; et un accès à des services de garde pour libérer les mères pour la formation et le travail. Nous suivons les résultats pendant 12 mois après le programme pour assurer un impact durable.",
      "goals": ["Inscrire 10 mères célibataires et veuves dans le cycle pilote", "Fournir un encadrement pratique pour les moyens de subsistance", "Soutenir les subventions de démarrage pour les petites entreprises", "Établir des partenariats de garde d'enfants dans 5 régions"],
      "beneficiaries": ["Mères célibataires avec des enfants de moins de 18 ans", "Veuves de guerre et femmes touchées par un conflit", "Femmes ayant subi des violences domestiques", "Femmes sans source de revenus formelle"],
      "stats": [{ "label": "Femmes Inscrites", "value": "10" }, { "label": "Entreprises Démarrées", "value": "4" }, { "label": "Diplômées Actives", "value": "7" }],
      "milestones": [{ "year": "2025", "event": "Programme lancé à Bafoussam avec une cohorte pilote initiale." }, { "year": "2026", "event": "Soutien étendu à 10 femmes en formation active et en soutien aux moyens de subsistance." }]
    },
    "youth-empowerment": {
      "title": "Autonomisation des Jeunes",
      "subtitle": "Construire les Acteurs du Changement de Demain",
      "category": "Jeunesse",
      "description": "Développement du leadership, formation professionnelle, compétences numériques et programmes d'entrepreneuriat pour les jeunes âgés de 15 à 35 ans à travers le Cameroun.",
      "longDesc": "Les jeunes représentent plus de 60% de la population du Cameroun, mais ils sont confrontés à un chômage élevé et à des opportunités limitées. Notre programme d'autonomisation des jeunes associe formation en leadership, compétences professionnelles pratiques (soudure, plomberie, TIC, agriculture), littératie numérique et mentorat d'entreprise avec un financement de démarrage pour les jeunes entrepreneurs prometteurs. Nous organisons des camps de base résidentiels, des apprentissages et des sessions de coaching continu tout au long de l'année.",
      "goals": ["Former 12 jeunes dans la première cohorte", "Offrir un encadrement en employabilité et en entrepreneuriat", "Soutenir 3 micro-entreprises dirigées par des jeunes", "Construire un réseau de mentorat de démarrage"],
      "beneficiaries": ["Jeunes de 15 à 35 ans sans emploi formel", "Décrocheurs scolaires cherchant des voies professionnelles", "Jeunes entrepreneurs ayant des idées d'affaires", "Diplômés universitaires au chômage"],
      "stats": [{ "label": "Jeunes Formés", "value": "12" }, { "label": "Entreprises Financées", "value": "3" }, { "label": "Progrès du Placement", "value": "En cours" }],
      "milestones": [{ "year": "2025", "event": "La première cohorte pilote de jeunes a terminé ses sessions de formation." }, { "year": "2026", "event": "Trois entreprises dirigées par des jeunes ont reçu un soutien de démarrage." }]
    }
  }
};

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
enData.program_detail = programDetailEn;
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

const frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));
frData.program_detail = programDetailFr;
fs.writeFileSync(frPath, JSON.stringify(frData, null, 2));

console.log('Program detail translations added successfully.');
