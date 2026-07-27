export function getProfileUrl(profile: {
  plan: "free" | "pro";
  username: string | null;
  full_name: string;
}) {
  const slug =
    profile.plan === "pro" && profile.username
      ? profile.username
      : profile.full_name
          .toLowerCase()
          .trim()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
          .replace(/-+/g, "-");

  return `/${slug}`;
}
