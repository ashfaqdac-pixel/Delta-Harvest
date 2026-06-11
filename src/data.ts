import { 
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

export const SEEDED_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'Precision Aquaculture Cycle (V2)',
    status: 'OPEN',
    type: 'Aquaculture',
    subtitle: 'Commercial high-density grow-out cycle',
    description: 'Capitalizing on pre-built water infrastructure to run a highly optimized grow-out cycle of Carp, Tilapia, and Pangas. Utilizing proprietary high-efficiency feed formulations from our integrated mill to optimize Feed Conversion Ratios (FCR) and maximize net yields.',
    expectedReturn: '15% - 18% IRR Indicative',
    minCommitment: 250000,
    tenure: '8 months',
    targetAmount: 2000000,
    raisedAmount: 1100000,
    details: [
      'Pre-built desilted waterways (12 ponds, 4.23 water surface acres)',
      'Proprietary high-efficiency feed supply contract yielding sub-1.3 FCR',
      'Automated bio-security controls and aerated water-quality monitoring',
      'Staggered capital tranches strictly mapping growth and harvest cycles'
    ],
    publishStatus: 'published'
  },
  {
    id: '2',
    title: 'Industrial Poultry & Dairy Expansion',
    status: 'PIPELINE',
    type: 'Livestock & Poultry',
    subtitle: 'Asset utilization upgrade: 20K birds + 100 dairy cows',
    description: 'Unlocking the maximum capacity of our fully-constructed infrastructure: modern sheds for 20,000 layers/broilers and specialized stanchion-barn space for 100 elite milking cows. Funding feed stockpiling, high-yield veterinary protocols, and high-frequency dairy collection contracts.',
    expectedReturn: '18% - 22% IRR Target Range',
    minCommitment: 500000,
    tenure: '12 months',
    targetAmount: 3500000,
    raisedAmount: 0,
    details: [
      '20,000-head specialized poultry and duck sheds already constructed',
      '100-cow master dairy barn fully equipped with milking and sanitation rails',
      'Zero-waste circular economy: high-nutrient organic manure for on-site crops',
      'On-site feed production facilities minimizing external procurement costs'
    ],
    publishStatus: 'published'
  },
  {
    id: '3',
    title: 'Commercial Crop & Agroforestry Integration',
    status: 'CLOSED',
    type: 'Agriculture',
    subtitle: 'High-density multi-crop rotation',
    description: 'Fully optimized cultivation across open soils and embankments using high-value cash crops and multi-year fruit orchards. Reinvesting organic cattle/poultry byproduct nutrients to virtually eliminate synthetic soil expenditure and maximize investor margins.',
    expectedReturn: '14.5% IRR (Fully Subscribed)',
    minCommitment: 250000,
    tenure: '18 months',
    targetAmount: 1500000,
    raisedAmount: 1500000,
    details: [
      'Perimeter-secured cultivation lands inside our 8.1-acre agroplex',
      'High-margin fruit and high-density rotational cash crops',
      'Fully gravity-fed irrigation channel sourcing from pond overflows'
    ],
    publishStatus: 'published'
  }
];

export const SEEDED_APPLICATIONS: Application[] = [
  {
    id: 'APP-001',
    name: 'Tariq Al-Masood',
    email: 'masood@dhaka.net',
    mobile: '+8801711998877',
    location: 'Gulshan, Dhaka',
    applicantType: 'Individual',
    occupation: 'Tech Entrepreneur',
    interest: 'Aquaculture cycle financing',
    ticket: 1000000,
    involvement: 'Strategic guidance',
    sourceOfFunds: 'Business income',
    objective: 'Interested in tech-enabled rural operations tracking. I want to back small agribusinesses with absolute visibility.',
    status: 'pending',
    notes: '',
    submittedAt: '2026-06-10T14:32:00Z'
  },
  {
    id: 'APP-002',
    name: 'Mrs. Sabiha Rahman',
    email: 'sabiha@rahmanfamily.co',
    mobile: '+8801819334455',
    location: 'Banani, Dhaka',
    applicantType: 'Family office',
    occupation: 'Managing Trustee',
    interest: 'Whole-farm strategic participation',
    ticket: 5000000,
    involvement: 'Financial participation only',
    sourceOfFunds: 'Investment income',
    objective: 'Seeking stable, asset-backed agriculture projects to diversify long-term family reserves.',
    status: 'approved',
    notes: 'Access granted following phone screen. Candidate meets AML disclosure standards.',
    submittedAt: '2026-06-08T10:15:00Z'
  }
];

export const SEEDED_INVESTORS: Investor[] = [
  {
    id: 'investor@demo.delta',
    name: 'Demo Investor',
    email: 'investor@demo.delta',
    mobile: '+8801999888777',
    location: 'Dhaka, Bangladesh',
    applicantType: 'Individual',
    occupation: 'Financial Analyst',
    kycStatus: 'Approved',
    kycFiles: ['nid_investor_front.jpg', 'tax_certificate_2025.pdf'],
    sourceOfFunds: 'Salary / professional income',
    joinedAt: '2026-06-01T09:00:00Z',
    readinessScore: 68
  },
  {
    id: 'sabiha@rahmanfamily.co',
    name: 'Sabiha Rahman',
    email: 'sabiha@rahmanfamily.co',
    mobile: '+8801819334455',
    location: 'Banani, Dhaka',
    applicantType: 'Family office',
    occupation: 'Managing Trustee',
    kycStatus: 'In Review',
    kycFiles: ['trust_deed_extract.pdf'],
    sourceOfFunds: 'Investment income',
    joinedAt: '2026-06-08T11:00:00Z',
    readinessScore: 45
  }
];

export const SEEDED_COMMITMENTS: Commitment[] = [
  {
    id: 'CM-001',
    investorId: 'investor@demo.delta',
    investorName: 'Demo Investor',
    opportunityId: '1',
    opportunityTitle: 'Aquaculture Restart Cycle (V2)',
    amount: 500000,
    status: 'Verified',
    createdAt: '2026-06-02T10:00:00Z'
  }
];

export const SEEDED_TRANCHE_REQUESTS: TrancheRequest[] = [
  {
    id: 'TR-001',
    title: 'Ponds 1 to 5 excavation & prep',
    amount: 250000,
    proposedBy: 'Mahnaz Chowdhury (Maker)',
    notes: 'Hiring local labor forces and light excavator diesel for pond-bottom restoration and desilting.',
    evidenceUrl: 'Invoice BHL-2026-01 (Kachina Earthworks)',
    status: 'approved',
    approvedBy: 'Shabbir Ahmed (Checker)',
    decisionDate: '2026-06-05T15:20:00Z',
    decisionNotes: 'Pond supervisor on-site pictures and earthworks receipt matched perfectly.',
    createdAt: '2026-06-04T11:00:00Z'
  },
  {
    id: 'TR-002',
    title: 'Fingerling Stocking Batch 1',
    amount: 300000,
    proposedBy: 'Mahnaz Chowdhury (Maker)',
    notes: 'Purchase of Carp and Pangas fingerlings from Bhaluka government-approved hatchery.',
    evidenceUrl: 'Hatchery Delivery Challan #H-44123',
    status: 'pending',
    createdAt: '2026-06-11T08:30:00Z'
  }
];

export const SEEDED_OPERATING_UPDATES: OperatingUpdate[] = [
  {
    id: 'UP-001',
    title: 'Milking Herd Veterinary Protocol Competency Signed Off',
    date: '2026-06-09',
    content: 'Our core dairy herd has completed its preventative immunization and diagnostic screening. High-frequency digital milk spectrometers are fully calibrated to monitor nutritional fat ratios and somatic cell counts, matching premium processing guidelines.',
    category: 'Livestock & Poultry',
    evidenceText: 'Registered veterinary board screening report #DH-VET-2026',
    author: 'Mahnaz Chowdhury'
  },
  {
    id: 'UP-002',
    title: 'Automated Water Telemetry Core Logs: Optimal Dissolved Oxygen',
    date: '2026-06-07',
    content: 'Dissolved oxygen probes across active grow-out bodies confirm solid averages of 6.5 ppm and steady pH levels of 7.4. Natural plankton density levels indicate optimal biological conditions prior to our high-density fingerling intake.',
    category: 'Water Bodies',
    evidenceText: 'HQ Digital Test HQ Probe Reading Report ID #2026-BHLK',
    author: 'Mahnaz Chowdhury'
  }
];

export const SEEDED_LEDGER_ENTRIES: LedgerEntry[] = [
  {
    id: 'LDG-001',
    date: '2026-06-02',
    description: 'Capital Tranche 1 (Demo Investor Verified)',
    type: 'Inflow',
    category: 'Capital Contribution',
    amount: 500000,
    reference: 'Bank Transfer BDT-118274A',
    status: 'verified',
    maker: 'System',
    checker: 'Shabbir Ahmed'
  },
  {
    id: 'LDG-002',
    date: '2026-06-05',
    description: 'Pond Excavation Labor (Tranche TR-001 Payload)',
    type: 'Outflow',
    category: 'Labor',
    amount: 250000,
    reference: 'Payment Voucher BP-LAB-01A',
    status: 'verified',
    maker: 'Mahnaz Chowdhury',
    checker: 'Shabbir Ahmed'
  },
  {
    id: 'LDG-003',
    date: '2026-06-11',
    description: 'Concentrated livestock feed stock (120 bags)',
    type: 'Outflow',
    category: 'Feed Purchase',
    amount: 180000,
    reference: 'Supplier Bill BHALUKA-FEED-99',
    status: 'pending',
    maker: 'Mahnaz Chowdhury'
  }
];

export const SEEDED_MESSAGES: Message[] = [
  {
    id: 'MSG-001',
    investorId: 'investor@demo.delta',
    senderName: 'Demo Investor',
    senderRole: 'Investor',
    messageText: 'Greetings Delta Harvest team, could you clarify what specific species ratio are you stocking for Carp in this upcoming cycle?',
    timestamp: '2026-06-03T11:20:00Z'
  },
  {
    id: 'MSG-002',
    investorId: 'investor@demo.delta',
    senderName: 'IR Admin (Shabbir)',
    senderRole: 'IR Admin',
    messageText: 'Hello there! We are planning approximately 45% Rui & Katla (fast-growing surface feeds), and 55% Mrigel & Pangas bottom-dwellers for biological nutrient balancing. A detailed stocking scheme is posting shortly.',
    timestamp: '2026-06-03T14:45:00Z'
  }
];

export const SEEDED_NOTIFICATIONS: Notification[] = [
  {
    id: 'NTF-001',
    userId: 'investor@demo.delta',
    title: 'KYC Documents Verified',
    messageText: 'Your uploaded National Identity Card and Tax clearance certifications have been approved. Welcome to Delta Harvest V2.',
    isRead: true,
    createdAt: '2026-06-01T10:00:00Z'
  },
  {
    id: 'NTF-002',
    userId: 'investor@demo.delta',
    title: 'New Operating Update Published',
    messageText: 'Mahnaz Chowdhury published a new report: Cattle herd vaccine campaign completed.',
    isRead: false,
    createdAt: '2026-06-09T18:00:00Z'
  }
];

export const SEEDED_READINESS_GATES: ReadinessGate[] = [
  {
    key: 'legal_vetted',
    label: 'Legal Instrument Approval',
    description: 'Bespoke capital participation contract formally vetted by legal counsel in Dhaka.',
    checked: true
  },
  {
    key: 'bank_escrow',
    label: 'Dedicated Escrow Mechanics',
    description: 'Segregated BDT operating bank account set up with authorized checker disbursement controls.',
    checked: true
  },
  {
    key: 'license_updated',
    label: 'Trade license & Union certifications',
    description: 'Aquaculture and livestock operational permits from Kachina Union Council renewed through 2027.',
    checked: true
  },
  {
    key: 'tax_payout_rule',
    label: 'Tax withhold structures configured',
    description: 'NBR compliance rules mapping correct local withholding brackets for private capital return payouts.',
    checked: false
  }
];

export const SEEDED_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'AUD-001',
    timestamp: '2026-06-01T09:00:00Z',
    actor: 'System Auto-Daemon',
    role: 'System',
    action: 'INITIALIZE',
    summary: 'Delta Harvest V2 Platform instance database initialized with high-contrast UI theme.'
  },
  {
    id: 'AUD-002',
    timestamp: '2026-06-02T10:00:00Z',
    actor: 'Shabbir Ahmed',
    role: 'Admin Checker',
    action: 'VERIFY_COMMITMENT',
    summary: 'Commitment CM-001 for Demo Investor (৳5.00 Lakh) verified against bank clearance.'
  },
  {
    id: 'AUD-003',
    timestamp: '2026-06-05T15:20:00Z',
    actor: 'Shabbir Ahmed',
    role: 'Admin Checker',
    action: 'APPROVE_TRANCHE',
    summary: 'Tranche Request TR-001 (Ponds 1-5 earthworks: ৳2.50 Lakh) approved and posted to project ledger.'
  }
];
