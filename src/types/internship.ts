export interface Company {
  name: string;
  logo?: string;
  location: string;
}

export interface VerificationDetails {
  collegeName: string;
  verificationDate: string;
}

export interface Internship {
  id: string;
  title: string;
  company: Company;
  description: string;
  skills: string[];
  duration: string;
  stipend: string;
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  startDate: string;
  verifiedBy: VerificationDetails;
  applicationsClose: string;
} 