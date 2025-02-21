"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut as signOutClient } from "next-auth/react";
import React from "react";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();

  const handleLogout = async () => {    
    try {
      // Call our API endpoint
      await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Sign out on client side and redirect
      await signOutClient({
        redirect: true,
        callbackUrl: "/auth/login"
      });
    } catch (error) {
      console.error("Error during logout:", error);
      router.push("/auth/login");
    }
  };

  if (!children) {
    return (
      <Button onClick={handleLogout} variant="ghost" className="w-full">
        Sign out
      </Button>
    );
  }

  return (
    <div onClick={handleLogout} className="w-full">
      {children}
    </div>
  );
};
