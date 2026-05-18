import { AuthForm } from "@/components/auth/AuthForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginPage() {
  return (
    <Card className="border-0 shadow-none sm:border sm:shadow-card">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>India&apos;s AI automobile ecosystem</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
    </Card>
  );
}
