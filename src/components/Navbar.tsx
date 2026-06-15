import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold">
          Shiv Fashion
        </Link>

        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
        </div>
      </div>
    </nav>
  );
}
