export const claimsData = [
  { claim_id: 'CLM-1001', patient_id: 'PAT-001', patient_name: 'Ravi Kumar',     doctor: 'Dr. Sharma',  diagnosis_code: 'A15', diagnosis_desc: 'Tuberculosis',       amount: 48200, status: 'APPROVED', created_at: '2026-04-24T08:12:00Z' },
  { claim_id: 'CLM-1002', patient_id: 'PAT-002', patient_name: 'Priya Nair',     doctor: 'Dr. Reddy',   diagnosis_code: 'Z00', diagnosis_desc: 'Routine Checkup',    amount: 35500, status: 'REJECTED', created_at: '2026-04-24T09:45:00Z' },
  { claim_id: 'CLM-1003', patient_id: 'PAT-003', patient_name: 'Suresh Babu',    doctor: 'Dr. Mehta',   diagnosis_code: 'B20', diagnosis_desc: 'HIV',                amount: 12800, status: 'APPROVED', created_at: '2026-04-25T10:20:00Z' },
  { claim_id: 'CLM-1004', patient_id: 'PAT-004', patient_name: 'Anita Rao',      doctor: 'Dr. Iyer',    diagnosis_code: 'J45', diagnosis_desc: 'Asthma',             amount: 8400,  status: 'PENDING',  created_at: '2026-04-25T11:05:00Z' },
  { claim_id: 'CLM-1005', patient_id: 'PAT-005', patient_name: 'Mohammed Ali',   doctor: 'Dr. Khan',    diagnosis_code: 'E11', diagnosis_desc: 'Diabetes',           amount: 22100, status: 'APPROVED', created_at: '2026-04-26T08:30:00Z' },
  { claim_id: 'CLM-1006', patient_id: 'PAT-006', patient_name: 'Lakshmi Devi',   doctor: 'Dr. Sharma',  diagnosis_code: 'Z01', diagnosis_desc: 'Health Exam',        amount: 31000, status: 'REJECTED', created_at: '2026-04-26T12:15:00Z' },
  { claim_id: 'CLM-1007', patient_id: 'PAT-007', patient_name: 'Venkat Rao',     doctor: 'Dr. Patel',   diagnosis_code: 'I10', diagnosis_desc: 'Hypertension',       amount: 15600, status: 'APPROVED', created_at: '2026-04-27T09:00:00Z' },
  { claim_id: 'CLM-1008', patient_id: 'PAT-008', patient_name: 'Sunitha Reddy',  doctor: 'Dr. Reddy',   diagnosis_code: 'K21', diagnosis_desc: 'Gastric Reflux',     amount: 9200,  status: 'APPROVED', created_at: '2026-04-27T14:30:00Z' },
  { claim_id: 'CLM-1009', patient_id: 'PAT-009', patient_name: 'Arjun Nair',     doctor: 'Dr. Iyer',    diagnosis_code: 'M54', diagnosis_desc: 'Back Pain',          amount: 7800,  status: 'PENDING',  created_at: '2026-04-28T10:45:00Z' },
  { claim_id: 'CLM-1010', patient_id: 'PAT-010', patient_name: 'Kavitha Singh',  doctor: 'Dr. Mehta',   diagnosis_code: 'A15', diagnosis_desc: 'Tuberculosis',       amount: 52000, status: 'APPROVED', created_at: '2026-04-28T15:00:00Z' },
  { claim_id: 'CLM-1011', patient_id: 'PAT-011', patient_name: 'Deepak Joshi',   doctor: 'Dr. Khan',    diagnosis_code: 'Z02', diagnosis_desc: 'Pre-employment Exam',amount: 42000, status: 'REJECTED', created_at: '2026-04-29T08:00:00Z' },
  { claim_id: 'CLM-1012', patient_id: 'PAT-012', patient_name: 'Meena Pillai',   doctor: 'Dr. Patel',   diagnosis_code: 'N39', diagnosis_desc: 'Urinary Infection',  amount: 11300, status: 'APPROVED', created_at: '2026-04-29T11:20:00Z' },
];

export const fraudAlerts = [
  { claim_id: 'CLM-1010', amount: 52000, risk_level: 'HIGH',   reason: 'Amount > ₹50,000 — exceeds threshold',              flagged_at: '2026-04-28T15:01:00Z', doctor: 'Dr. Mehta',  diagnosis_code: 'A15' },
  { claim_id: 'CLM-1002', amount: 35500, risk_level: 'HIGH',   reason: 'Z00 diagnosis + amount > ₹30,000 — routine checkup', flagged_at: '2026-04-24T09:46:00Z', doctor: 'Dr. Reddy',  diagnosis_code: 'Z00' },
  { claim_id: 'CLM-1011', amount: 42000, risk_level: 'HIGH',   reason: 'Z02 diagnosis + amount > ₹30,000 — exam claim',     flagged_at: '2026-04-29T08:01:00Z', doctor: 'Dr. Khan',   diagnosis_code: 'Z02' },
  { claim_id: 'CLM-1006', amount: 31000, risk_level: 'MEDIUM', reason: 'Z01 diagnosis + amount > ₹15,000 — health exam',    flagged_at: '2026-04-26T12:16:00Z', doctor: 'Dr. Sharma', diagnosis_code: 'Z01' },
  { claim_id: 'CLM-1001', amount: 48200, risk_level: 'MEDIUM', reason: 'Amount between ₹20,000–₹50,000 — review needed',    flagged_at: '2026-04-24T08:13:00Z', doctor: 'Dr. Sharma', diagnosis_code: 'A15' },
  { claim_id: 'CLM-1005', amount: 22100, risk_level: 'MEDIUM', reason: 'Pending status + amount > ₹15,000',                 flagged_at: '2026-04-26T08:31:00Z', doctor: 'Dr. Khan',   diagnosis_code: 'E11' },
  { claim_id: 'CLM-1003', amount: 12800, risk_level: 'LOW',    reason: 'Non A/B diagnosis + amount > ₹5,000',               flagged_at: '2026-04-25T10:21:00Z', doctor: 'Dr. Mehta',  diagnosis_code: 'B20' },
  { claim_id: 'CLM-1004', amount: 8400,  risk_level: 'SAFE',   reason: 'No fraud rules triggered',                          flagged_at: '2026-04-25T11:06:00Z', doctor: 'Dr. Iyer',   diagnosis_code: 'J45' },
  { claim_id: 'CLM-1012', amount: 11300, risk_level: 'SAFE',   reason: 'No fraud rules triggered',                          flagged_at: '2026-04-29T11:21:00Z', doctor: 'Dr. Patel',  diagnosis_code: 'N39' },
];

export const trendData = [
  { date: 'Apr 24', claims: 142, amount: 412000 },
  { date: 'Apr 25', claims: 168, amount: 498000 },
  { date: 'Apr 26', claims: 155, amount: 376000 },
  { date: 'Apr 27', claims: 190, amount: 521000 },
  { date: 'Apr 28', claims: 175, amount: 445000 },
  { date: 'Apr 29', claims: 210, amount: 589000 },
  { date: 'Apr 30', claims: 244, amount: 634000 },
];

export const dashboardStats = {
  totalClaims: 1284,
  totalAmount: 2460000,
  fraudAlerts: 43,
  approvalRate: 78,
  approved: 1002,
  rejected: 154,
  pending: 128,
};
