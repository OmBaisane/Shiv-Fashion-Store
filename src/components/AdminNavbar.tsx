import Link from "next/link";

export default function AdminNavbar() {
  return (
    <div className="mb-10 flex flex-wrap gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow">
      <Link
        href="/admin/dashboard"
        className="rounded-xl bg-black px-5 py-3 text-white transition hover:bg-zinc-800"
      >
        Dashboard
      </Link>

      <Link
        href="/admin/products"
        className="rounded-xl border px-5 py-3 transition hover:bg-zinc-100"
      >
        Products
      </Link>

      <Link
        href="/admin/orders"
        className="rounded-xl border px-5 py-3 transition hover:bg-zinc-100"
      >
        Orders
      </Link>
    </div>
  );
}
