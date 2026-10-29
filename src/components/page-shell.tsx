import { ReactNode } from "react";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <header className="mb-8 border-b border-border/60 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        )}
      </header>
      <div className="space-y-6">{children}</div>
    </article>
  );
}
