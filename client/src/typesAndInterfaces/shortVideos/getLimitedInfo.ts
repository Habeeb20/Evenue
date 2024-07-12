export interface GetShortVidsRes {
  result: LoneShortVid[];
}

export interface LoneShortVid {
  id: number;
  video: string;
  views: number;
  likes: number;
}
