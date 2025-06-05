export interface Education {
  degree: string;
  field: string;
  graduationYear: string;
}

export interface Preferences {
  domains: string[];
  locations: string[];
  workMode: 'Remote' | 'On-site' | 'Hybrid' | '';
}

export interface Resume {
  fileName: string;
  uploadedAt: string;
  url: string;
}

export interface StudentProfile {
  fullName: string;
  email: string;
  institute: string;
  education: Education;
  skills: string[];
  preferences: Preferences;
  bio: string;
  resume?: Resume;
} 