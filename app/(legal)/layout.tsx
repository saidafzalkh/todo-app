import { ThemeSwitcher } from "@/components/theme-switcher";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "TODO APP (terms)",
  description: "Minimalistic todo app to daily uses",
};

interface RootLayoutProps extends Readonly<{ children: ReactNode }> {}

export default function Layout({ children }: RootLayoutProps) {
  return (
    <>
      <main className="py-4 px-2 sm:px-4 max-w-[800px] mx-auto">
        <div className="mb-2 w-full flex justify-end">
            <ThemeSwitcher />
        </div>
        <article className="prose lg:prose-xl dark:prose-invert">
          {children}
        </article>
      </main>
    </>
  );
}
