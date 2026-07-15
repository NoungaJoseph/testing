const API_URL = import.meta.env.VITE_API_URL || 'https://api.enakoos.com';

export interface PublicImpactStat {
  id: string;
  key: string;
  value: string;
  label: string;
  section: string;
  order: number;
}

export interface PublicMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  order: number;
}

export interface PublicImpactChart {
  id: string;
  label: string;
  percentage: number;
  color: string;
  order: number;
}

export interface PublicReport {
  id: string;
  title: string;
  type: string;
  data: string | null;
}

export interface ImpactDataResponse {
  stats: PublicImpactStat[];
  milestones: PublicMilestone[];
  charts: PublicImpactChart[];
  reports: PublicReport[];
}

export const getPublicImpactData = async (): Promise<ImpactDataResponse> => {
  const response = await fetch(`${API_URL}/api/v1/public/impact`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
