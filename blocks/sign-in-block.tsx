import GoogleAuthButton from "@/components/google-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignInBlock() {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to TODO APP!</CardTitle>
          <CardDescription>
            Sing in with Google to use our application.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center h-96">
          <GoogleAuthButton />
        </CardContent>
        <CardFooter>
          <p>You need to have account to keep your tasks online.</p>
        </CardFooter>
      </Card>
    </section>
  );
}
