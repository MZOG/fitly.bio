export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Profil trenera: {username}</h1>
    </main>
  );
}
