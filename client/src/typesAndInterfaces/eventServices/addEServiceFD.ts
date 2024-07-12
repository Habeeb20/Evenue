export interface AddEServiceFD {
  name: string;
  location: string;
  profession: string;
  category: string;
  email: string;
  phone_number: string;
  experience_duration: string;
  imgs: string | FileList | undefined;
  MONDAY_OPEN: string;
  MONDAY_CLOSE: string;
  TUESDAY_OPEN: string;
  TUESDAY_CLOSE: string;
  WEDNESDAY_OPEN: string;
  WEDNESDAY_CLOSE: string;
  THURSDAY_OPEN: string;
  THURSDAY_CLOSE: string;
  FRIDAY_OPEN: string;
  FRIDAY_CLOSE: string;
  SATURDAY_OPEN: string;
  SATURDAY_CLOSE: string;
  SUNDAY_OPEN: string;
  SUNDAY_CLOSE: string;
  [key: string]: string | FileList | undefined;
}
