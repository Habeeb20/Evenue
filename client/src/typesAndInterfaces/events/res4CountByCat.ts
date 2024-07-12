export interface Res4CountBycat {
  result: CountBycat[];
}

export interface CountBycat {
  total_meetings: string;
  total_training: string;
  total_cooperation: string;
  total_party: string;
  total_engagement: string;
}
