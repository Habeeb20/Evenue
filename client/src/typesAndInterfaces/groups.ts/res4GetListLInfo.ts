export interface Res4GetListLInfo {
  result: OneGroup[];
}

export interface OneGroup {
  id: number;
  name: string;
  about: string;
  logo: string;
  member_total: number;
  total_post_last_24_hrs: number;
}
