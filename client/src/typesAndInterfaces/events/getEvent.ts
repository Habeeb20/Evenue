export interface Response {
  result: Event[];
}

export interface Event {
  event_id: number;
  name: string;
  description: string;
  location: string;
  url: string;
  category: string;
  frequency: string;
  time_zone: string;
  start_date_and_time: Date;
  end_date_and_time: Date;
  imgs: string;
  price: number;
}
