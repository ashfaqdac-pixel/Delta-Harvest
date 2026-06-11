import { useState, useEffect } from 'react';
import { 
  Role, 
  Opportunity, 
  Application, 
  Investor, 
  Commitment, 
  TrancheRequest, 
  OperatingUpdate, 
  LedgerEntry, 
  Message, 
  Notification, 
  AuditEvent, 
  ReadinessGate 
} from './types';
import { 
  SEEDED_OPPORTUNITIES, 
  SEEDED_APPLICATIONS, 
  SEEDED_INVESTORS, 
  SEEDED_COMMITMENTS, 
  SEEDED_TRANCHE_REQUESTS, 
  SEEDED_OPERATING_UPDATES, 
  SEEDED_LEDGER_ENTRIES, 
  SEEDED_MESSAGES, 
  SEEDED_NOTIFICATIONS, 
  SEEDED_READINESS_GATES, 
  SEEDED_AUDIT_EVENTS 
} from './data';

// Component Imports
import PublicView from './components/PublicView';
import NewApplicationDialog from './components/NewApplicationDialog';
import LoginDialog from './components/LoginDialog';
import InvestorPortal from './components/InvestorPortal';
import MakerPortal from './components/MakerPortal';
import CheckerPortal from './components/CheckerPortal';

export default function App() {
  // Authentication Role States
  const [currentRole, setCurrentRole] = useState<Role>('guest');
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const [currentUserName, setCurrentUserName] = useState<string>('');

  // Dialog Overlays
  const [showApplication, setShowApplication] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Core Persistent Registries
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [trancheRequests, setTrancheRequests] = useState<TrancheRequest[]>([]);
  const [operatingUpdates, setOperatingUpdates] = useState<OperatingUpdate[]>([]);
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [readinessGates, setReadinessGates] = useState<ReadinessGate[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>([]);

  // 1. Initial Load & Seed Database
  useEffect(() => {
    const localOpp = localStorage.getItem('dh_opportunities');
    const localApp = localStorage.getItem('dh_applications');
    const localInv = localStorage.getItem('dh_investors');
    const localCom = localStorage.getItem('dh_commitments');
    const localTr = localStorage.getItem('dh_tranches');
    const localUpd = localStorage.getItem('dh_updates');
    const localLdg = localStorage.getItem('dh_ledger');
    const localMsg = localStorage.getItem('dh_messages');
    const localNtf = localStorage.getItem('dh_notifications');
    const localGat = localStorage.getItem('dh_gates');
    const localAud = localStorage.getItem('dh_audit');

    // Load or Seed Opportunities
    if (localOpp) setOpportunities(JSON.parse(localOpp));
    else {
      setOpportunities(SEEDED_OPPORTUNITIES);
      localStorage.setItem('dh_opportunities', JSON.stringify(SEEDED_OPPORTUNITIES));
    }

    // Applications
    if (localApp) setApplications(JSON.parse(localApp));
    else {
      setApplications(SEEDED_APPLICATIONS);
      localStorage.setItem('dh_applications', JSON.stringify(SEEDED_APPLICATIONS));
    }

    // Investors
    if (localInv) setInvestors(JSON.parse(localInv));
    else {
      setInvestors(SEEDED_INVESTORS);
      localStorage.setItem('dh_investors', JSON.stringify(SEEDED_INVESTORS));
    }

    // Commitments
    if (localCom) setCommitments(JSON.parse(localCom));
    else {
      setCommitments(SEEDED_COMMITMENTS);
      localStorage.setItem('dh_commitments', JSON.stringify(SEEDED_COMMITMENTS));
    }

    // Tranches
    if (localTr) setTrancheRequests(JSON.parse(localTr));
    else {
      setTrancheRequests(SEEDED_TRANCHE_REQUESTS);
      localStorage.setItem('dh_tranches', JSON.stringify(SEEDED_TRANCHE_REQUESTS));
    }

    // Updates
    if (localUpd) setOperatingUpdates(JSON.parse(localUpd));
    else {
      setOperatingUpdates(SEEDED_OPERATING_UPDATES);
      localStorage.setItem('dh_updates', JSON.stringify(SEEDED_OPERATING_UPDATES));
    }

    // Ledger
    if (localLdg) setLedgerEntries(JSON.parse(localLdg));
    else {
      setLedgerEntries(SEEDED_LEDGER_ENTRIES);
      localStorage.setItem('dh_ledger', JSON.stringify(SEEDED_LEDGER_ENTRIES));
    }

    // Messages
    if (localMsg) setMessages(JSON.parse(localMsg));
    else {
      setMessages(SEEDED_MESSAGES);
      localStorage.setItem('dh_messages', JSON.stringify(SEEDED_MESSAGES));
    }

    // Notifications
    if (localNtf) setNotifications(JSON.parse(localNtf));
    else {
      setNotifications(SEEDED_NOTIFICATIONS);
      localStorage.setItem('dh_notifications', JSON.stringify(SEEDED_NOTIFICATIONS));
    }

    // Readiness Gates
    if (localGat) setReadinessGates(JSON.parse(localGat));
    else {
      setReadinessGates(SEEDED_READINESS_GATES);
      localStorage.setItem('dh_gates', JSON.stringify(SEEDED_READINESS_GATES));
    }

    // Audit logs
    if (localAud) setAuditLogs(JSON.parse(localAud));
    else {
      setAuditLogs(SEEDED_AUDIT_EVENTS);
      localStorage.setItem('dh_audit', JSON.stringify(SEEDED_AUDIT_EVENTS));
    }

    // Restore login session from sessionStorage
    const savedEmail = sessionStorage.getItem('dh_user_email');
    const savedRole = sessionStorage.getItem('dh_user_role');
    const savedName = sessionStorage.getItem('dh_user_name');
    if (savedEmail && savedRole && savedName) {
      setCurrentUserEmail(savedEmail);
      setCurrentRole(savedRole as Role);
      setCurrentUserName(savedName);
    }
  }, []);

  // Utility to write audit event
  const executeAuditEvent = (actor: string, role: string, action: string, summary: string) => {
    const newLog: AuditEvent = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor,
      role,
      action,
      summary
    };
    setAuditLogs(prev => {
      const next = [newLog, ...prev];
      localStorage.setItem('dh_audit', JSON.stringify(next));
      return next;
    });
  };

  // State Writers Helper
  const persistState = (key: string, data: any, setter: Function) => {
    setter(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  // 2. Auth handlers
  const handleLoginSuccess = (email: string, role: Role) => {
    let name = '';
    if (role === 'investor') {
      const inv = investors.find(i => i.email === email);
      name = inv ? inv.name : 'Demo Investor';
    } else if (role === 'maker') {
      name = 'Mahnaz Chowdhury';
    } else if (role === 'checker') {
      name = 'Shabbir Ahmed';
    }

    setCurrentUserEmail(email);
    setCurrentRole(role);
    setCurrentUserName(name);

    sessionStorage.setItem('dh_user_email', email);
    sessionStorage.setItem('dh_user_role', role);
    sessionStorage.setItem('dh_user_name', name);

    setShowLogin(false);
    executeAuditEvent(name, `${role.toUpperCase()} CONSOLE`, 'LOGIN_SUCCESS', `User authenticated and retrieved secured workstation ports.`);
  };

  const handleLogout = () => {
    executeAuditEvent(currentUserName, `${currentRole.toUpperCase()} CONSOLE`, 'LOGOUT', `Controlled workstation session terminated.`);
    setCurrentRole('guest');
    setCurrentUserEmail('');
    setCurrentUserName('');
    sessionStorage.clear();
  };

  // 3. Application handlers
  const handleApplySuite = (appInput: Omit<Application, 'id' | 'status' | 'notes' | 'submittedAt'>) => {
    const newApp: Application = {
      ...appInput,
      id: `APP-00${applications.length + 1}`,
      status: 'pending',
      notes: '',
      submittedAt: new Date().toISOString()
    };
    const nextList = [newApp, ...applications];
    persistState('dh_applications', nextList, setApplications);

    executeAuditEvent(newApp.name, 'GUEST APPLICANT', 'SUBMIT_APPLICATION', `Suitability request filed (Indicative capacity: ৳${newApp.ticket.toLocaleString()}).`);
  };

  // Vetting Board approvals (Checker Action)
  const handleApproveApplication = (id: string) => {
    const updated = applications.map(app => {
      if (app.id === id) {
        // Cascade Side-effect: Provision active Investor credentials instantly
        const matchingInvestor: Investor = {
          id: app.email,
          name: app.name,
          email: app.email,
          mobile: app.mobile,
          location: app.location,
          applicantType: app.applicantType,
          occupation: app.occupation,
          kycStatus: 'In Review',
          kycFiles: [],
          sourceOfFunds: app.sourceOfFunds,
          joinedAt: new Date().toISOString(),
          readinessScore: 35
        };

        const currentInvestors = [...investors];
        if (!currentInvestors.some(i => i.email === app.email)) {
          persistState('dh_investors', [matchingInvestor, ...currentInvestors], setInvestors);
        }

        // Generate matching Investor notification welcome tray
        const newNotif: Notification = {
          id: `NTF-${Date.now()}`,
          userId: app.email,
          title: 'Vesting Access Confirmed',
          messageText: `Dear ${app.name}, the advisory board has cleared your suitability file. Swapping to V2 console is authorized.`,
          isRead: false,
          createdAt: new Date().toISOString()
        };
        persistState('dh_notifications', [newNotif, ...notifications], setNotifications);

        return { ...app, status: 'approved' as const, notes: 'Clearing board approved suitability parameters.' };
      }
      return app;
    });

    persistState('dh_applications', updated, setApplications);
    
    const approver = currentUserName || 'Shabbir Ahmed';
    executeAuditEvent(approver, 'ADMIN CHECKER', 'APPROVE_APPLICATION', `Vetted application ${id}. Active investor credential log created.`);
  };

  const handleDeclineApplication = (id: string, reason: string) => {
    const updated = applications.map(app => {
      if (app.id === id) {
        return { ...app, status: 'declined' as const, notes: reason };
      }
      return app;
    });
    persistState('dh_applications', updated, setApplications);

    const approver = currentUserName || 'Shabbir Ahmed';
    executeAuditEvent(approver, 'ADMIN CHECKER', 'DECLINE_APPLICATION', `Vetted application ${id} and declined access. Reason logged.`);
  };

  // 4. Investor dashboard handlers
  const handleAddCommitment = (oppId: string, amount: number) => {
    const opp = opportunities.find(o => o.id === oppId);
    if (!opp) return;

    const newCommitment: Commitment = {
      id: `CM-00${commitments.length + 1}`,
      investorId: currentUserEmail,
      investorName: currentUserName,
      opportunityId: oppId,
      opportunityTitle: opp.title,
      amount,
      status: 'Verified',
      createdAt: new Date().toISOString()
    };

    // Update Opportunity Raised totals
    const nextOpps = opportunities.map(o => {
      if (o.id === oppId) {
        return { ...o, raisedAmount: o.raisedAmount + amount };
      }
      return o;
    });

    persistState('dh_opportunities', nextOpps, setOpportunities);
    persistState('dh_commitments', [newCommitment, ...commitments], setCommitments);

    executeAuditEvent(currentUserName, 'INVESTOR', 'DECLARE_COMMITMENT', `Registered non-binding interest for ${opp.title} in BDT ৳${amount.toLocaleString()}. No funds requested.`);
  };

  // Chat message send & simulated auto-response side effect
  const handleSendMessage = (text: string) => {
    const newMsg: Message = {
      id: `MSG-${Date.now()}`,
      investorId: currentUserEmail,
      senderName: currentUserName,
      senderRole: 'Investor',
      messageText: text,
      timestamp: new Date().toISOString()
    };

    const nextMsgs = [...messages, newMsg];
    persistState('dh_messages', nextMsgs, setMessages);
    executeAuditEvent(currentUserName, 'INVESTOR', 'SEND_MESSAGE', `Investor Relations Inquiry filed.`);

    // 1-second auto response
    setTimeout(() => {
      const responseText = `Thank you for your message regarding Bhaluka operations! Shabbir Ahmed (Senior Checker) and our block specialists Mahnaz are current reviewing telemetry logs. We will provide formal responses on your thread shortly.`;
      const autoMsg: Message = {
        id: `MSG-${Date.now() + 1}`,
        investorId: currentUserEmail,
        senderName: 'IR Operations (Dhaka Head Desk)',
        senderRole: 'IR Admin',
        messageText: responseText,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => {
        const appended = [...prev, autoMsg];
        localStorage.setItem('dh_messages', JSON.stringify(appended));
        return appended;
      });
    }, 1000);
  };

  const handleUpdateKyc = (profile: Partial<Investor>) => {
    const updated = investors.map(inv => {
      if (inv.email === currentUserEmail) {
        return {
          ...inv,
          ...profile,
          readinessScore: profile.kycFiles && profile.kycFiles.length > 0 ? 82 : inv.readinessScore
        };
      }
      return inv;
    });

    persistState('dh_investors', updated, setInvestors);
    executeAuditEvent(currentUserName, 'INVESTOR', 'UPDATE_KYC_PROFILE', `Configuration parameters updated. Standard readiness index tracking adjusted.`);
  };

  const handleMarkNotificationRead = (id: string) => {
    const updated = notifications.map(n => {
      if (n.id === id) return { ...n, isRead: true };
      return n;
    });
    persistState('dh_notifications', updated, setNotifications);
  };

  // 5. Maker / Operations handlers
  const handleProposedTranche = (trInput: Omit<TrancheRequest, 'id' | 'proposedBy' | 'status' | 'createdAt'>) => {
    const newTr: TrancheRequest = {
      ...trInput,
      id: `TR-00${trancheRequests.length + 1}`,
      proposedBy: currentUserName,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    persistState('dh_tranches', [newTr, ...trancheRequests], setTrancheRequests);
    executeAuditEvent(currentUserName, 'OPERATIONAL MAKER', 'PROPOSE_TRANCHE', `Disbursement request ${newTr.id} filed for ৳${newTr.amount.toLocaleString()}.`);
  };

  const handleAddOperatingUpdate = (upInput: Omit<OperatingUpdate, 'id' | 'date' | 'author'>) => {
    const newUp: OperatingUpdate = {
      ...upInput,
      id: `UP-0x${operatingUpdates.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      author: currentUserName
    };

    // Cascade Side-effect: Automatically blast investor notificationWelcomers
    const newNotif: Notification = {
      id: `NTF-${Date.now()}`,
      userId: 'all',
      title: 'New Operating Update published',
      messageText: `${currentUserName} (Maker) uploaded report: ${newUp.title}. Evidence calibration verified.`,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    persistState('dh_updates', [newUp, ...operatingUpdates], setOperatingUpdates);
    persistState('dh_notifications', [newNotif, ...notifications], setNotifications);

    executeAuditEvent(currentUserName, 'OPERATIONAL MAKER', 'PUBLISH_REPORT', `Operating evidence journal ${newUp.id} posted. Global notifications dispatched.`);
  };

  // 6. Checker core disbursements controllers (Checker Action)
  const handleApproveTranche = (id: string, notes: string) => {
    const targetTr = trancheRequests.find(t => t.id === id);
    if (!targetTr) return;

    const updatedTranches = trancheRequests.map(tr => {
      if (tr.id === id) {
        return {
          ...tr,
          status: 'approved' as const,
          approvedBy: currentUserName,
          decisionDate: new Date().toISOString(),
          decisionNotes: notes
        };
      }
      return tr;
    });

    // Cascade Side-effect: Automatically post OUTFLOW matching record inside General Project Ledger!
    const matchingLedger: LedgerEntry = {
      id: `LDG-00${ledgerEntries.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      description: `Disbursement clearing payout: ${targetTr.title}`,
      type: 'Outflow',
      category: targetTr.title.toLowerCase().includes('feed') ? 'Feed Purchase' : 'Labor',
      amount: targetTr.amount,
      reference: targetTr.evidenceUrl || 'Checker Clearance Signature',
      status: 'verified',
      maker: targetTr.proposedBy,
      checker: currentUserName
    };

    persistState('dh_tranches', updatedTranches, setTrancheRequests);
    persistState('dh_ledger', [matchingLedger, ...ledgerEntries], setLedgerEntries);

    executeAuditEvent(currentUserName, 'ADMIN CHECKER', 'APPROVE_TRANCHE', `Dual-signoff disbursement confirmed for request ${id} (৳${targetTr.amount.toLocaleString()}). Post log cleared to general ledger.`);
  };

  const handleRejectTranche = (id: string, notes: string) => {
    const updatedTranches = trancheRequests.map(tr => {
      if (tr.id === id) {
        return {
          ...tr,
          status: 'rejected' as const,
          approvedBy: currentUserName,
          decisionDate: new Date().toISOString(),
          decisionNotes: notes
        };
      }
      return tr;
    });

    persistState('dh_tranches', updatedTranches, setTrancheRequests);
    executeAuditEvent(currentUserName, 'ADMIN CHECKER', 'REJECT_TRANCHE', `Disbursement request ${id} rejected following invoice mismatch. Notes: "${notes}"`);
  };

  // 7. General parameters updates (Opportunity adjustments, gates overrides)
  const handleSaveOpportunity = (opp: Opportunity) => {
    const updated = opportunities.map(o => o.id === opp.id ? opp : o);
    persistState('dh_opportunities', updated, setOpportunities);
    executeAuditEvent(currentUserName, 'ADMIN CHECKER', 'SAVE_OPPORTUNITY', `Opportunity ${opp.id} details altered in records registry.`);
  };

  const handleCreateOpportunity = (oppInput: Omit<Opportunity, 'id'>) => {
    const newOpp: Opportunity = {
      ...oppInput,
      id: `${opportunities.length + 1}`
    };
    const updated = [...opportunities, newOpp];
    persistState('dh_opportunities', updated, setOpportunities);
    executeAuditEvent(currentUserName, 'ADMIN CHECKER', 'CREATE_OPPORTUNITY', `New agricultural cycle defined: ${newOpp.title}. Status: ${newOpp.status}`);
  };

  const handleAddLedger = (entryInput: Omit<LedgerEntry, 'id' | 'status' | 'checker'>) => {
    const newEntry: LedgerEntry = {
      ...entryInput,
      id: `LDG-00${ledgerEntries.length + 1}`,
      status: 'verified',
      checker: currentUserName
    };
    persistState('dh_ledger', [newEntry, ...ledgerEntries], setLedgerEntries);
    executeAuditEvent(currentUserName, 'ADMIN CHECKER', 'POST_LEDGER_MANUAL', `Ledger Row appended manually. Reference: ${newEntry.reference}`);
  };

  const handleToggleGate = (key: string) => {
    const updated = readinessGates.map(gate => {
      if (gate.key === key) {
        const nextState = !gate.checked;
        return { ...gate, checked: nextState };
      }
      return gate;
    });
    persistState('dh_gates', updated, setReadinessGates);
    executeAuditEvent(currentUserName, 'ADMIN CHECKER', 'TOGGLE_READINESS_GATE', `Regulatory compliance checkpoint adjusted for identifier: ${key}.`);
  };

  // 8. Systems Backups Restores recovery controls
  const handleImportBackup = (jsonContent: string): boolean => {
    try {
      const parsed = JSON.parse(jsonContent);
      if (
        parsed.opportunities && 
        parsed.applications && 
        parsed.investors && 
        parsed.commitments && 
        parsed.tranches && 
        parsed.ledger
      ) {
        persistState('dh_opportunities', parsed.opportunities, setOpportunities);
        persistState('dh_applications', parsed.applications, setApplications);
        persistState('dh_investors', parsed.investors, setInvestors);
        persistState('dh_commitments', parsed.commitments, setCommitments);
        persistState('dh_tranches', parsed.tranches, setTrancheRequests);
        persistState('dh_updates', parsed.updates || [], setOperatingUpdates);
        persistState('dh_ledger', parsed.ledger, setLedgerEntries);
        persistState('dh_gates', parsed.readinessGates || SEEDED_READINESS_GATES, setReadinessGates);
        persistState('dh_audit', parsed.auditLogs || [], setAuditLogs);
        
        executeAuditEvent('Advisory Override', 'SYSTEM_ADMIN', 'IMPORT_BACKUP', `External JSON file parsed. Full structural dataset restored.`);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleResetDatabase = () => {
    // Clear standard browser localStorage
    localStorage.removeItem('dh_opportunities');
    localStorage.removeItem('dh_applications');
    localStorage.removeItem('dh_investors');
    localStorage.removeItem('dh_commitments');
    localStorage.removeItem('dh_tranches');
    localStorage.removeItem('dh_updates');
    localStorage.removeItem('dh_ledger');
    localStorage.removeItem('dh_messages');
    localStorage.removeItem('dh_notifications');
    localStorage.removeItem('dh_gates');
    localStorage.removeItem('dh_audit');

    // Wipe session
    sessionStorage.clear();

    // Reload starting seeds constants
    setOpportunities(SEEDED_OPPORTUNITIES);
    setApplications(SEEDED_APPLICATIONS);
    setInvestors(SEEDED_INVESTORS);
    setCommitments(SEEDED_COMMITMENTS);
    setTrancheRequests(SEEDED_TRANCHE_REQUESTS);
    setOperatingUpdates(SEEDED_OPERATING_UPDATES);
    setLedgerEntries(SEEDED_LEDGER_ENTRIES);
    setMessages(SEEDED_MESSAGES);
    setNotifications(SEEDED_NOTIFICATIONS);
    setReadinessGates(SEEDED_READINESS_GATES);
    setAuditLogs(SEEDED_AUDIT_EVENTS);

    setCurrentRole('guest');
    setCurrentUserEmail('');
    setCurrentUserName('');

    executeAuditEvent('Factory Daemon', 'SYSTEM_ROOT', 'FACTORY_DATABASE_RESET', `Clear storage completed. Original Bhaluka starting coefficients restored.`);
    alert("🔄 Database fully purged and restored to standard seeded demo data!");
  };

  // Find profile object for logged in investor
  const loggedInInvestor = investors.find(i => i.email === currentUserEmail) || SEEDED_INVESTORS[0];

  return (
    <div className="min-h-screen bg-cream selection:bg-lime selection:text-forest">
      
      {/* View router canvas */}
      {currentRole === 'guest' && (
        <PublicView 
          opportunities={opportunities} 
          onOpenApplication={() => setShowApplication(true)}
          onOpenLogin={() => setShowLogin(true)}
        />
      )}

      {currentRole === 'investor' && (
        <InvestorPortal 
          currentUser={{ email: currentUserEmail, name: currentUserName }}
          investorData={loggedInInvestor}
          opportunities={opportunities}
          commitments={commitments.filter(c => c.investorId === currentUserEmail)}
          updates={operatingUpdates}
          messages={messages}
          notifications={notifications}
          onAddCommitment={handleAddCommitment}
          onSendMessage={handleSendMessage}
          onUpdateKyc={handleUpdateKyc}
          onMarkNotificationRead={handleMarkNotificationRead}
          onLogout={handleLogout}
        />
      )}

      {currentRole === 'maker' && (
        <MakerPortal 
          currentUser={{ email: currentUserEmail, name: currentUserName }}
          trancheRequests={trancheRequests}
          updates={operatingUpdates}
          onAddTrancheRequest={handleProposedTranche}
          onAddOperatingUpdate={handleAddOperatingUpdate}
          onLogout={handleLogout}
        />
      )}

      {currentRole === 'checker' && (
        <CheckerPortal 
          currentUser={{ email: currentUserEmail, name: currentUserName }}
          applications={applications}
          investors={investors}
          tranches={trancheRequests}
          opportunities={opportunities}
          ledger={ledgerEntries}
          readinessGates={readinessGates}
          auditLogs={auditLogs}
          onApproveApplication={handleApproveApplication}
          onDeclineApplication={handleDeclineApplication}
          onApproveTranche={handleApproveTranche}
          onRejectTranche={handleRejectTranche}
          onSaveOpportunity={handleSaveOpportunity}
          onCreateOpportunity={handleCreateOpportunity}
          onAddLedger={handleAddLedger}
          onToggleGate={handleToggleGate}
          onImportBackup={handleImportBackup}
          onResetDatabase={handleResetDatabase}
          onLogout={handleLogout}
        />
      )}

      {/* dialog forms */}
      {showApplication && (
        <NewApplicationDialog 
          onClose={() => setShowApplication(false)} 
          onSubmit={handleApplySuite}
        />
      )}

      {showLogin && (
        <LoginDialog 
          onClose={() => setShowLogin(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      )}

    </div>
  );
}
