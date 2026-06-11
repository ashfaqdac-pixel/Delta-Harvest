import { useState } from 'react';
import { ShieldCheck, ArrowRight, Activity, TrendingUp, HelpCircle } from 'lucide-react';

interface UtilityMetric {
  label: string;
  value: string;
  subStat: string;
  percent: number;
}

interface SectorProfile {
  id: string;
  name: string;
  shortLabel: string;
  icon: string;
  capacityTitle: string;
  capacityValue: string;
  utilizationRate: number;
  highlightStats: string[];
  operationalSpecs: string[];
  metrics: UtilityMetric[];
  description: string;
  economicOutput: string;
}

const SECTOR_PROFILES: SectorProfile[] = [
  {
    id: 'poultry',
    name: 'Poultry & Waterfowl Operations',
    shortLabel: 'Poultry Sector',
    icon: '🐣',
    capacityTitle: 'Pre-Built Poultry Shed Capacity',
    capacityValue: '20,000 Birds (Continuous Housing)',
    utilizationRate: 85,
    highlightStats: [
      '20k-bird dual-insulated steel sheds fully standing',
      'Automated egg gathering conveyor tracks fully operational',
      'High-velocity ventilation & humidity control rigs installed'
    ],
    operationalSpecs: [
      'Shed Footprint: 18,500 sq ft pre-engineered steel',
      'FCR Target (Broilers): 1.45 using customized feed formulas',
      'Yield Metric: Target 14,000 eggs/day layer output at high cycle'
    ],
    metrics: [
      { label: 'Asset Amortization', value: '100% Paid For', subStat: 'Zero legacy debt', percent: 100 },
      { label: 'Current Utilization', value: '17,000 Birds Active', subStat: '85% continuous load', percent: 85 },
      { label: 'Nutrient Conversion', value: '4.2 Tons / Month', subStat: 'Manure diverted to crops', percent: 92 }
    ],
    description: 'Our modern poultry sheds provide high-density vertical layer and broiler housing. Because the physical facilities are already capitalized and in possession, investors avoid heavy CapEx drag. Raw material input costs are heavily suppressed by using our on-site feed mill.',
    economicOutput: 'Generates predictable, high-frequency daily cash liquidity through institutional wholesale contracts in Mymensingh, stabilizing aggregate agricultural variance.'
  },
  {
    id: 'dairy',
    name: 'Milking Bovine & Dairy Herd',
    shortLabel: 'Dairy Sector',
    icon: '🐄',
    capacityTitle: 'Stanchion Dairy Barn Capacity',
    capacityValue: '100 Elite Milking Cows',
    utilizationRate: 75,
    highlightStats: [
      'Pneumatic commercial milking rails pre-wired & operational',
      'Active bulk cooling tanks (4,000L capacity) ready',
      'Full electronic tagging and health monitoring collars in place'
    ],
    operationalSpecs: [
      'Milking Stations: 50 double-sided stanchion bays',
      'Average Daily Output: Target 22 Liters / Cow',
      'Veterinary Status: 100% pre-monsoon immunizations completed'
    ],
    metrics: [
      { label: 'Barn Infrastructure', value: '100% Completed', subStat: 'Insulated sanitarily', percent: 100 },
      { label: 'Planned Herd Load', value: '75 Milking Head', subStat: '75% target stocking', percent: 75 },
      { label: 'Biogas Generation', value: 'Fully Integrated', subStat: 'Powering pump stations', percent: 100 }
    ],
    description: 'A professional dairy enterprise requires immense concrete and machinery setup. Delta Harvest maintains a state-of-the-art stanchion dairy barn with clean-in-place sanitization loops. The system leverages high-protein Napier grass cultivated directly on our 8.1-acre agroplex embankments.',
    economicOutput: 'Secures high-margin liquid supply contracts to major nationwide pasteurization processors and premium regional sweet makers, yielding stable 12-month recurring cash flow.'
  },
  {
    id: 'aquaculture',
    name: 'Precision Commercial Aquaculture',
    shortLabel: 'Waterways',
    icon: '🐟',
    capacityTitle: 'Managed Waterways Surface Area',
    capacityValue: '12 Ponds (4.23 Water Surface Acres)',
    utilizationRate: 90,
    highlightStats: [
      '12 desilted and high-embankment ponds fully secured',
      'Hach water telemetry grids registering continuous DO and pH levels',
      'Staggered harvest system implemented to prevent market price dips'
    ],
    operationalSpecs: [
      'Active Depth: Average 5.8m for species layering',
      'Primary Stocking: Carp, Pangas, and Tilapia',
      'Aeration Network: High-efficiency rotary paddlewheels'
    ],
    metrics: [
      { label: 'Gravity Drainage Grid', value: '100% Functioning', subStat: 'No electric drainage needed', percent: 100 },
      { label: 'Water Security Meter', value: 'No Encroachment', subStat: 'Fenced freehold territory', percent: 100 },
      { label: 'FCR Optimization', value: 'sub-1.3 Target Ratio', subStat: 'Due to floating pellets', percent: 90 }
    ],
    description: 'Our fish cultivation represents heavy commercial aquaculture, not simple rural ponds. Managed as a grid of 12 distinct bodies, each waterway undergoes professional biological conditioning, desilting, and aerated oxygen preservation, maximizing growth velocity.',
    economicOutput: 'High-density seasonal grow-out batches timed to align with peak urban offtaker pricing, leveraging deep logistics connections to corporate wholesale markets.'
  },
  {
    id: 'feedmill',
    name: 'On-Site Feed Production Mill',
    shortLabel: 'Integrated Feed-Mill',
    icon: '🌾',
    capacityTitle: 'Proprietary Extruder Feed Mill Output',
    capacityValue: '4 Tons / Day Customized Pellets',
    utilizationRate: 95,
    highlightStats: [
      'Operational industrial extruder with die cutters active',
      'Localized crop residue pulverizers minimizing external sourcing',
      'Reduces farm-wide raw material input expenses by up to 35%'
    ],
    operationalSpecs: [
      'Mill Capacity: 4.0 Metric Tons daily max output',
      'Formulations: Balanced high-protein fish, poultry, and bovine feeds',
      'Ingredient Supply: Locally sourced crop residues and oil cakes'
    ],
    metrics: [
      { label: 'Mill Asset Standing', value: 'Fully Capitalized', subStat: 'No leasing overheads', percent: 100 },
      { label: 'Operating Load', value: '3.8 Tons / Day', subStat: '95% capacity operation', percent: 95 },
      { label: 'Cost Salvage Index', value: '35% Savings', subStat: 'Over pre-bagged market feed', percent: 100 }
    ],
    description: 'The single largest risk in animal husbandry and fish rearing is volatile commercial feed pricing. Delta Harvest completely mitigates this by owning and operating an on-site extruder feed mill. We crush local crop byproducts into nutrient-rich floating pallets, locking in predictably higher margins.',
    economicOutput: 'Locks in absolute input-cost controls across all three primary sectors (Poultry, Dairy, Fisheries), raising operational gross profit limits to a superior class.'
  }
];

export default function AssetInfrastructureSummary() {
  const [activeTab, setActiveTab] = useState<string>('poultry');
  const selectedSector = SECTOR_PROFILES.find(s => s.id === activeTab) || SECTOR_PROFILES[0];

  return (
    <div className="bg-[#030907] border border-emerald-900/60 rounded-xl p-6 shadow-2xl relative" id="asset-infrastructure-dashboard">
      
      {/* Visual background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Header section with commercial tone */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-emerald-950 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-[10px] tracking-widest text-emerald-400 font-extrabold uppercase">Delta Harvest Capital Holdings</span>
          </div>
          <h3 className="text-xl font-extrabold text-white font-sans tracking-tight">
            Advanced Asset Utilization Dashboard
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Sustaining superior yields by matching capital directly against fully standing, debt-free agro-industrial physical elements. We do not acquire raw land; we maximize pre-built infrastructure.
          </p>
        </div>

        <div className="bg-emerald-950/40 border border-emerald-900 px-4 py-2.5 rounded-lg text-center font-mono">
          <span className="text-[9px] text-emerald-400 uppercase font-bold block tracking-wider">Total Pre-Built Asset Value</span>
          <b className="text-sm font-black text-white">৳45,000,000+</b>
        </div>
      </div>

      {/* Circular Economy Concept Map Infographic */}
      <div className="bg-[#0b1410] border border-emerald-950 rounded-lg p-4 mb-6">
        <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" /> THE CLOSED-LOOP HIGH-UTILIZATION PARADIGM
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          
          <div className="bg-[#040c09] border border-emerald-950 p-3 rounded text-center">
            <span className="text-xl block">🌿</span>
            <strong className="text-xs text-white block mt-1">1. 8.1-Ac Agroplex</strong>
            <p className="text-[10px] text-slate-400 mt-0.5">Napier grass & cash crops absorb organic fertilizer runoff.</p>
          </div>

          <div className="text-center text-emerald-500 hidden md:block">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase">&rarr; byproduct nutrients &rarr;</div>
            <div className="border-t border-dashed border-emerald-900 w-full mt-1"></div>
          </div>

          <div className="bg-[#040c09] border border-emerald-950 p-3 rounded text-center">
            <span className="text-xl block">🐄🐓</span>
            <strong className="text-xs text-white block mt-1">2. Livestock & Poultry</strong>
            <p className="text-[10px] text-slate-400 mt-0.5">Sheds house 20k birds & 100 cows, yielding steady organic manure.</p>
          </div>

          <div className="text-center text-emerald-500 hidden md:block">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase">&rarr; internal feedstock &rarr;</div>
            <div className="border-t border-dashed border-emerald-900 w-full mt-1"></div>
          </div>

          <div className="bg-[#040c09] border border-emerald-950 p-3 rounded text-center">
            <span className="text-xl block">🌾</span>
            <strong className="text-xs text-white block mt-1">3. Integrated Feed Mill</strong>
            <p className="text-[10px] text-slate-400 mt-0.5">Crushes regional crops + byproduct into high-protein feed pellets.</p>
          </div>

          <div className="text-center text-emerald-500 hidden md:block">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase">&rarr; sub-1.3 FCR feed &rarr;</div>
            <div className="border-t border-dashed border-emerald-900 w-full mt-1"></div>
          </div>

          <div className="bg-[#040c09] border border-emerald-950 p-3 rounded text-center">
            <span className="text-xl block">🐟</span>
            <strong className="text-xs text-white block mt-1">4. 12 Waterway Ponds</strong>
            <p className="text-[10px] text-slate-400 mt-0.5">Grow-out carp and pangas feeding on optimized pellets.</p>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/45 p-2 rounded text-left md:col-span-4 mt-1 flex items-start gap-2 text-[11px] text-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Zero-Waste Leverage:</strong> Eliminating chemical fertilizers across soil parcels and substituting up to 35% of industry feed raw costs locks in extreme operational margins. This guarantees investors participate in a highly organized, institutional corporate venture.
            </span>
          </div>

        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
        {SECTOR_PROFILES.map((profile) => {
          const isActive = activeTab === profile.id;
          return (
            <button
              key={profile.id}
              onClick={() => setActiveTab(profile.id)}
              id={`sector_tab_btn_${profile.id}`}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                isActive 
                  ? 'bg-[#102d24] border-emerald-400 text-white shadow-lg shadow-[#000000]/60' 
                  : 'bg-[#040d0a] border-emerald-950/80 text-zinc-400 hover:border-emerald-800 hover:text-white'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-lg">{profile.icon}</span>
                <span className="text-[10px] font-mono font-bold text-emerald-500">{profile.utilizationRate}% Load</span>
              </div>
              <strong className="text-xs font-bold font-sans block leading-none truncate">{profile.shortLabel}</strong>
              <span className="text-[9px] block text-slate-400 truncate mt-1">{profile.capacityValue.split(' ')[0]} Max</span>
            </button>
          );
        })}
      </div>

      {/* Selected Sector Core Profiles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#040c09] border border-emerald-950 rounded-xl p-5">
        
        {/* Left column: Specs & description */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">Active Asset Sector Profile</span>
              <h4 className="text-base font-extrabold text-white font-sans">{selectedSector.name}</h4>
            </div>
            <span className="bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
              {selectedSector.capacityValue}
            </span>
          </div>

          <p className="text-zinc-300 text-xs leading-relaxed">
            {selectedSector.description}
          </p>

          <div className="p-3 bg-[#0a1410] border border-emerald-950 rounded-lg">
            <span className="text-[10px] text-emerald-500 font-mono uppercase tracking-wider font-bold block mb-1">Commercial Economic Output Model</span>
            <p className="text-white text-xs leading-relaxed font-semibold">
              {selectedSector.economicOutput}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Operational Engineering Highlights</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              {selectedSector.operationalSpecs.map((spec, i) => (
                <div key={i} className="bg-[#030907] border border-emerald-950 p-2.5 rounded text-left">
                  <span className="text-[9px] text-zinc-400 block font-mono">SPECIFICATION {i+1}</span>
                  <span className="text-xs text-white mt-1 block font-bold leading-tight">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Capital metrics & core controls */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-[#0a1813] border border-emerald-950 rounded-xl p-4">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-extrabold block mb-3">Asset Performance Meters</span>
            <div className="space-y-4">
              {selectedSector.metrics.map((m, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-300 font-medium">{m.label}</span>
                    <b className="text-white font-mono">{m.value}</b>
                  </div>
                  <div className="w-full bg-[#030907] h-2 rounded-full overflow-hidden border border-emerald-950">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${m.percent}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-400 block font-medium font-mono">
                    {m.subStat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 mt-4">
            <div className="flex items-center gap-2 text-[11px] text-emerald-300">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Yield scaling through continuous load management active.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
