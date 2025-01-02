import { Card, CardContent } from "@/components/ui/card";

export default function PlaceholderContent({ children }: { children: React.ReactNode }) {
  return (
    <Card className="rounded-lg border-none mt-6 dark:bg-c-zinc-930">
      <CardContent className="p-6 ">
        <div className="flex justify-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="flex flex-col relative w-full">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}
