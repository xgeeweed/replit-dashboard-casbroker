import PanelLayout from "@/components/panel/panel-layout";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <PanelLayout>{children}</PanelLayout>;
}
