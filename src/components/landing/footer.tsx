import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} SaaS Boilerplate. Open source under MIT.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            GitHub
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Docs
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            License
          </Link>
        </div>
      </div>
    </footer>
  );
}
