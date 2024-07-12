export interface EditProfile {
  first_name: string;
  last_name: string;
  business_name: string | null;
  business_img: FileList | string | null;
  country_code: string | null;
  phone_number: string | null;
  whatsapp_number: string | null;
  state: string | null;
  axis: string | null;
  business_state: string | null;
  business_axis: string | null;
  business_category: string | null;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
  instagram: string | null;
  [key: string]: string | FileList | null;
}
