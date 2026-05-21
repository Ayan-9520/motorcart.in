import { useEffect } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { setPrivatePageMeta } from "@/utils/seo";

export function LoginPage() {
  useEffect(() => {
    setPrivatePageMeta("Sign in");
  }, []);

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
