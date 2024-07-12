export interface Res4AllStories {
  result: OneStory[];
}

export interface OneStory {
  id: number;
  video: string;
  views: number;
  likes: number;
  first_name: string;
  last_name: string;
  img: string;
  oneStory: string;
}
