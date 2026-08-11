import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Login — Ask Hajj Kassim" },
      {
        name: "description",
        content: "Login is currently disabled. Ask your question directly on the /ask page.",
      },
      { property: "og:title", content: "Login — Ask Hajj Kassim" },
      { property: "og:description", content: "Login is currently disabled. Ask your question directly on the /ask page." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  return (
    <AppShell>
      <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
        <h1 className="font-display text-3xl font-semibold">Login Disabled</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Authentication is not available in this version. You can still ask questions directly.
        </p>

        <Button size="sm" className="mt-8" asChild>
          <Link to="/ask">Go to Ask</Link>
        </Button>
      </div>
    </AppShell>
  );
}
