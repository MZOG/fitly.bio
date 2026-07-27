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
import { ProfilePreviewLink } from "./dashboard/profile-preview-link";
import { SidebarLogo } from "./dashboard/sidebar-logo";

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
      title: "Oferta i cenniki",
      url: "/dashboard/services",
    },
    {
      title: "Formularz",
      url: "/dashboard/leads",
    },
    {
      title: "Wygląd",
      url: "/dashboard/appearance",
    },
    {
      title: "Ustawienia",
      url: "/dashboard/settings",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-5 py-3">
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton render={<a href={item.url}>{item.title}</a>} />
            </SidebarMenuItem>
          ))}

          <SidebarMenuItem className="mt-5">
            <ProfilePreviewLink />
          </SidebarMenuItem>
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
