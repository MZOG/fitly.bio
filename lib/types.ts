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
  theme: ProfileTheme;
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
  button_text: string;
};

export type LeadContact = {
  name: string;
  phone: string;
  email: string;
};

export type LeadAnswer = {
  fieldId: string;
  label: string;
  type: "textarea" | "radio" | "checkbox";
  value: string | string[];
};

export type CreateLeadInput = {
  trainerId: string;

  service: {
    id: string;
    name: string;
  };

  contact: LeadContact;

  answers: LeadAnswer[];
};

export type LeadStatus = "new" | "contacted" | "completed" | "cancelled";

export type Lead = {
  id: string;
  trainer_id: string;
  service_id: string;
  service_name: string;
  contact: LeadContact;
  answers: LeadAnswer[];
  status: LeadStatus;
  is_read: boolean;
  created_at: string;
};

export type FeedbackType = "idea" | "bug" | "question" | "other";

export type FeedbackStatus = "new" | "planned" | "replied" | "closed";

export type Feedback = {
  id: string;
  user_id: string;
  type: FeedbackType;
  message: string;
  title: string;
  email: string | null;
  status: FeedbackStatus;
  full_name: string | null;
  admin_reply: string | null;
  replied_at: string | null;
  created_at: string;
};

export type AdminUser = {
  id: string;
  full_name: string;
  city: string | null;
  bio: string | null;
  slug: string | null;
  plan: "free" | "pro";
  is_public: boolean;
  onboarding_completed: boolean;
};

export type ProfileTheme = "default" | "minimal" | "dark";
