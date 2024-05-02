import SignIn from "@/components/sign-in";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) redirect("/profile");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ThemeSwitcher />

      <SignIn />
    </main>
  );
}
