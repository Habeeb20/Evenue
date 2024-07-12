export interface GroupsFormData {
  name: string;
  about: string;
  logo: FileList | string;
  [key: string]: string | FileList | undefined;
}
