export interface AddVideoBody {
  description: string;
  video: FileList | string;
  [key: string]: string | FileList | undefined;
}
