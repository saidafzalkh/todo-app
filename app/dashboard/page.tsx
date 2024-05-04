import { auth } from "@/auth";
import Dashboard from "@/blocks/dashboard";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <main className="p-2 sm:p-4">
      <Dashboard user={session.user} />
    </main>
  );
}
