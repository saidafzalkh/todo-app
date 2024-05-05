import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODO APP",
  description: "Minimalistic todo app to daily uses",
};

interface RootLayoutProps extends Readonly<{ children: ReactNode }> {}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en">
        <head />
        <body className={cn(inter.className)} suppressHydrationWarning>
          <div className="container">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </div>

          <footer className="flex w-full justify-center mt-auto">
            <p className="text-center text-xs">
              Copyright © {new Date().getFullYear()} | MIT LICENSE
            </p>
          </footer>
        </body>
      </html>
    </>
  );
}
