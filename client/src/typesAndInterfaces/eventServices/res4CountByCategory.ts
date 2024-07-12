export interface Res4CountByCategory {
  result: ESCatCount[];
}

export interface ESCatCount {
  dj?: string;
  total_designers: string;
  total_make_up_artise: string;
  total_photo_video_makers: string;
}
