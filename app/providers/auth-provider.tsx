"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

type Profile = {
  id: string;
  full_name: string;
  username: string | null;
  plan: "free" | "pro";
  slug: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      setIsLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    setProfile(data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isAuthenticated: !!user,
        isLoading,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
}
