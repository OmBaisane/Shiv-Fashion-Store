import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Shiv Fashion"
            width={55}
            height={55}
            priority
          />

          <div>
            <h2 className="text-xl font-bold text-white">Shiv Fashion</h2>

            <p className="text-xs text-yellow-400">Premium Men's Wear</p>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="font-medium text-white transition hover:text-yellow-400"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="font-medium text-white transition hover:text-yellow-400"
          >
            Collection
          </Link>
        </nav>
      </div>
    </header>
  );
}
