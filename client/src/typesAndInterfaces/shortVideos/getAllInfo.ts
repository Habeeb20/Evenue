export interface GetVidsAllRes {
  result: LoneVid[];
}

export interface LoneVid {
  id: number;
  video: string;
  description: string;
  posted_on: string;
  views: number;
  likes: number;
  video_user_id: number;
  video_user_first_name: string;
  video_user_last_name: string;
  video_user_img: string;
  comments: Comment[];
  user_has_liked: number;
}

export interface Comment {
  comment: null | string;
  comment_id: number | null;
  commentator_img: null | string;
  commentator_username: null | string;
  created_at: null | string;
}
