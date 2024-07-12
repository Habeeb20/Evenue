export interface UpdateImg {
  img: FileList | string;
  [key: string]: string | FileList | null;
}
