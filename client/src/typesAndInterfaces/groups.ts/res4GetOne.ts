export interface Res4GetOne {
  result: OneGroupFullInfo[];
}

export interface OneGroupFullInfo {
  id: number;
  name: string;
  about: string;
  logo: string;
  fk_user_id: number;
  member_total: number;
  user_has_joined: number;
}
