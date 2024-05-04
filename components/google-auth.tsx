import { signIn } from "@/auth";
import { Button } from "./ui/button";

export default function GoogleAuthButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <Button type="submit">Sign in with Google</Button>
    </form>
  );
}
