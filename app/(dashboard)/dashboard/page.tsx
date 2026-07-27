import { LogoutButton } from "@/components/dashboard/logout-button";
import PanelTitle from "@/components/dashboard/panel-title";

export const metadata = {
  title: "Dashboard - Fitly",
  description: "Your Fitly dashboard",
};

export default function DashboardPage() {
  return (
    <section className="container">
      <PanelTitle title="Panel" />
    </section>
  );
}
