import React, { useState } from 'react';
import { Opportunity, Commitment, OperatingUpdate, Message, Notification, Investor } from '../types';

interface InvestorPortalProps {
  currentUser: { email: string; name: string };
  investorData: Investor;
  opportunities: Opportunity[];
  commitments: Commitment[];
  updates: OperatingUpdate[];
  messages: Message[];
  notifications: Notification[];
  onAddCommitment: (oppId: string, amount: number) => void;
  onSendMessage: (text: string) => void;
  onUpdateKyc: (profile: Partial<Investor>) => void;
  onMarkNotificationRead: (id: string) => void;
  onLogout: () => void;
}

export default function InvestorPortal({
  currentUser,
  investorData,
  opportunities,
  commitments,
  updates,
  messages,
  notifications,
  onAddCommitment,
  onSendMessage,
  onUpdateKyc,
  onMarkNotificationRead,
  onLogout
}: InvestorPortalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'opportunities' | 'commitments' | 'updates' | 'documents' | 'messaging' | 'profile'>('overview');
  
  // Local state for modals & inputs
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [expressAmount, setExpressAmount] = useState<number>(250000);
  const [showExpressModal, setShowExpressModal] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  
  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: investorData.name,
    mobile: investorData.mobile,
    location: investorData.location,
    occupation: investorData.occupation,
    sourceOfFunds: investorData.sourceOfFunds,
  });
  const [uploadedFnames, setUploadedFnames] = useState<string[]>(investorData.kycFiles);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Filter messages for current investor
  const myMessages = messages.filter(m => m.investorId === currentUser.email);
  const unreadNotifications = notifications.filter(n => !n.isRead && (n.userId === 'all' || n.userId === currentUser.email));

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateKyc({
      ...profileForm,
      kycFiles: uploadedFnames,
      kycStatus: uploadedFnames.length > investorData.kycFiles.length ? 'In Review' : investorData.kycStatus
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleFileUploadSim = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names: string[] = [];
      for (let i = 0; i < e.target.files.length; i++) {
        names.push(e.target.files[i].name);
      }
      setUploadedFnames(prev => [...Array.from(new Set([...prev, ...names]))]);
    }
  };

  const triggerStatementDownload = () => {
    // Generate simple text-based CSV simulated download representing their capital log
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Delta Harvest Prottyasha Project - Demonstration Statement V2\n"
      + `Investor,${currentUser.name}\n`
      + `Account Primary,${currentUser.email}\n`
      + `Statement Date,${new Date().toLocaleDateString()}\n\n`
      + `Opportunity,Committed Amount,Status,Requested Funds\n`
      + commitments.map(c => `"${c.opportunityTitle}",৳${c.amount},"${c.status}","No funds requested"`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `demo_statement_${currentUser.email.replace('@','_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f2f4f1] grid grid-cols-1 lg:grid-cols-[260px_1fr] text-ink font-sans">
      
      {/* Sidebar Navigation Panel */}
      <aside className="bg-forest text-white p-5 flex flex-col justify-between sticky top-0 h-screen z-20">
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="w-9 h-9 text-white">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <path d="M32 5 56 19v26L32 59 8 45V19L32 5Z" fill="currentColor" className="opacity-15" />
                <path d="M18 42c12-1 19-8 22-22 5 7 6 15 2 22H18Z" fill="currentColor" />
                <path d="M17 44h30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col">
              <strong className="text-xs font-black tracking-widest leading-none">DELTA HARVEST</strong>
              <small className="text-[9px] text-[#91aaa0] mt-1 font-semibold block">INVESTOR PORTAL</small>
            </div>
          </div>

          <div className="bg-lime/10 border border-lime/20 text-lime rounded-md p-2.5 text-[10px] uppercase font-mono font-bold tracking-wider tracking-tight text-center">
            🔐 Accredited Investor Portal
          </div>

          <nav className="flex flex-col gap-1.5 pt-2">
            {[
              { id: 'overview', label: 'Overview Dashboard', icon: '📊' },
              { id: 'opportunities', label: 'Opportunities', icon: '🌾' },
              { id: 'commitments', label: 'Commitments', icon: '🤝' },
              { id: 'updates', label: 'Operating Evidence', icon: '📝' },
              { id: 'documents', label: 'Data Room Files', icon: '📂' },
              { id: 'messaging', label: 'IR Messaging', icon: '💬', badge: myMessages.length },
              { id: 'profile', label: 'KYC & Suitability', icon: '👤' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left rounded-md px-3 py-2 text-xs font-bold flex items-center justify-between transition-colors ${
                  activeTab === tab.id ? 'bg-white/10 text-white' : 'text-[#b8c9c1] hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-sm">{tab.icon}</span>
                  <span>{tab.label}</span>
                </span>
                {tab.badge && tab.badge > 0 ? (
                  <span className="bg-forest-light text-lime text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Foot */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full text-left text-xs font-bold text-[#afc1b9] hover:text-white flex items-center gap-2"
          >
            ← Public Web View
          </button>
          
          <div className="bg-accent-danger/10 border border-accent-danger/20 rounded-md p-2 flex gap-2 items-start text-left">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1 shrink-0 animate-ping"></span>
            <div>
              <b className="text-[10px] text-red-100 block font-bold leading-tight">Payment Gate Disabled</b>
              <small className="text-[9px] text-[#c2d0ca] leading-none">Awaiting central counsel approval</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex flex-col min-w-0">
        
        {/* Workspace Top Header bar */}
        <header className="bg-white border-b border-line h-16 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex flex-col leading-none">
            <span className="text-[9px] font-bold text-moss uppercase tracking-widest">Workspace Port</span>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-forest mt-0.5 capitalize font-sans">
              {activeTab} Panel
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification system with direct marks read trigger */}
            {unreadNotifications.length > 0 ? (
              <div className="relative group">
                <button className="relative w-8 h-8 rounded-full border border-line bg-paper flex items-center justify-center text-xs hover:border-forest">
                  🔔
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-accent-danger text-white rounded-full flex items-center justify-center text-[9px] font-extrabold border-2 border-white">
                    {unreadNotifications.length}
                  </span>
                </button>
                
                {/* Dropdown overlay */}
                <div className="hidden group-hover:block absolute right-0 mt-2 w-72 bg-paper border border-line rounded-lg p-3 shadow-lg z-30 transition-all text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-light mb-2 font-bold text-forest">
                    <span>Recent Notices</span>
                    <button 
                      onClick={() => unreadNotifications.forEach(n => onMarkNotificationRead(n.id))}
                      className="text-[10px] text-forest-light hover:underline font-mono"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {unreadNotifications.map(notif => (
                      <div key={notif.id} className="p-2 bg-cream/10 border-b border-light hover:bg-[#eef4f0]">
                        <div className="flex justify-between font-bold text-red-950 font-sans">
                          <span>{notif.title}</span>
                          <button 
                            onClick={() => onMarkNotificationRead(notif.id)}
                            className="text-[10px] text-muted hover:text-forest"
                          >
                            ✓
                          </button>
                        </div>
                        <p className="text-[10px] text-muted mt-0.5 leading-snug">{notif.messageText}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-xs text-muted">
                🔔
              </div>
            )}

            <div className="h-8 w-px bg-line"></div>

            {/* Persona card */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-forest text-lime font-black flex items-center justify-center text-xs">
                {currentUser.name[0]}
              </span>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <b className="text-xs font-bold text-forest">{currentUser.name}</b>
                <small className="text-[9px] text-muted mt-1 uppercase font-mono font-bold">Approved Investor</small>
              </div>
            </div>
          </div>
        </header>

        {/* Content canvas */}
        <main className="p-6 max-w-7xl w-full mx-auto space-y-6 flex-1">

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Profile Greeting Section */}
              <div className="bg-white border border-line rounded-radius-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                <div>
                  <span className="text-[10px] font-mono text-moss uppercase tracking-wider font-bold">Live Portal Connection</span>
                  <h2 className="text-xl md:text-2xl font-bold font-sans tracking-tight text-forest mt-0.5">
                    Welcome back, {currentUser.name}
                  </h2>
                  <p className="text-xs text-muted max-w-xl leading-relaxed mt-1">
                    Your personal investor account has cleared preliminary vetting. You have restricted viewing of available Bhaluka agriculture opportunities, ledger lines, and operating logs.
                  </p>
                </div>
                
                <div className="bg-cream/50 p-3 rounded-md flex flex-col items-center border border-line shrink-0 min-w-32">
                  <span className="text-[9px] uppercase tracking-wider text-muted font-bold block mb-1">KYC Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    investorData.kycStatus === 'Approved' 
                      ? 'bg-emerald-100 text-accent-success' 
                      : investorData.kycStatus === 'In Review'
                        ? 'bg-amber-100 text-[#76500d]'
                        : 'bg-[#f9e4df] text-accent-danger'
                  }`}>
                    {investorData.kycStatus}
                  </span>
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 border border-line rounded-xl hover:shadow-md transition-all">
                  <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Total Commitments</span>
                  <strong className="text-2xl mt-1.5 block font-mono font-bold text-forest">
                    ৳{commitments.reduce((acc, c) => acc + c.amount, 0).toLocaleString()}
                  </strong>
                  <span className="text-[10px] text-muted block mt-1 tracking-tight">Active declarations (V2)</span>
                </div>

                <div className="bg-white p-5 border border-line rounded-xl hover:shadow-md transition-all">
                  <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Requested Funds</span>
                  <strong className="text-2xl mt-1.5 block font-mono font-bold text-accent-success">
                    ৳0
                  </strong>
                  <span className="text-[10px] text-accent-success font-bold block mt-1 tracking-tight">CM-001 No funds requested</span>
                </div>

                <div className="bg-white p-5 border border-line rounded-xl hover:shadow-md transition-all">
                  <span className="text-[10px] text-muted uppercase font-bold tracking-wider font-bold">Aquaculture Ready</span>
                  <strong className="text-2xl mt-1.5 block font-mono font-bold text-forest">
                    {investorData.readinessScore}%
                  </strong>
                  <div className="w-full bg-[#edf0ed] h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-forest h-full" style={{ width: `${investorData.readinessScore}%` }}></div>
                  </div>
                </div>

                <div className="bg-white p-5 border border-line rounded-xl hover:shadow-md transition-all">
                  <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Recent Update</span>
                  <strong className="text-base mt-2 block font-sans font-bold text-forest truncate">
                    {updates[0]?.title || 'No recent updates'}
                  </strong>
                  <span className="text-[10px] text-muted block mt-1 tracking-tight">Date: {updates[0]?.date || 'N/A'}</span>
                </div>
              </div>

              {/* Sub-grid: Recent update and Demonstration Statement */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent update log */}
                <div className="lg:col-span-7 bg-white border border-line rounded-xl p-5 space-y-4">
                  <div className="flex justify-between items-center border-b border-[#edf0ed] pb-3">
                    <h3 className="font-sans font-bold text-sm text-forest uppercase">Recent operating updates</h3>
                    <button 
                      onClick={() => setActiveTab('updates')} 
                      className="text-[11px] text-forest-light hover:underline font-semibold"
                    >
                      Browse all update evidence
                    </button>
                  </div>

                  <div className="space-y-4">
                    {updates.slice(0, 2).map(up => (
                      <div key={up.id} className="p-3 bg-cream/20 border border-line rounded-md hover:border-forest transition-colors text-xs space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-muted font-mono">
                          <span className="bg-forest/10 text-forest font-bold px-2 py-0.5 rounded-full uppercase">
                            {up.category}
                          </span>
                          <span>{up.date}</span>
                        </div>
                        <h4 className="font-bold text-forest text-sm">{up.title}</h4>
                        <p className="text-[#66716b] leading-normal line-clamp-3">{up.content}</p>
                        <div className="text-[10px] bg-white p-1.5 border border-[#edf0ed] rounded font-mono text-[#5a897b]">
                          <b>On-Site Evidence Trail:</b> {up.evidenceText}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Demonstration statement download panel */}
                <div className="lg:col-span-5 bg-[#fafbfa] border border-line rounded-xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2 text-left">
                    <span className="text-[9px] font-mono font-bold text-moss block">PORTAL UTILITIES</span>
                    <h3 className="font-bold text-sm text-forest uppercase tracking-tight">Demonstration Statements</h3>
                    <p className="text-xs text-muted leading-relaxed">
                      Approved participants can execute digital records export of committed cycles and status declarations. Download a simulated statement for accounting tests.
                    </p>
                  </div>

                  <div className="bg-white p-3.5 border border-line rounded-md text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-muted">Direct Holder Name:</span>
                      <b className="font-bold text-forest">{currentUser.name}</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Registered Sector:</span>
                      <strong className="font-semibold text-forest">Aquaculture Cycle (V2)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Total Declared Balance:</span>
                      <strong className="font-mono text-forest font-bold">৳{commitments.reduce((acc, c) => acc + c.amount, 0).toLocaleString()}</strong>
                    </div>
                  </div>

                  <button 
                    onClick={triggerStatementDownload}
                    className="w-full bg-forest hover:bg-forest-hover text-white text-xs font-bold py-2.5 rounded-md transition-colors"
                  >
                    💾 Download Demo Statement (CSV) &rarr;
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* OPPORTUNITIES TAB */}
          {activeTab === 'opportunities' && (
            <div className="space-y-6">
              <div className="text-left max-w-2xl">
                <span className="text-[10px] uppercase font-mono text-moss tracking-wider font-bold">AGRIBUSINESS LANDSCAPE</span>
                <h2 className="text-xl font-bold tracking-tight text-forest">Active Agricultural Stocking Cycles</h2>
                <p className="text-xs text-muted leading-normal mt-1">
                  Click on any published opportunity to inspect parameters, review physical assets mapping, and declare non-binding interest.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {opportunities.filter(o => o.publishStatus === 'published').map(opp => (
                  <div key={opp.id} className="bg-white border border-line rounded-xl p-5 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all">
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center text-[10px] font-bold text-muted font-mono">
                        <span>{opp.type.toUpperCase()} DEPLOYMENT</span>
                        <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                          opp.status === 'OPEN' ? 'bg-emerald-100 text-[#2b6d4f]' : 'bg-zinc-100 text-muted'
                        }`}>{opp.status}</span>
                      </div>
                      <h3 className="font-sans font-bold text-base text-forest mt-1">{opp.title}</h3>
                      <p className="text-[11px] text-muted leading-normal line-clamp-3">{opp.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#fafbfa] p-2.5 rounded-md border border-[#edf0ed]">
                      <div>
                        <span className="text-[9px] text-[#8a938f] block uppercase font-bold tracking-wider">Exp return</span>
                        <strong className="text-forest font-mono">{opp.expectedReturn}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#8a938f] block uppercase font-bold tracking-wider">Min subscription</span>
                        <strong className="text-forest font-mono">৳{opp.minCommitment.toLocaleString()}</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => { setSelectedOpp(opp); setShowExpressModal(true); }}
                      disabled={opp.status !== 'OPEN'}
                      className={`w-full text-xs font-bold py-2 rounded-md ${
                        opp.status === 'OPEN' 
                          ? 'bg-forest hover:bg-forest-hover text-white transition-colors' 
                          : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      {opp.status === 'OPEN' ? 'Express Non-binding Interest &rarr;' : 'Subscription Locked / Pipeline'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COMMITMENTS TAB */}
          {activeTab === 'commitments' && (
            <div className="space-y-6">
              <div className="text-left max-w-2xl">
                <span className="text-[10px] uppercase font-mono text-moss tracking-wider font-bold">DECLARATION REGISTRY</span>
                <h2 className="text-xl font-bold tracking-tight text-forest">Recorded Non-Binding Commitments</h2>
                <p className="text-xs text-muted leading-normal mt-1">
                  Commitments represent pre-vetting allocations registered during candidate reviews. They do not trigger real banking payouts or financial clearing.
                </p>
              </div>

              {commitments.length === 0 ? (
                <div className="text-center py-12 bg-white border border-line rounded-radius-lg">
                  <span className="text-3xl">🏜️</span>
                  <h3 className="text-sm font-bold text-forest mt-2">No Commitments Recorded Yet</h3>
                  <p className="text-xs text-muted mt-1">Visit the Opportunities tab to declare non-binding interest.</p>
                </div>
              ) : (
                <div className="bg-white border border-line rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-cream/40 border-b border-line text-[10px] font-bold text-zinc-600 uppercase">
                        <th className="p-3">Reference</th>
                        <th className="p-3">Agricultural Target</th>
                        <th className="p-3">Indicative Commitment</th>
                        <th className="p-3">Payer Account Status</th>
                        <th className="p-3">Action Gate Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#edf0ed] text-xs">
                      {commitments.map(c => (
                        <tr key={c.id} className="hover:bg-cream/10">
                          <td className="p-3 font-mono font-bold text-zinc-700">{c.id}</td>
                          <td className="p-3">
                            <div>
                              <strong className="text-forest block font-bold">{c.opportunityTitle}</strong>
                              <small className="text-[10px] text-muted">Created: {new Date(c.createdAt).toLocaleDateString()}</small>
                            </div>
                          </td>
                          <td className="p-3 font-mono font-bold text-forest-light">৳{c.amount.toLocaleString()}</td>
                          <td className="p-3">
                            <span className="bg-emerald-50 text-[#2b6d4f] border border-emerald-200/50 rounded-full px-2 py-0.5 text-[9px] font-bold font-mono">
                              Verified Registry Line
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="bg-[#f9e4df] text-accent-danger border border-red-200 font-mono text-[9px] font-extrabold rounded px-2 py-0.5 block w-max uppercase">
                              No funds requested
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* OPERATING EVIDENCE TAB (Updates feed) */}
          {activeTab === 'updates' && (
            <div className="space-y-6">
              <div className="text-left max-w-2xl">
                <span className="text-[10px] uppercase font-mono text-moss tracking-wider font-bold">LOCAL PROTTYASHA LOG CORES</span>
                <h2 className="text-xl font-bold tracking-tight text-forest">Operating Reports & Evidence</h2>
                <p className="text-xs text-muted leading-normal mt-1">
                  Daily journal metrics entered by on-site Bhaluka Operations Makers. Each statement displays physical evidentiary trails.
                </p>
              </div>

              <div className="space-y-4">
                {updates.map(up => (
                  <div key={up.id} className="bg-white border border-line rounded-xl p-5 hover:border-forest transition-colors text-xs space-y-3 shadow-sm">
                    <div className="flex justify-between items-center text-[10px] text-muted font-mono border-b border-[#edf0ed] pb-2">
                      <div className="flex gap-2 items-center">
                        <span className="bg-forest text-lime text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                          {up.category}
                        </span>
                        <span className="text-zinc-400">|</span>
                        <span>Supervisor: <b>{up.author}</b></span>
                      </div>
                      <span>Published: {up.date}</span>
                    </div>

                    <h3 className="font-bold text-sm text-forest font-sans">{up.title}</h3>
                    <p className="text-[#4a554f] leading-relaxed text-justify sm:text-left">{up.content}</p>

                    <div className="bg-[#f4f7f4] border border-emerald-100 rounded p-3 text-[11px] text-forest font-mono flex items-start gap-2">
                      <span className="text-accent-success font-black text-xs">ℹ</span>
                      <div>
                        <b className="block text-[10px] text-moss uppercase tracking-wider font-extrabold mb-0.5">Verified Evidence Index:</b>
                        <span>{up.evidenceText}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DOCUMENTS TAB (Data Room Register) */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="text-left max-w-2xl">
                <span className="text-[10px] uppercase font-mono text-moss tracking-wider font-bold">COMPLIANCE STORAGE</span>
                <h2 className="text-xl font-bold tracking-tight text-forest">Accredited Data-Room Documents</h2>
                <p className="text-xs text-muted leading-normal mt-1">
                  Confidential legal and operational records. Approved participants may execute placeholder files downloads to test access mechanisms.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Project Deed Extract & Deed Registry', fname: 'deed_registry_bhaluka_extract.pdf', size: '2.4 MB', type: 'Legal' },
                  { title: 'Kachina Union Trade License (Renewed)', fname: 'union_trade_permit_2026_27.pdf', size: '1.1 MB', type: 'Certificate' },
                  { title: 'Ponds 1-11 Excavation Survey & Map', fname: 'ponds_excavator_survey_2026.pdf', size: '4.8 MB', type: 'Technical' },
                  { title: 'Biological Species Composition Ratio Sheet', fname: 'carp_pangas_species_balance_ratio.pdf', size: '840 KB', type: 'Telematic' },
                  { title: 'Bangladesh Tax Structure (TDS) Guidance', fname: 'nbs_withhold_brackets_v2.pdf', size: '560 KB', type: 'Compliance' },
                ].map((doc, i) => (
                  <div key={i} className="bg-white border border-line rounded-lg p-4 flex flex-col justify-between hover:border-forest transition-all text-xs space-y-3.5 shadow-sm">
                    <div className="flex gap-3 items-center">
                      <span className="text-2xl">📄</span>
                      <div className="text-left leading-tight">
                        <strong className="font-sans font-bold text-forest block">{doc.title}</strong>
                        <span className="text-[10px] font-mono text-muted">{doc.fname}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-muted pt-2 border-t border-[#edf0ed]">
                      <span>Size: {doc.size}</span>
                      <span className="bg-lime/10 text-forest px-1.5 py-0.5 rounded font-black text-[9px] uppercase">
                        {doc.type}
                      </span>
                    </div>

                    <button 
                      onClick={() => {
                        // Generate simple test placeholder text download
                        const text = `Delta Harvest Platform V2 Document Room\nTitle: ${doc.title}\nSimulated Filename: ${doc.fname}\nAuthorized Recipient: ${currentUser.email}\nStatus: Secured Placeholder. Verification complete.`;
                        const encodedUri = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", doc.fname);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="w-full bg-[#f2f4f1] hover:bg-forest hover:text-white border border-line py-1.5 rounded text-[11px] font-bold text-forest transition-colors uppercase font-mono"
                    >
                      Retrieve Protected File &darr;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IR MESSAGING TAB */}
          {activeTab === 'messaging' && (
            <div className="space-y-6">
              <div className="text-left max-w-2xl">
                <span className="text-[10px] uppercase font-mono text-moss tracking-wider font-bold">SECURED BOARD DIRECT CHANNELS</span>
                <h2 className="text-xl font-bold tracking-tight text-forest">Investor Relations (IR) Messages</h2>
                <p className="text-xs text-muted leading-normal mt-1">
                  Coordinate directly with Shabbir and the corporate advisory board regarding ongoing Bhaluka operations or tranche release evidence queries.
                </p>
              </div>

              <div className="border border-line rounded-xl bg-white overflow-hidden flex flex-col max-w-3xl mx-auto h-[480px]">
                {/* Chat header */}
                <div className="bg-[#fafbfa] p-4 border-b border-line flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <strong className="text-forest font-black font-sans">Delta Support Operations (Dhaka Head Desk)</strong>
                  </div>
                  <span className="text-muted text-[10px] font-mono">Channel Verified</span>
                </div>

                {/* Messages scrollarea */}
                <div className="flex-1 bg-cream/10 p-4 overflow-y-auto space-y-3 text-xs">
                  {myMessages.length === 0 ? (
                    <div className="text-center py-12 text-muted">
                      No communications history logged. Initiate standard inquiries below.
                    </div>
                  ) : (
                    myMessages.map(msg => {
                      const isMe = msg.senderRole === 'Investor';
                      return (
                        <div key={msg.id} className={`flex flex-col max-w-[75%] ${isMe ? 'ml-auto text-right' : 'mr-auto text-left'}`}>
                          <span className="text-[9px] text-[#8a938f] mb-0.5 font-bold font-sans">
                            {msg.senderName} ({msg.senderRole})
                          </span>
                          <div className={`p-3 rounded-lg leading-relaxed ${
                            isMe ? 'bg-forest text-white rounded-tr-none' : 'bg-white border border-line rounded-tl-none text-forest-hover'
                          }`}>
                            <p>{msg.messageText}</p>
                            <time className="block text-[8px] opacity-75 mt-1 font-mono">
                              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </time>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Chat composer */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (chatMessage.trim()) {
                      onSendMessage(chatMessage);
                      setChatMessage('');
                    }
                  }}
                  className="bg-paper p-3 border-t border-line flex gap-2"
                >
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Inquire about species stocking, feed ratios, or tranche approvals..."
                    className="flex-1 text-xs px-3 py-2 border border-line rounded-lg"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-forest hover:bg-forest-hover text-white text-xs font-bold px-4 py-2 rounded-lg transition-transform font-mono uppercase"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* KYC & SUITABILITY TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="text-left max-w-2xl">
                <span className="text-[10px] uppercase font-mono text-moss tracking-wider font-bold">COMPLIANCE REVIEW</span>
                <h2 className="text-xl font-bold tracking-tight text-forest">KYC Verification & Suitability File</h2>
                <p className="text-xs text-muted leading-normal mt-1">
                  Maintain your registered terminal coordinates, source of funds declarations, and upload security clearances like NBR tax papers or NID scans.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start max-w-4xl mx-auto">
                {/* Left KYC summary column */}
                <div className="md:col-span-4 bg-white border border-line rounded-xl p-5 text-center text-xs space-y-4 shadow-sm">
                  <div className="w-16 h-16 bg-forest text-lime text-2xl font-black rounded-full flex items-center justify-center mx-auto shadow-inner">
                    {currentUser.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-forest text-sm">{currentUser.name}</h3>
                    <span className="text-muted block text-[10px] font-mono">{currentUser.email}</span>
                  </div>

                  <hr className="border-line" />

                  <div className="text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted">Verification:</span>
                      <b className={`font-bold ${
                        investorData.kycStatus === 'Approved' ? 'text-accent-success' : 'text-accent-warning'
                      }`}>{investorData.kycStatus}</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Readiness:</span>
                      <b className="text-forest-light">{investorData.readinessScore}% Complete</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Access Level:</span>
                      <b className="text-[#24577c] font-mono uppercase">V2 Approved</b>
                    </div>
                  </div>
                </div>

                {/* Right Profile Vetting Form */}
                <form onSubmit={handleProfileSave} className="md:col-span-8 bg-paper border border-line rounded-xl p-5 md:p-6 space-y-5 shadow-sm">
                  {saveSuccess && (
                    <div className="p-2.5 bg-emerald-50 text-accent-success border border-emerald-200 text-xs font-bold rounded-lg text-center">
                      ✓ Profile details and files registered successfully in browser database!
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                    <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                      Full Name
                      <input 
                        type="text" 
                        value={profileForm.name} 
                        onChange={(e) => setProfileForm(v => ({ ...v, name: e.target.value }))}
                        className="text-xs" 
                        required 
                      />
                    </label>

                    <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                      Terminal Mobile
                      <input 
                        type="text" 
                        value={profileForm.mobile} 
                        onChange={(e) => setProfileForm(v => ({ ...v, mobile: e.target.value }))}
                        className="text-xs font-mono" 
                        required 
                      />
                    </label>

                    <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                      General Residence Location
                      <input 
                        type="text" 
                        value={profileForm.location} 
                        onChange={(e) => setProfileForm(v => ({ ...v, location: e.target.value }))}
                        className="text-xs" 
                        required 
                      />
                    </label>

                    <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                      Occupation
                      <input 
                        type="text" 
                        value={profileForm.occupation} 
                        onChange={(e) => setProfileForm(v => ({ ...v, occupation: e.target.value }))}
                        className="text-xs" 
                        required 
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1 text-[11px] font-bold text-forest text-left">
                    Declared Capital Source Category
                    <select 
                      value={profileForm.sourceOfFunds} 
                      onChange={(e) => setProfileForm(v => ({ ...v, sourceOfFunds: e.target.value }))}
                      className="text-xs bg-paper"
                    >
                      <option value="Salary / professional income">Salary / professional income</option>
                      <option value="Business income">Corporate Retained Earnings / Reserves</option>
                      <option value="Investment income">Investment assets yields / Dividends</option>
                      <option value="Savings">Personal accumulated savings</option>
                      <option value="Other lawful source">Other law-compliant reserves</option>
                    </select>
                  </label>

                  {/* KYC Files Upload trigger */}
                  <div className="space-y-2 text-left">
                    <b className="text-[11px] text-forest block font-bold">Registered Vetting Documents (NID Scans / Tax Clearances)</b>
                    
                    <div className="border-2 border-dashed border-line rounded-lg p-4 text-center hover:border-forest transition-colors bg-cream/10">
                      <span className="text-xl">📁</span>
                      <p className="text-xs text-muted font-bold mt-1">Drag and drop file scans or click to register</p>
                      <p className="text-[10px] text-muted font-normal mt-0.5">PDF, PNG, JPG accepted (Max 10MB per document)</p>
                      
                      <input 
                        type="file" 
                        multiple 
                        onChange={handleFileUploadSim}
                        className="hidden" 
                        id="kyc-files" 
                      />
                      <label 
                        htmlFor="kyc-files" 
                        className="mt-2.5 inline-block border border-line hover:border-forest bg-white hover:bg-cream/20 text-forest text-[11px] font-bold px-3 py-1.5 rounded cursor-pointer"
                      >
                        Browse Files
                      </label>
                    </div>

                    {uploadedFnames.length > 0 && (
                      <div className="p-2 bg-cream/30 border border-line rounded-md text-xs space-y-1.5">
                        <strong className="text-[11px] text-moss uppercase tracking-wider font-extrabold block">Filename Queue Registered:</strong>
                        {uploadedFnames.map((nm, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white border border-light p-1 rounded">
                            <span className="font-mono text-[10px] text-forest-hover truncate pr-4">{nm}</span>
                            <span className="text-[9px] bg-sky-100 text-accent-info font-bold uppercase rounded px-1 tracking-wider font-mono">
                              Vetted
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-forest hover:bg-forest-hover text-white text-xs font-bold py-2.5 rounded-md transition-all font-mono uppercase"
                  >
                    Commit Configuration Parameters &rarr;
                  </button>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Express Commitment Modal dialog */}
      {showExpressModal && selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/80 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-paper text-ink rounded-radius-lg p-6 shadow-custom">
            <button 
              onClick={() => setShowExpressModal(false)}
              className="absolute top-4 right-4 bg-cream flex items-center justify-center w-8 h-8 rounded-full text-forest hover:bg-line transition-colors text-lg"
            >
              ×
            </button>

            <span className="text-[10px] uppercase tracking-widest font-extrabold text-moss block mb-1">
              Indicative Allocation
            </span>
            <h3 className="text-lg font-bold text-forest tracking-tight font-sans">
              Express Non-Binding Interest
            </h3>
            <p className="text-xs text-muted mb-4 mt-1">
              Cycle: <strong className="text-forest">{selectedOpp.title}</strong>
            </p>

            <div className="space-y-4">
              <label className="flex flex-col gap-1 text-[11px] font-bold text-forest text-left">
                Target Allocation (BDT Taka)
                <select 
                  value={expressAmount} 
                  onChange={(e) => setExpressAmount(Number(e.target.value))}
                  className="text-xs bg-paper py-2 px-3"
                >
                  <option value={250000}>৳2,50,000 (Min)</option>
                  <option value={500000}>৳5,00,000</option>
                  <option value={1000000}>৳10,00,000</option>
                  <option value={2000000}>৳20,00,000</option>
                  <option value={5000000}>৳50,00,000</option>
                </select>
              </label>

              <div className="bg-[#fcf8ee] p-3 border border-amber-200 text-xs text-[#76500d] rounded-md leading-relaxed text-left">
                ⚠️ **Strict Regulation Notice:** Declaring interest writes record indicators to the administrative dashboard solely. It **does not trigger payment clearance** or generate financial offtake obligations.
              </div>

              <div className="flex gap-2.5 justify-end">
                <button 
                  onClick={() => setShowExpressModal(false)}
                  className="border border-line hover:border-forest text-forest px-4 py-2 rounded font-bold text-xs"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onAddCommitment(selectedOpp.id, expressAmount);
                    setShowExpressModal(false);
                  }}
                  className="bg-forest hover:bg-forest-hover text-white px-5 py-2 rounded font-bold text-xs"
                >
                  Conclude Declaration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
