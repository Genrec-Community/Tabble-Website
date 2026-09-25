import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

/**
 * Shared shell for every marketing page: fixed navbar, main content,
 * footer. Each route keeps its own URL, <title>, canonical and OG tags.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-espresso focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
