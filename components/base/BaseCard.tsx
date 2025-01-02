import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

interface BaseCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

function BaseCard({ title, description, children,className }: BaseCardProps) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">{children}</div>
        </form>
      </CardContent>
    </Card>
  );
}

export default BaseCard;
