import { Popover, PopoverContent, PopoverItem, PopoverTrigger } from "@/components/ui/popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface BasePopoverProps {
  triggerComponent?: ReactNode;
  content: ReactNode;
}

export default function BasePopover({ triggerComponent, content }: BasePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {triggerComponent ? (
          triggerComponent
        ) : (
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-fit p-1 my-1">
        <ul className="flex flex-col">{content}</ul>
      </PopoverContent>
    </Popover>
  );
}
