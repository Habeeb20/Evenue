export interface Res4VenueSearch {
  result: OneVenueLInfo[];
}

export interface OneVenueLInfo {
  id: number;
  title: string;
  location: string;
  no_of_guest: number;
  first_img: string;
  rating: number;
}
