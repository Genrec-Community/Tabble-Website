import { RouteLink } from "@/lib/site/router";

/**
 * Visible breadcrumb trail (Home > Features) — feeds BreadcrumbList schema
 * (rendered per-page in JSON-LD) and moves internal link equity around.
 */
export function Breadcrumbs({ trail }: { trail: string[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
        <li>
          <RouteLink
            route="home"
            className="rounded px-1 py-0.5 text-ink-soft/70 transition-colors hover:text-ember focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Home
          </RouteLink>
        </li>
        {trail.map((crumb, i) => (
          <li key={crumb} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="text-tangerine">
              /
            </span>
            <span
              aria-current={i === trail.length - 1 ? "page" : undefined}
              className={i === trail.length - 1 ? "text-ember" : "text-ink-soft/70"}
            >
              {crumb}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
