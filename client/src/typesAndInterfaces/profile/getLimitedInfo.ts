export interface EventProfileLInfo {
  event_id: number;
  name: string;
  location: string;
  first_img: string;
  price: number;
  views: number;
  likes: number;
  share_count: number;
}

export interface EventProfileLRes {
  finalResult: [
    EventProfileLInfo[],
    {
      total: number;
    }[]
  ];
}
