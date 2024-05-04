import { auth } from "@/auth";
import Dashboard from "@/blocks/dashboard";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/");

  return (
    <main className="p-2 sm:p-4">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Dashboard user={session.user} />
    </main>
  );
}
