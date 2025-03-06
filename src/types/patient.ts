export interface Patient {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
}

export interface PatientFormData {
  name: string;
  avatar: string;
  description?: string;
  website?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}