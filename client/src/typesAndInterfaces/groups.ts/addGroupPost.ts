export interface AddGroupPostFD {
  post: string;
  imgs: FileList | string;
  [key: string]: string | FileList | undefined;
}
