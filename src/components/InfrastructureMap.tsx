import { useState } from 'react';
import { Layers, MapPin, Droplets, Grid, Shield, Sparkles, Sliders } from 'lucide-react';

interface PondData {
  id: string;
  name: string;
  size: string;
  depth: string;
  status: string;
  oxygen: string;
  ph: string;
  species: string;
  targetHarvest: string;
  densityIndex: string;
  coordinates_str: string;
}

interface FacilityData {
  id: string;
  name: string;
  capacity: string;
  equipment: string;
  utilization: string;
  advantage: string;
  status: string;
  description: string;
  investmentTier: string;
}

const PONDS_CONFIG: PondData[] = [
  { 
    id: 'Nursery', 
    name: 'Nursery Pond (Fingerling Intake)', 
    size: '0.22 Acres', 
    depth: '4.5 ft', 
    status: 'Operational - Advanced Fry Stocking', 
    oxygen: '6.5 ppm', 
    ph: '7.3',
    species: 'Advanced Carp Fry (Rui/Katla)',
    targetHarvest: 'August 2026 Shift',
    densityIndex: 'High-Density Fry Spawning',
    coordinates_str: `90.29084779790186,24.28472004269765,0 90.29086157360597,24.28439945496928,0 90.29127587966511,24.28441198639384,0 90.29123716008355,24.28471558454669,0`
  },
  { 
    id: 'Pond 1', 
    name: 'Pond 1 (Rui Grow-out Grid)', 
    size: '0.45 Acres', 
    depth: '6.0 ft', 
    status: 'Active Commercial Run', 
    oxygen: '6.3 ppm', 
    ph: '7.4',
    species: 'Premium Rui (Labeo rohita)',
    targetHarvest: 'October 2026 Harvest',
    densityIndex: '2,400 fingerlings stocked',
    coordinates_str: `90.28952276932456,24.28539532200053,0 90.28943963516089,24.28485528762284,0 90.28973844914086,24.28480773045153,0 90.28980297695043,24.28530844192221,0`
  },
  { 
    id: 'Pond 2', 
    name: 'Pond 2 (Katla High-Density Culture)', 
    size: '0.40 Acres', 
    depth: '6.0 ft', 
    status: 'Optimal Water Retention - Feeding Active', 
    oxygen: '6.4 ppm', 
    ph: '7.4',
    species: 'Katla (Gibelion catla) + Rui',
    targetHarvest: 'November 2026 Cycle',
    densityIndex: '1,900 fingerlings stocked',
    coordinates_str: `90.28981929614163,24.28479866368281,0 90.29017050227964,24.28476885163679,0 90.29020418971884,24.28521767028861,0 90.28987835853664,24.28528681246961,0`
  },
  { 
    id: 'Pond 3', 
    name: 'Pond 3 (Pangas Mix Grow-out)', 
    size: '0.35 Acres', 
    depth: '5.5 ft', 
    status: 'Fallow / Pre-stocking Sterilization', 
    oxygen: '5.8 ppm', 
    ph: '7.2',
    species: 'Pangas (Pangasius pangasius)',
    targetHarvest: 'December 2026 Cycle',
    densityIndex: 'Scheduled for 3,000 headcount',
    coordinates_str: `90.29031818181407,24.28517314733144,0 90.29024033263609,24.28476307337719,0 90.2907884725647,24.28474563288827,0 90.29079820479625,24.28506473057883,0`
  },
  { 
    id: 'Pond 4', 
    name: 'Pond 4 (Tilapia Intensive Grid)', 
    size: '0.38 Acres', 
    depth: '5.8 ft', 
    status: 'Active Growth Cycle', 
    oxygen: '6.1 ppm', 
    ph: '7.3',
    species: 'Monosex Tilapia',
    targetHarvest: 'September 2026 Harvest',
    densityIndex: '3,800 head under aeration feed',
    coordinates_str: `90.28941067101293,24.28472146206681,0 90.28936896915172,24.28448571785388,0 90.28994313590462,24.28433550915127,0 90.28997669461563,24.28462690646677,0`
  },
  { 
    id: 'Pond 5', 
    name: 'Pond 5 (Secondary Nursery Reserve)', 
    size: '0.42 Acres', 
    depth: '6.2 ft', 
    status: 'Regeneration Phase Post-Desilt', 
    oxygen: 'N/A', 
    ph: '7.5',
    species: 'Carp Species Nursery',
    targetHarvest: 'Restocking Cycle Start',
    densityIndex: 'Post-harvest fallow conditioning',
    coordinates_str: `90.29003646546855,24.28463263649388,0 90.28999500945852,24.2843504180072,0 90.29027605428041,24.28429954014605,0 90.29029604674479,24.28458415889369,0`
  },
  { 
    id: 'Pond 6', 
    name: 'Pond 6 (Grass Carp Grow-out)', 
    size: '0.45 Acres', 
    depth: '6.5 ft', 
    status: 'Aerated Conditioning Active', 
    oxygen: '6.0 ppm', 
    ph: '7.3',
    species: 'Grass Carp (Ctenopharyngodon idella)',
    targetHarvest: 'December 2026 Shift',
    densityIndex: '1,500 head stocked',
    coordinates_str: `90.29036581350358,24.28440142285046,0 90.2908070723801,24.284422414459,0 90.29079657993719,24.28463042577069,0 90.29035591353399,24.28462038344671,0`
  },
  { 
    id: 'Pond 7', 
    name: 'Pond 7 (Specimen Carp Unit)', 
    size: '0.28 Acres', 
    depth: '5.0 ft', 
    status: 'Fallow Biosecurity Preparation', 
    oxygen: '5.9 ppm', 
    ph: '7.2',
    species: 'Bighead Carp (Hypophthalmichthys nobilis)',
    targetHarvest: 'January 2027 Harvest',
    densityIndex: 'Drained for lime fertilization',
    coordinates_str: `90.28974511417218,24.28420464178899,0 90.28972629171682,24.28386367951342,0 90.29012184538465,24.28386044063392,0 90.29013632419355,24.28413567412344,0`
  },
  { 
    id: 'Pond 8', 
    name: 'Pond 8 (Pangas Commercial Run)', 
    size: '0.41 Acres', 
    depth: '6.0 ft', 
    status: 'Active Feeding Logs', 
    oxygen: '5.8 ppm', 
    ph: '7.2',
    species: 'Pangas (Pangasius sutchi)',
    targetHarvest: 'September 2026 Harvest',
    densityIndex: '4,200 fingerlings on cycle',
    coordinates_str: `90.29034474779685,24.28433490156488,0 90.29033859607659,24.28411765108378,0 90.29078094414938,24.28408491273547,0 90.29078783330041,24.28433490156488,0`
  },
  { 
    id: 'Pond 9', 
    name: 'Pond 9 (Black Carp Biological Control)', 
    size: '0.44 Acres', 
    depth: '6.0 ft', 
    status: 'Refilling Phase - Lime Stabilized', 
    oxygen: '6.0 ppm', 
    ph: '7.4',
    species: 'Black Carp (Snail Control Mix)',
    targetHarvest: 'November 2026 Batch',
    densityIndex: 'Plankton bloom tracking active',
    coordinates_str: `90.29085767542314,24.28390257512708,0 90.29079783868507,24.2834813295403,0 90.29100922161854,24.28347421525029,0 90.29105727274518,24.28389366819256,0`
  },
  { 
    id: 'Pond 10', 
    name: 'Pond 10 (Rui Backup Grow-out)', 
    size: '0.45 Acres', 
    depth: '6.2 ft', 
    status: 'Desilting Completed - Restored Grid', 
    oxygen: 'N/A', 
    ph: '7.5',
    species: 'Species Pending Restock',
    targetHarvest: 'Under Allocation Spec',
    densityIndex: 'Zero biological load active',
    coordinates_str: `90.29106546888758,24.2834657058301,0 90.29130484509004,24.28341793192387,0 90.29131318223493,24.28346168570687,0 90.29133609642652,24.2838879085924,0 90.29110056658297,24.28388873874793,0`
  },
  { 
    id: 'Pond 11', 
    name: 'Pond 11 (Tilapia Primary Grow-out)', 
    size: '0.34 Acres', 
    depth: '5.5 ft', 
    status: 'Growth Phase monitoring', 
    oxygen: '6.2 ppm', 
    ph: '7.4',
    species: 'GIFT Tilapia strain',
    targetHarvest: 'August 2026 Harvest',
    densityIndex: '3,100 head stocked',
    coordinates_str: `90.29140415649857,24.28344335164353,0 90.29173340737945,24.28341064004633,0 90.29174951427639,24.28387682550273,0 90.29144545487217,24.28388716349289,0`
  }
];

const FACILITIES_CONFIG: FacilityData[] = [
  {
    id: 'Poultry',
    name: '20,000-Bird Poultry Complex',
    capacity: '20,000 birds simultaneous density',
    equipment: 'Pre-machined conveyor egg rails, exhaust blower grids, structural insulation',
    utilization: 'High-yield multi-layer broilers and waterfowl',
    advantage: 'Supplies immediate nutrient-dense biomass manure directly to adjacent crop zones',
    status: '100% Constructed / Standing Asset',
    description: 'Fully pre-capitalized steel-framed industrial sheds with dual sanitization chambers. Designed to provide steady continuous daily laying yields under strict biosafety conditions.',
    investmentTier: 'Fully Capitalized Equity'
  },
  {
    id: 'Dairy',
    name: '100-Stall Modern Dairy Stanchion Barn',
    capacity: '100 Milking Head bovine herd',
    equipment: 'Rotary pneumatic milk suction systems, bulk cooling stations, specialized vet chutes',
    utilization: 'High-frequency dairy offtake contracts',
    advantage: 'Provides consistent monthly liquidity buffers and high-volume biogas reactor inputs',
    status: '100% Engineered / Ready for Herd Stocking',
    description: 'Specialized concrete stanchion configurations built for automatic cleansing and sanitary milking. The layout isolates individual cow vaccination logs directly.',
    investmentTier: 'Fully Capitalized Equity'
  },
  {
    id: 'FeedMill',
    name: 'On-Site Proprietary Feed extruder',
    capacity: '4.0 Metric Tons capacity / day',
    equipment: 'Industrial hammer pulverizer, dry extruder die plate, custom dosing hoppers',
    utilization: 'Exclusive feed production for on-site fisheries and livestock',
    advantage: 'Shrinks purchase cost of balanced feed by up to 35%, boosting core operating EBITDA limits',
    status: 'Fully Operational',
    description: 'Transforms local agricultural byproduct inputs into nutrient-rich floating fish pellets and concentrated feed logs, completely isolating operations from feed market price shocks.',
    investmentTier: 'Fully Operational Asset'
  },
  {
    id: 'Cropland',
    name: 'Rotational Crops & Napier Grass Groves',
    capacity: '3.87 Acres arable soil blocks',
    equipment: 'Gravity water feeder pipelines, automated organic wastewater fertilizing nozzles',
    utilization: 'Napier fodder & organic commercial cash vegetables',
    advantage: 'Absorbs 100% of organic livestock runoff, reclaiming soil nutrients without synthetic expenditure',
    status: 'Fully Cultivated',
    description: 'Intensively managed soil strips flanking the pond embankments. Cultivates rotational feedstock and premium cash crops to fully close the nitrogen loop.',
    investmentTier: 'Under High-Utilization Culture'
  }
];

// 8.1 Acres Agroplex Boundary Coordinates (KML data)
const MAIN_PLOT_COORDINATES = `90.28950045246768,24.2854431889279,0 90.28930703549145,24.28446705955812,0 90.28972178431933,24.28433144434682,0 90.28967753110904,24.28380500926663,0 90.29015511225535,24.28380314345849,0 90.29022507706273,24.28413599393544,0 90.29047821433595,24.28406049251902,0 90.29079271149783,24.28405255677202,0 90.29075964026327,24.28343862089247,0 90.29177841683067,24.28336073170998,0 90.29182584621836,24.28393831275239,0 90.29139480850812,24.28395577317607,0 90.29131113335539,24.2847747863279,0 90.29129431670556,24.28507134232147,0 90.2908366489354,24.28510445144751,0`;

const minLon = 90.2890;
const maxLon = 90.2921;
const minLat = 24.2830;
const maxLat = 24.2857;
const svgWidth = 720;
const svgHeight = 500;
const padding = 30;

function project(lon: number, lat: number) {
  const x = padding + ((lon - minLon) / (maxLon - minLon)) * (svgWidth - 2 * padding);
  const y = padding + ((maxLat - lat) / (maxLat - minLat)) * (svgHeight - 2 * padding);
  return {
    x: Math.round(x * 10) / 10,
    y: Math.round(y * 10) / 10
  };
}

function getSvgPoints(coordStr: string) {
  const points = coordStr
    .trim()
    .split(/\s+/)
    .map(token => {
      const parts = token.split(',');
      const lon = parseFloat(parts[0]);
      const lat = parseFloat(parts[1]);
      return project(lon, lat);
    })
    .filter(p => !isNaN(p.x) && !isNaN(p.y));
  
  return points;
}

export default function InfrastructureMap() {
  const [mapTab, setMapTab] = useState<'waterways' | 'installations'>('waterways');
  const [selectedPond, setSelectedPond] = useState<PondData | null>(PONDS_CONFIG[0]);
  const [selectedFacility, setSelectedFacility] = useState<FacilityData | null>(FACILITIES_CONFIG[0]);
  const [mainPlotSelected, setMainPlotSelected] = useState<boolean>(false);

  const mainPlotPoints = getSvgPoints(MAIN_PLOT_COORDINATES);
  const mainPlotPointsStr = mainPlotPoints.map(p => `${p.x},${p.y}`).join(' ');

  const selectMainPlot = () => {
    setMainPlotSelected(true);
    setSelectedPond(null);
  };

  const selectPond = (pond: PondData) => {
    setMainPlotSelected(false);
    setSelectedPond(pond);
  };

  return (
    <div className="bg-[#0b1713] text-[#ededed] border border-emerald-900/40 rounded-xl p-5 shadow-2xl relative overflow-hidden transition-all duration-300">
      
      {/* Tab select headers */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/5 pb-4 mb-4">
        <div className="text-left font-sans">
          <span className="font-mono text-emerald-400 text-[10px] block font-extrabold tracking-widest uppercase">DH Geospatial Field Terminal</span>
          <h4 className="font-sans font-extrabold text-base text-white">Interactive Engineering Land & Water Map</h4>
        </div>
        
        <div className="flex bg-[#030907] p-1 border border-emerald-950 rounded-lg">
          <button
            onClick={() => setMapTab('waterways')}
            id="tab_waterways"
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
              mapTab === 'waterways' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Waterways (12 Ponds Grid)
          </button>
          <button
            onClick={() => setMapTab('installations')}
            id="tab_installations"
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
              mapTab === 'installations' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Built Structures & Stalls
          </button>
        </div>
      </div>

      {mapTab === 'waterways' ? (
        <>
          <div className="relative">
            <div className="absolute top-2 left-2 z-10 bg-[#030907]/90 border border-emerald-900/45 px-2.5 py-1.5 rounded text-[10px] space-y-1">
              <span className="text-zinc-400 block">MAP CONTROL INSTRUCTION:</span>
              <button 
                onClick={selectMainPlot}
                className={`block font-mono font-bold text-left hover:text-emerald-400 transition-colors ${
                  mainPlotSelected ? 'text-emerald-400' : 'text-emerald-300'
                }`}
              >
                ⛯ Click 8.1ac Main Outline &rarr;
              </button>
              <span className="text-zinc-500 block">⚏ Or select specific pond geometries.</span>
            </div>

            <svg viewBox="0 0 720 500" className="w-full drop-shadow-md rounded-lg bg-[#040907]">
              {/* Main Land Parcel Boundary Outline (Main Plot) - CLICKABLE */}
              {mainPlotPoints.length > 0 && (
                <polygon 
                  points={mainPlotPointsStr}
                  onClick={selectMainPlot}
                  className={`cursor-pointer transition-all ${
                    mainPlotSelected 
                      ? 'fill-emerald-950/40 stroke-emerald-400 stroke-[3]' 
                      : 'fill-[#040c09] stroke-emerald-800/40 stroke-[2.5]'
                  }`} 
                  style={{ strokeDasharray: mainPlotSelected ? 'none' : '4,3' }}
                  id="main_plot_boundary"
                />
              )}
              
              {/* Decorative Access Marker */}
              <path 
                className="fill-none stroke-emerald-500/5 stroke-[6] stroke-linecap-round pointer-events-none" 
                d="M 68 350 C 180 320, 270 340, 370 290 S 550 240, 680 260" 
                id="decorative_road"
              />

              {/* Geospatial Water Bodies */}
              <g className="cursor-pointer">
                {PONDS_CONFIG.map((pond) => {
                  const isSelected = selectedPond?.id === pond.id;
                  const pointsList = getSvgPoints(pond.coordinates_str);
                  const pointsStr = pointsList.map(p => `${p.x},${p.y}`).join(' ');
                  
                  // Calculate centroid for labeling
                  const xs = pointsList.map(p => p.x);
                  const ys = pointsList.map(p => p.y);
                  const cx = xs.length > 0 ? xs.reduce((sum, val) => sum + val, 0) / xs.length : 0;
                  const cy = ys.length > 0 ? ys.reduce((sum, val) => sum + val, 0) / ys.length : 0;

                  if (pointsList.length === 0) return null;

                  return (
                    <g key={pond.id} onClick={() => selectPond(pond)} className="transition-all duration-200">
                      {isSelected && (
                        <polygon 
                          points={pointsStr}
                          className="fill-none stroke-emerald-400/30 stroke-[8] blur-xs pointer-events-none"
                        />
                      )}
                      
                      <polygon 
                        points={pointsStr} 
                        id={`polygon_${pond.id.toLowerCase().replace(' ', '_')}`}
                        className={`${
                          isSelected 
                            ? 'fill-emerald-500/80 stroke-emerald-300 stroke-[3]' 
                            : 'fill-emerald-950/20 hover:fill-emerald-900/40 stroke-emerald-700/40 stroke-[1.5]'
                        } transition-all duration-150`} 
                      />
                      
                      <text 
                        x={cx} 
                        y={cy + 3} 
                        textAnchor="middle" 
                        id={`text_${pond.id.toLowerCase().replace(' ', '_')}`}
                        className={`${
                          isSelected ? 'fill-white font-extrabold text-[10px]' : 'fill-emerald-400/80 font-bold text-[9px]'
                        } pointer-events-none select-none font-mono tracking-tighter`}
                      >
                        {pond.id === 'Nursery' ? 'NUR' : pond.id.replace('Pond ', 'P')}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-3 text-[11px] text-[#81908a] border-t border-white/5 pt-3">
              <span className="flex items-center gap-1.5"><i className="block w-4 h-2.5 rounded bg-emerald-950/40 border border-emerald-800/50"></i> Ponds Grid Area</span>
              <span className="flex items-center gap-1.5"><i className="block w-4 h-2.5 border border-dashed border-emerald-800/40 bg-[#040c09]"></i> Freehold Limit (8.1 acres outline)</span>
              <span className="flex items-center gap-1.5"><i className="block w-4 h-2.5 rounded bg-emerald-500 border border-emerald-300"></i> Selected Geopolitical Body</span>
            </div>
          </div>

          {/* Interactive stats drawer */}
          {mainPlotSelected ? (
            <div className="mt-4 p-4 bg-[#030907] border border-emerald-500/50 rounded-lg text-xs text-left transition-all duration-300">
              <div className="flex justify-between items-center border-b border-emerald-950/80 pb-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  <strong className="text-base text-white font-bold font-sans">Delta Harvest Agroplex (8.1 Acres Freehold)</strong>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">Main Plot Geodesic Map</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#ededed]">
                <div className="space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Territorial Boundary</span>
                  <p className="font-semibold text-emerald-300">8.1 Acres, Fully Possessed, 100% Freehold Owned</p>
                  <span className="text-[10px] text-zinc-500 block">No mortgage or third-party encumbrance.</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Site Access & Security</span>
                  <p className="font-semibold text-emerald-300">Kachina Union road frontage, deep secure concrete fencing</p>
                  <span className="text-[10px] text-zinc-500 block">On-site guard staff, 24/7 security gates active.</span>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Infrastructure Yield Load</span>
                  <p className="font-semibold text-emerald-300">12 waterways + 20,000 birds poultry + 100 dairy stalls</p>
                  <span className="text-[10px] text-zinc-500 block">Maximized multi-tier structural utilization.</span>
                </div>
              </div>
            </div>
          ) : selectedPond ? (
            <div className="mt-4 p-4 bg-[#030907] border border-emerald-950 rounded-lg text-xs text-left transition-all duration-300">
              <div className="flex justify-between items-center border-b border-emerald-950/60 pb-2 mb-2">
                <strong className="text-base text-white font-bold font-sans">{selectedPond.name}</strong>
                <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase">Aquatic Grid Analytics</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-[#ededed]">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Surface Area</span>
                  <span className="font-semibold text-emerald-300">{selectedPond.size}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Water Depth</span>
                  <span className="font-semibold text-emerald-300">{selectedPond.depth}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Live Species Block</span>
                  <span className="font-semibold text-emerald-300">{selectedPond.species}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Active DO / pH Telemetry</span>
                  <span className="font-semibold text-emerald-300">{selectedPond.oxygen} (pH {selectedPond.ph})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Density Tracker / Milestone</span>
                  <span className="font-semibold text-emerald-300 block">{selectedPond.densityIndex}</span>
                  <span className="text-[10px] block text-emerald-400/90 font-mono mt-0.5">{selectedPond.status}</span>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        /* INSTALLATIONS TAB - Stalls, poultry barns & feed mill detail sheets */
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {FACILITIES_CONFIG.map((fac) => {
              const matchesSelected = selectedFacility?.id === fac.id;
              return (
                <button
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac)}
                  id={`facility_btn_${fac.id}`}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    matchesSelected 
                      ? 'bg-[#0f2820] border-emerald-500 shadow-md' 
                      : 'bg-[#030907] border-emerald-950 hover:border-emerald-800'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-black tracking-widest">{fac.id} Station</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <strong className="text-sm text-white block truncate font-sans font-bold leading-tight">{fac.name}</strong>
                  <span className="text-[10px] text-slate-400 mt-2 block font-medium">Cap: {fac.capacity.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {selectedFacility && (
            <div className="bg-[#030907] border border-emerald-950 p-5 rounded-xl text-left space-y-4">
              <div className="flex justify-between items-center border-b border-emerald-950/60 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">OWNED AGRI-ASSET LEDGER STATION</span>
                  <h5 className="text-base font-extrabold text-white font-sans tracking-tight">{selectedFacility.name}</h5>
                </div>
                <span className="bg-emerald-500/10 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 border border-emerald-500/25 rounded-md">
                  {selectedFacility.status}
                </span>
              </div>

              <p className="text-[#bfd0ca] text-xs leading-relaxed">
                {selectedFacility.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#0a1410] border border-emerald-950/50 p-3 rounded-lg">
                  <span className="text-emerald-400 block text-[9px] uppercase font-bold tracking-widest font-mono">Pre-Configured Machinery & Assets</span>
                  <p className="text-slate-200 text-[11.5px] mt-1 font-semibold">{selectedFacility.equipment}</p>
                </div>
                <div className="bg-[#0a1410] border border-emerald-950/50 p-3 rounded-lg">
                  <span className="text-emerald-400 block text-[9px] uppercase font-bold tracking-widest font-mono">Closed-Loop Synergy Integration Advantage</span>
                  <p className="text-slate-200 text-[11.5px] mt-1 font-semibold">{selectedFacility.advantage}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 border-t border-white/5 text-[11px] text-zinc-300">
                <div className="flex flex-col">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Shed Output Rating</span>
                  <strong className="text-white text-xs mt-0.5">{selectedFacility.capacity}</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Integrated Crop Utility</span>
                  <strong className="text-white text-xs mt-0.5">{selectedSectorIntegrationName(selectedFacility.id)}</strong>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Financial Balance Class</span>
                  <strong className="text-emerald-400 text-xs mt-0.5 font-mono">{selectedFacility.investmentTier}</strong>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

function selectedSectorIntegrationName(facilityId: string): string {
  switch(facilityId) {
    case 'Poultry': return 'Nitrogen-rich composting & custom feed mix';
    case 'Dairy': return 'Napier grass consumption & organic compost extraction';
    case 'FeedMill': return 'Raw crop byproduct upcycling to floating pellets';
    default: return 'Recuperative water retention overflow usage';
  }
}
