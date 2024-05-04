import type { Session } from "next-auth";
import { ThemeSwitcher } from "./theme-switcher";
import UserAvatar from "./user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "./sign-out";
import Link from "next/link";

interface Props extends Readonly<{ user: Session["user"] }> {}

export default function Header({ user }: Props) {
  return (
    <header className="w-full flex justify-end pt-4 px-4 gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar userName={user?.name!} avatarUrl={user?.image!} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>TODO APP</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link
            href={"/privacy-policy"}
            className="block cursor-pointer"
          >
            <DropdownMenuItem>Privacy-policy</DropdownMenuItem>
          </Link>
          <Link
            href={"/terms-of-service"}
            className="block cursor-pointer"
          >
            <DropdownMenuItem>Terms of service</DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {/* <LogOut className="mr-2 h-4 w-4" /> */}
            <SignOut className="w-full h-full" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ThemeSwitcher />
    </header>
  );
}
