import PanelTitle from "@/components/dashboard/panel-title";

export const metadata = {
  title: "Dashboard - Fitly",
  description: "Your Fitly dashboard",
};

export default function DashboardPage() {
  return (
    <section className="container">
      <PanelTitle title="Panel" />
      <p>panel page</p>
    </section>
  );
}
