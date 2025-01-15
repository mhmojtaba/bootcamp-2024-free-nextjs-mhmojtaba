export interface DoctorModel {
  id: string;
  name: string;
  image: string;
  isVerified: boolean;
  gender: string;
  averageRating: number;
  totalVotes: number;
  address: string;
  firstAvailableAppointment: string;
  brief: string;
  degree: string;
  expertise: string;
  badges: string[];
}

export interface initialStateType {
  isLoading: boolean;
  doctors: DoctorModel[];
  error?: string | null;
}

export type actionType = {
  type: string;
  payload?: DoctorModel[];
};

export type selectOptionsType = {
  value?: string;
  label?: string;
};

export type FiltersType = {
  query?: string;
  expertise?: string;
  gender?: string;
  degree?: string;
  selectedBadges?: string[];
};

export type SearchParams = { [key: string]: string | string[] | undefined };
