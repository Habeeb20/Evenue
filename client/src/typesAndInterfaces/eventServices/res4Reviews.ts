export interface Res4ServiceReviews {
  finalResult: [
    OneServiceReview[],
    {
      total: number;
    }[]
  ];
}

export interface OneServiceReview {
  id: number;
  review: string;
  reviewer_first_name: string;
  reviewer_last_name: string;
  reviewer_img: string;
}
