import logout from "@/actions/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "next-auth";
import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";
import UserAvatar from "./user-avatar";
import { Button } from "./ui/button";

interface Props extends Readonly<{ user: User }> {}

export default function Header({ user }: Props) {
  return (
    <header className="w-full flex justify-end pt-2 px-4 gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar userName={user.name!} avatarUrl={user.image!} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>TODO APP</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={"/privacy-policy"} className="block cursor-pointer">
              Privacy-policy
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/terms-of-service"} className="block cursor-pointer">
              Terms of service
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <form action={logout}>
            <DropdownMenuItem asChild>
              <Button
                variant={"destructive"}
                size={"sm"}
                type="submit"
                className="w-full cursor-pointer"
              >
                Log Out
              </Button>
            </DropdownMenuItem>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>

      <ThemeSwitcher />
    </header>
  );
}
