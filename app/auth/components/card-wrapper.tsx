"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import Header from "@/app/auth/components/header";
import Social from "@/app/auth/components/social";
import BackButton from "@/app/auth/components/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )} */}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
