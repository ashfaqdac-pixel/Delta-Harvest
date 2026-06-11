import React, { useState } from 'react';
import { TrancheRequest, OperatingUpdate } from '../types';

interface MakerPortalProps {
  currentUser: { email: string; name: string };
  trancheRequests: TrancheRequest[];
  updates: OperatingUpdate[];
  onAddTrancheRequest: (tranche: Omit<TrancheRequest, 'id' | 'proposedBy' | 'status' | 'createdAt'>) => void;
  onAddOperatingUpdate: (update: Omit<OperatingUpdate, 'id' | 'date' | 'author'>) => void;
  onLogout: () => void;
}

export default function MakerPortal({
  currentUser,
  trancheRequests,
  updates,
  onAddTrancheRequest,
  onAddOperatingUpdate,
  onLogout
}: MakerPortalProps) {
  const [activeTab, setActiveTab] = useState<'tranches' | 'updates'>('tranches');
  
  // Form States
  const [trancheForm, setTrancheForm] = useState({
    title: '',
    amount: 150000,
    notes: '',
    evidenceUrl: ''
  });
  const [updateForm, setUpdateForm] = useState({
    title: '',
    category: 'Ponds',
    content: '',
    evidenceText: ''
  });

  const [trancheSuccess, setTrancheSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleTrancheSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trancheForm.title.trim()) {
      setErrors(['Please supply a descriptive tranche request title.']);
      return;
    }
    if (trancheForm.amount <= 0) {
      setErrors(['Tranche amount must be a positive Taka balance.']);
      return;
    }
    if (!trancheForm.evidenceUrl.trim()) {
      setErrors(['Please specify an invoice reference, supplier bill, or visual voucher.']);
      return;
    }

    onAddTrancheRequest({
      title: trancheForm.title,
      amount: Number(trancheForm.amount),
      notes: trancheForm.notes,
      evidenceUrl: trancheForm.evidenceUrl
    });

    setTrancheSuccess(true);
    setTrancheForm({ title: '', amount: 150000, notes: '', evidenceUrl: '' });
    setErrors([]);
    setTimeout(() => setTrancheSuccess(false), 3000);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateForm.title.trim()) {
      setErrors(['Please specify a report title.']);
      return;
    }
    if (!updateForm.content.trim() || updateForm.content.length < 25) {
      setErrors(['Report narrative must be detailed (at least 25 characters).']);
      return;
    }
    if (!updateForm.evidenceText.trim()) {
      setErrors(['Please specify what physical calibration reports, logs, or pictures verify this update.']);
      return;
    }

    onAddOperatingUpdate({
      title: updateForm.title,
      category: updateForm.category,
      content: updateForm.content,
      evidenceText: updateForm.evidenceText
    });

    setUpdateSuccess(true);
    setUpdateForm({ title: '', category: 'Ponds', content: '', evidenceText: '' });
    setErrors([]);
    setTimeout(() => setUpdateSuccess(false), 3000);
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
            <div className="flex flex-col">
              <strong className="text-xs font-black tracking-widest leading-none">DELTA HARVEST</strong>
              <small className="text-[9px] text-[#91aaa0] mt-1 font-semibold block">OPERATIONAL HUB</small>
            </div>
          </div>

          <div className="bg-[#e2eef7]/15 border border-[#e2eef7]/20 text-[#bfdfff] rounded-md p-2 text-[10px] uppercase font-mono font-bold tracking-wider text-center">
            ⚙️ Operations Maker Console
          </div>

          <nav className="flex flex-col gap-1.5 pt-2">
            <button
              onClick={() => { setActiveTab('tranches'); setErrors([]); }}
              className={`w-full text-left rounded-md px-3 py-2 text-xs font-bold flex items-center gap-2.5 transition-colors ${
                activeTab === 'tranches' ? 'bg-white/10 text-white' : 'text-[#b8c9c1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>🪙</span>
              <span>Tranche Releases ({trancheRequests.length})</span>
            </button>
            <button
              onClick={() => { setActiveTab('updates'); setErrors([]); }}
              className={`w-full text-left rounded-md px-3 py-2 text-xs font-bold flex items-center gap-2.5 transition-colors ${
                activeTab === 'updates' ? 'bg-white/10 text-white' : 'text-[#b8c9c1] hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>📝</span>
              <span>Publish Feed ({updates.length})</span>
            </button>
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
            Role: Maker / On-Field
          </div>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex flex-col min-w-0">
        
        {/* Workspace Header */}
        <header className="bg-white border-b border-line h-16 px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex flex-col leading-none text-left">
            <span className="text-[9px] font-bold text-moss uppercase tracking-widest">Field Terminal</span>
            <h1 className="text-base md:text-lg font-bold tracking-tight text-forest mt-0.5 capitalize">
              {activeTab === 'tranches' ? 'Propose milestone disbursements' : 'Log evidence reports'}
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-forest-light text-white font-black flex items-center justify-center text-xs">
              M
            </span>
            <div className="flex flex-col text-left leading-none">
              <b className="text-xs font-bold text-forest">{currentUser.name}</b>
              <small className="text-[9px] text-muted mt-1 uppercase font-mono font-bold">Field Specialist (Maker)</small>
            </div>
          </div>
        </header>

        {/* Workspace Canvas */}
        <main className="p-6 max-w-7xl w-full mx-auto space-y-6 flex-1 text-left">
          
          {errors.length > 0 && (
            <div className="p-3 bg-[#f9e4df] border-l-4 border-accent-danger rounded text-xs text-[#963e32] font-semibold">
              <ul className="list-disc pl-4 space-y-0.5">
                {errors.map((err, i) => <li key={i}>{err}</li>)}
              </ul>
            </div>
          )}

          {/* TRANCHES TAB */}
          {activeTab === 'tranches' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Form to propose tranche */}
              <form onSubmit={handleTrancheSubmit} className="lg:col-span-5 bg-white border border-line rounded-xl p-5 md:p-6 space-y-4">
                <span className="text-[10px] font-mono text-moss uppercase font-extrabold block">Procurement Request</span>
                <h3 className="font-bold text-sm text-forest uppercase tracking-tight">Propose Tranche release</h3>
                
                {trancheSuccess && (
                  <div className="p-2.5 bg-emerald-50 text-accent-success border border-emerald-200 text-xs font-bold rounded-lg text-center">
                    ✓ Tranche proposal registered! Checker clearance has been triggered.
                  </div>
                )}

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Tranche Release title
                  <input 
                    type="text" 
                    value={trancheForm.title} 
                    onChange={e => setTrancheForm(v => ({ ...v, title: e.target.value }))}
                    placeholder="e.g. Feed formulation and poultry vaccination cycle" 
                    className="text-xs" 
                    required 
                  />
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Amount Requested (BDT Taka)
                  <input 
                    type="number" 
                    value={trancheForm.amount} 
                    onChange={e => setTrancheForm(v => ({ ...v, amount: Number(e.target.value) }))}
                    className="text-xs font-mono" 
                    min={100}
                    required 
                  />
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Invoice reference / Delivery Challan Log
                  <input 
                    type="text" 
                    value={trancheForm.evidenceUrl} 
                    onChange={e => setTrancheForm(v => ({ ...v, evidenceUrl: e.target.value }))}
                    placeholder="e.g. Dhaka Feed Ltd voucher #DF-2241" 
                    className="text-xs" 
                    required 
                  />
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Explanatory notes & target ponds impact
                  <textarea 
                    value={trancheForm.notes} 
                    onChange={e => setTrancheForm(v => ({ ...v, notes: e.target.value }))}
                    placeholder="A concise breakdown explaining how this tranche connects directly to existing aquaculture restart milestones."
                    rows={3} 
                    className="text-xs" 
                  />
                </label>

                <div className="bg-[#f0f4f8] p-3 text-xs text-[#24577c] rounded border border-blue-200 leading-relaxed">
                  🔒 **Security Mandate:** Tranches submitted enter the clearance grid with a standard "pending" flag. You cannot execute self-payout clearances. Shabbir (Admin Checker) must verify matching supplier invoices before posting payouts to the ledger.
                </div>

                <button 
                  type="submit"
                  className="w-full bg-forest hover:bg-forest-hover text-white text-xs font-bold py-2.5 rounded transition-transform font-mono uppercase"
                >
                  Submit Tranche release proposal &rarr;
                </button>
              </form>

              {/* Right Column: Existing tranche requests and statuses */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-sans font-bold text-sm text-forest uppercase border-b border-[#edf0ed] pb-2">
                  Tranche Release History
                </h3>

                <div className="space-y-3">
                  {trancheRequests.map(tr => (
                    <div key={tr.id} className="bg-white border border-line rounded-lg p-4 text-xs space-y-3 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="font-mono text-[9px] text-[#8a938f] bg-cream/50 border border-line px-1.5 py-0.5 rounded font-black">
                            {tr.id}
                          </span>
                          <strong className="text-forest block mt-1.5 font-bold font-sans text-sm">{tr.title}</strong>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase font-mono tracking-wider ${
                          tr.status === 'approved' 
                            ? 'bg-emerald-50 text-accent-success border border-emerald-200' 
                            : tr.status === 'pending'
                              ? 'bg-amber-50 text-accent-warning border border-amber-200'
                              : 'bg-red-50 text-accent-danger border border-red-200'
                        }`}>
                          {tr.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 bg-cream/10 p-2.5 rounded border border-line/60">
                        <div>
                          <span className="text-muted block text-[9px] uppercase font-bold tracking-wider">Taka Balance</span>
                          <b className="font-mono text-forest font-bold">৳{tr.amount.toLocaleString()}</b>
                        </div>
                        <div>
                          <span className="text-muted block text-[9px] uppercase font-bold tracking-wider">Proposed By</span>
                          <b className="text-forest font-semibold">{tr.proposedBy.split(' ')[0]}</b>
                        </div>
                        <div>
                          <span className="text-muted block text-[9px] uppercase font-bold tracking-wider">Date Logged</span>
                          <b className="text-forest font-semibold">{new Date(tr.createdAt).toLocaleDateString()}</b>
                        </div>
                      </div>

                      <div className="text-[10.5px] space-y-1">
                        <p className="text-zinc-600 leading-normal"><b className="text-forest">Operational Target:</b> {tr.notes || 'N/A'}</p>
                        <p className="text-zinc-600 font-mono text-[10px] bg-paper border border-[#edf0ed] p-1 rounded font-semibold truncate">
                          📎 EVIDENCE CHANNELS: {tr.evidenceUrl}
                        </p>
                      </div>

                      {tr.status !== 'pending' && (
                        <div className="border-t border-[#edf0ed] pt-2 mt-2 bg-zinc-50 p-2 rounded text-[10px]">
                          <strong>Checker Clearance details:</strong>
                          <p className="text-zinc-500 mt-0.5">Authorised by <b>{tr.approvedBy || 'N/A'}</b> on {tr.decisionDate ? new Date(tr.decisionDate).toLocaleDateString() : 'N/A'}</p>
                          {tr.decisionNotes && <p className="italic text-zinc-500 mt-1">" {tr.decisionNotes} "</p>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* UPDATES TAB */}
          {activeTab === 'updates' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Form: Create update */}
              <form onSubmit={handleUpdateSubmit} className="lg:col-span-5 bg-white border border-line rounded-xl p-5 md:p-6 space-y-4">
                <span className="text-[10px] font-mono text-moss uppercase font-extrabold block">Bhaluka Journal</span>
                <h3 className="font-bold text-sm text-forest uppercase tracking-tight font-sans">Publish Operating Update</h3>
                
                {updateSuccess && (
                  <div className="p-2.5 bg-emerald-50 text-accent-success border border-emerald-200 text-xs font-bold rounded-lg text-center">
                    ✓ Operating Update published! Matching investor notifications broadcasted.
                  </div>
                )}

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Report Header
                  <input 
                    type="text" 
                    value={updateForm.title} 
                    onChange={e => setUpdateForm(v => ({ ...v, title: e.target.value }))}
                    placeholder="e.g. Pond 6 water metrics calibration complete" 
                    className="text-xs" 
                    required 
                  />
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Vetting Category
                  <select 
                    value={updateForm.category} 
                    onChange={e => setUpdateForm(v => ({ ...v, category: e.target.value }))}
                    className="text-xs bg-paper py-2 px-3 focus:outline-none"
                  >
                    <option value="Ponds">Ponds telemetry & excavation progress</option>
                    <option value="Livestock & Poultry">Livestock & Poultry operational status</option>
                    <option value="Acquisitions">Supplier machinery acquisitions</option>
                    <option value="Farming">Agroforestry intercropping vegetation</option>
                    <option value="Harvest">Harvest weights & offtake invoices</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Narrative Log details
                  <textarea 
                    value={updateForm.content} 
                    onChange={e => setUpdateForm(v => ({ ...v, content: e.target.value }))}
                    placeholder="Detail exact operational weight gain, target pH balances, biological counts, or feed bags used in this campaign..."
                    rows={4} 
                    className="text-xs font-sans" 
                    required
                  />
                </label>

                <label className="flex flex-col gap-1 text-[11px] font-bold text-forest">
                  Calibration evidence reference
                  <input 
                    type="text" 
                    value={updateForm.evidenceText} 
                    onChange={e => setUpdateForm(v => ({ ...v, evidenceText: e.target.value }))}
                    placeholder="e.g. Registered with Bhaluka block technician logs, veterinary record block index BHLK" 
                    className="text-xs" 
                    required 
                  />
                </label>

                <div className="bg-[#fcf8ee] p-3 text-xs text-[#76500d] rounded border border-amber-200/50 leading-relaxed">
                  📢 **Notification Dispatch:** Submitting this form writes the report to the public feed immediately while automatically sending read-indicators to all approved investor dashboard notifications tray.
                </div>

                <button 
                  type="submit"
                  className="w-full bg-forest hover:bg-forest-hover text-white text-xs font-bold py-2.5 rounded transition-transform font-mono uppercase"
                >
                  Publish and broadcast report &rarr;
                </button>
              </form>

              {/* Right List: preview published updates */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-sans font-bold text-sm text-forest uppercase border-b border-[#edf0ed] pb-2">
                  Published Reports history
                </h3>

                <div className="space-y-3">
                  {updates.map(up => (
                    <div key={up.id} className="bg-white border border-line rounded-lg p-4 text-xs space-y-2.5 shadow-sm">
                      <div className="flex justify-between items-center text-[10px] text-muted font-mono pb-2 border-b border-[#edf0ed]">
                        <span className="bg-forest/10 text-forest font-bold px-2 py-0.5 rounded-full uppercase">
                          {up.category}
                        </span>
                        <span>Published: {up.date}</span>
                      </div>
                      <h4 className="font-bold text-forest text-sm">{up.title}</h4>
                      <p className="text-zinc-600 leading-relaxed text-justify sm:text-left">{up.content}</p>
                      <div className="bg-cream/30 border border-[#e8d19d]/40 p-2 rounded text-[10px] text-forest font-mono">
                        <b>Evidence Index Verification:</b> {up.evidenceText}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}
