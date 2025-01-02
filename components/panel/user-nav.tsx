"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, Presentation, User, UserCog2, Currency, MessageCircleQuestion, BadgeCent } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "../../app/auth/components/logout-button";
import AccountSettingsBody from "@/app/(protected)/dashboard/account-settings/body";
import BaseModalButton from "../base/BaseModalButton";

export function UserNav() {
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">johndoe@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer">
          <BadgeCent className="w-4 h-4 mr-3 text-muted-foreground" />
          Payments
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer">
          <MessageCircleQuestion className="w-4 h-4 mr-3 text-muted-foreground" />
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton>  
          <DropdownMenuItem className="hover:cursor-pointer">
            <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
            Sign out
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>

  );
}
