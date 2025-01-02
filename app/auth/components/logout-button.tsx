"use client";

import { logout } from "@/app/auth/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="w-full cursor-pointer">
      {children}
    </span>
  );
};
