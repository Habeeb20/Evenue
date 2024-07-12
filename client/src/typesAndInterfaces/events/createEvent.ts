export interface CreateEvent {
  name: string;
  location: string;
  url: string;
  category: string;
  frequency: string;
  time_zone: string;
  imgs: FileList | string;
  start_date_and_time: Date;
  end_date_and_time: Date;
  price: string;
  [key: string]: string | number | FileList | undefined | Date;
}
