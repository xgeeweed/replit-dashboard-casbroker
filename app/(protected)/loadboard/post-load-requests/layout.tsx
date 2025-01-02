
import { ContentLayout } from "@/components/panel/content-layout";
import PlaceholderContent from "@/components/ui/placeholder-content";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout title="Post Load Requests">
      <PlaceholderContent>{children}</PlaceholderContent>
    </ContentLayout>
  );
}
