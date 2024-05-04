import logout from "@/actions/logout";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export function SignOut({ className, ...props }: Props) {
  return (
    <form action={logout}>
      <button className={cn(className)} type="submit" {...props}>
        Sign Out
      </button>
    </form>
  );
}
