import PlaceholderContent from "@/components/ui/placeholder-content";
import { ContentLayout } from "@/components/panel/content-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout title="Analytics">
        <PlaceholderContent>{children}</PlaceholderContent>
    </ContentLayout>
  );
}
