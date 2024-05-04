import Header from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Session } from "next-auth";
import Tasks from "../components/tasks";

interface Props extends Readonly<{ user: Session["user"] }> {}

export default function Dashboard({ user }: Props) {
  return (
    <section>
      <Card>
        <Header user={user} />
        <CardHeader>
          <CardTitle>Hello, {user?.name}!</CardTitle>
          <CardDescription>
            Welcome to your daily tasks dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tasks />
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-center text-sm">
            Copyright © {new Date().getFullYear()}
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
