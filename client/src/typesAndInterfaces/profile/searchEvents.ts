export interface SearchEvents {
  name?: string;
  location?: string;
  category?: string;
  frequency?: string;
  price?: string;
}

export interface SearchRes {
  result: LoneSearch[];
}

export interface LoneSearch {
  event_id: number;
  name: string;
  location: string;
  start_date_and_time: Date;
  first_img: string;
  price: number;
  views: number;
  likes: number;
  share_count: number;
}
