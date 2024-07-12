export interface Res4GetPost {
  result: OnePost[];
}

export interface OnePost {
  id: number;
  post: string;
  created_at: string;
  shares: number;
  views: number;
  imgs: string;
  owner_firstname: string;
  owner_lastname: string;
  owner_img: string;
  likes: number;
  user_liked: number;
  post_comments: PostComment[];
}

export interface PostComment {
  comment: null | string;
  comment_id: number | null;
  created_at: string | null;
  commentator_img: null | string;
  commentator_last_name: null | string;
  commentator_first_name: null | string;
}
