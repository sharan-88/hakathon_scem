export type ApplicationStatus = 'Applied' | 'Under Review' | 'Accepted' | 'Rejected';

export interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  companyLogo?: string;
  appliedDate: string;
  lastUpdated: string;
  status: ApplicationStatus;
  studentId: string;
  notes?: string;
} 