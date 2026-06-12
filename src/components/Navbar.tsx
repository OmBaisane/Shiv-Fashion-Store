import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-6xl justify-between px-6 py-4">
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
