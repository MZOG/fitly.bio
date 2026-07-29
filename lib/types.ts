export type Gym = {
  name: string;
};

export type Social = {
  platform: string;
  url: string;
};

export type Profile = {
  id: string;
  full_name: string | null;
  slug: string | null;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  city: string | null;
  gyms: Gym[];
  specializations: string[];
  socials: Social[];
  plan: string | null;
  services: Service[];
};

export type ServiceField = {
  id: string;
  label: string;
  description: string;
  type: "textarea" | "radio" | "checkbox";
  required: boolean;
  options: string[];
};

export type Service = {
  id: string;
  name: string;
  price: string;
  description: string;
  fields: ServiceField[];
};
