import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TOOL_PAGES, type ToolPage } from "@/lib/tool-pages";

interface AllToolsGridProps {
  /** Pages to exclude (e.g., the current page) */
  exclude?: string[];
  /** Show only this group */
  groupFilter?: ToolPage["group"];
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Max number of items */
  limit?: number;
}

export function AllToolsGrid({
  exclude = [],
  groupFilter,
  title = "All tools & converters",
  subtitle = "Every conversion you might need — one tool, every format.",
  limit,
}: AllToolsGridProps) {
  const pages = TOOL_PAGES.filter((p) => !exclude.includes(p.path))
    .filter((p) => (groupFilter ? p.group === groupFilter : true))
    .slice(0, limit);

  return (
    <section className="border-t border-border/60 bg-secondary/20 py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="group rounded-2xl border border-border/70 bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold">{page.label}</h3>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {page.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
