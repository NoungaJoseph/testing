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
        coverImage: '/assets/images/new_assets/impact_hero.png',
        overview: 'Douala, as the economic capital, presents unique challenges including overcrowded schools and limited access to clean water in peripheral neighborhoods. Our focus here is on rapid educational infrastructure development and youth empowerment programs.',
        populationReached: '15,000+',
        activeProjects: 0,
        plans: [],
        gallery: [
            '/assets/focus communities/boreholes drilled.png',
            '/assets/focus communities/scholarships.png'
        ]
    },
    {
        slug: 'yaounde',
        name: 'Yaoundé',
        region: 'Centre Region',
        coverImage: '/assets/images/new_assets/impact_hero.png',
        overview: 'In the political capital, our initiatives are heavily focused on supporting orphanages, vulnerable women, and providing healthcare outreach to underserved communities.',
        populationReached: '10,000+',
        activeProjects: 0,
        plans: [],
        gallery: [
            '/assets/focus communities/beneficiaries.png',
            '/assets/focus communities/mobile clinics.png'
        ]
    }
];

export const getCommunityData = (slug: string): CommunityDetailItem => {
    const found = communitiesData.find(c => c.slug === slug);
    if (found) return found;

    return {
        slug,
        name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
        region: 'Cameroon',
        coverImage: '/assets/images/new_assets/impact_hero.png',
        overview: 'We are actively assessing needs and scaling operations in this community. Field projects published by Outreach Managers will appear here live.',
        populationReached: 'Active Division',
        activeProjects: 0,
        plans: [],
        gallery: []
    };
};
