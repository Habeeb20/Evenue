export interface SearchVenues {
  title?: string;
  location?: string;
  category?: string;
  venue_type?: string;
  starting_price?: string;
}

export interface VenuesRes {
  result: LoneVenue[];
}

export interface LoneVenue {
  event_id: number;
  name: string;
  location: string;
  no_of_guest: number;
  first_img: string;
  price: number;
  views: number;
  likes: number;
  share_count: number;
}
