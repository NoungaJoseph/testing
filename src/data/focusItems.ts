export interface FocusItem {
    slug: string;
    title: string;
    image: string;
    count: string;
    shortDesc: string;
    longDesc: string[];
    impactPoints: string[];
    gallery?: string[];
}

export const focusItems: FocusItem[] = [
    {
        slug: 'clean-water',
        title: 'Clean Water Access',
        image: '/assets/focus communities/boreholes drilled.png',
        count: '3 boreholes completed',
        shortDesc: 'We fund, drill, and maintain boreholes and water purification systems in water-scarce communities.',
        longDesc: [
            'Enako Outreach partners with local leaders to survey needs and select sustainable locations for boreholes.',
            'Each project includes community training on maintenance, establishment of water committees, and simple monitoring to ensure long-term functionality.',
            'We complement drilling with hygiene promotion and small-scale water treatment where needed.'
        ],
        impactPoints: [
            'Improved access to safe drinking water for families',
            'Reduced time spent collecting water (especially for women and children)',
            'Lower incidence of waterborne disease in served communities'
        ],
        gallery: ['/assets/focus communities/boreholes drilled.png']
    },
    {
        slug: 'healthcare',
        title: 'Healthcare Outreach',
        image: '/assets/focus communities/mobile clinics.png',
        count: '4 mobile clinic days',
        shortDesc: 'Mobile clinics and preventive health campaigns reach thousands in remote areas.',
        longDesc: [
            'Our mobile clinics provide vaccinations, basic diagnostics, and maternal health services on a rotating schedule.',
            'We coordinate with regional health authorities to supply essential medication and referrals for complex cases.',
            'Health education sessions accompany clinical visits to increase community resilience.'
        ],
        impactPoints: [
            'Vaccinations and preventive care for children',
            'Maternal and neonatal health support',
            'Community health education and referrals'
        ],
        gallery: ['/assets/focus communities/mobile clinics.png']
    },
    {
        slug: 'education',
        title: 'Education Support',
        image: '/assets/focus communities/scholarships.png',
        count: '8 scholarships',
        shortDesc: 'Scholarships and school rehabilitation to improve learning outcomes.',
        longDesc: [
            'Scholarships cover tuition, uniforms, and basic supplies to keep children in school.',
            'We rehabilitate classrooms, provide teaching materials, and offer teacher training in partner schools.',
            'Programs prioritise girls and disadvantaged students to reduce dropout rates.'
        ],
        impactPoints: [
            'Increased school attendance and completion rates',
            'Improved learning environments through rehabilitation',
            'Support for teacher capacity building'
        ],
        gallery: ['/assets/focus communities/scholarships.png']
    },
    {
        slug: 'women-mothers',
        title: 'Women & Mothers',
        image: '/assets/focus communities/beneficiaries.png',
        count: '10 beneficiaries',
        shortDesc: 'Micro-grants, skills training, and childcare assistance for vulnerable women and mothers.',
        longDesc: [
            'We run livelihoods and skills programs to help women start small businesses and gain financial independence.',
            'Psychosocial support and peer networks are provided to address trauma and build community resilience.',
            'Childcare support enables mothers to participate in training and income-generating activities.'
        ],
        impactPoints: [
            'Increased household income through micro-enterprises',
            'Stronger social support networks for women',
            'Access to training and childcare resources'
        ],
        gallery: ['/assets/focus communities/beneficiaries.png']
    },
    {
        slug: 'community-relief',
        title: 'Community Relief',
        image: '/assets/focus communities/families.png',
        count: '15 families',
        shortDesc: 'Rapid-response packages and shelter support for crisis-affected families.',
        longDesc: [
            'During emergencies we coordinate food, hygiene, and shelter distributions with local partners.',
            'Our teams focus on the most vulnerable households and ensure aid is delivered efficiently and transparently.',
            'We also support recovery activities to restore livelihoods after the immediate crisis.'
        ],
        impactPoints: [
            'Timely emergency assistance',
            'Support for recovery and livelihood restoration',
            'Coordination with local actors for sustainable response'
        ],
        gallery: ['/assets/focus communities/families.png']
    }
];

export default focusItems;
