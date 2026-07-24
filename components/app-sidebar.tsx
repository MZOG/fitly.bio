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
      title: "Zgłoszenia",
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
    {
      title: "Podgląd profilu",
      url: "#",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-5 py-3">
        <p className="font-semibold">Fitly</p>
      </SidebarHeader>
      <SidebarContent className="px-2">
        {/* We create a SidebarGroup for each parent. */}
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title} className="last:mt-5">
              <SidebarMenuButton
                render={<a href={item.url}>{item.title}</a>}
              ></SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-2 pb-3 mb-10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span>Wyloguj</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
