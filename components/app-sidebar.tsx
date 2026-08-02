import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LogoutButton } from "./dashboard/logout-button";
import { SidebarLogo } from "./dashboard/sidebar-logo";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAIL } from "@/lib/constants";

const data = {
  navMain: [
    {
      title: "Panel",
      url: "/dashboard",
    },
    {
      title: "Mój profil",
      url: "/dashboard/profile",
    },
    {
      title: "Usługi",
      url: "/dashboard/services",
    },
    {
      title: "Formularz",
      url: "/dashboard/leads",
    },
    {
      title: "Pomysły i opinie",
      url: "/dashboard/feedback",
    },
    {
      title: "Fitly PRO",
      url: "/dashboard/pro",
    },
    {
      title: "Feedback",
      url: "/dashboard/admin/feedback",
    },
  ],
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-5 py-3">
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {data.navMain
            .filter(
              (item) => isAdmin || item.url !== "/dashboard/admin/feedback",
            )
            .map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<a href={item.url}>{item.title}</a>}
                />
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-2 pb-3 mb-10">
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <SidebarMenuButton onClick={signOu}>
              <span>Wyloguj</span>
            </SidebarMenuButton> */}
            <LogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
