"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Dumbbell,
  Users,
  ExternalLink,
  Sparkles,
} from "lucide-react";

// Definicja elementów menu
const navItems = [
  { href: "/dashboard", label: "Pulpit", icon: LayoutDashboard },
  { href: "/dashboard/leads", label: "Leady", icon: Users },
  { href: "/dashboard/services", label: "Usługi", icon: Dumbbell },
  { href: "/dashboard/profile", label: "Profil", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-900/50 p-4 sticky top-0 h-screen justify-between">
        <div className="space-y-6">
          {/* Logo Brandu */}
          <div className="flex items-center justify-between px-2">
            <Link
              href="/dashboard"
              className="flex items-center font-bold text-xl tracking-tight text-white"
            >
              <span className="text-emerald-400">fitly</span>.bio
            </Link>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> PRO
            </span>
          </div>

          {/* Nawigacja Główna */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Podgląd wizytówki (Link wychodzący) */}
        <div className="pt-4 border-t border-slate-800">
          <Link
            href="/marcin" // Tutaj docelowo zrobimy dynamiczny [username] z Supabase
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 transition"
          >
            <span>Zobacz swój profil</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </aside>

      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <Link href="/dashboard" className="font-bold text-lg text-white">
          <span className="text-emerald-400">fitly</span>.bio
        </Link>
        <Link
          href="/marcin"
          target="_blank"
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
        >
          <span>Podgląd</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </header>

      {/* ========================================== */}
      {/* 📄 GLÓWNA ZAWARTOŚĆ STRONY (Main Content)    */}
      {/* ========================================== */}
      <main className="flex-1 p-4 md:p-8 mb-20 md:mb-0 max-w-5xl mx-auto w-full">
        {children}
      </main>

      {/* ========================================== */}
      {/* 📱 MOBILE: Bottom Navigation Bar (Pasek na dole) */}
      {/* ========================================== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 flex justify-around items-center z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl min-w-[64px] transition-all ${
                isActive
                  ? "text-emerald-400 font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "scale-110" : ""} transition-transform`}
              />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
