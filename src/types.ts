export type Role = 'guest' | 'investor' | 'maker' | 'checker';

export interface Opportunity {
  id: string;
  title: string;
  status: 'OPEN' | 'PIPELINE' | 'CLOSED';
  type: string;
  subtitle: string;
  description: string;
  expectedReturn: string;
  minCommitment: number;
  tenure: string;
  targetAmount: number;
  raisedAmount: number;
  details: string[];
  publishStatus: 'draft' | 'published';
}

export interface Application {
  id: string;
  name: string;
  email: string;
  mobile: string;
  location: string;
  applicantType: string;
  occupation: string;
  interest: string;
  ticket: number;
  involvement: string;
  sourceOfFunds: string;
  objective: string;
  status: 'pending' | 'approved' | 'declined';
  notes: string;
  submittedAt: string;
}

export interface Investor {
  id: string;
  name: string;
  email: string;
  mobile: string;
  location: string;
  applicantType: string;
  occupation: string;
  kycStatus: 'Pending Upload' | 'In Review' | 'Approved' | 'Action Required';
  kycFiles: string[];
  sourceOfFunds: string;
  joinedAt: string;
  readinessScore: number;
}

export interface Commitment {
  id: string;
  investorId: string;
  investorName: string;
  opportunityId: string;
  opportunityTitle: string;
  amount: number;
  status: 'Draft' | 'Submitted' | 'Verified' | 'Cancelled';
  createdAt: string;
}

export interface TrancheRequest {
  id: string;
  title: string;
  amount: number;
  proposedBy: string;
  notes: string;
  evidenceUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  decisionDate?: string;
  decisionNotes?: string;
  createdAt: string;
}

export interface OperatingUpdate {
  id: string;
  title: string;
  date: string;
  content: string;
  category: string;
  evidenceText: string;
  author: string;
}

export interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  type: 'Inflow' | 'Outflow';
  category: string;
  amount: number;
  reference: string;
  status: 'pending' | 'verified' | 'rejected';
  maker: string;
  checker?: string;
}

export interface Message {
  id: string;
  investorId: string;
  senderName: string;
  senderRole: 'Investor' | 'IR Admin';
  messageText: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string; // 'all' or specific investor email
  title: string;
  messageText: string;
  isRead: boolean;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  summary: string;
}

export interface ReadinessGate {
  key: string;
  label: string;
  description: string;
  checked: boolean;
}
