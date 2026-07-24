export interface PublicImpactStat {
    id: string;
    key: string;
    value: string;
    label: string;
    section: string;
    order: number;
}

export const fetchPublicStats = async (): Promise<PublicImpactStat[]> => {
    try {
        const url = import.meta.env.VITE_SUPABASE_URL;
        const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
        
        if (!url || !key) {
            console.warn('Supabase URL or Key not found in env, falling back to static stats');
            return [];
        }

        const res = await fetch(`${url}/rest/v1/public_impact_stats?select=*&order=order.asc`, {
            headers: {
                apikey: key,
                Authorization: `Bearer ${key}`
            }
        });
        
        if (!res.ok) throw new Error('Failed to fetch stats');
        
        const data = await res.json();
        return data as PublicImpactStat[];
    } catch (error) {
        console.error('Error fetching public stats:', error);
        return [];
    }
};
