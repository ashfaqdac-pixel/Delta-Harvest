import React, { useState } from 'react';
import { 
  Application, 
  Investor, 
  TrancheRequest, 
  Opportunity, 
  LedgerEntry, 
  Notification, 
  AuditEvent, 
  ReadinessGate 
} from '../types';

interface CheckerPortalProps {
  currentUser: { email: string; name: string };
  applications: Application[];
  investors: Investor[];
  tranches: TrancheRequest[];
  opportunities: Opportunity[];
  ledger: LedgerEntry[];
  readinessGates: ReadinessGate[];
  auditLogs: AuditEvent[];
  
  onApproveApplication: (id: string) => void;
  onDeclineApplication: (id: string, reason: string) => void;
  onApproveTranche: (id: string, notes: string) => void;
  onRejectTranche: (id: string, notes: string) => void;
  
  onSaveOpportunity: (opp: Opportunity) => void;
  onCreateOpportunity: (opp: Omit<Opportunity, 'id'>) => void;
  
  onAddLedger: (entry: Omit<LedgerEntry, 'id' | 'status' | 'checker'>) => void;
  onToggleGate: (key: string) => void;
  
  onImportBackup: (jsonContent: string) => boolean;
  onResetDatabase: () => void;
  onLogout: () => void;
}

export default function CheckerPortal({
  currentUser,
  applications,
  investors,
  tranches,
  opportunities,
  ledger,
  readinessGates,
  auditLogs,
  
  onApproveApplication,
  onDeclineApplication,
  onApproveTranche,
  onRejectTranche,
  onSaveOpportunity,
  onCreateOpportunity,
  onAddLedger,
  onToggleGate,
  onImportBackup,
  onResetDatabase,
  onLogout
}: CheckerPortalProps) {
  const [activeTab, setActiveTab] = useState<'queue' | 'tranches' | 'ledger' | 'opportunities' | 'gates' | 'vitals'>('queue');
  
  // Local UI States
  const [declineReason, setDeclineReason] = useState('');
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  
  const [chkDecisionNotes, setChkDecisionNotes] = useState('');
  const [selectedTrId, setSelectedTrId] = useState<string | null>(null);
  const [trAction, setTrAction] = useState<'approve' | 'reject' | null>(null);

  // New Opportunity Form
  const [showOppModal, setShowOppModal] = useState(false);
  const [editingOpp, setEditingOpp] = useState<Opportunity | null>(null);
  const [oppForm, setOppForm] = useState({
    title: '',
    status: 'PIPELINE' as any,
    type: 'Aquaculture',
    subtitle: '',
    description: '',
    expectedReturn: '12%',
    minCommitment: 250000,
    tenure: '8 months',
    targetAmount: 2000000,
    raisedAmount: 0,
    detailsText: '',
    publishStatus: 'draft' as any
  });

  // New Ledger Form
  const [ledgerForm, setLedgerForm] = useState({
    description: '',
    type: 'Inflow' as any,
    category: 'Capital Contribution',
    amount: 100000,
    reference: ''
  });
  const [ledgerSuccess, setLedgerSuccess] = useState(false);

  // Parse details text to array
  const handleSaveOpp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDetails = oppForm.detailsText.split('\n').map(l => l.trim()).filter(Boolean);
    
    if (editingOpp) {
      onSaveOpportunity({
        ...editingOpp,
        title: oppForm.title,
        status: oppForm.status,
        type: oppForm.type,
        subtitle: oppForm.subtitle,
        description: oppForm.description,
        expectedReturn: oppForm.expectedReturn,
        minCommitment: oppForm.minCommitment,
        tenure: oppForm.tenure,
        targetAmount: oppForm.targetAmount,
        raisedAmount: oppForm.raisedAmount,
        details: cleanDetails,
        publishStatus: oppForm.publishStatus
      });
    } else {
      onCreateOpportunity({
        title: oppForm.title,
        status: oppForm.status,
        type: oppForm.type,
        subtitle: oppForm.subtitle,
        description: oppForm.description,
        expectedReturn: oppForm.expectedReturn,
        minCommitment: oppForm.minCommitment,
        tenure: oppForm.tenure,
        targetAmount: oppForm.targetAmount,
        raisedAmount: oppForm.raisedAmount,
        details: cleanDetails,
        publishStatus: oppForm.publishStatus
      });
    }
    setShowOppModal(false);
    setEditingOpp(null);
  };

  const startEditOpp = (opp: Opportunity) => {
    setEditingOpp(opp);
    setOppForm({
      title: opp.title,
      status: opp.status,
      type: opp.type,
      subtitle: opp.subtitle,
      description: opp.description,
      expectedReturn: opp.expectedReturn,
      minCommitment: opp.minCommitment,
      tenure: opp.tenure,
      targetAmount: opp.targetAmount,
      raisedAmount: opp.raisedAmount,
      detailsText: opp.details.join('\n'),
      publishStatus: opp.publishStatus
    });
    setShowOppModal(true);
  };

  const handleManualLedger = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLedger({
      date: new Date().toISOString().split('T')[0],
      description: ledgerForm.description,
      type: ledgerForm.type,
      category: ledgerForm.category,
      amount: Number(ledgerForm.amount),
      reference: ledgerForm.reference,
      maker: 'Central Checker Manual Override'
    });
    setLedgerSuccess(true);
    setLedgerForm({
      description: '',
      type: 'Inflow',
      category: 'Capital Contribution',
      amount: 100000,
      reference: ''
    });
    setTimeout(() => setLedgerSuccess(false), 3000);
  };

  // CSV EXPORT HELPER
  const exportToCsv = (filename: string, rows: any[][]) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + rows.map(e => e.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportApplications = () => {
    const headers = ["ID", "Name", "Email", "Mobile", "Location", "Category", "Occupation", "Interest Focus", "Taka Capacity", "Source", "Objective", "Vetting Status", "Filed Date"];
    const rows = applications.map(a => [
      a.id, a.name, a.email, a.mobile, a.location, a.applicantType, a.occupation, a.interest, a.ticket, a.sourceOfFunds, a.objective, a.status, a.submittedAt
    ]);
    exportToCsv("vetting_applications_audit.csv", [headers, ...rows]);
  };

  const handleExportLedger = () => {
    const headers = ["ID", "Cleared Date", "Description", "Type Flow", "Category Node", "BDT Taka", "Reference Audit", "Vetting Status", "Maker Specialist", "Reviewing Checker"];
    const rows = ledger.map(l => [
      l.id, l.date, l.description, l.type, l.category, l.amount, l.reference, l.status, l.maker, l.checker || "N/A"
    ]);
    exportToCsv("prottyasha_project_ledger.csv", [headers, ...rows]);
  };

  const handleExportAuditLogs = () => {
    const headers = ["ID", "Chronologic Timestamp", "Actor Principal", "Role Permission", "Action Type", "Telemetry Summary"];
    const rows = auditLogs.map(l => [
      l.id, l.timestamp, l.actor, l.role, l.action, l.summary
    ]);
    exportToCsv("delta_harvest_v2_audit_timeline.csv", [headers, ...rows]);
  };

  const handleDownloadJSONBackup = () => {
    // Generate unified local storage backup structure
    const backupData = {
      applications,
      investors,
      tranches,
      opportunities,
      ledger,
      readinessGates,
      auditLogs,
      timestamp: new Date().toISOString(),
      integrityHash: Math.random().toString(36).substr(2, 9)
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(backupData, null, 2))}`;
    const link = document.createElement("a");
    link.setAttribute("href", jsonString);
    link.setAttribute("download", `delta_harvest_v2_data_snapshot_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackupUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        try {
          const success = onImportBackup(text);
          if (success) {
            alert("✓ Backup bundle successfully parsed and loaded into state indicators!");
          } else {
            alert("❌ Erroneous JSON mapping signature detected. Cannot restore standard structure.");
          }
        } catch {
          alert("❌ Incompatible files decoding error.");
        }
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f4f1] grid grid-cols-1 lg:grid-cols-[260px_1fr] text-ink font-sans">
      
      {/* Sidebar navigation */}
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
            <div className="flex flex-col text-left">
              <strong className="text-xs font-black tracking-widest leading-none">DELTA HARVEST</strong>
              <small className="text-[9px] text-[#91aaa0] mt-1 font-semibold block">MANAGEMENT CENTER</small>
            </div>
          </div>

          <div className="bg-[#fff1ce]/10 border border-[#fff1ce]/20 text-[#ffe5a4] rounded-md p-2.5 text-[10px] uppercase font-mono font-bold tracking-wider text-center">
            👑 Admin Checker Authority
          </div>

          <nav className="flex flex-col gap-1.5 pt-2">
            {[
              { id: 'queue', label: 'Candidate Vetting Box', count: applications.filter(a => a.status === 'pending').length, icon: '📋' },
              { id: 'tranches', label: 'Tranche dual sign-off', count: tranches.filter(t => t.status === 'pending').length, icon: '🪙' },
              { id: 'ledger', label: 'Project Ledger Core', icon: '📖' },
              { id: 'opportunities', label: 'Opportunities Manager', icon: '🌾' },
              { id: 'gates', label: 'Readiness Checklist', icon: '🛡️' },
              { id: 'vitals', label: 'Vitals & Data Backups', icon: '💻' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left rounded-md px-3 py-2 text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === tab.id ? 'bg-white/10 text-white' : 'text-[#b8c9c1] hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </span>
                {tab.count && tab.count > 0 ? (
                  <span className="bg-accent-warning text-white text-[9px] font-mono px-1.5 py-0.5 rounded-full font-bold">
                    {tab.count}
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
          <div className="text-[10px] text-zinc-400 font-mono text-center">
            Terminal Admin: Shabbir
          </div>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex flex-col min-w-0">
        
        {/* Workspace Header */}
        <header className="bg-white border-b border-line h-16 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex flex-col leading-none text-left">
            <span className="text-[9px] font-bold text-moss uppercase tracking-widest">Headquarters Office Desk</span>
            <h1 className="text-base md:text-lg font-bold tracking-tight text-forest mt-0.5 capitalize">
              {activeTab} Management Console
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-forest text-[#ffd580] font-black flex items-center justify-center text-xs">
              C
            </span>
            <div className="flex flex-col text-left leading-none">
              <b className="text-xs font-bold text-forest">{currentUser.name}</b>
              <small className="text-[9px] text-muted mt-1 uppercase font-mono font-bold">Senior Overseer (Checker)</small>
            </div>
          </div>
        </header>

        {/* Workspace Canvas */}
        <main className="p-6 max-w-7xl w-full mx-auto space-y-6 flex-1 text-left">
          
          {/* QUEUE TAB (Accredited candidate screening) */}
          {activeTab === 'queue' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-mono text-moss tracking-wider font-extrabold">ACCEDITED VETTING TERMINAL</span>
                  <h2 className="text-xl font-sans font-bold text-forest mt-0.5">Investor Screening Pipeline</h2>
                  <p className="text-xs text-muted leading-normal">
                    Review incoming non-binding investor applications, write internal compliance screening notes, and authorize active investor credentials.
                  </p>
                </div>
                <button 
                  onClick={handleExportApplications}
                  className="bg-paper border border-line hover:border-forest text-forest hover:bg-cream/25 px-4 py-2 rounded-md font-bold text-xs shrink-0 font-mono"
                >
                  📥 Export Applications Log (CSV)
                </button>
              </div>

              {/* List candidates */}
              <div className="space-y-4">
                {applications.length === 0 ? (
                  <div className="p-12 text-center bg-white border border-line rounded-xl">
                    <span className="text-3xl">🏜️</span>
                    <h3 className="text-sm font-bold text-forest mt-2">No Applications logged currently</h3>
                  </div>
                ) : (
                  applications.map(app => (
                    <div key={app.id} className="bg-white border border-line rounded-xl p-5 text-xs space-y-4 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start gap-4 flex-wrap">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] text-muted bg-[#f2f4f1] px-1.5 py-0.5 rounded font-black">{app.id}</span>
                            <strong className="text-forest text-sm font-bold">{app.name}</strong>
                          </div>
                          <span className="text-[10.5px] text-muted block">
                            Residence: <b>{app.location}</b> | Email: <b>{app.email}</b> | Terminal: <b>{app.mobile}</b>
                          </span>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase font-mono tracking-wider ${
                          app.status === 'approved' 
                            ? 'bg-emerald-50 text-accent-success border border-emerald-200' 
                            : app.status === 'pending'
                              ? 'bg-amber-50 text-accent-warning border border-amber-200'
                              : 'bg-red-50 text-accent-danger border border-red-200'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#fafbfa] p-3 rounded-md border border-[#edf0ed]">
                        <div>
                          <span className="text-muted block text-[9px] uppercase font-bold tracking-wider">Candidate Category</span>
                          <b className="text-forest font-semibold">{app.applicantType}</b>
                        </div>
                        <div>
                          <span className="text-muted block text-[9px] uppercase font-bold tracking-wider">occupation / firm</span>
                          <b className="text-forest font-semibold">{app.occupation}</b>
                        </div>
                        <div>
                          <span className="text-muted block text-[9px] uppercase font-bold tracking-wider">Allocative capacity</span>
                          <b className="text-forest font-bold font-mono">৳{app.ticket.toLocaleString()}</b>
                        </div>
                        <div>
                          <span className="text-muted block text-[9px] uppercase font-bold tracking-wider font-semibold">Funds Source</span>
                          <b className="text-[#64748b] truncate block font-bold font-mono">{app.sourceOfFunds}</b>
                        </div>
                      </div>

                      <div className="bg-cream/10 border border-[#edf0ed] p-2 rounded leading-relaxed text-zinc-600">
                        <b className="text-forest block text-[10px] uppercase font-extrabold mb-0.5">Candidate declared objective:</b>
                        <span>"{app.objective}"</span>
                      </div>

                      {app.notes && (
                        <div className="bg-[#f2f4f9] border border-blue-150 p-2.5 rounded text-indigo-950 font-semibold leading-normal">
                          📚 **Compliance Officer Vetting notes:** {app.notes}
                        </div>
                      )}

                      {app.status === 'pending' && (
                        <div className="pt-3 border-t border-[#edf0ed] flex flex-col md:flex-row gap-3 items-end justify-between">
                          <label className="flex-1 flex flex-col gap-1 w-full text-left">
                            Internal Screening Notes
                            <input 
                              type="text" 
                              placeholder="Write screening notes prior to clearance (Mandatory for compliance log)"
                              value={selectedAppId === app.id ? declineReason : ''}
                              onChange={(e) => { setSelectedAppId(app.id); setDeclineReason(e.target.value); }}
                              className="text-xs w-full py-1.5"
                            />
                          </label>

                          <div className="flex gap-2 shrink-0">
                            <button 
                              onClick={() => {
                                onDeclineApplication(app.id, declineReason || 'Does not currently align with private placement ruleset.');
                                setDeclineReason('');
                                setSelectedAppId(null);
                              }}
                              className="border border-[#cfd5d1] hover:border-accent-danger text-accent-danger px-4 py-2 rounded font-bold text-xs"
                            >
                              Decline Access
                            </button>
                            <button 
                              onClick={() => {
                                onApproveApplication(app.id);
                                setDeclineReason('');
                                setSelectedAppId(null);
                              }}
                              className="bg-forest hover:bg-forest-hover text-white px-5 py-2 rounded font-bold text-xs"
                            >
                              Approve and Provision Credentials
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )))}
              </div>
            </div>
          )}

          {/* TRANCHES TAB (Dual Sign-off of proposed releases) */}
          {activeTab === 'tranches' && (
            <div className="space-y-6">
              <div className="text-left font-sans">
                <span className="text-[10px] uppercase font-mono text-moss tracking-wider font-extrabold">MAKER-CHECKER DISBURSEMENT GATE</span>
                <h2 className="text-xl font-bold text-forest mt-0.5">Double-entry Tranches Clearance</h2>
                <p className="text-xs text-muted leading-normal">
                  Field Makers propose procurement disbursements. Clear or reject proposals following corresponding physical invoice vetting.
                </p>
              </div>

              <div className="space-y-4">
                {tranches.filter(t => t.status === 'pending').length === 0 ? (
                  <div className="p-12 text-center bg-white border border-line rounded-xl">
                    <span className="text-3xl">✓</span>
                    <h3 className="text-sm font-bold text-neutral-800 mt-2">All proposed tranches have been audited and cleared</h3>
                    <p className="text-xs text-muted mt-1">No pending Dual Signoff actions left in queue.</p>
                  </div>
                ) : (
                  tranches.filter(t => t.status === 'pending').map(tr => (
                    <div key={tr.id} className="bg-white border border-line rounded-xl p-5 text-xs space-y-4 shadow-sm hover:border-forest transition-colors">
                      <div className="flex justify-between items-start gap-4 flex-wrap">
                        <div>
                          <span className="font-mono text-[9px] text-muted bg-[#f2f4f1] px-1.5 py-0.5 rounded font-bold">{tr.id}</span>
                          <strong className="text-forest text-sm font-bold block mt-1.5 font-sans">{tr.title}</strong>
                        </div>

                        <span className="bg-amber-100 text-accent-warning px-2.5 py-0.5 rounded-full text-[9px] uppercase font-mono font-bold tracking-wider">
                          PENDING CHECKER SIGN-OFF
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-[#fafbfa] p-3 rounded border border-line">
                        <div>
                          <span className="text-muted block text-[9px] uppercase font-bold tracking-wider">Payout Amount</span>
                          <b className="font-mono text-forest-light text-base block font-bold mt-0.5">৳{tr.amount.toLocaleString()}</b>
                        </div>
                        <div>
                          <span className="text-muted block text-[9px] uppercase font-bold tracking-wider">Proposed Maker</span>
                          <b className="text-forest block font-semibold mt-0.5">{tr.proposedBy}</b>
                        </div>
                        <div>
                          <span className="text-muted block text-[9px] uppercase font-bold tracking-wider">Invoice Reference Match</span>
                          <b className="text-forest font-mono truncate block font-semibold mt-0.5">{tr.evidenceUrl}</b>
                        </div>
                      </div>

                      <div className="bg-[#f0f3f1] border-l-4 border-emerald-300 p-2 text-zinc-600">
                        <b className="text-forest block text-[10px] uppercase font-extrabold mb-0.5">Maker's Explanatory notes:</b>
                        <span>"{tr.notes || 'No accompanying notes provided.'}"</span>
                      </div>

                      <div className="pt-3 border-t border-[#edf0ed] flex flex-col md:flex-row gap-3 items-end justify-between">
                        <label className="flex-1 flex flex-col gap-1 w-full text-left">
                          Checker Auditing Voucher details
                          <input 
                            type="text" 
                            placeholder="Write auditing references, physical logs verification, or bank clearances notes (Required)"
                            value={selectedTrId === tr.id ? chkDecisionNotes : ''}
                            onChange={(e) => { setSelectedTrId(tr.id); setChkDecisionNotes(e.target.value); }}
                            className="text-xs w-full py-1.5"
                          />
                        </label>

                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              onRejectTranche(tr.id, chkDecisionNotes || 'Evidence matching failed.');
                              setChkDecisionNotes('');
                              setSelectedTrId(null);
                            }}
                            className="border border-[#cfd5d1] hover:border-accent-danger text-accent-danger px-4 py-2 rounded font-bold text-xs"
                          >
                            Reject Payout
                          </button>
                          <button 
                            onClick={() => {
                              onApproveTranche(tr.id, chkDecisionNotes || 'Supplier bill checked and approved.');
                              setChkDecisionNotes('');
                              setSelectedTrId(null);
                            }}
                            className="bg-forest hover:bg-forest-hover text-white px-5 py-2 rounded font-bold text-xs"
                          >
                            Confirm Dual Sign-off Payout
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* LEDGER TAB (Chronological inflows / outflows ledger accounting) */}
          {activeTab === 'ledger' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-left font-sans">
                  <span className="text-[10px] uppercase font-mono text-moss tracking-wider font-extrabold">PROJECT FINANCIAL RECONCILIATIONS</span>
                  <h2 className="text-xl font-bold tracking-tight text-forest mt-0.5">Bhaluka General Journal Ledger</h2>
                  <p className="text-xs text-muted leading-normal mt-1">
                    Complete double-entry accounting records reflecting capital inflows and operating outflows with verified checkers signatures.
                  </p>
                </div>
                
                <button 
                  onClick={handleExportLedger}
                  className="bg-paper border border-line hover:border-forest text-forest hover:bg-cream/25 px-4 py-2 rounded-md font-bold text-xs shrink-0 font-mono"
                >
                  📥 Export General Ledger (CSV)
                </button>
              </div>

              {/* Stats highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-line rounded-lg p-4">
                  <span className="text-[9px] text-muted uppercase font-bold tracking-wider block">Total Capital Inflow (BDT)</span>
                  <strong className="text-xl font-mono font-bold text-forest block mt-1">
                    ৳{ledger.filter(l => l.type === 'Inflow' && l.status === 'verified').reduce((acc, l) => acc + l.amount, 0).toLocaleString()}
                  </strong>
                </div>
                <div className="bg-white border border-line rounded-lg p-4">
                  <span className="text-[9px] text-muted uppercase font-bold tracking-wider block">Total Cleared Outflows (BDT)</span>
                  <strong className="text-xl font-mono font-bold text-[#a44136] block mt-1">
                    ৳{ledger.filter(l => l.type === 'Outflow' && l.status === 'verified').reduce((acc, l) => acc + l.amount, 0).toLocaleString()}
                  </strong>
                </div>
                <div className="bg-white border border-line rounded-lg p-4">
                  <span className="text-[9px] text-muted uppercase font-bold tracking-wider block">Active Treasury Buffer (BDT)</span>
                  <strong className="text-xl font-mono font-bold text-[#2b6d4f] block mt-1">
                    ৳{(
                      ledger.filter(l => l.type === 'Inflow' && l.status === 'verified').reduce((acc, l) => acc + l.amount, 0) -
                      ledger.filter(l => l.type === 'Outflow' && l.status === 'verified').reduce((acc, l) => acc + l.amount, 0)
                    ).toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Form: Manual overriding input */}
                <form onSubmit={handleManualLedger} className="lg:col-span-4 bg-white border border-line rounded-xl p-5 space-y-4">
                  <span className="text-[9px] font-mono font-extrabold text-[#76500d] uppercase">Admin override ledger insert</span>
                  <h3 className="font-bold text-sm text-forest uppercase font-sans">Post Ledger Entry</h3>
                  
                  {ledgerSuccess && (
                     <div className="p-2 bg-emerald-50 text-accent-success border border-emerald-200 text-[11px] font-bold rounded-lg text-center">
                       ✓ Entry successfully cleared & posted to ledger.
                     </div>
                  )}

                  <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                    Transaction Narrative
                    <input 
                      type="text" 
                      value={ledgerForm.description}
                      onChange={e => setLedgerForm(v => ({ ...v, description: e.target.value }))}
                      placeholder="e.g. Bio-security net mesh installment"
                      className="text-xs"
                      required
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-2 text-left">
                    <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                      Flow Type
                      <select 
                        value={ledgerForm.type}
                        onChange={e => setLedgerForm(v => ({ ...v, type: e.target.value as any }))}
                        className="text-xs bg-paper font-bold"
                      >
                        <option value="Inflow">Inflow (+)</option>
                        <option value="Outflow">Outflow (-)</option>
                      </select>
                    </label>

                    <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                      Taka Balance
                      <input 
                        type="number" 
                        value={ledgerForm.amount}
                        onChange={e => setLedgerForm(v => ({ ...v, amount: Number(e.target.value) }))}
                        className="text-xs font-mono font-bold"
                        required
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                    Revenue Category Node
                    <select 
                      value={ledgerForm.category}
                      onChange={e => setLedgerForm(v => ({ ...v, category: e.target.value }))}
                      className="text-[#334155] text-xs bg-paper"
                    >
                      <option value="Capital Contribution">Capital Subscription Inflow</option>
                      <option value="Feed Purchase">Agricultural Float Feed purchase</option>
                      <option value="Juveniles/Stocking">Fingerlings stocking batches</option>
                      <option value="Equipment">Pump filtration Machinery</option>
                      <option value="Labor">Excavator Supervisor Labor payouts</option>
                      <option value="Sales Revenue">Offtaker biological sales revenues</option>
                      <option value="Administrative">Vetting administrative fees</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                    Voucher Receipt Reference Code
                    <input 
                      type="text" 
                      value={ledgerForm.reference}
                      onChange={e => setLedgerForm(v => ({ ...v, reference: e.target.value }))}
                      placeholder="e.g. Invoice BHL-MESH-900"
                      className="text-xs"
                      required
                    />
                  </label>

                  <button 
                    type="submit"
                    className="w-full bg-[#1e293b] hover:bg-slate-800 text-white text-xs font-bold py-2 rounded transition-transform font-mono"
                  >
                    🚀 CLEAR AND POST ENTRY &rarr;
                  </button>
                </form>

                {/* Right Scroll area: Ledger log table */}
                <div className="lg:col-span-8 bg-white border border-line rounded-lg overflow-hidden shadow-inner">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-cream/40 border-b border-line text-[9px] font-bold text-zinc-600 uppercase">
                        <th className="p-3">Reference / ID</th>
                        <th className="p-3">Asset row / Payer</th>
                        <th className="p-3">Node Category</th>
                        <th className="p-3">Flow Flow</th>
                        <th className="p-3">BDT Taka</th>
                        <th className="p-3">Officer Sign-Off</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 text-xs font-sans">
                      {ledger.map(lg => (
                        <tr key={lg.id} className="hover:bg-cream/10">
                          <td className="p-3 font-mono font-bold text-[#475569]">{lg.id}</td>
                          <td className="p-3 text-left">
                            <div>
                              <strong className="block text-forest font-bold">{lg.description}</strong>
                              <span className="text-[10px] text-muted block font-mono">Reference: {lg.reference}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="bg-slate-100 text-[#334155] px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                              {lg.category}
                            </span>
                          </td>
                          <td className="p-3 font-bold">
                            <span className={lg.type === 'Inflow' ? 'text-accent-success font-black' : 'text-accent-danger font-black'}>
                              {lg.type === 'Inflow' ? '▲ INFLOW' : '▼ OUTFLOW'}
                            </span>
                          </td>
                          <td className="p-3 font-mono font-black text-forest-light">৳{lg.amount.toLocaleString()}</td>
                          <td className="p-3 font-mono text-[9px] text-left leading-normal text-slate-500">
                            Verified Status: <b className="text-emerald-700">{lg.status.toUpperCase()}</b>
                            <span className="block italic">Auditor: {lg.checker || 'N/A'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )}

          {/* PROJECT OPPORTUNITIES TAB (Define/Edit agriculture cycles) */}
          {activeTab === 'opportunities' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-line pb-4 flex-wrap gap-4 text-left font-sans">
                <div>
                  <span className="text-[10px] uppercase font-mono text-moss tracking-wider font-extrabold">LANDSCAPE ENGINE MANAGER</span>
                  <h2 className="text-xl font-bold tracking-tight text-forest mt-0.5">Agriculture Investment Cycles</h2>
                  <p className="text-xs text-muted leading-relaxed">
                    Create new programs, draft features, shift status milestones, or publish cycles to the landing page landscape.
                  </p>
                </div>

                <button 
                  onClick={() => {
                    setEditingOpp(null);
                    setOppForm({
                      title: '',
                      status: 'PIPELINE',
                      type: 'Aquaculture',
                      subtitle: '',
                      description: '',
                      expectedReturn: '12%',
                      minCommitment: 250000,
                      tenure: '8 months',
                      targetAmount: 2000000,
                      raisedAmount: 0,
                      detailsText: '',
                      publishStatus: 'draft'
                    });
                    setShowOppModal(true);
                  }}
                  className="bg-forest hover:bg-forest-hover text-[#fff3de] text-xs font-bold px-4 py-2 rounded shadow transition-all font-mono uppercase"
                >
                  ➕ CREATE NEW CYCLE
                </button>
              </div>

              {/* Cycle cards manager list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities.map(opp => (
                  <div key={opp.id} className="bg-white border border-line rounded-lg p-5 text-xs space-y-4 hover:border-forest transition-colors shadow-sm">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-xs bg-forest/5 text-forest font-bold px-2 py-0.5 rounded uppercase font-mono">{opp.type}</span>
                        <h4 className="text-sm font-bold text-forest mt-1.5 font-sans block">{opp.title}</h4>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono ${
                          opp.publishStatus === 'published' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-muted'
                        }`}>
                          {opp.publishStatus.toUpperCase()}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-cream text-forest border border-line mt-1`}>
                          {opp.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 bg-[#fafbfa] p-2.5 rounded border border-[#edf0ed] text-zinc-600">
                      <div>
                        <span>Goal Target</span>
                        <b className="block text-forest font-mono">৳{(opp.targetAmount/100000).toFixed(1)}L</b>
                      </div>
                      <div>
                        <span>Subscribed</span>
                        <b className="block text-forest font-mono">৳{(opp.raisedAmount/100000).toFixed(1)}L</b>
                      </div>
                      <div>
                        <span>Min BDT</span>
                        <b className="block text-forest font-mono">৳{(opp.minCommitment/100000).toFixed(1)}L</b>
                      </div>
                    </div>

                    <p className="text-zinc-500 line-clamp-2 leading-relaxed">{opp.description}</p>
                    
                    <div className="pt-3 border-t border-[#edf0ed] flex justify-between gap-1.5">
                      <div className="text-[10px] text-muted leading-tight">
                        Expected Return: <b className="text-forest font-bold font-mono">{opp.expectedReturn}</b><br />
                        Cycle Tenure: <b className="text-forest font-bold font-mono">{opp.tenure}</b>
                      </div>

                      <div className="flex gap-1.5">
                        <button 
                          onClick={() => {
                            // Quick unpublish toggle side-effect
                            onSaveOpportunity({
                              ...opp,
                              publishStatus: opp.publishStatus === 'published' ? 'draft' : 'published'
                            });
                          }}
                          className="border border-line hover:border-forest text-forest font-bold px-3 py-1.5 rounded text-[10.5px] transition-colors"
                        >
                          {opp.publishStatus === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <button 
                          onClick={() => startEditOpp(opp)}
                          className="bg-[#f0f4f1] text-[#123126] font-bold px-4 py-1.5 rounded text-[10.5px] hover:border-forest transition-colors"
                        >
                          Edit Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* READINESS GATES LIST (Double audit parameters) */}
          {activeTab === 'gates' && (
            <div className="space-y-6">
              <div className="text-left font-sans">
                <span className="text-[10px] uppercase font-mono text-moss tracking-wider font-extrabold font-bold">REGULATORY RISK SCREEN</span>
                <h2 className="text-xl font-bold tracking-tight text-forest mt-0.5">Pre-Transaction Readiness Compliance Gates</h2>
                <p className="text-xs text-muted leading-normal">
                  In accordance with corporate laws, these requirements must be met before any actual financial payout clears. Unchecked gates will act as blocks.
                </p>
              </div>

              <div className="bg-[#fcf8ee] border border-amber-200 text-[#76500d] p-4 text-xs rounded-xl leading-relaxed flex items-start gap-3">
                <span className="text-lg">⚖️</span>
                <div>
                  <strong className="block font-sans font-bold">Production Blockers Compliance Watch:</strong>
                  The investor platform operates in simulation mode. Actual payments and distribution vectors will only unlock inside the shell once all operational gates listed below have been vetted and checked.
                </div>
              </div>

              <div className="bg-white border border-line rounded-xl p-5 space-y-4">
                {readinessGates.map(gate => (
                  <div 
                    key={gate.key} 
                    onClick={() => onToggleGate(gate.key)}
                    className={`border rounded-lg p-4 flex justify-between items-center gap-4 cursor-pointer transition-colors ${
                      gate.checked 
                        ? 'bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50' 
                        : 'bg-zinc-50 border-line hover:bg-zinc-100'
                    }`}
                  >
                    <div className="text-left space-y-1 md:space-y-1.5 max-w-xl">
                      <b className="font-bold text-sm text-forest font-sans block">{gate.label}</b>
                      <p className="text-xs text-zinc-500 leading-normal">{gate.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-mono font-bold uppercase py-0.5 px-2 rounded-full ${
                        gate.checked ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {gate.checked ? '✔ APPROVED' : '⏳ COMPLIANCE PENDING'}
                      </span>
                      
                      <div className="w-5 h-5 border border-[#cfd5d1] rounded-md flex items-center justify-center font-bold text-white bg-white">
                        {gate.checked && <span className="text-emerald-700">✓</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VITALS & SYSTEM VITALS TAB (Logs, downloads, and backups) */}
          {activeTab === 'vitals' && (
            <div className="space-y-6">
              <div className="text-left font-sans">
                <span className="text-[10px] uppercase font-mono text-moss tracking-wider font-extrabold font-bold">SYSTEM OPERATIONS TIMELINE</span>
                <h2 className="text-xl font-bold tracking-tight text-forest mt-0.5">Vitals, CSV logs, & Data Backups</h2>
                <p className="text-xs text-muted leading-normal">
                  View immutable audit traces executed by our background handlers, export spreadsheet database dumps, or upload systems recovery back-ups.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Left controls: Data backups downloads, factory seed reset */}
                <div className="md:col-span-4 bg-white border border-line rounded-xl p-5 text-left text-xs space-y-4">
                  <span className="text-[9px] uppercase tracking-wider text-moss font-mono font-bold block">Integrity Operations</span>
                  
                  <div className="space-y-3 pt-2">
                    <button 
                      onClick={handleDownloadJSONBackup}
                      className="w-full bg-forest hover:bg-forest-hover text-[#fff2e9] py-2 px-3 rounded font-bold text-xs text-center border-b font-mono transition-transform"
                    >
                      📁 Download unified JSON Backup
                    </button>

                    <div className="border border-[#cfd5d1] rounded p-3 text-center bg-[#fafbfa] space-y-2 relative">
                      <p className="text-[11px] text-muted font-bold block mb-1">Restore State Snapshot</p>
                      <input 
                        type="file" 
                        accept=".json" 
                        onChange={handleBackupUpload}
                        className="hidden" 
                        id="backup-import-file" 
                      />
                      <label 
                        htmlFor="backup-import-file" 
                        className="cursor-pointer inline-block border border-[#cfd5d1] hover:border-forest bg-white rounded py-1 px-3 text-[10px] font-mono hover:bg-[#eef4f0]"
                      >
                        Browse JSON backup
                      </label>
                    </div>

                    <button 
                      onClick={handleExportApplications}
                      className="w-full border border-line hover:border-forest text-forest font-semibold py-1.5 rounded transition-all text-[11px] block text-center"
                    >
                      Applications Vetting Excel Logs
                    </button>

                    <button 
                      onClick={handleExportLedger}
                      className="w-full border border-line hover:border-forest text-forest font-semibold py-1.5 rounded transition-all text-[11px] block text-center"
                    >
                      Ledger Accounts Excel Records
                    </button>

                    <button 
                      onClick={handleExportAuditLogs}
                      className="w-full border border-line hover:border-forest text-forest font-semibold py-1.5 rounded transition-all text-[11px] block text-center"
                    >
                      Audit Trail chronolog logs
                    </button>
                  </div>

                  <hr className="border-line" />

                  <div className="p-3 bg-red-50 border border-red-200 text-accent-danger rounded space-y-2">
                    <b className="block text-[10px] uppercase font-mono font-bold text-center">Factory reset console</b>
                    <p className="text-[10px] leading-relaxed">
                      Wipe browser state parameters completely and reload original Kachina base seeding profiles.
                    </p>
                    <button 
                      type="button"
                      onClick={() => {
                        if (confirm("Reset ALL application records, logs, and ledger items in browser?")) {
                          onResetDatabase();
                        }
                      }}
                      className="w-full bg-[#f9e4df] text-red-700 font-extrabold py-1.5 rounded text-[10px] transition-colors"
                    >
                      ⚠️ RESTORE DEFAULT SEEDED DATA
                    </button>
                  </div>
                </div>

                {/* Right: chronological Audit Event Log */}
                <div className="md:col-span-8 bg-white border border-line rounded-xl p-5 space-y-4">
                  <h3 className="font-sans font-bold text-sm text-forest uppercase border-b border-[#edf0ed] pb-2 text-left">
                    Chronological Immutable Audit events trail
                  </h3>

                  <div className="space-y-3 max-h-[440px] overflow-y-auto">
                    {auditLogs.map(log => (
                      <div key={log.id} className="p-2.5 bg-cream/10 border-b border-line hover:bg-cream/20 text-[11px] space-y-1.5 text-left">
                        <div className="flex justify-between text-[10px] text-muted font-mono">
                          <div className="flex gap-2">
                            <span className="bg-[#475569] text-white px-1.5 rounded font-black">
                              {log.action}
                            </span>
                            <span>Actor: <b>{log.actor} ({log.role})</b></span>
                          </div>
                          <span>{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="font-sans font-bold text-forest leading-tight mt-1">{log.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

      {/* Opportunity Modal (Create/Edit Opportunity) */}
      {showOppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-paper text-ink rounded-radius-lg p-6 shadow-custom">
            <button 
              onClick={() => { setShowOppModal(false); setEditingOpp(null); }}
              className="absolute top-4 right-4 bg-cream flex items-center justify-center w-8 h-8 rounded-full text-forest hover:bg-line transition-colors text-lg"
            >
              ×
            </button>

            <span className="text-[10px] uppercase tracking-widest font-extrabold text-moss block mb-1">
              Landscape variables
            </span>
            <h3 className="text-xl font-bold text-forest tracking-tight font-sans text-left">
              {editingOpp ? 'Edit Agriculture Program Details' : 'Create New Cycle Opportunity'}
            </h3>

            <form onSubmit={handleSaveOpp} className="space-y-4 text-left mt-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Opportunity Title
                  <input 
                    type="text" 
                    value={oppForm.title}
                    onChange={e => setOppForm(v => ({ ...v, title: e.target.value }))}
                    placeholder="e.g. Pangas stocking campaign block C"
                    className="text-xs"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Program Subtitle
                  <input 
                    type="text" 
                    value={oppForm.subtitle}
                    onChange={e => setOppForm(v => ({ ...v, subtitle: e.target.value }))}
                    placeholder="e.g. Pre-monsoon stocking campaign"
                    className="text-xs"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Primary Sector type
                  <select 
                    value={oppForm.type}
                    onChange={e => setOppForm(v => ({ ...v, type: e.target.value }))}
                    className="text-xs bg-paper py-2 px-3 focus:outline-none"
                    required
                  >
                    <option value="Aquaculture">Aquaculture (grow-out & telemetry)</option>
                    <option value="Livestock & Poultry">Livestock & Poultry (dairy + ducks/layers)</option>
                    <option value="Agroforestry">Agroforestry & Crops (intensive soil optimization)</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Milestone status
                  <select 
                    value={oppForm.status}
                    onChange={e => setOppForm(v => ({ ...v, status: e.target.value as any }))}
                    className="text-xs bg-paper py-2 px-3 focus:outline-none"
                    required
                  >
                    <option value="OPEN">OPEN (Accepting expressions)</option>
                    <option value="PIPELINE">PIPELINE (Registration locks active)</option>
                    <option value="CLOSED">CLOSED (Fully subscribed)</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Expected Return (Indicative)
                  <input 
                    type="text" 
                    value={oppForm.expectedReturn}
                    onChange={e => setOppForm(v => ({ ...v, expectedReturn: e.target.value }))}
                    placeholder="e.g. 12% - 15%"
                    className="text-xs"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Min Taka Subscription
                  <input 
                    type="number" 
                    value={oppForm.minCommitment}
                    onChange={e => setOppForm(v => ({ ...v, minCommitment: Number(e.target.value) }))}
                    className="text-xs font-mono"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Cycle Tenure
                  <input 
                    type="text" 
                    value={oppForm.tenure}
                    onChange={e => setOppForm(v => ({ ...v, tenure: e.target.value }))}
                    placeholder="e.g. 8 months"
                    className="text-xs"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Total Target Amount (BDT)
                  <input 
                    type="number" 
                    value={oppForm.targetAmount}
                    onChange={e => setOppForm(v => ({ ...v, targetAmount: Number(e.target.value) }))}
                    className="text-xs font-mono"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Currently Subscribed Amount (BDT)
                  <input 
                    type="number" 
                    value={oppForm.raisedAmount}
                    onChange={e => setOppForm(v => ({ ...v, raisedAmount: Number(e.target.value) }))}
                    className="text-xs font-mono"
                    required
                  />
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Platform Publish Mode
                  <select 
                    value={oppForm.publishStatus}
                    onChange={e => setOppForm(v => ({ ...v, publishStatus: e.target.value as any }))}
                    className="text-xs bg-paper py-2 px-3 focus:outline-none"
                    required
                  >
                    <option value="draft">Draft (Admin hidden)</option>
                    <option value="published">Published (Landing View visible)</option>
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                Cycle descriptive overview
                <textarea 
                  value={oppForm.description}
                  onChange={e => setOppForm(v => ({ ...v, description: e.target.value }))}
                  placeholder="A detailed explanation outlining aquaculture feed formulas or calving timelines."
                  rows={3}
                  className="text-xs"
                  required
                />
              </label>

              <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                Milestones Details (One item per line)
                <textarea 
                  value={oppForm.detailsText}
                  onChange={e => setOppForm(v => ({ ...v, detailsText: e.target.value }))}
                  placeholder="e.g. Clean embankment clearing&#10;Supplier vaccine deployment&#10;Water oxygen logs clearances"
                  rows={3}
                  className="text-xs font-mono"
                  required
                />
              </label>

              <div className="flex gap-2 justify-end pt-4 border-t border-line">
                <button 
                  type="button" 
                  onClick={() => { setShowOppModal(false); setEditingOpp(null); }}
                  className="border border-line hover:border-forest text-forest px-4 py-2 rounded font-bold text-xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-forest hover:bg-forest-hover text-white px-5 py-2 rounded font-bold text-xs"
                >
                  Commit changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
