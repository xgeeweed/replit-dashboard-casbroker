import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/app/auth/auth";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme/providers/theme-provider";
import { GeistSans } from "geist/font/sans";
import QueryClientProvider from "@/lib/theme/providers/query-client-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        </Head>
        <body className={GeistSans.className}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <QueryClientProvider>
              {children}
              {/* TODO: make it conditional top center for mobile, bottom right for desktop */}
              <Toaster position="bottom-right" />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
