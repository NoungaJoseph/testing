import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type FilterKey = 'all' | 'healthcare' | 'education' | 'water' | 'women' | 'emergency';

interface RegionInfo {
  id: string;
  name: string;
  city: string;
  x: number;
  y: number;
  interventions: string[];
  description: string;
  heatmap: Record<FilterKey, number>;
}

const regions: RegionInfo[] = [
  {
    id: 'littoral',
    name: 'Littoral Region',
    city: 'Douala',
    x: 28.4,
    y: 73.6,
    interventions: ['Clean Water Support', 'Healthcare Assistance', 'Emergency Relief'],
    description:
      'Douala, the economic capital, faces rapid urbanisation challenges. We deliver clean water systems, mobile healthcare clinics, and emergency relief to informal settlements.',
    heatmap: { all: 0.9, healthcare: 0.9, education: 0.5, water: 0.95, women: 0.6, emergency: 0.85 },
  },
  {
    id: 'centre',
    name: 'Centre Region',
    city: 'Yaounde',
    x: 51.3,
    y: 78,
    interventions: ['Scholarship Support', 'School Rehabilitation', 'Teacher Rewards'],
    description:
      'Yaounde hosts our scholarship headquarters. We fund secondary and university students, rehabilitate schools, and recognise outstanding teachers across the Centre region.',
    heatmap: { all: 0.8, healthcare: 0.4, education: 0.95, water: 0.3, women: 0.55, emergency: 0.3 },
  },
  {
    id: 'northwest',
    name: 'North West Region',
    city: 'Bamenda',
    x: 25,
    y: 58,
    interventions: ['Emergency Relief', 'Women & Single Mother Support', 'Healthcare'],
    description:
      'The North West region has experienced significant humanitarian need. We provide emergency relief, healthcare supplies, and dedicated support for women and single mothers.',
    heatmap: { all: 0.95, healthcare: 0.85, education: 0.6, water: 0.7, women: 0.95, emergency: 0.99 },
  },
  {
    id: 'southwest',
    name: 'South West Region',
    city: 'Buea',
    x: 19.7,
    y: 67,
    interventions: ['Emergency Relief', 'Clean Water', 'School Rehabilitation'],
    description:
      'Buea and surrounding communities receive emergency relief packages and clean water infrastructure. We partner with local schools for rehabilitation and student support.',
    heatmap: { all: 0.85, healthcare: 0.7, education: 0.65, water: 0.8, women: 0.7, emergency: 0.9 },
  },
  {
    id: 'west',
    name: 'West Region',
    city: 'Bafoussam',
    x: 35.5,
    y: 64,
    interventions: ['Women & Single Mother Support', 'Scholarship Support', 'Healthcare'],
    description:
      'Bafoussam is home to our largest women empowerment programme. We support single mothers with micro-grants, skills training, and access to healthcare services.',
    heatmap: { all: 0.8, healthcare: 0.75, education: 0.7, water: 0.5, women: 0.95, emergency: 0.4 },
  },
];

const filters: { key: FilterKey; label: string; color: string; icon: string | null }[] = [
  { key: 'all', label: 'All Programs', color: '#16a34a', icon: null },
  { key: 'healthcare', label: 'Healthcare Situations', color: '#dc2626', icon: '/assets/charity/healthcare.png' },
  { key: 'education', label: 'Education Support', color: '#2563eb', icon: '/assets/charity/education-access.png' },
  { key: 'water', label: 'Clean Water Crisis', color: '#0891b2', icon: '/assets/charity/clean-water.png' },
  { key: 'women', label: 'Women & Mothers', color: '#9333ea', icon: '/assets/charity/woman-support.png' },
  { key: 'emergency', label: 'Emergency Relief', color: '#ea580c', icon: '/assets/charity/emergency-relief.png' },
];

const CameroonMap = () => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedRegion, setSelectedRegion] = useState<RegionInfo | null>(null);

  const activeFilterData = filters.find((f) => f.key === activeFilter)!;

  return (
    <div className="w-full cameroon-preserve">
      <div className="relative bg-gradient-to-br from-green-50 via-slate-50 to-teal-50 rounded-3xl overflow-hidden">
        <div className="relative w-full aspect-[4/5]">
          <img src="/assets/charity/cameroon-map.png" alt="Cameroon map" className="absolute inset-0 w-full h-full object-contain p-4" />

          {regions.map((region) => {
            const intensity = region.heatmap[activeFilter];
            const size = 80 * intensity;
            return (
              <motion.div
                key={`heat-${region.id}`}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: Math.min(1, intensity * 0.7) }}
                transition={{ duration: 0.45 }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${region.x}%`,
                  top: `${region.y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: activeFilterData.color,
                  filter: 'blur(2px)',
                }}
              />
            );
          })}

          {regions.map((region) => {
            const isSelected = selectedRegion?.id === region.id;
            const intensity = region.heatmap[activeFilter];
            return (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(isSelected ? null : region)}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
                aria-label={`${region.city} marker`}
              >
                <motion.span
                  animate={{ scale: isSelected ? 1.35 : 1, opacity: isSelected ? 0.45 : 0.28 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    width: '44px',
                    height: '44px',
                    marginLeft: '-22px',
                    marginTop: '-22px',
                    backgroundColor: activeFilterData.color,
                  }}
                />
                <span className="relative block w-5 h-5 rounded-full border-[2.5px] border-white shadow" style={{ backgroundColor: isSelected ? activeFilterData.color : '#16a34a' }} />
                <span
                  className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full border border-white"
                  style={{ backgroundColor: intensity > 0.8 ? '#dc2626' : intensity > 0.6 ? '#f59e0b' : '#16a34a' }}
                />
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-900 whitespace-nowrap">{region.city}</span>
              </button>
            );
          })}
        </div>

        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-600">N</div>

        <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
          {[
            { color: '#dc2626', label: 'High Priority' },
            { color: '#f59e0b', label: 'Medium Priority' },
            { color: '#16a34a', label: 'Active Programs' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5 text-[9px] font-semibold text-slate-600 bg-white/80 rounded-full px-2 py-0.5">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-4 rounded-2xl p-6 relative"
          >
            <button
              onClick={() => setSelectedRegion(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 text-xl font-black">{selectedRegion.city[0]}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-black text-slate-900 text-lg">{selectedRegion.name}</h4>
                <p className="text-green-600 text-xs font-semibold mb-2">{selectedRegion.city}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{selectedRegion.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRegion.interventions.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Filter by Program Category</p>
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <motion.button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                activeFilter === f.key ? 'text-white' : 'text-slate-600 hover:bg-slate-50'
              }`}
              style={activeFilter === f.key ? { backgroundColor: f.color, borderColor: f.color } : {}}
            >
              {f.icon ? <img src={f.icon} alt={f.label} className="w-5 h-5 object-contain" /> : null}
              {f.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CameroonMap;
