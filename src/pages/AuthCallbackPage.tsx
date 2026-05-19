import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { supabase } from "@/integrations/supabase/client";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Completing sign in…");

  useEffect(() => {
    let cancelled = false;

    async function finishAuth() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const errorDesc = params.get("error_description");

      if (errorDesc) {
        toast.error(decodeURIComponent(errorDesc.replace(/\+/g, " ")));
        navigate("/login", { replace: true });
        return;
      }

      if (code) {
        setMessage("Verifying your email…");
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error && !cancelled) {
          toast.error(error.message);
          navigate("/login", { replace: true });
          return;
        }
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;

      if (session) {
        toast.success("Email verified — welcome!");
        navigate("/dashboard/customer", { replace: true });
      } else {
        setMessage("Could not sign in. Try again.");
        setTimeout(() => navigate("/login", { replace: true }), 1500);
      }
    }

    void finishAuth();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
