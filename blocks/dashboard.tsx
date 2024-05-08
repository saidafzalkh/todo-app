import CreateTask from "@/components/create-task";
import Header from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { User } from "next-auth";
import Tasks from "../components/tasks";

interface Props extends Readonly<{ user: User }> {}

export default function Dashboard({ user }: Props) {
  return (
    <section className="w-[800px] mx-auto mb-2">
      <Card>
        <Header user={user} />
        <CardHeader className="px-4 py-2">
          <CardTitle>Hello, {user.name}!</CardTitle>
          <CardDescription>
            Welcome to your daily tasks dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 px-2 space-y-2">
          <Tasks />
          <CreateTask user={user} />
        </CardContent>
        <CardFooter className="flex gap-2 justify-center px-0 py-2">
          <a
            className="text-xs hover:underline"
            href="https://github.com/saidafzalkh/todo-app"
          >
            Source on Github
          </a>
          <span className="text-xs">
            | Copyright © {new Date().getFullYear()}
          </span>
        </CardFooter>
      </Card>
    </section>
  );
}
