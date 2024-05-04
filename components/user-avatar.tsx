import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props extends Readonly<{ avatarUrl?: string; userName: string }> {}

export default function UserAvatar({ avatarUrl, userName }: Props) {
  const avatarFallback = userName ? userName.slice(0, 2).toUpperCase() : 'AA';
  return (
    <Avatar className={cn()}>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{avatarFallback}</AvatarFallback>
    </Avatar>
  );
}
