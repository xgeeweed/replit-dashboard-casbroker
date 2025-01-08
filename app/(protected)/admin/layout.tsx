
"use client";

import { ContentLayout } from "@/components/panel/content-layout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout title="Admin Dashboard">
      {children}
    </ContentLayout>
  );
}
