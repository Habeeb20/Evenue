export interface Res4GetGroupMembers {
  result: OneMember[];
}

export interface OneMember {
  id: number;
  first_name: string;
  last_name: string;
  img: string;
}
