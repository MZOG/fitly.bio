type ProfileCompletionData = {
  avatar_url: string | null;
  bio: string | null;
  city: string | null;
  specializations: string[] | null;
  socials: unknown[] | null;
  services: unknown[] | null;
};

export function getProfileCompletion(profile: ProfileCompletionData) {
  const checks = [
    Boolean(profile.avatar_url),
    Boolean(profile.bio?.trim()),
    Boolean(profile.city?.trim()),
    Boolean(profile.specializations?.length),
    Boolean(profile.services?.length),
    Boolean(profile.socials?.length),
  ];

  const completed = checks.filter(Boolean).length;
  const total = checks.length;

  return {
    completed,
    total,
    percent: Math.round((completed / total) * 100),
    missing: {
      avatar: !checks[0],
      bio: !checks[1],
      city: !checks[2],
      specializations: !checks[3],
      services: !checks[4],
      socials: !checks[5],
    },
  };
}
