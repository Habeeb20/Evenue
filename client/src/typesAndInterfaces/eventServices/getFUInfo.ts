export interface ResEventServiceFUInfo {
  result: OneEventServiceFUInfo[];
}

export interface OneEventServiceFUInfo {
  id: number;
  name: string;
  location: string;
  verified: string;
  bio: string;
  profession: string;
  category: string;
  email: string;
  phone_number: string;
  experience_duration: string;
  imgs: string;
  rating: string;
  total_raings_no: number;
  opening_hours: OpeningHours[];
  user_has_reviewed: number;
}

export interface OpeningHours {
  hours_id: number | null;
  FRIDAY_OPEN: null | string;
  MONDAY_OPEN: string | null;
  SUNDAY_OPEN: null | string;
  FRIDAY_CLOSE: null | string;
  MONDAY_CLOSE: string | null;
  SUNDAY_CLOSE: null | string;
  TUESDAY_OPEN: null | string;
  SATURDAY_OPEN: null | string;
  THURSDAY_OPEN: null | string;
  TUESDAY_CLOSE: null | string;
  SATURDAY_CLOSE: null | string;
  THURSDAY_CLOSE: null | string;
  WEDNESDAY_OPEN: string | null;
  WEDNESDAY_CLOSE: string | null;
}
