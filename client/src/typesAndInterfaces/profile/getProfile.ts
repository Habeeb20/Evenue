export interface ProfileRes {
  profile: Profile[];
}

export interface Profile {
  user_id: number;
  first_name: string;
  last_name: string;
  business_name: null | string;
  img: string;
  email: string;
  password: string;
  country_code: null | string;
  phone_number: null | string;
  whatsapp_number: null | string;
  state: null | string;
  axis: null | string;
  about_your_organisation: null | string;
  services_your_organization_provides: null | string;
  business_state: null | string;
  business_axis: null | string;
  business_category: null | string;
  facebook: null | string;
  twitter: null | string;
  linkedin: null | string;
  instagram: null | string;
  month: string;
  year: string;
}
