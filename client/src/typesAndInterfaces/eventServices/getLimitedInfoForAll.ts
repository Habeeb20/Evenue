export interface GetLimitedInfoForAllResponse {
  result: EventServiceLimitedInfo[];
}

export interface EventServiceLimitedInfo {
  id: number;
  name: string;
  location: string;
  verified: string;
  category: string;
  first_img: string;
  rating: string;
  total_raings_no: number;
}
