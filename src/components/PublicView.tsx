import { Opportunity } from '../types';
import InfrastructureMap from './InfrastructureMap';
import AssetInfrastructureSummary from './AssetInfrastructureSummary';
import { ShieldCheck, TrendingUp, Cpu, Landmark, ChevronRight, Activity, Layers, CornerDownRight } from 'lucide-react';

interface PublicViewProps {
  opportunities: Opportunity[];
  onOpenApplication: () => void;
  onOpenLogin: () => void;
}

export default function PublicView({ opportunities, onOpenApplication, onOpenLogin }: PublicViewProps) {
  return (
    <div className="bg-cream min-h-screen text-slate-300 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      
      {/* Institutional Suitability Bar */}
      <div className="bg-[#051410] text-[#a9cfbe] text-[11px] font-mono py-2.5 px-4 flex flex-wrap items-center justify-center gap-2 text-center border-b border-emerald-950">
        <span className="inline-block px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[9px] font-bold border border-emerald-800/30 uppercase">Institutional Account Placement</span>
        <span className="hidden sm:inline w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
        <span>Secure Allocator Terminals · Restricting Participation to Qualified Co-Investors</span>
        <span className="hidden sm:inline w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
        <span>Physical Asset-Backed Operations only</span>
      </div>

      {/* Main Corporate Header */}
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-emerald-950/30 px-4 md:px-8 lg:px-16 py-3.5 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 text-emerald-400 hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 text-emerald-400 p-1 bg-emerald-950/40 rounded-lg border border-emerald-900/40">
            <svg viewBox="0 0 64 64" className="w-full h-full">
              <path d="M32 5 56 19v26L32 59 8 45V19L32 5Z" fill="currentColor" className="opacity-15" />
              <path d="M18 42c12-1 19-8 22-22 5 7 6 15 2 22H18Z" fill="currentColor" />
              <path d="M17 44h30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <strong className="text-sm font-black tracking-widest uppercase text-white">DELTA HARVEST</strong>
            <small className="text-[9px] text-emerald-500/70 mt-1 font-bold tracking-wider font-mono">Agro-Industrial Asset Management</small>
          </div>
        </a>

        {/* Corporate Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-300">
          <a href="#assets" className="hover:text-emerald-400 transition-colors">Physical Assets</a>
          <a href="#opportunities" className="hover:text-emerald-400 transition-colors">Investment Cycles</a>
          <a href="#governance" className="hover:text-emerald-400 transition-colors">Risk & Governance</a>
          <a href="#process" className="hover:text-emerald-400 transition-colors">Onboarding Process</a>
          
          <span className="w-px h-4 bg-slate-800"></span>
          
          <button 
            onClick={onOpenLogin}
            className="text-slate-300 hover:text-emerald-400 font-bold transition-colors text-xs"
          >
            Secured Login
          </button>
          
          <button 
            onClick={onOpenApplication}
            className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-lg transition-all text-xs font-extrabold shadow-sm active:translate-y-px"
          >
            Apply for Placement
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden gap-1.5">
          <button 
            onClick={onOpenLogin}
            className="border border-emerald-900 bg-[#0f172a] rounded-lg px-3 py-2 font-bold text-xs hover:border-emerald-800 text-slate-200"
          >
            Login
          </button>
          <button 
            onClick={onOpenApplication}
            className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg px-3 py-2 font-bold text-xs"
          >
            Apply
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-[#061813] to-[#12382e] text-white py-16 md:py-24 px-4 md:px-8 lg:px-16 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute right-0 top-0 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Proposition text block */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase border border-emerald-500/15">
              <Landmark className="w-3 h-3" /> COMMERCIAL CO-INVESTMENT FRAMEWORK
            </div>
            
            <h1 className="text-4.5xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white max-w-2xl font-sans">
              High-Yield Agri-Tech.<br />
              <span className="text-emerald-400">Institutional Capital Optimization.</span>
            </h1>
            
            <p className="text-[#c8dad1] text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              Delta Harvest maximizes institutional asset utilization across 8.1 acres of fully enclosed, freehold agro-industrial property. By matching investor capital directly against pre-built poultry complexes, milk barns, and commercial waterways, we bypass raw construction delays to accelerate revenue-generating cycles.
            </p>

            <div className="flex flex-wrap gap-4.5 pt-2">
              <button 
                onClick={onOpenApplication}
                className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 px-7 py-3.5 rounded-lg font-black text-xs transition-all shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.99]"
              >
                Request SECURED Allocation Access
              </button>
              <button 
                onClick={onOpenLogin}
                className="bg-white/10 hover:bg-white/15 border border-white/10 px-7 py-3.5 rounded-lg font-bold text-xs transition-all flex items-center gap-2"
              >
                Access Workstation Demo <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <span className="text-[11px] font-mono text-[#a3c3b5]">
                Direct asset audit enabled. All physical facilities are owned, secured, and ready for operations.
              </span>
            </div>
          </div>

          {/* Quick asset statistics panel */}
          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-white/5 pb-3.5 mb-4">
              <span className="font-mono text-[10px] tracking-widest uppercase font-extrabold text-emerald-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" /> Fully Paid Asset Portfolio
              </span>
              <span className="bg-emerald-400/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                EBITDA-ready
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3.5 mb-6">
              <div className="bg-[#050f0c] p-3 rounded-lg border border-white/5">
                <strong className="text-2xl sm:text-3xl font-black block text-emerald-400 tracking-tight">20,000</strong>
                <span className="text-[10px] text-slate-300 uppercase font-black tracking-wider block mt-1">Poultry Broilers Capacity</span>
              </div>
              <div className="bg-[#050f0c] p-3 rounded-lg border border-white/5">
                <strong className="text-2xl sm:text-3xl font-black block text-emerald-400 tracking-tight">100</strong>
                <span className="text-[10px] text-slate-300 uppercase font-black tracking-wider block mt-1">Milking Cow Stanchions</span>
              </div>
              <div className="bg-[#050f0c] p-3 rounded-lg border border-white/5">
                <strong className="text-2xl sm:text-3xl font-black block text-emerald-400 tracking-tight">12</strong>
                <span className="text-[10px] text-slate-300 uppercase font-black tracking-wider block mt-1">Managed Aquatic Waterways</span>
              </div>
              <div className="bg-[#050f0c] p-3 rounded-lg border border-white/5">
                <strong className="text-2xl sm:text-3xl font-black block text-emerald-400 tracking-tight">8.1 ac</strong>
                <span className="text-[10px] text-slate-300 uppercase font-black tracking-wider block mt-1">Freehold Industrial Land</span>
              </div>
            </div>

            <div className="text-xs space-y-2 border-t border-white/5 pt-4">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-slate-300 font-bold">Shed & Grid Utilization Target</span>
                <b className="font-mono text-emerald-400 text-sm">88.5% Target load</b>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '88%' }}></div>
              </div>
              <div className="flex justify-between items-center text-[10px] pt-1 text-[#a3c3b5]">
                <span>Integrating feed mill extraction loops</span>
                <strong className="text-white font-mono font-bold">Closed-Loop Active</strong>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Co-investor Pillars banner */}
      <section className="bg-[#0b1410] border-y border-emerald-950/40 py-5 px-4 md:px-8 lg:px-16 shadow-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-300">
          <div className="flex items-center gap-3 border-r-0 lg:border-r border-emerald-950/20 pr-4 py-1.5">
            <span className="text-emerald-400 text-xs font-black font-mono">01</span>
            <div>
              <b className="text-xs block text-white font-bold">Pre-Capitalized Base</b>
              <span className="text-[10.5px] text-zinc-400 block">Funds bypass basic construction</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-r-0 lg:border-r border-emerald-950/20 pr-4 py-1.5">
            <span className="text-emerald-400 text-xs font-black font-mono">02</span>
            <div>
              <b className="text-xs block text-white font-bold">Maker-Checker Controls</b>
              <span className="text-[10.5px] text-zinc-400 block">Tranche capital locked under dual authority</span>
            </div>
          </div>
          <div className="flex items-center gap-3 border-r-0 lg:border-r border-emerald-950/20 pr-4 py-1.5">
            <span className="text-emerald-400 text-xs font-black font-mono">03</span>
            <div>
              <b className="text-xs block text-white font-bold">On-Site Feed Extruding</b>
              <span className="text-[10.5px] text-zinc-400 block">35% feed cost savings lock margins</span>
            </div>
          </div>
          <div className="flex items-center gap-3 py-1.5 font-sans">
            <span className="text-emerald-400 text-xs font-black font-mono">04</span>
            <div>
              <b className="text-xs block text-white font-bold">Digital Spec Auditing</b>
              <span className="text-[10.5px] text-zinc-400 block">Direct ledger mapping to local records</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section: 'Asset & Infrastructure' Summary Dashboard module */}
      <section id="assets" className="py-16 md:py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto space-y-10">
        <div className="space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-emerald-400 uppercase font-mono block">PHYSICAL ASSET REGISTER</span>
          <h2 className="text-3xl md:text-4.5xl font-extrabold tracking-tight text-white font-sans max-w-2xl">
            Fully standing infrastructure optimized for capital integration.
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Unlike classic agricultural campaigns that raise cash to purchase raw soil or lay baseline foundations, Delta Harvest operates from a pre-built industrial agroplex in Bhaluka. This structure drastically limits basic risk, allowing capital allocations to apply straight to production inventory cycles.
          </p>
        </div>

        {/* Beautiful visual dashboard */}
        <AssetInfrastructureSummary />
      </section>

      {/* Geospatial Map Segment */}
      <section className="py-16 bg-[#030907] text-white border-y border-emerald-950 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 space-y-6 text-left">
            <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase">Geospatial Field Mapping</span>
            <h2 className="text-3xl md:text-3.5xl font-extrabold tracking-tight text-white font-sans">
              Interactive physical asset contour.
            </h2>
            <p className="text-[#a9bcae] text-xs leading-relaxed">
              Delta Harvest matches incoming co-investments to verified geodesic envelopes. Every aquaculture pond, stanchion milking barn, and poultry nursery sits inside our perimeter fence, mapped below by physical KML coordinate indices.
            </p>
            <div className="bg-[#0b1410] border border-emerald-950 p-4 rounded-lg space-y-2.5">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-black tracking-wider block">Auditable Geospatial Parameters</span>
              <div className="space-y-1 text-[11px] text-[#cadecc]">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#9673;</span>
                  <span><strong>8.1 Acres</strong> overall property limits in premium Mymensingh</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#9673;</span>
                  <span>Deep perimeter security fencing & security towers</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#9673;</span>
                  <span>12 aquaculture ponds with automated gravity overflow levels</span>
                </div>
              </div>
            </div>
            <div className="text-[11px] text-[#869f8d]">
              👉 <em>Click any outline envelope or pond polygon on the vector terminal to extract current water parameters, stocking density, and harvest milestones.</em>
            </div>
          </div>

          <div className="lg:col-span-8">
            <InfrastructureMap />
          </div>

        </div>
      </section>

      {/* Opportunities Section */}
      <section id="opportunities" className="py-16 md:py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-extrabold tracking-wider text-emerald-400 uppercase block font-mono">INVESTMENT OPPORTUNITIES</span>
            <h2 className="text-3xl md:text-4.5xl font-extrabold tracking-tight text-white font-sans">
              Active Operational Cycles
            </h2>
          </div>
          <p className="text-xs text-zinc-400 max-w-md leading-relaxed font-semibold">
            Delta Harvest allocates resources tranche-by-tranche driven by operational readiness parameters. Review our commercial cycles currently open for accredited private placements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.filter(o => o.publishStatus === 'published').map((opp) => {
            const isPipeline = opp.status === 'PIPELINE';
            const isClosed = opp.status === 'CLOSED';
            return (
              <div 
                key={opp.id} 
                className={`bg-[#030907] border border-emerald-950/60 rounded-xl p-6 flex flex-col min-h-[460px] shadow-sm relative transition-all hover:shadow-md ${
                  opp.status === 'OPEN' ? 'border-t-4 border-t-emerald-500' : 'opacity-70 bg-[#060c09]'
                }`}
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span className="text-[10px] font-extrabold uppercase font-mono text-zinc-400 tracking-wider">
                    {opp.type} UNIT CYCLING
                  </span>
                  
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider font-mono ${
                    opp.status === 'OPEN' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : opp.status === 'PIPELINE'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                        : 'bg-zinc-900 text-slate-300 border border-zinc-800'
                  }`}>
                    {opp.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight font-sans">
                  {opp.title}
                </h3>
                <p className="text-[10.5px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                  <CornerDownRight className="w-3 h-3 text-emerald-400" /> {opp.subtitle}
                </p>

                <p className="text-xs text-zinc-300 mt-4 leading-relaxed line-clamp-4">
                  {opp.description}
                </p>

                {/* Return stats */}
                <div className="grid grid-cols-3 gap-2.5 my-6 bg-[#0c1813]/60 p-3 rounded-lg border border-emerald-950/40 font-mono">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Target Return</span>
                    <b className="text-xs text-emerald-400 block mt-0.5 font-bold">{opp.expectedReturn.split(' ')[0]}</b>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Min Commitment</span>
                    <b className="text-[11.5px] text-slate-200 block mt-0.5 font-bold">৳{(opp.minCommitment/100000).toFixed(1)}L</b>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Cycle Tenure</span>
                    <b className="text-xs text-slate-200 block mt-0.5 font-bold">{opp.tenure}</b>
                  </div>
                </div>

                <div className="space-y-2 mb-6 font-sans">
                  {opp.details.slice(0, 3).map((detail, idx) => (
                    <div key={idx} className="flex gap-2 text-[11px] text-zinc-300 items-start">
                      <span className="text-emerald-400 font-bold font-mono shrink-0">✓</span>
                      <span className="leading-tight">{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-emerald-950/30">
                  {isPipeline ? (
                    <div className="space-y-1.5">
                      <div className="text-[10px] text-amber-500 font-mono font-bold text-center">
                        ⏳ Expressions restricted during initial vetting
                      </div>
                      <button 
                        disabled 
                        className="w-full bg-[#161616] text-[#888888] py-2.5 rounded-lg font-bold text-xs cursor-not-allowed border border-zinc-800"
                      >
                        Pipeline Cycle Locked
                      </button>
                    </div>
                  ) : isClosed ? (
                    <button 
                      disabled 
                      className="w-full bg-[#161616] text-[#888888] py-2.5 rounded-lg font-bold text-xs cursor-not-allowed border border-zinc-800"
                    >
                      Production Cycle Fully Subscribed
                    </button>
                  ) : (
                    <button 
                      onClick={onOpenLogin}
                      className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-2.5 rounded-lg font-black text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      Authenticate and Review Ledger &rarr;
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Capital Governance Controls */}
      <section id="governance" className="bg-[#051a14] text-white py-20 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-white/5 pb-8">
            <div className="space-y-3">
              <span className="text-xs font-extrabold tracking-widest text-[#a0cfa4] uppercase font-mono block">CAPITAL SECURITY & COMPLIANCE</span>
              <h2 className="text-3xl md:text-[2.6rem] font-black tracking-tight leading-none text-white max-w-2xl font-sans">
                Rigorous dual-control ledgering restricts operations variance.
              </h2>
            </div>
            <p className="text-xs text-[#cad9cf] max-w-md leading-relaxed">
              Delta Harvest locks down capital utilization. By segregating individual project cycles and implementing Maker-Checker authorization loops, every single Taka must be accounted for by local supervisors and audited by central checkers before payout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0b241d]/85 border border-[#0d2e25] rounded-xl p-6 space-y-4">
              <span className="text-sm font-black font-mono text-emerald-400">01</span>
              <h3 className="text-base font-bold text-white tracking-tight">Ring-Fenced Ledgers</h3>
              <p className="text-xs text-[#cad9cf] leading-relaxed font-semibold">
                Each operational cycle runs on isolated bank and ledger rows. This prevents multi-sector funds mingling or unauthorized cash redirection.
              </p>
            </div>

            <div className="bg-[#0b241d]/85 border border-[#0d2e25] rounded-xl p-6 space-y-4">
              <span className="text-sm font-black font-mono text-emerald-400">02</span>
              <h3 className="text-base font-bold text-white tracking-tight">Dual-Signoff Tranche System</h3>
              <p className="text-xs text-[#cad9cf] leading-relaxed font-semibold">
                An on-site supervisor (Maker) proposes specific resource releases (e.g., vaccine or feed pellet batch purchases), which remain inactive until cleared by the Central Checker.
              </p>
            </div>

            <div className="bg-[#0b241d]/85 border border-[#0d2e25] rounded-xl p-6 space-y-4">
              <span className="text-sm font-black font-mono text-emerald-400">03</span>
              <h3 className="text-base font-bold text-white tracking-tight">Append-Only Audit</h3>
              <p className="text-xs text-[#cad9cf] leading-relaxed font-semibold">
                Platform records exist in chronologic, immutable states. All allocation requests, vetting actions, and offtake weights produce secure ledger hashes.
              </p>
            </div>

            <div className="bg-[#0b241d]/85 border border-[#0d2e25] rounded-xl p-6 space-y-4">
              <span className="text-sm font-black font-mono text-emerald-400">04</span>
              <h3 className="text-base font-bold text-white tracking-tight">Telemetry Evidence Hooks</h3>
              <p className="text-xs text-[#cad9cf] leading-relaxed font-semibold">
                Operating updates link directly to verifiable data-room assets: feed mill weight sheets, certified vet reports, and digital spectra water readouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Onboarding Process */}
      <section id="process" className="bg-[#05110d] py-16 md:py-24 px-4 md:px-8 lg:px-16 text-slate-300 border-t border-emerald-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-3 mb-12">
            <span className="text-xs font-extrabold tracking-widest text-emerald-400 font-mono block">SUITABILITY ENGAGEMENT PATH</span>
            <h2 className="text-3xl md:text-4.5xl font-black tracking-tight text-white font-sans">
              Rigid Allocator Vetting Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <div className="bg-[#0b1410] p-5 border border-emerald-950 rounded-xl space-y-3 shadow-xs">
              <span className="text-xs font-black font-mono text-emerald-400">STEP 01</span>
              <h4 className="font-extrabold text-sm text-emerald-300 font-sans">Registration Filing</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                Submit an indicative suitability declaration, specifying regulatory country source of capital and allocation brackets.
              </p>
            </div>

            <div className="bg-[#0b1410] p-5 border border-emerald-950 rounded-xl space-y-3 shadow-xs font-sans">
              <span className="text-xs font-black font-mono text-emerald-400">STEP 02</span>
              <h4 className="font-extrabold text-sm text-emerald-300">Suitability Vetting</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                The advisory board evaluates background suitability profile parameters, source of funds, and compliance eligibility.
              </p>
            </div>

            <div className="bg-[#0b1410] p-5 border border-emerald-950 rounded-xl space-y-3 shadow-xs font-sans">
              <span className="text-xs font-black font-mono text-emerald-400">STEP 03</span>
              <h4 className="font-extrabold text-sm text-emerald-300">Workstation Activation</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                Approved allocators acquire secure login keys to inspect general ledgers, historical telemetry, and corporate docs.
              </p>
            </div>

            <div className="bg-[#0b1410] p-5 border border-emerald-950 rounded-xl space-y-3 shadow-xs font-sans">
              <span className="text-xs font-black font-mono text-emerald-400">STEP 04</span>
              <h4 className="font-extrabold text-sm text-emerald-300">Legal Commitment</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                All declarations persist in non-binding status until formal placement documents undergo bilateral notarized signoff.
              </p>
            </div>

            <div className="bg-[#0b1410] p-5 border border-emerald-950 rounded-xl space-y-3 shadow-xs font-sans">
              <span className="text-xs font-black font-mono text-emerald-400">STEP 05</span>
              <h4 className="font-extrabold text-sm text-emerald-300">Direct Oversight</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-medium">
                Monitor capital tranches in real-time. Review weekly operational updates, telemetry parameters, and weight reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosures section */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto text-center space-y-5">
        <span className="text-[10px] font-extrabold tracking-widest text-red-400 uppercase font-mono block">
          🚨 COMMERCIAL RISK DISCLOSURES & RISK FACTORS
        </span>
        <h2 className="text-2.5xl font-extrabold tracking-tight text-[#ededed] leading-tight font-sans">
          Arable and Livestock assets are productive, not predictable.
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed text-justify sm:text-center font-medium">
          Rearing biological assets involves substantial risks. Growth rate fluctuations, disease strains (such as avian epidemics or bovine pathogens), weather aberrations, severe flooding, regional logistics blockages, feed stock price volatility, security theft, and local market wholesale price variations occur. Projected yields represent internal performance goals and are indicative markers only; they do not represent guarantees or capital shields.
        </p>
      </section>

      {/* Bottom CTA Block */}
      <section className="mx-4 md:mx-8 lg:mx-16 mb-20 max-w-7xl lg:mx-auto bg-gradient-to-r from-emerald-900 to-[#0e2c24] text-white p-8 md:p-12 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-400/5 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="space-y-2.5 max-w-2xl relative z-10">
          <span className="text-xs text-emerald-400 font-extrabold uppercase tracking-widest block font-mono">Secured Platform V2 Enrollment</span>
          <h2 className="text-2xl md:text-3.5xl font-extrabold tracking-tight font-sans text-white">
            Access the Bhaluka Agroplex allocation channel.
          </h2>
          <p className="text-xs text-[#cadecc] font-medium leading-relaxed">
            Inquire regarding placement suitability constraints. Our private allocator workstation registers are locked until individual suitability filings clear advisory board vetting.
          </p>
        </div>

        <button 
          onClick={onOpenApplication}
          className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 px-6 py-3.5 rounded-lg font-black text-xs shrink-0 shadow-lg hover:scale-105 active:scale-95 transition-all text-center relative z-10"
        >
          Begin Preliminary Suitability Filing &rarr;
        </button>
      </section>

      {/* Institutional Corporate Footer */}
      <footer className="bg-[#051410] text-[#a1b8ad] py-12 px-4 md:px-8 lg:px-16 border-t border-emerald-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-xs font-medium">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 text-emerald-400">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <path d="M32 5 56 19v26L32 59 8 45V19L32 5Z" fill="currentColor" className="opacity-15" />
                <path d="M18 42c12-1 19-8 22-22 5 7 6 15 2 22H18Z" fill="currentColor" />
                <path d="M17 44h30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <strong className="tracking-widest uppercase text-white font-black font-sans">DELTA HARVEST</strong>
              <span className="text-[9px] text-emerald-500 font-mono">V2 Secured Asset System</span>
            </div>
          </div>

          <p className="text-center md:text-justify text-[10.5px] max-w-sm text-slate-400 leading-relaxed">
            Delta Harvest V2 is an private co-investment portal managed by Delta Harvest Co. It does not solicit public deposit taking, issue retail securities, or operate as a public collective investment undertaking.
          </p>

          <div className="text-center md:text-right font-mono text-[10px] text-slate-400">
            <span>© {new Date().getFullYear()} Delta Harvest Co. All rights reserved.</span>
            <span className="block mt-1 text-[#648473]">Bhaluka Agro-Industrial Base, Kachina Block, Mymensingh</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
