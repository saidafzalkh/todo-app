import { auth } from "@/auth";
import Dashboard from "@/blocks/dashboard";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) return redirect("/");

  if (!session.user)
    return (
      <code className="p-4 border">
        <pre>{JSON.stringify(session.user, null, 2)}</pre>
      </code>
    );

  return (
    <main className="p-0 sm:p-4">
      <Dashboard user={session.user} />
    </main>
  );
}
