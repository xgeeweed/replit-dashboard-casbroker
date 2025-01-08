
"use client";

import { ContentLayout } from "@/components/panel/content-layout";
import PlaceholderContent from "@/components/ui/placeholder-content";

export default function GlobalSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContentLayout title="Global Settings">
      <PlaceholderContent>
        <div className="p-6">
          {children}
        </div>
      </PlaceholderContent>
    </ContentLayout>
  );
}
