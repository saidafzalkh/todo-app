import { auth } from "@/auth";
import SignInBlock from "@/blocks/sign-in-block";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (session) redirect("/dashboard");

  return (
    <main className="flex h-[90vh] p-4 sm:p-2 items-center justify-center">
      <SignInBlock />
    </main>
  );
}
