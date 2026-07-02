export interface CommunityPlan {
    id: string;
    title: string;
    status: 'Planned' | 'In Progress' | 'Completed';
    description: string;
}

export interface CommunityDetailItem {
    slug: string;
    name: string;
    region: string;
    coverImage: string;
    overview: string;
    populationReached: string;
    activeProjects: number;
    plans: CommunityPlan[];
    gallery: string[];
}

export const communitiesData: CommunityDetailItem[] = [
    {
        slug: 'douala',
        name: 'Douala',
        region: 'Littoral Region',
        coverImage: '/assets/images/new_assets/impact_hero.png', // Fallback image
        overview: 'Douala, as the economic capital, presents unique challenges including overcrowded schools and limited access to clean water in peripheral neighborhoods. Our focus here is on rapid educational infrastructure development and youth empowerment programs.',
        populationReached: '15,000+',
        activeProjects: 4,
        plans: [
            { id: 'p1', title: 'Douala Primary School Renovation', status: 'In Progress', description: 'Rebuilding 3 classroom blocks in the Makepe area to reduce overcrowding.' },
            { id: 'p2', title: 'Tech Hub for Youth', status: 'Planned', description: 'Establishing a digital literacy center offering free coding and IT skills.' },
            { id: 'p3', title: 'Water Sanitation Initiative', status: 'Completed', description: 'Installed 5 new boreholes serving over 2,000 families in Bonaberi.' }
        ],
        gallery: [
            '/assets/focus communities/boreholes drilled.png',
            '/assets/focus communities/scholarships.png'
        ]
    },
    // We can add other communities or let them fallback.
    // I'll add Yaoundé as another example.
    {
        slug: 'yaounde',
        name: 'Yaoundé',
        region: 'Centre Region',
        coverImage: '/assets/images/new_assets/impact_hero.png',
        overview: 'In the political capital, our initiatives are heavily focused on supporting orphanages, vulnerable women, and providing healthcare outreach to underserved communities.',
        populationReached: '10,000+',
        activeProjects: 3,
        plans: [
            { id: 'y1', title: 'Yaoundé Orphanage Support', status: 'In Progress', description: 'Monthly provisions of food, school supplies, and medical checkups for 3 major orphanages.' },
            { id: 'y2', title: 'Women Entrepreneurship Grants', status: 'Planned', description: 'Micro-grants and training for 50 single mothers to start sustainable businesses.' }
        ],
        gallery: [
            '/assets/focus communities/beneficiaries.png',
            '/assets/focus communities/mobile clinics.png'
        ]
    }
];

// Helper to get fallback data for communities that aren't fully filled out yet
export const getCommunityData = (slug: string): CommunityDetailItem => {
    const found = communitiesData.find(c => c.slug === slug);
    if (found) return found;

    // Fallback template
    return {
        slug,
        name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
        region: 'Cameroon',
        coverImage: '/assets/images/new_assets/impact_hero.png',
        overview: 'We are currently assessing needs and scaling up our operations in this community. Dedicated projects and long-term development plans are actively being drafted in collaboration with local leaders.',
        populationReached: 'Assessment Phase',
        activeProjects: 1,
        plans: [
            { id: '1', title: 'Community Needs Assessment', status: 'In Progress', description: 'Working with local chiefs and councils to identify the most urgent educational and healthcare gaps.' }
        ],
        gallery: []
    };
};
