export interface Response {
  result: EventLInfo[];
}

export interface EventLInfo {
  event_id: number;
  name: string;
  location: string;
  start_date_and_time: Date;
  first_img: string;
  price: number;
}
