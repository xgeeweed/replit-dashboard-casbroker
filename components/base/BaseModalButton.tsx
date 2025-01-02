import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export enum modalSize {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  "long-height" = "long-height",
}

export type modalSizeType = `${modalSize}`;

export interface BaseModalButtonProps {
  header?: string;
  buttonTitle?: string;
  body: ReactNode;
  buttonComponent?: ReactNode;
  size?: modalSizeType;
}

export interface BaseModalButtonRef {
  handleCloseDialog: () => void;
}

const sizeClasses = {
  xs: "w-1/4",
  sm: "w-1/3",
  md: "w-1/2",
  lg: "w-2/3",
  xl: "w-3/4",
  "long-height": "h-5/6 max-h-screen",
};

function BaseModalButton(
  { header, buttonTitle, body, buttonComponent, size = "sm" }: BaseModalButtonProps,
  ref: React.ForwardedRef<BaseModalButtonRef>
) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const handleCloseDialog = () => {
    setDialogIsOpen(false);
  };

  useImperativeHandle(ref, () => ({
    handleCloseDialog,
  }));

  const defaultButtonComponent = () => {
    return (
      <Button size="sm" className="w-full">
        {buttonTitle}
      </Button>
    );
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>{buttonComponent || defaultButtonComponent()}</DialogTrigger>
      <DialogContent
        className={cn("bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-600", sizeClasses[size])}
      >
        <DialogHeader>
          <DialogTitle className="mb-2">{header}</DialogTitle>
          <DialogDescription>{body}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default forwardRef(BaseModalButton);
