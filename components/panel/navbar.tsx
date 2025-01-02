import { ModeToggle } from "@/components/ui/mode-toggle";
import { UserNav } from "@/components/panel/user-nav";
import { SheetMenu } from "@/components/panel/sheet-menu";
import { Bell } from "lucide-react";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          {/* <ModeToggle /> */}
          {/* add lucide notification bell icon below*/}
          <Bell className="w-6 h-6 text-muted-foreground" />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
