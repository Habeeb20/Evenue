export interface EventShowcase {
  id: number;
  name: string;
  intro: string;
  first_img: string;
}

export interface EventShowcaseResponse {
  finalResult: [
    EventShowcase[],
    {
      total: number;
    }[]
  ];
}
