import PlaceholderContent from "@/components/ui/placeholder-content";
import { ContentLayout } from "@/components/panel/content-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout title="All Agents">
      <PlaceholderContent>{children}</PlaceholderContent>
    </ContentLayout>
  );
}
