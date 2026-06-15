import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold">
          Shiv Fashion
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/">Home</Link>

          <Link href="/products">Products</Link>
        </nav>
      </div>
    </header>
  );
}
