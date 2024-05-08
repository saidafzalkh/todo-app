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
import CreateTask from "@/components/create-task";
import { Suspense } from "react";
import Loading from "@/components/loading";

interface Props extends Readonly<{ user: User }> {}

export default function Dashboard({ user }: Props) {
  return (
    <section className="max-w-[800px] mx-auto mb-2">
      <Card>
        <Header user={user} />
        <CardHeader>
          <CardTitle>Hello, {user.name}!</CardTitle>
          <CardDescription>
            Welcome to your daily tasks dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 px-2 space-y-4">
          <Tasks />
          <CreateTask user={user} />
        </CardContent>
        <CardFooter className="flex justify-center mt-4">
          <a
            className="text-xs hover:underline"
            href="https://github.com/saidafzalkh/todo-app"
          >
            Source on Github
          </a>
        </CardFooter>
      </Card>
    </section>
  );
}
