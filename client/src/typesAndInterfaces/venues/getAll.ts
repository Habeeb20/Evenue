export interface Venue {
  id: number;
  title: string;
  location: string;
  no_of_guest: number;
  first_img: string;
  rating: number;
}

export interface VenueResponse {
  finalResult: [
    Venue[],
    {
      total: number;
    }[]
  ];
}
